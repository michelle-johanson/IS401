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
          { id: 101, name: "Caprese Skewers", description: "Fresh mozzarella, cherry tomatoes, basil", price: 4.50, dietary: ["vegetarian"] },
          { id: 102, name: "Shrimp Cocktail", description: "Jumbo shrimp with cocktail sauce", price: 6.00, dietary: [] },
          { id: 103, name: "Bruschetta", description: "Toasted bread with tomato-basil topping", price: 3.50, dietary: ["vegetarian"] },
        ],
      },
      {
        name: "Main Course",
        items: [
          { id: 104, name: "Grilled Salmon", description: "Atlantic salmon with lemon dill sauce", price: 18.00, dietary: ["gluten-free"] },
          { id: 105, name: "Beef Tenderloin", description: "8oz filet with red wine reduction", price: 24.00, dietary: ["gluten-free"] },
          { id: 106, name: "Mushroom Risotto", description: "Arborio rice with wild mushrooms", price: 14.00, dietary: ["vegetarian"] },
        ],
      },
      {
        name: "Desserts",
        items: [
          { id: 107, name: "Wedding Cake", description: "Three-tier vanilla cake with buttercream", price: 8.00, dietary: ["vegetarian"] },
          { id: 108, name: "Chocolate Mousse", description: "Dark chocolate mousse with berries", price: 6.00, dietary: ["vegetarian", "gluten-free"] },
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
          { id: 201, name: "Mini Crab Cakes", description: "Lump crab with remoulade", price: 7.00, dietary: [] },
          { id: 202, name: "Stuffed Mushrooms", description: "Portobello with herbed goat cheese", price: 5.00, dietary: ["vegetarian"] },
        ],
      },
      {
        name: "Main Course",
        items: [
          { id: 203, name: "Chicken Marsala", description: "Pan-seared chicken with marsala wine sauce", price: 16.00, dietary: [] },
          { id: 204, name: "Vegan Buddha Bowl", description: "Quinoa, roasted vegetables, tahini", price: 13.00, dietary: ["vegan", "gluten-free"] },
        ],
      },
      {
        name: "Desserts",
        items: [
          { id: 205, name: "Tiramisu", description: "Classic Italian coffee-flavored dessert", price: 7.00, dietary: ["vegetarian"] },
          { id: 206, name: "Fruit Tart", description: "Fresh seasonal fruits on pastry cream", price: 6.00, dietary: ["vegetarian"] },
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
          { id: 301, name: "Guacamole & Chips", description: "Fresh-made guacamole with tortilla chips", price: 4.00, dietary: ["vegan", "gluten-free"] },
          { id: 302, name: "Chicken Taquitos", description: "Rolled tortillas with seasoned chicken", price: 5.00, dietary: [] },
        ],
      },
      {
        name: "Main Course",
        items: [
          { id: 303, name: "Carne Asada", description: "Grilled marinated steak with chimichurri", price: 15.00, dietary: ["gluten-free"] },
          { id: 304, name: "Fish Tacos", description: "Battered fish with mango salsa", price: 12.00, dietary: [] },
        ],
      },
      {
        name: "Desserts",
        items: [
          { id: 305, name: "Churros", description: "Fried dough with cinnamon sugar and chocolate", price: 4.00, dietary: ["vegetarian"] },
          { id: 306, name: "Tres Leches Cake", description: "Three-milk sponge cake", price: 5.00, dietary: ["vegetarian"] },
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

export const kpis = {
  mrr: 50000,
  profit: 50000,
  wasteReduction: 50,
  tasksPerWeek: 100,
  totalEvents: 4,
  confirmedEvents: 3,
  pendingEvents: 1,
};
