import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Users, DollarSign, FileText, UtensilsCrossed } from "lucide-react";

const API = "http://localhost:3001/api";

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/events`).then((r) => r.json()),
      fetch(`${API}/tasks`).then((r) => r.json()),
      fetch(`${API}/menus`).then((r) => r.json()),
    ]).then(([eventsData, tasksData, menusData]) => {
      setEvent(eventsData.find((e) => e.id === Number(id)) || null);
      setTasks(tasksData);
      setMenus(menusData);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="page"><p>Loading...</p></div>;

  if (!event) {
    return (
      <div className="page">
        <h2 className="page-title">Event not found</h2>
        <Link to="/events" className="btn btn--secondary">← Back to Events</Link>
      </div>
    );
  }

  const eventTasks = tasks.filter((t) => t.eventId === event.id);
  const eventMenu = menus.find((m) => m.eventId === event.id);

  return (
    <div className="page">
      <Link to="/events" className="back-link">
        <ArrowLeft size={18} /> Back to Events
      </Link>

      <div className="detail-header">
        <div>
          <h2 className="page-title">{event.name}</h2>
          <span className={`badge badge--${event.status.toLowerCase()}`}>
            {event.status}
          </span>
        </div>
        <Link to={`/events/${event.id}/edit`} className="btn btn--secondary">
          Edit Event
        </Link>
      </div>

      <div className="detail-hero">
        <img src={event.image} alt={event.name} className="detail-hero-image" />
      </div>

      <div className="detail-grid">
        <section className="card">
          <h3 className="card-header">Event Details</h3>
          <div className="detail-list">
            <div className="detail-item">
              <Users size={16} />
              <span><strong>Client:</strong> {event.client}</span>
            </div>
            <div className="detail-item">
              <MapPin size={16} />
              <span><strong>Venue:</strong> {event.venue}</span>
            </div>
            <div className="detail-item">
              <Clock size={16} />
              <span><strong>Date:</strong> {event.date} at {event.time}</span>
            </div>
            <div className="detail-item">
              <Users size={16} />
              <span><strong>Guests:</strong> {event.guests}</span>
            </div>
            <div className="detail-item">
              <DollarSign size={16} />
              <span><strong>Budget:</strong> ${event.budget.toLocaleString()}</span>
            </div>
            <div className="detail-item">
              <FileText size={16} />
              <span><strong>Notes:</strong> {event.notes}</span>
            </div>
          </div>
        </section>

        <section className="card">
          <div className="card-header-row">
            <h3 className="card-header">Menu</h3>
            {eventMenu ? (
              <Link to={`/menu/${eventMenu.id}/edit`} className="btn btn--small btn--secondary">
                <UtensilsCrossed size={14} /> Edit Menu
              </Link>
            ) : (
              <Link to={`/menu/new?eventId=${event.id}`} className="btn btn--small btn--primary">
                <UtensilsCrossed size={14} /> Create Menu
              </Link>
            )}
          </div>
          {eventMenu ? (
            <div>
              <p className="menu-name">{eventMenu.name}</p>
              {eventMenu.categories.map((cat) => (
                <div key={cat.name} className="menu-category">
                  <h4 className="menu-category-title">{cat.name}</h4>
                  {cat.items.map((item) => (
                    <div key={item.id} className="menu-item-row">
                      <span>{item.name}</span>
                      <span className="text-muted">${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">No menu assigned yet.</p>
          )}
        </section>

        <section className="card">
          <h3 className="card-header">Tasks</h3>
          {eventTasks.length > 0 ? (
            <ul className="todo-list">
              {eventTasks.map((task) => (
                <li key={task.id} className="todo-item">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    readOnly
                    className="todo-checkbox"
                  />
                  <div>
                    <strong>{task.label}</strong>
                    <p className="text-muted">{task.description}</p>
                    <p className="text-muted text-small">Assigned to: {task.assignedTo}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No tasks for this event.</p>
          )}
        </section>
      </div>
    </div>
  );
}
