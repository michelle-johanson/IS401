import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Trash2, Leaf, Heart, AlertTriangle } from "lucide-react";
import { events, menus, wasteReports } from "../data/sampleData";

export default function WasteReportPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const event = events.find((e) => e.id === Number(eventId));
  const existingReport = wasteReports.find((r) => r.eventId === Number(eventId));

  const menu = event ? menus.find((m) => m.eventId === event.id) : null;

  const [actualAttendees, setActualAttendees] = useState(
    existingReport?.actualAttendees || event?.guests || 0
  );
  const [notes, setNotes] = useState(existingReport?.notes || "");
  const [categories, setCategories] = useState(() => {
    if (existingReport) return existingReport.categories;
    if (!menu) return [];
    return menu.categories.map((cat) => ({
      name: cat.name,
      items: cat.items.map((item) => ({
        name: item.name,
        prepared: Math.ceil((item.servingsPerGuest || 1) * (event?.guests || 0)),
        consumed: 0,
        wasted: 0,
        unit: "servings",
        costPerUnit: item.costPerServing || item.price * 0.4,
        wasteDisposal: "composted",
      })),
    }));
  });

  if (!event) {
    return (
      <div className="page">
        <h2 className="page-title">Event not found</h2>
        <Link to="/events" className="btn btn--secondary">Back to Events</Link>
      </div>
    );
  }

  const updateItem = (catIdx, itemIdx, field, value) => {
    const updated = [...categories];
    const items = [...updated[catIdx].items];
    items[itemIdx] = { ...items[itemIdx], [field]: value };

    // Auto-calculate wasted when prepared or consumed changes
    if (field === "prepared" || field === "consumed") {
      const prepared = field === "prepared" ? Number(value) : items[itemIdx].prepared;
      const consumed = field === "consumed" ? Number(value) : items[itemIdx].consumed;
      items[itemIdx].wasted = Math.max(0, prepared - consumed);
    }

    updated[catIdx] = { ...updated[catIdx], items };
    setCategories(updated);
  };

  // Compute totals
  let totalPrepared = 0;
  let totalConsumed = 0;
  let totalWasted = 0;
  let totalWasteCost = 0;
  let disposalBreakdown = { donated: 0, composted: 0, trash: 0 };

  for (const cat of categories) {
    for (const item of cat.items) {
      totalPrepared += item.prepared;
      totalConsumed += item.consumed;
      totalWasted += item.wasted;
      const itemWasteCost = item.wasted * item.costPerUnit;
      totalWasteCost += itemWasteCost;
      if (item.wasteDisposal === "donated") disposalBreakdown.donated += itemWasteCost;
      else if (item.wasteDisposal === "composted") disposalBreakdown.composted += itemWasteCost;
      else disposalBreakdown.trash += itemWasteCost;
    }
  }

  const wastePercent = totalPrepared > 0 ? ((totalWasted / totalPrepared) * 100) : 0;

  const handleSave = () => {
    alert(existingReport
      ? "Waste report updated! (Demo - no backend persistence)"
      : "Waste report saved! (Demo - no backend persistence)"
    );
    navigate(`/events/${event.id}`);
  };

  return (
    <div className="page">
      <Link to={`/events/${event.id}`} className="back-link">
        <ArrowLeft size={18} /> Back to {event.name}
      </Link>
      <h2 className="page-title">
        {existingReport ? "Waste Report" : "Log Post-Event Waste"} — {event.name}
      </h2>

      {/* Summary Cards */}
      <div className="waste-summary-row">
        <div className="waste-summary-card">
          <Trash2 size={20} className="waste-summary-icon waste-summary-icon--red" />
          <div>
            <p className="waste-summary-value">{wastePercent.toFixed(1)}%</p>
            <p className="waste-summary-label">Waste Rate</p>
          </div>
        </div>
        <div className="waste-summary-card">
          <AlertTriangle size={20} className="waste-summary-icon waste-summary-icon--yellow" />
          <div>
            <p className="waste-summary-value">${totalWasteCost.toFixed(0)}</p>
            <p className="waste-summary-label">Cost of Waste</p>
          </div>
        </div>
        <div className="waste-summary-card">
          <Heart size={20} className="waste-summary-icon waste-summary-icon--pink" />
          <div>
            <p className="waste-summary-value">${disposalBreakdown.donated.toFixed(0)}</p>
            <p className="waste-summary-label">Donated</p>
          </div>
        </div>
        <div className="waste-summary-card">
          <Leaf size={20} className="waste-summary-icon waste-summary-icon--green" />
          <div>
            <p className="waste-summary-value">${disposalBreakdown.composted.toFixed(0)}</p>
            <p className="waste-summary-label">Composted</p>
          </div>
        </div>
      </div>

      <div className="form-card">
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Expected Guests</label>
            <input type="number" value={event.guests} readOnly className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Actual Attendees</label>
            <input
              type="number"
              value={actualAttendees}
              onChange={(e) => setActualAttendees(Number(e.target.value))}
              className="form-input"
              min="0"
            />
          </div>
        </div>

        {categories.map((cat, catIdx) => (
          <div key={catIdx} className="waste-category-section">
            <h3 className="waste-category-title">{cat.name}</h3>
            <div className="waste-table">
              <div className="waste-table-header">
                <span>Item</span>
                <span>Prepared</span>
                <span>Consumed</span>
                <span>Wasted</span>
                <span>Cost/Unit</span>
                <span>Waste Cost</span>
                <span>Disposal</span>
              </div>
              {cat.items.map((item, itemIdx) => (
                <div key={itemIdx} className="waste-table-row">
                  <span className="waste-item-name">{item.name}</span>
                  <input
                    type="number"
                    value={item.prepared}
                    onChange={(e) => updateItem(catIdx, itemIdx, "prepared", Number(e.target.value))}
                    className="form-input form-input--small"
                    min="0"
                  />
                  <input
                    type="number"
                    value={item.consumed}
                    onChange={(e) => updateItem(catIdx, itemIdx, "consumed", Number(e.target.value))}
                    className="form-input form-input--small"
                    min="0"
                  />
                  <span className={`waste-number ${item.wasted > 0 ? "waste-number--alert" : ""}`}>
                    {item.wasted}
                  </span>
                  <span className="text-muted">${item.costPerUnit.toFixed(2)}</span>
                  <span className={`waste-cost ${(item.wasted * item.costPerUnit) > 50 ? "waste-cost--high" : ""}`}>
                    ${(item.wasted * item.costPerUnit).toFixed(2)}
                  </span>
                  <select
                    value={item.wasteDisposal}
                    onChange={(e) => updateItem(catIdx, itemIdx, "wasteDisposal", e.target.value)}
                    className="form-input form-input--small"
                  >
                    <option value="donated">Donated</option>
                    <option value="composted">Composted</option>
                    <option value="trash">Trash</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="form-group form-group--full" style={{ marginTop: 20 }}>
          <label className="form-label">Notes & Recommendations</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="form-textarea"
            rows={4}
            placeholder="What went well? What could be improved? Recommendations for future events..."
          />
        </div>

        <div className="form-actions">
          <button onClick={handleSave} className="btn btn--primary">
            <Save size={18} /> {existingReport ? "Update Report" : "Save Report"}
          </button>
          <Link to={`/events/${event.id}`} className="btn btn--secondary">Cancel</Link>
        </div>
      </div>
    </div>
  );
}
