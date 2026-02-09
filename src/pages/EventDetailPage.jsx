import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Users, DollarSign, FileText, UtensilsCrossed, Trash2, ClipboardList } from "lucide-react";
import { events, tasks, menus, wasteReports } from "../data/sampleData";

export default function EventDetailPage() {
  const { id } = useParams();
  const event = events.find((e) => e.id === Number(id));

  if (!event) {
    return (
      <div className="page">
        <h2 className="page-title">Event not found</h2>
        <Link to="/events" className="btn btn--secondary">Back to Events</Link>
      </div>
    );
  }

  const eventTasks = tasks.filter((t) => t.eventId === event.id);
  const eventMenu = menus.find((m) => m.eventId === event.id);
  const wasteReport = wasteReports.find((r) => r.eventId === event.id);

  // Compute waste summary if report exists
  let wasteSummary = null;
  if (wasteReport) {
    let totalPrepared = 0;
    let totalWasted = 0;
    let totalWasteCost = 0;
    let totalFoodCost = 0;
    for (const cat of wasteReport.categories) {
      for (const item of cat.items) {
        totalPrepared += item.prepared;
        totalWasted += item.wasted;
        totalWasteCost += item.wasted * item.costPerUnit;
        totalFoodCost += item.prepared * item.costPerUnit;
      }
    }
    wasteSummary = {
      wastePercent: totalPrepared > 0 ? ((totalWasted / totalPrepared) * 100) : 0,
      totalWasteCost,
      totalFoodCost,
      actualAttendees: wasteReport.actualAttendees,
      notes: wasteReport.notes,
    };
  }

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
        <div className="detail-header-actions">
          <Link to={`/events/${event.id}/waste`} className="btn btn--secondary">
            <Trash2 size={16} /> {wasteReport ? "View Waste Report" : "Log Waste"}
          </Link>
          <Link to={`/events/${event.id}/edit`} className="btn btn--secondary">
            Edit Event
          </Link>
        </div>
      </div>

      <div className="detail-hero">
        <img src={event.image} alt={event.name} className="detail-hero-image" />
      </div>

      {/* Waste Summary Banner */}
      {wasteSummary && (
        <div className={`waste-report-banner ${wasteSummary.wastePercent > 15 ? "waste-report-banner--warning" : "waste-report-banner--good"}`}>
          <div className="waste-report-banner-stats">
            <div className="waste-report-banner-stat">
              <span className="waste-report-banner-value">{wasteSummary.wastePercent.toFixed(1)}%</span>
              <span className="waste-report-banner-label">Waste Rate</span>
            </div>
            <div className="waste-report-banner-stat">
              <span className="waste-report-banner-value">${wasteSummary.totalWasteCost.toFixed(0)}</span>
              <span className="waste-report-banner-label">Waste Cost</span>
            </div>
            <div className="waste-report-banner-stat">
              <span className="waste-report-banner-value">{wasteSummary.actualAttendees}/{event.guests}</span>
              <span className="waste-report-banner-label">Actual / Expected</span>
            </div>
            <div className="waste-report-banner-stat">
              <span className="waste-report-banner-value">${wasteSummary.totalFoodCost.toFixed(0)}</span>
              <span className="waste-report-banner-label">Total Food Cost</span>
            </div>
          </div>
          {wasteSummary.notes && (
            <p className="waste-report-banner-notes">
              <ClipboardList size={14} /> {wasteSummary.notes}
            </p>
          )}
        </div>
      )}

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
