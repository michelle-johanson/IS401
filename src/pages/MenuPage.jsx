import { Link } from "react-router-dom";
import { Star, Edit, Plus } from "lucide-react";
import { menus, events } from "../data/sampleData";

export default function MenuPage() {
  return (
    <div className="page">
      <div className="page-header">
        <h2 className="page-title">Menu Planning</h2>
        <Link to="/menu/new" className="btn btn--primary">
          <Plus size={18} /> Create Menu
        </Link>
      </div>

      <section className="card">
        <h3 className="card-header">Heading</h3>
        <div className="menu-list">
          {menus.map((menu) => {
            const event = events.find((e) => e.id === menu.eventId);
            const totalItems = menu.categories.reduce(
              (sum, cat) => sum + cat.items.length,
              0
            );
            return (
              <div key={menu.id} className="menu-list-item">
                <div className="menu-list-item-info">
                  <Star size={18} className="menu-star" />
                  <div>
                    <p className="menu-list-item-name">{menu.name}</p>
                    <p className="text-muted">
                      {totalItems} items &middot; {menu.categories.length} categories
                      {event && <> &middot; {event.name}</>}
                    </p>
                  </div>
                </div>
                <Link
                  to={`/menu/${menu.id}/edit`}
                  className="btn btn--small btn--secondary"
                >
                  <Edit size={14} /> Edit
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Menu Preview */}
      {menus.length > 0 && (
        <section className="card menu-preview-card">
          <h3 className="card-header">Menu Example</h3>
          <div className="menu-preview">
            <div className="menu-preview-header">
              <h4>FOOD MENU</h4>
              <span className="text-muted">Catering Party & Event</span>
            </div>
            {menus[0].categories.map((cat) => (
              <div key={cat.name} className="menu-preview-category">
                <h5 className="menu-preview-category-title">{cat.name.toUpperCase()}</h5>
                {cat.items.map((item) => (
                  <div key={item.id} className="menu-preview-item">
                    <span>{item.name} - ${item.price.toFixed(2)}</span>
                    <p className="text-muted text-small">{item.description}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
