import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, DollarSign, Trash2, CheckCircle, Clock } from "lucide-react";

const API = "http://localhost:3001/api";

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [kpis, setKpis] = useState(null);

useEffect(() => {
  fetch(`${API}/events`)
    .then((r) => r.ok ? r.json() : [])
    .then((data) => setEvents(Array.isArray(data) ? data : []));

  fetch(`${API}/tasks`)
    .then((r) => r.ok ? r.json() : [])
    .then((data) => setTasks(Array.isArray(data) ? data : []));

  fetch(`${API}/kpis`)
    .then((r) => r.ok ? r.json() : null)
    .then((data) => setKpis(data));
}, []);


  if (!kpis) return <div className="page"><p>Loading...</p></div>;

  const upcomingEvents = [...events]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  const recentTasks = tasks.filter((t) => !t.completed).slice(0, 4);

  return (
    <div className="page">
      <h2 className="page-title">Dashboard</h2>

      {/* KPI Cards */}
      <div className="kpi-row">
        <div className="kpi-card">
          <DollarSign size={24} className="kpi-icon kpi-icon--green" />
          <div>
            <p className="kpi-value">${kpis.mrr.toLocaleString()} MRR</p>
            <p className="kpi-label">Profit</p>
          </div>
        </div>
        <div className="kpi-card">
          <Trash2 size={24} className="kpi-icon kpi-icon--red" />
          <div>
            <p className="kpi-value">-{kpis.wasteReduction}%</p>
            <p className="kpi-label">Food Waste Reduction</p>
          </div>
        </div>
        <div className="kpi-card">
          <CheckCircle size={24} className="kpi-icon kpi-icon--blue" />
          <div>
            <p className="kpi-value">{kpis.tasksPerWeek} tasks/week</p>
            <p className="kpi-label">Productivity</p>
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
      </div>
    </div>
  );
}
