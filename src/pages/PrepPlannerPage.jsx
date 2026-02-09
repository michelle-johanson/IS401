import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, AlertTriangle, TrendingDown, Users } from "lucide-react";
import { events, menus, wasteReports } from "../data/sampleData";

export default function PrepPlannerPage() {
  const upcomingEvents = events.filter((e) => e.menuId !== null);
  const [selectedEventId, setSelectedEventId] = useState(
    upcomingEvents.length > 0 ? upcomingEvents[0].id : null
  );
  const [bufferPercent, setBufferPercent] = useState(10);

  const event = events.find((e) => e.id === selectedEventId);
  const menu = event ? menus.find((m) => m.eventId === event.id) : null;

  // Look up historical waste data for similar items
  const getHistoricalWasteRate = (itemName) => {
    for (const report of wasteReports) {
      for (const cat of report.categories) {
        for (const item of cat.items) {
          if (item.name === itemName && item.prepared > 0) {
            return (item.wasted / item.prepared) * 100;
          }
        }
      }
    }
    return null;
  };

  // Build prep plan
  const prepPlan = menu
    ? menu.categories.map((cat) => ({
        name: cat.name,
        items: cat.items.map((item) => {
          const baseServings = Math.ceil(
            (item.servingsPerGuest || 1) * (event?.guests || 0)
          );
          const buffer = Math.ceil(baseServings * (bufferPercent / 100));
          const recommended = baseServings + buffer;
          const totalCost = recommended * (item.costPerServing || 0);
          const historicalWaste = getHistoricalWasteRate(item.name);

          // If historical waste is high, suggest reducing
          let suggestion = null;
          if (historicalWaste !== null && historicalWaste > 15) {
            const reducedServings = Math.ceil(baseServings * 0.85) + buffer;
            suggestion = {
              message: `High waste history (${historicalWaste.toFixed(0)}%). Consider reducing to ${reducedServings} servings.`,
              reducedServings,
              savings: (recommended - reducedServings) * (item.costPerServing || 0),
            };
          }

          return {
            name: item.name,
            servingsPerGuest: item.servingsPerGuest || 1,
            baseServings,
            buffer,
            recommended,
            costPerServing: item.costPerServing || 0,
            totalCost,
            historicalWaste,
            suggestion,
          };
        }),
      }))
    : [];

  // Totals
  let totalServings = 0;
  let totalCost = 0;
  let totalSavings = 0;
  for (const cat of prepPlan) {
    for (const item of cat.items) {
      totalServings += item.recommended;
      totalCost += item.totalCost;
      if (item.suggestion) totalSavings += item.suggestion.savings;
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <h2 className="page-title">Prep Planner</h2>
      </div>

      <div className="prep-controls">
        <div className="form-group">
          <label className="form-label">Select Event</label>
          <select
            value={selectedEventId || ""}
            onChange={(e) => setSelectedEventId(Number(e.target.value))}
            className="form-input"
          >
            {upcomingEvents.map((evt) => (
              <option key={evt.id} value={evt.id}>
                {evt.name} — {evt.date} ({evt.guests} guests)
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Buffer %</label>
          <input
            type="number"
            value={bufferPercent}
            onChange={(e) => setBufferPercent(Number(e.target.value))}
            className="form-input form-input--small"
            min="0"
            max="50"
          />
        </div>
      </div>

      {event && (
        <div className="waste-summary-row" style={{ marginBottom: 20 }}>
          <div className="waste-summary-card">
            <Users size={20} className="waste-summary-icon waste-summary-icon--blue" />
            <div>
              <p className="waste-summary-value">{event.guests}</p>
              <p className="waste-summary-label">Expected Guests</p>
            </div>
          </div>
          <div className="waste-summary-card">
            <ShoppingCart size={20} className="waste-summary-icon waste-summary-icon--green" />
            <div>
              <p className="waste-summary-value">{totalServings.toLocaleString()}</p>
              <p className="waste-summary-label">Total Servings</p>
            </div>
          </div>
          <div className="waste-summary-card">
            <TrendingDown size={20} className="waste-summary-icon waste-summary-icon--purple" />
            <div>
              <p className="waste-summary-value">${totalCost.toFixed(0)}</p>
              <p className="waste-summary-label">Est. Food Cost</p>
            </div>
          </div>
          {totalSavings > 0 && (
            <div className="waste-summary-card">
              <AlertTriangle size={20} className="waste-summary-icon waste-summary-icon--yellow" />
              <div>
                <p className="waste-summary-value">${totalSavings.toFixed(0)}</p>
                <p className="waste-summary-label">Potential Savings</p>
              </div>
            </div>
          )}
        </div>
      )}

      {!menu ? (
        <div className="card">
          <p className="text-muted">No menu assigned to this event. <Link to={`/menu/new?eventId=${event?.id}`}>Create a menu</Link> first.</p>
        </div>
      ) : (
        prepPlan.map((cat, catIdx) => (
          <section key={catIdx} className="card">
            <h3 className="card-header">{cat.name}</h3>
            <div className="prep-table">
              <div className="prep-table-header">
                <span>Item</span>
                <span>Per Guest</span>
                <span>Base Qty</span>
                <span>Buffer (+{bufferPercent}%)</span>
                <span>Recommended</span>
                <span>Unit Cost</span>
                <span>Total Cost</span>
                <span>Hist. Waste</span>
              </div>
              {cat.items.map((item, itemIdx) => (
                <div key={itemIdx}>
                  <div className="prep-table-row">
                    <span className="waste-item-name">{item.name}</span>
                    <span>{item.servingsPerGuest}</span>
                    <span>{item.baseServings}</span>
                    <span>+{item.buffer}</span>
                    <strong>{item.recommended}</strong>
                    <span>${item.costPerServing.toFixed(2)}</span>
                    <strong>${item.totalCost.toFixed(2)}</strong>
                    <span className={item.historicalWaste !== null && item.historicalWaste > 15 ? "waste-number--alert" : "text-muted"}>
                      {item.historicalWaste !== null ? `${item.historicalWaste.toFixed(0)}%` : "—"}
                    </span>
                  </div>
                  {item.suggestion && (
                    <div className="prep-suggestion">
                      <AlertTriangle size={14} />
                      <span>{item.suggestion.message} Save ${item.suggestion.savings.toFixed(2)}.</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
