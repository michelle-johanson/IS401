import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Save, UploadCloud, X } from "lucide-react";

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
  image: "",
};

function toDateInputValue(raw) {
  if (!raw) return "";
  if (typeof raw === "string" && /^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  const d = new Date(raw);
  if (isNaN(d)) return "";
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
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef(null);

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
            time: event.time ? String(event.time).slice(0, 5) : "",
            guests: event.guests ?? "",
            budget: event.budget ?? "",
            status: event.status ?? "Pending",
            notes: event.notes ?? "",
            image: event.image ?? "",
          });
        }
        setLoading(false);
      });
  }, [id, isEditing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadError("");
    setUploading(true);

    const data = new FormData();
    data.append("image", file);

    try {
      const res = await fetch(`${API}/upload`, {
        method: "POST",
        body: data,
      });
      if (!res.ok) throw new Error("Upload failed");
      const { url } = await res.json();
      setForm((prev) => ({ ...prev, image: url }));
    } catch {
      setUploadError("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setForm((prev) => ({ ...prev, image: "" }));
    setUploadError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
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

          {/* ── Image Upload ── */}
          <div className="form-group form-group--full">
            <label className="form-label">Event Image</label>

            {form.image ? (
              <div className="image-preview-wrapper">
                <img src={form.image} alt="Event preview" className="image-preview" />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="image-preview-remove"
                  title="Remove image"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label className={`image-upload-area ${uploading ? "image-upload-area--loading" : ""}`}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="image-upload-input"
                  disabled={uploading}
                />
                <UploadCloud size={28} className="image-upload-icon" />
                <span className="image-upload-label">
                  {uploading ? "Uploading…" : "Click or drag an image here"}
                </span>
                <span className="image-upload-hint">PNG, JPG, WEBP up to 5 MB</span>
              </label>
            )}

            {uploadError && (
              <p className="image-upload-error">{uploadError}</p>
            )}
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
          <button type="submit" className="btn btn--primary" disabled={uploading}>
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
