import express from "express";
import cors from "cors";
import pool from "./db.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ─── Events ──────────────────────────────────────────────
app.get("/api/events", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, name, client, venue, event_date, event_time, guests, status, budget, notes, image_url FROM events ORDER BY event_date"
    );
    const events = rows.map((r) => ({
      id: r.id,
      name: r.name,
      client: r.client,
      venue: r.venue,
      date: r.event_date,
      time: r.event_time,
      guests: r.guests,
      status: r.status,
      budget: parseFloat(r.budget),
      notes: r.notes,
      image: r.image_url,
    }));
    res.json(events);
  } catch (err) {
    console.error("GET /api/events error:", err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

app.post("/api/events", async (req, res) => {
  try {
    const { name, client, venue, date, time, guests, status, budget, notes } = req.body;
    const { rows } = await pool.query(
      `INSERT INTO events (name, client, venue, event_date, event_time, guests, status, budget, notes)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [name, client, venue, date, time, guests, status, budget, notes]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("POST /api/events error:", err);
    res.status(500).json({ error: "Failed to create event" });
  }
});

app.put("/api/events/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, client, venue, date, time, guests, status, budget, notes } = req.body;
    const { rows } = await pool.query(
      `UPDATE events
       SET name=$1, client=$2, venue=$3, event_date=$4, event_time=$5,
           guests=$6, status=$7, budget=$8, notes=$9
       WHERE id=$10
       RETURNING *`,
      [name, client, venue, date, time, guests, status, budget, notes, id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error("PUT /api/events/:id error:", err);
    res.status(500).json({ error: "Failed to update event" });
  }
});

// ─── Menus (nested: categories → items) ──────────────────
app.get("/api/menus", async (req, res) => {
  try {
    const menusResult = await pool.query("SELECT id, name, event_id FROM menus ORDER BY id");
    const menus = [];

    for (const menu of menusResult.rows) {
      const catsResult = await pool.query(
        "SELECT id, name FROM menu_categories WHERE menu_id = $1 ORDER BY id",
        [menu.id]
      );
      const categories = [];

      for (const cat of catsResult.rows) {
        const itemsResult = await pool.query(
          "SELECT id, name, description, price, dietary_info FROM menu_items WHERE category_id = $1 ORDER BY id",
          [cat.id]
        );
        categories.push({
          name: cat.name,
          items: itemsResult.rows.map((item) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            price: parseFloat(item.price),
            dietary: item.dietary_info || [],
          })),
        });
      }

      menus.push({
        id: menu.id,
        name: menu.name,
        eventId: menu.event_id,
        categories,
      });
    }

    res.json(menus);
  } catch (err) {
    console.error("GET /api/menus error:", err);
    res.status(500).json({ error: "Failed to fetch menus" });
  }
});

app.post("/api/menus", async (req, res) => {
  try {
    const { name, eventId, categories } = req.body;
    const menuResult = await pool.query(
      "INSERT INTO menus (name, event_id) VALUES ($1, $2) RETURNING *",
      [name, eventId || null]
    );
    const menu = menuResult.rows[0];

    for (const cat of categories || []) {
      const catResult = await pool.query(
        "INSERT INTO menu_categories (menu_id, name) VALUES ($1, $2) RETURNING id",
        [menu.id, cat.name]
      );
      for (const item of cat.items || []) {
        await pool.query(
          `INSERT INTO menu_items (category_id, name, description, price, dietary_info)
           VALUES ($1, $2, $3, $4, $5)`,
          [catResult.rows[0].id, item.name, item.description || "", item.price || 0, item.dietary || []]
        );
      }
    }

    res.status(201).json({ id: menu.id });
  } catch (err) {
    console.error("POST /api/menus error:", err);
    res.status(500).json({ error: "Failed to create menu" });
  }
});

app.put("/api/menus/:id", async (req, res) => {
  const { id } = req.params;
  const { name, categories } = req.body;
  try {
    await pool.query("UPDATE menus SET name = $1 WHERE id = $2", [name, id]);
    // Replace categories: delete old, insert new
    await pool.query("DELETE FROM menu_categories WHERE menu_id = $1", [id]);

    for (const cat of categories || []) {
      const catResult = await pool.query(
        "INSERT INTO menu_categories (menu_id, name) VALUES ($1, $2) RETURNING id",
        [id, cat.name]
      );
      for (const item of cat.items || []) {
        await pool.query(
          `INSERT INTO menu_items (category_id, name, description, price, dietary_info)
           VALUES ($1, $2, $3, $4, $5)`,
          [catResult.rows[0].id, item.name, item.description || "", item.price || 0, item.dietary || []]
        );
      }
    }

    res.json({ success: true });
  } catch (err) {
    console.error("PUT /api/menus/:id error:", err);
    res.status(500).json({ error: "Failed to update menu" });
  }
});

// ─── Tasks ───────────────────────────────────────────────
app.get("/api/tasks", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, label, description, assigned_to, completed, event_id FROM tasks ORDER BY id"
    );
    const tasks = rows.map((r) => ({
      id: r.id,
      label: r.label,
      description: r.description,
      assignedTo: r.assigned_to,
      completed: r.completed,
      eventId: r.event_id,
    }));
    res.json(tasks);
  } catch (err) {
    console.error("GET /api/tasks error:", err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

app.post("/api/tasks", async (req, res) => {
  try {
    const { label, description, assignedTo, eventId } = req.body;
    const { rows } = await pool.query(
      `INSERT INTO tasks (label, description, assigned_to, completed, event_id)
       VALUES ($1, $2, $3, false, $4) RETURNING *`,
      [label, description, assignedTo, eventId || null]
    );
    res.status(201).json({
      id: rows[0].id,
      label: rows[0].label,
      description: rows[0].description,
      assignedTo: rows[0].assigned_to,
      completed: rows[0].completed,
      eventId: rows[0].event_id,
    });
  } catch (err) {
    console.error("POST /api/tasks error:", err);
    res.status(500).json({ error: "Failed to create task" });
  }
});

app.patch("/api/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    await pool.query("UPDATE tasks SET completed = $1 WHERE id = $2", [completed, id]);
    res.json({ success: true });
  } catch (err) {
    console.error("PATCH /api/tasks/:id error:", err);
    res.status(500).json({ error: "Failed to update task" });
  }
});

// ─── KPIs ────────────────────────────────────────────────
app.get("/api/kpis", async (req, res) => {
  try {
    const eventsResult = await pool.query("SELECT status, budget FROM events");
    const tasksResult = await pool.query("SELECT completed FROM tasks");

    const totalEvents = eventsResult.rows.length;
    const confirmedEvents = eventsResult.rows.filter((e) => e.status === "Confirmed").length;
    const pendingEvents = totalEvents - confirmedEvents;
    const totalRevenue = eventsResult.rows.reduce((sum, e) => sum + parseFloat(e.budget || 0), 0);
    const totalTasks = tasksResult.rows.length;
    const completedTasks = tasksResult.rows.filter((t) => t.completed).length;

    res.json({
      mrr: totalRevenue,
      profit: totalRevenue,
      wasteReduction: 50,
      tasksPerWeek: totalTasks,
      totalEvents,
      confirmedEvents,
      pendingEvents,
    });
  } catch (err) {
    console.error("GET /api/kpis error:", err);
    res.status(500).json({ error: "Failed to fetch KPIs" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
