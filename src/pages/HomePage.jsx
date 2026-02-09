import { Link } from "react-router-dom";
import { CalendarDays, DollarSign, Trash2, TrendingDown, Clock, Leaf } from "lucide-react";
import { events, tasks, wasteHistory, computeKpis } from "../data/sampleData";

export default function HomePage() {
  const kpis = computeKpis();

  const upcomingEvents = [...events]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  const recentTasks = tasks.filter((t) => !t.completed).slice(0, 4);

  const currentMonth = wasteHistory[wasteHistory.length - 1];

  return (
    <div className="page">
      <h2 className="page-title">Dashboard</h2>

      {/* KPI Cards */}
      <div className="kpi-row">
        <div className="kpi-card">
          <DollarSign size={24} className="kpi-icon kpi-icon--green" />
          <div>
            <p className="kpi-value">${kpis.totalRevenue.toLocaleString()}</p>
            <p className="kpi-label">Total Revenue</p>
          </div>
        </div>
        <div className="kpi-card">
          <Trash2 size={24} className="kpi-icon kpi-icon--red" />
          <div>
            <p className="kpi-value">{currentMonth?.wastePercent || 0}%</p>
            <p className="kpi-label">Current Waste Rate</p>
          </div>
        </div>
        <div className="kpi-card">
          <TrendingDown size={24} className="kpi-icon kpi-icon--blue" />
          <div>
            <p className="kpi-value">-{kpis.wasteReduction}%</p>
            <p className="kpi-label">Waste Reduction (3 mo.)</p>
          </div>
        </div>
        <div className="kpi-card">
          <CalendarDays size={24} className="kpi-icon kpi-icon--purple" />
          <div>
            <p className="kpi-value">{kpis.totalEvents} events</p>
            <p className="kpi-label">{kpis.confirmedEvents} confirmed, {kpis.pendingEvents} pending</p>
          </div>
        </div>
      </div>

      {/* Waste cost alert */}
      {kpis.totalWasteCost > 0 && (
        <div className="waste-alert-banner">
          <Leaf size={18} />
          <span>
            <strong>${kpis.totalWasteCost.toLocaleString()}</strong> lost to food waste across reported events.
            Waste rate has dropped from {wasteHistory[wasteHistory.length - 4]?.wastePercent || 0}% to {currentMonth?.wastePercent || 0}% over the past 3 months.
          </span>
          <Link to="/analytics" className="waste-alert-link">View Analysis →</Link>
        </div>
      )}

      <div className="home-grid">
        {/* Scheduled Events */}
        <section className="card">
          <h3 className="card-header">Scheduled Events</h3>
          <ul className="schedule-list">
            {upcomingEvents.map((evt) => (
              <li key={evt.id} className="schedule-item">
                <Link to={`/events/${evt.id}`} className="schedule-link">
                  <div>
                    <strong>{evt.name}</strong>
                    <p className="text-muted">
                      <Clock size={14} /> {evt.date} at {evt.time}
                    </p>
                  </div>
                  <span className={`badge badge--${evt.status.toLowerCase()}`}>
                    {evt.status}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/events" className="card-footer-link">View all events →</Link>
        </section>

        {/* To Do List */}
        <section className="card">
          <h3 className="card-header">To Do</h3>
          <ul className="todo-list">
            {recentTasks.map((task) => (
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
                </div>
              </li>
            ))}
          </ul>
          <Link to="/tasks" className="card-footer-link">View all tasks →</Link>
        </section>

        {/* Waste Mini Trend */}
        <section className="card" style={{ gridColumn: "1 / -1" }}>
          <h3 className="card-header">Waste Rate Trend</h3>
          <div className="waste-trend-chart waste-trend-chart--compact">
            {wasteHistory.map((m, i) => (
              <div key={i} className="waste-trend-bar-group">
                <div className="waste-trend-bar-container">
                  <div
                    className="waste-trend-bar"
                    style={{ height: `${(m.wastePercent / 25) * 100}%` }}
                  >
                    <span className="waste-trend-bar-label">{m.wastePercent}%</span>
                  </div>
                </div>
                <span className="waste-trend-month">{m.month.split(" ")[0]}</span>
              </div>
            ))}
          </div>
          <Link to="/analytics" className="card-footer-link">View full analytics →</Link>
        </section>
      </div>
    </div>
  );
}
