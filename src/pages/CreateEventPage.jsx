import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

export default function CreateEventPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    client: "",
    venue: "",
    date: "",
    time: "",
    guests: "",
    budget: "",
    status: "Pending",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would save to a backend
    alert("Event created successfully! (Demo - no backend persistence)");
    navigate("/events");
  };

  return (
    <div className="page">
      <Link to="/events" className="back-link">
        <ArrowLeft size={18} /> Back to Events
      </Link>
      <h2 className="page-title">Create Event</h2>

      <form onSubmit={handleSubmit} className="form-card">
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Event Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g. Johnson Wedding Reception"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Client Name</label>
            <input
              type="text"
              name="client"
              value={form.client}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g. Sarah & Mike Johnson"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Venue</label>
            <input
              type="text"
              name="venue"
              value={form.venue}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g. Grand Ballroom, Hilton Downtown"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="form-input"
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Time</label>
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Number of Guests</label>
            <input
              type="number"
              name="guests"
              value={form.guests}
              onChange={handleChange}
              className="form-input"
              placeholder="150"
              min="1"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Budget ($)</label>
            <input
              type="number"
              name="budget"
              value={form.budget}
              onChange={handleChange}
              className="form-input"
              placeholder="12000"
              min="0"
              required
            />
          </div>
          <div className="form-group form-group--full">
            <label className="form-label">Notes</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              className="form-textarea"
              rows={4}
              placeholder="Additional details about the event..."
            />
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn--primary">
            <Save size={18} /> Create Event
          </button>
          <Link to="/events" className="btn btn--secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
