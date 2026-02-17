import { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, Save, GripVertical } from "lucide-react";

const API = "http://localhost:3001/api";

export default function MenuEditorPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const isNew = id === "new";

  const [menuName, setMenuName] = useState("");
  const [categories, setCategories] = useState([
    { name: "Appetizers", items: [] },
    { name: "Main Course", items: [] },
    { name: "Desserts", items: [] },
  ]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(!isNew);

  const eventIdParam = searchParams.get("eventId");

  useEffect(() => {
    fetch(`${API}/events`).then((r) => r.json()).then(setEvents);

    if (!isNew) {
      fetch(`${API}/menus`).then((r) => r.json()).then((menus) => {
        const existing = menus.find((m) => m.id === Number(id));
        if (existing) {
          setMenuName(existing.name);
          setCategories(existing.categories);
        }
        setLoading(false);
      });
    }
  }, [id, isNew]);

  const addCategory = () => {
    setCategories([...categories, { name: "New Category", items: [] }]);
  };

  const updateCategoryName = (idx, name) => {
    const updated = [...categories];
    updated[idx] = { ...updated[idx], name };
    setCategories(updated);
  };

  const removeCategory = (idx) => {
    setCategories(categories.filter((_, i) => i !== idx));
  };

  const addItem = (catIdx) => {
    const updated = [...categories];
    updated[catIdx] = {
      ...updated[catIdx],
      items: [
        ...updated[catIdx].items,
        { id: Date.now(), name: "", description: "", price: 0, dietary: [] },
      ],
    };
    setCategories(updated);
  };

  const updateItem = (catIdx, itemIdx, field, value) => {
    const updated = [...categories];
    const items = [...updated[catIdx].items];
    items[itemIdx] = { ...items[itemIdx], [field]: value };
    updated[catIdx] = { ...updated[catIdx], items };
    setCategories(updated);
  };

  const removeItem = (catIdx, itemIdx) => {
    const updated = [...categories];
    updated[catIdx] = {
      ...updated[catIdx],
      items: updated[catIdx].items.filter((_, i) => i !== itemIdx),
    };
    setCategories(updated);
  };

  const handleSave = async () => {
    const body = { name: menuName, eventId: eventIdParam ? Number(eventIdParam) : null, categories };
    const url = isNew ? `${API}/menus` : `${API}/menus/${id}`;
    const method = isNew ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      navigate("/menu");
    } else {
      alert("Failed to save menu.");
    }
  };

  if (loading) return <div className="page"><p>Loading...</p></div>;

  return (
    <div className="page">
      <Link to="/menu" className="back-link">
        <ArrowLeft size={18} /> Back to Menu Planning
      </Link>
      <h2 className="page-title">{isNew ? "Create Menu" : "Edit Menu"}</h2>

      <div className="form-card">
        <div className="form-group">
          <label className="form-label">Menu Name</label>
          <input
            type="text"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
            className="form-input"
            placeholder="e.g. Elegant Wedding Menu"
          />
        </div>

        {eventIdParam && (
          <p className="text-muted">
            Linked to event: {events.find((e) => e.id === Number(eventIdParam))?.name || "Unknown"}
          </p>
        )}

        <div className="menu-editor-categories">
          {categories.map((cat, catIdx) => (
            <div key={catIdx} className="menu-editor-category">
              <div className="menu-editor-category-header">
                <input
                  type="text"
                  value={cat.name}
                  onChange={(e) => updateCategoryName(catIdx, e.target.value)}
                  className="form-input form-input--inline"
                  placeholder="Category name"
                />
                <button
                  onClick={() => removeCategory(catIdx)}
                  className="btn btn--icon btn--danger"
                  title="Remove category"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {cat.items.map((item, itemIdx) => (
                <div key={item.id} className="menu-editor-item">
                  <GripVertical size={16} className="text-muted" />
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      updateItem(catIdx, itemIdx, "name", e.target.value)
                    }
                    className="form-input"
                    placeholder="Item name"
                  />
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) =>
                      updateItem(catIdx, itemIdx, "description", e.target.value)
                    }
                    className="form-input"
                    placeholder="Description"
                  />
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) =>
                      updateItem(catIdx, itemIdx, "price", Number(e.target.value))
                    }
                    className="form-input form-input--small"
                    placeholder="Price"
                    min="0"
                    step="0.50"
                  />
                  <button
                    onClick={() => removeItem(catIdx, itemIdx)}
                    className="btn btn--icon btn--danger"
                    title="Remove item"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}

              <button
                onClick={() => addItem(catIdx)}
                className="btn btn--small btn--ghost"
              >
                <Plus size={14} /> Add Item
              </button>
            </div>
          ))}
        </div>

        <button onClick={addCategory} className="btn btn--secondary">
          <Plus size={18} /> Add Category
        </button>

        <div className="form-actions">
          <button onClick={handleSave} className="btn btn--primary">
            <Save size={18} /> {isNew ? "Create Menu" : "Save Changes"}
          </button>
          <Link to="/menu" className="btn btn--secondary">Cancel</Link>
        </div>
      </div>
    </div>
  );
}
