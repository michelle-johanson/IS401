import { NavLink } from "react-router-dom";
import { Home, CalendarDays, BarChart3, UtensilsCrossed, CheckSquare, ShoppingCart } from "lucide-react";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/events", icon: CalendarDays, label: "Events" },
  { to: "/analytics", icon: BarChart3, label: "Analytics" },
  { to: "/menu", icon: UtensilsCrossed, label: "Menu" },
  { to: "/prep-planner", icon: ShoppingCart, label: "Prep Planner" },
  { to: "/tasks", icon: CheckSquare, label: "Tasks" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">
          <UtensilsCrossed size={28} />
        </div>
        <h1 className="sidebar-title">Catering</h1>
        <span className="sidebar-subtitle">Party & Event</span>
      </div>
      <nav className="sidebar-nav">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "sidebar-link--active" : ""}`
            }
          >
            <Icon size={20} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
