import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

const API = "http://localhost:3001/api";

const EMPTY_FORM = {
  name: "",
  client: "",
  venue: "",
  date: "",
  time: "",
  guests: "",
  budget: "",
  status: "Pending",
  notes: "",
};

// Safely convert a date value to YYYY-MM-DD without timezone shifting.
// node-postgres returns DATE columns as JS Date objects set to UTC midnight,
// so calling .toISOString() and slicing is actually safe here — but if the
// value is already a "YYYY-MM-DD" string (e.g. from a prior fetch mapping),
// we return it as-is to avoid any double-conversion.
function toDateInputValue(raw) {
  if (!raw) return "";
  if (typeof raw === "string" && /^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  const d = new Date(raw);
  if (isNaN(d)) return "";
  // Use UTC getters — the DB driver sets the date at UTC midnight
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function CreateEventPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(isEditing);

  useEffect(() => {
    if (!isEditing) return;

    fetch(`${API}/events`)
      .then((r) => r.json())
      .then((events) => {
        const event = events.find((e) => e.id === Number(id));
        if (event) {
          setForm({
            name: event.name ?? "",
            client: event.client ?? "",
            venue: event.venue ?? "",
            date: toDateInputValue(event.date),
            // time from the API is "HH:MM:SS" — trim to "HH:MM" for the input
            time: event.time ? String(event.time).slice(0, 5) : "",
            guests: event.guests ?? "",
            budget: event.budget ?? "",
            status: event.status ?? "Pending",
            notes: event.notes ?? "",
          });
        }
        setLoading(false);
      });
  }, [id, isEditing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isEditing ? `${API}/events/${id}` : `${API}/events`;
    const method = isEditing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      navigate(isEditing ? `/events/${id}` : "/events");
    } else {
      alert(`Failed to ${isEditing ? "update" : "create"} event.`);
    }
  };

  if (loading) return <div className="page"><p>Loading...</p></div>;

  return (
    <div className="page">
      <Link to={isEditing ? `/events/${id}` : "/events"} className="back-link">
        <ArrowLeft size={18} /> {isEditing ? "Back to Event" : "Back to Events"}
      </Link>
      <h2 className="page-title">{isEditing ? "Edit Event" : "Create Event"}</h2>

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
            <Save size={18} /> {isEditing ? "Save Changes" : "Create Event"}
          </button>
          <Link
            to={isEditing ? `/events/${id}` : "/events"}
            className="btn btn--secondary"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
