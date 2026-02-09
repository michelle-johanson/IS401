export const events = [
  {
    id: 1,
    name: "Johnson Wedding Reception",
    client: "Sarah & Mike Johnson",
    venue: "Grand Ballroom, Hilton Downtown",
    date: "2026-03-15",
    time: "6:00 PM",
    guests: 150,
    status: "Confirmed",
    budget: 12000,
    notes: "Bride is vegetarian. Need separate kids menu. Outdoor cocktail hour if weather permits.",
    menuId: 1,
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=250&fit=crop",
  },
  {
    id: 2,
    name: "TechCorp Annual Gala",
    client: "TechCorp Inc.",
    venue: "Convention Center Hall A",
    date: "2026-03-22",
    time: "7:00 PM",
    guests: 300,
    status: "Confirmed",
    budget: 25000,
    notes: "CEO speech at 8 PM. Vegan and gluten-free options required. Premium bar service.",
    menuId: 2,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop",
  },
  {
    id: 3,
    name: "Garcia Birthday Party",
    client: "Maria Garcia",
    venue: "Riverside Garden Pavilion",
    date: "2026-04-05",
    time: "2:00 PM",
    guests: 75,
    status: "Pending",
    budget: 5000,
    notes: "50th birthday celebration. Mexican-themed menu requested. Live music area needed.",
    menuId: 3,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=250&fit=crop",
  },
  {
    id: 4,
    name: "Startup Launch Party",
    client: "InnovateLab",
    venue: "Rooftop Lounge, The Heights",
    date: "2026-04-12",
    time: "5:00 PM",
    guests: 120,
    status: "Confirmed",
    budget: 8000,
    notes: "Casual cocktail style. Heavy appetizers, no sit-down dinner. Branded desserts.",
    menuId: null,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=250&fit=crop",
  },
];

export const menus = [
  {
    id: 1,
    name: "Elegant Wedding Menu",
    eventId: 1,
    categories: [
      {
        name: "Appetizers",
        items: [
          { id: 101, name: "Caprese Skewers", description: "Fresh mozzarella, cherry tomatoes, basil", price: 4.50, costPerServing: 1.80, servingsPerGuest: 2, dietary: ["vegetarian"] },
          { id: 102, name: "Shrimp Cocktail", description: "Jumbo shrimp with cocktail sauce", price: 6.00, costPerServing: 2.50, servingsPerGuest: 1, dietary: [] },
          { id: 103, name: "Bruschetta", description: "Toasted bread with tomato-basil topping", price: 3.50, costPerServing: 0.90, servingsPerGuest: 2, dietary: ["vegetarian"] },
        ],
      },
      {
        name: "Main Course",
        items: [
          { id: 104, name: "Grilled Salmon", description: "Atlantic salmon with lemon dill sauce", price: 18.00, costPerServing: 7.20, servingsPerGuest: 0.4, dietary: ["gluten-free"] },
          { id: 105, name: "Beef Tenderloin", description: "8oz filet with red wine reduction", price: 24.00, costPerServing: 10.50, servingsPerGuest: 0.4, dietary: ["gluten-free"] },
          { id: 106, name: "Mushroom Risotto", description: "Arborio rice with wild mushrooms", price: 14.00, costPerServing: 3.80, servingsPerGuest: 0.2, dietary: ["vegetarian"] },
        ],
      },
      {
        name: "Desserts",
        items: [
          { id: 107, name: "Wedding Cake", description: "Three-tier vanilla cake with buttercream", price: 8.00, costPerServing: 2.40, servingsPerGuest: 1, dietary: ["vegetarian"] },
          { id: 108, name: "Chocolate Mousse", description: "Dark chocolate mousse with berries", price: 6.00, costPerServing: 1.80, servingsPerGuest: 0.5, dietary: ["vegetarian", "gluten-free"] },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Corporate Gala Menu",
    eventId: 2,
    categories: [
      {
        name: "Appetizers",
        items: [
          { id: 201, name: "Mini Crab Cakes", description: "Lump crab with remoulade", price: 7.00, costPerServing: 3.20, servingsPerGuest: 2, dietary: [] },
          { id: 202, name: "Stuffed Mushrooms", description: "Portobello with herbed goat cheese", price: 5.00, costPerServing: 1.60, servingsPerGuest: 2, dietary: ["vegetarian"] },
        ],
      },
      {
        name: "Main Course",
        items: [
          { id: 203, name: "Chicken Marsala", description: "Pan-seared chicken with marsala wine sauce", price: 16.00, costPerServing: 5.40, servingsPerGuest: 0.6, dietary: [] },
          { id: 204, name: "Vegan Buddha Bowl", description: "Quinoa, roasted vegetables, tahini", price: 13.00, costPerServing: 3.20, servingsPerGuest: 0.4, dietary: ["vegan", "gluten-free"] },
        ],
      },
      {
        name: "Desserts",
        items: [
          { id: 205, name: "Tiramisu", description: "Classic Italian coffee-flavored dessert", price: 7.00, costPerServing: 2.10, servingsPerGuest: 0.5, dietary: ["vegetarian"] },
          { id: 206, name: "Fruit Tart", description: "Fresh seasonal fruits on pastry cream", price: 6.00, costPerServing: 1.90, servingsPerGuest: 0.5, dietary: ["vegetarian"] },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Fiesta Birthday Menu",
    eventId: 3,
    categories: [
      {
        name: "Appetizers",
        items: [
          { id: 301, name: "Guacamole & Chips", description: "Fresh-made guacamole with tortilla chips", price: 4.00, costPerServing: 1.20, servingsPerGuest: 2, dietary: ["vegan", "gluten-free"] },
          { id: 302, name: "Chicken Taquitos", description: "Rolled tortillas with seasoned chicken", price: 5.00, costPerServing: 1.50, servingsPerGuest: 2, dietary: [] },
        ],
      },
      {
        name: "Main Course",
        items: [
          { id: 303, name: "Carne Asada", description: "Grilled marinated steak with chimichurri", price: 15.00, costPerServing: 6.00, servingsPerGuest: 0.5, dietary: ["gluten-free"] },
          { id: 304, name: "Fish Tacos", description: "Battered fish with mango salsa", price: 12.00, costPerServing: 4.20, servingsPerGuest: 0.5, dietary: [] },
        ],
      },
      {
        name: "Desserts",
        items: [
          { id: 305, name: "Churros", description: "Fried dough with cinnamon sugar and chocolate", price: 4.00, costPerServing: 0.80, servingsPerGuest: 2, dietary: ["vegetarian"] },
          { id: 306, name: "Tres Leches Cake", description: "Three-milk sponge cake", price: 5.00, costPerServing: 1.40, servingsPerGuest: 1, dietary: ["vegetarian"] },
        ],
      },
    ],
  },
];

export const tasks = [
  { id: 1, label: "Confirm floral arrangements", description: "Call vendor for Johnson Wedding flowers", assignedTo: "Emily", completed: true, eventId: 1 },
  { id: 2, label: "Order table linens", description: "White and ivory linens for 20 tables", assignedTo: "James", completed: true, eventId: 1 },
  { id: 3, label: "Finalize gala seating chart", description: "VIP table assignments for TechCorp", assignedTo: "Sarah", completed: false, eventId: 2 },
  { id: 4, label: "Book DJ for birthday party", description: "Confirm DJ Marco for Garcia event", assignedTo: "Emily", completed: false, eventId: 3 },
  { id: 5, label: "Review cocktail menu", description: "Signature drinks for Startup Launch", assignedTo: "James", completed: false, eventId: 4 },
  { id: 6, label: "Send invoice to TechCorp", description: "Final catering invoice with deposits", assignedTo: "Sarah", completed: false, eventId: 2 },
  { id: 7, label: "Taste testing session", description: "Menu tasting with Garcia family", assignedTo: "Emily", completed: false, eventId: 3 },
  { id: 8, label: "Hire extra wait staff", description: "Need 10 additional servers for gala", assignedTo: "James", completed: false, eventId: 2 },
];

// Post-event waste reports — completed events from the past (simulated history)
export const wasteReports = [
  {
    id: 1,
    eventId: 1,
    eventName: "Johnson Wedding Reception",
    date: "2026-03-15",
    guestCount: 150,
    actualAttendees: 142,
    categories: [
      {
        name: "Appetizers",
        items: [
          { name: "Caprese Skewers", prepared: 300, consumed: 265, wasted: 35, unit: "servings", costPerUnit: 1.80, wasteDisposal: "donated" },
          { name: "Shrimp Cocktail", prepared: 160, consumed: 148, wasted: 12, unit: "servings", costPerUnit: 2.50, wasteDisposal: "composted" },
          { name: "Bruschetta", prepared: 310, consumed: 240, wasted: 70, unit: "servings", costPerUnit: 0.90, wasteDisposal: "composted" },
        ],
      },
      {
        name: "Main Course",
        items: [
          { name: "Grilled Salmon", prepared: 65, consumed: 58, wasted: 7, unit: "servings", costPerUnit: 7.20, wasteDisposal: "donated" },
          { name: "Beef Tenderloin", prepared: 62, consumed: 60, wasted: 2, unit: "servings", costPerUnit: 10.50, wasteDisposal: "trash" },
          { name: "Mushroom Risotto", prepared: 35, consumed: 28, wasted: 7, unit: "servings", costPerUnit: 3.80, wasteDisposal: "composted" },
        ],
      },
      {
        name: "Desserts",
        items: [
          { name: "Wedding Cake", prepared: 155, consumed: 130, wasted: 25, unit: "servings", costPerUnit: 2.40, wasteDisposal: "donated" },
          { name: "Chocolate Mousse", prepared: 80, consumed: 72, wasted: 8, unit: "servings", costPerUnit: 1.80, wasteDisposal: "composted" },
        ],
      },
    ],
    notes: "8 guests did not show. Bruschetta was significantly over-prepared. Consider reducing appetizer portions by 15% for similar events.",
  },
  {
    id: 2,
    eventId: 2,
    eventName: "TechCorp Annual Gala",
    date: "2026-03-22",
    guestCount: 300,
    actualAttendees: 285,
    categories: [
      {
        name: "Appetizers",
        items: [
          { name: "Mini Crab Cakes", prepared: 620, consumed: 570, wasted: 50, unit: "servings", costPerUnit: 3.20, wasteDisposal: "donated" },
          { name: "Stuffed Mushrooms", prepared: 610, consumed: 490, wasted: 120, unit: "servings", costPerUnit: 1.60, wasteDisposal: "composted" },
        ],
      },
      {
        name: "Main Course",
        items: [
          { name: "Chicken Marsala", prepared: 190, consumed: 175, wasted: 15, unit: "servings", costPerUnit: 5.40, wasteDisposal: "donated" },
          { name: "Vegan Buddha Bowl", prepared: 125, consumed: 110, wasted: 15, unit: "servings", costPerUnit: 3.20, wasteDisposal: "composted" },
        ],
      },
      {
        name: "Desserts",
        items: [
          { name: "Tiramisu", prepared: 155, consumed: 140, wasted: 15, unit: "servings", costPerUnit: 2.10, wasteDisposal: "composted" },
          { name: "Fruit Tart", prepared: 155, consumed: 130, wasted: 25, unit: "servings", costPerUnit: 1.90, wasteDisposal: "composted" },
        ],
      },
    ],
    notes: "Stuffed mushrooms consistently over-prepared. Recommend reducing from 2 to 1.5 per guest. Vegan options more popular than expected — increase next time.",
  },
];

// Historical waste summary for trending (past 6 months of simulated data)
export const wasteHistory = [
  { month: "Oct 2025", events: 5, totalPreparedCost: 18200, totalWasteCost: 3640, wastePercent: 20.0, donated: 1200, composted: 1800, trashed: 640 },
  { month: "Nov 2025", events: 7, totalPreparedCost: 24500, totalWasteCost: 4165, wastePercent: 17.0, donated: 1500, composted: 2000, trashed: 665 },
  { month: "Dec 2025", events: 10, totalPreparedCost: 38000, totalWasteCost: 5700, wastePercent: 15.0, donated: 2200, composted: 2800, trashed: 700 },
  { month: "Jan 2026", events: 6, totalPreparedCost: 21600, totalWasteCost: 2808, wastePercent: 13.0, donated: 1100, composted: 1400, trashed: 308 },
  { month: "Feb 2026", events: 8, totalPreparedCost: 30400, totalWasteCost: 3344, wastePercent: 11.0, donated: 1300, composted: 1700, trashed: 344 },
  { month: "Mar 2026", events: 4, totalPreparedCost: 15800, totalWasteCost: 1422, wastePercent: 9.0, donated: 580, composted: 680, trashed: 162 },
];

// Helper: compute KPIs from actual data
export function computeKpis() {
  const totalRevenue = events.reduce((s, e) => s + e.budget, 0);
  const confirmedEvents = events.filter((e) => e.status === "Confirmed").length;
  const pendingEvents = events.filter((e) => e.status === "Pending").length;

  // Waste metrics from reports
  let totalPrepared = 0;
  let totalWasted = 0;
  let totalWasteCost = 0;
  for (const report of wasteReports) {
    for (const cat of report.categories) {
      for (const item of cat.items) {
        totalPrepared += item.prepared;
        totalWasted += item.wasted;
        totalWasteCost += item.wasted * item.costPerUnit;
      }
    }
  }
  const wastePercent = totalPrepared > 0 ? ((totalWasted / totalPrepared) * 100) : 0;

  // Cost of food from menus
  let totalFoodCost = 0;
  for (const report of wasteReports) {
    for (const cat of report.categories) {
      for (const item of cat.items) {
        totalFoodCost += item.prepared * item.costPerUnit;
      }
    }
  }

  // Waste trend: compare current month to 3 months ago
  const current = wasteHistory[wasteHistory.length - 1];
  const earlier = wasteHistory[wasteHistory.length - 4];
  const wasteReduction = earlier ? (earlier.wastePercent - current.wastePercent) : 0;

  const completedTasks = tasks.filter((t) => t.completed).length;

  return {
    totalRevenue,
    totalEvents: events.length,
    confirmedEvents,
    pendingEvents,
    wastePercent: Math.round(wastePercent * 10) / 10,
    totalWasteCost: Math.round(totalWasteCost),
    totalFoodCost: Math.round(totalFoodCost),
    wasteReduction,
    completedTasks,
    totalTasks: tasks.length,
    moneySaved: Math.round((earlier ? earlier.wastePercent - current.wastePercent : 0) / 100 * totalFoodCost),
  };
}
