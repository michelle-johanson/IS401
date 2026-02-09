import { useState } from "react";
import { DollarSign, Trash2, CheckCircle, Target, TrendingDown, Leaf, Heart, AlertTriangle } from "lucide-react";
import { events, wasteReports, wasteHistory, computeKpis } from "../data/sampleData";

export default function AnalyticsPage() {
  const kpis = computeKpis();
  const totalRevenue = events.reduce((sum, e) => sum + e.budget, 0);
  const avgBudget = totalRevenue / events.length;

  const [activeTab, setActiveTab] = useState("overview");

  // Waste by category across all reports
  const categoryWaste = {};
  for (const report of wasteReports) {
    for (const cat of report.categories) {
      if (!categoryWaste[cat.name]) {
        categoryWaste[cat.name] = { prepared: 0, wasted: 0, cost: 0 };
      }
      for (const item of cat.items) {
        categoryWaste[cat.name].prepared += item.prepared;
        categoryWaste[cat.name].wasted += item.wasted;
        categoryWaste[cat.name].cost += item.wasted * item.costPerUnit;
      }
    }
  }

  // Top wasted items across all reports
  const itemWaste = [];
  for (const report of wasteReports) {
    for (const cat of report.categories) {
      for (const item of cat.items) {
        const wasteRate = item.prepared > 0 ? (item.wasted / item.prepared) * 100 : 0;
        itemWaste.push({
          name: item.name,
          event: report.eventName,
          prepared: item.prepared,
          wasted: item.wasted,
          wasteRate,
          cost: item.wasted * item.costPerUnit,
          disposal: item.wasteDisposal,
        });
      }
    }
  }
  itemWaste.sort((a, b) => b.cost - a.cost);

  // Disposal summary
  let totalDonated = 0;
  let totalComposted = 0;
  let totalTrashed = 0;
  for (const item of itemWaste) {
    if (item.disposal === "donated") totalDonated += item.cost;
    else if (item.disposal === "composted") totalComposted += item.cost;
    else totalTrashed += item.cost;
  }
  const totalDisposal = totalDonated + totalComposted + totalTrashed;

  return (
    <div className="page">
      <h2 className="page-title">Analytics</h2>

      {/* Tab navigation */}
      <div className="tab-bar">
        <button
          className={`tab-btn ${activeTab === "overview" ? "tab-btn--active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`tab-btn ${activeTab === "waste" ? "tab-btn--active" : ""}`}
          onClick={() => setActiveTab("waste")}
        >
          Waste Analysis
        </button>
        <button
          className={`tab-btn ${activeTab === "profitability" ? "tab-btn--active" : ""}`}
          onClick={() => setActiveTab("profitability")}
        >
          Profitability
        </button>
      </div>

      {activeTab === "overview" && (
        <>
          <div className="analytics-grid">
            <div className="analytics-card analytics-card--large">
              <div className="analytics-icon-wrapper analytics-icon--green">
                <DollarSign size={32} />
              </div>
              <div className="analytics-card-content">
                <p className="analytics-value">${kpis.totalRevenue.toLocaleString()}</p>
                <p className="analytics-label">Total Revenue</p>
              </div>
            </div>
            <div className="analytics-card analytics-card--large">
              <div className="analytics-icon-wrapper analytics-icon--red">
                <Trash2 size={32} />
              </div>
              <div className="analytics-card-content">
                <p className="analytics-value">{kpis.wastePercent}%</p>
                <p className="analytics-label">Avg Waste Rate</p>
              </div>
            </div>
            <div className="analytics-card analytics-card--large">
              <div className="analytics-icon-wrapper analytics-icon--blue">
                <TrendingDown size={32} />
              </div>
              <div className="analytics-card-content">
                <p className="analytics-value">-{kpis.wasteReduction}%</p>
                <p className="analytics-label">Waste Reduction (3 mo.)</p>
              </div>
            </div>
            <div className="analytics-card analytics-card--large">
              <div className="analytics-icon-wrapper analytics-icon--purple">
                <Target size={32} />
              </div>
              <div className="analytics-card-content">
                <p className="analytics-value">{kpis.totalEvents}</p>
                <p className="analytics-label">Total Events</p>
              </div>
            </div>
          </div>

          <div className="analytics-details-grid">
            <section className="card">
              <h3 className="card-header">Revenue Breakdown</h3>
              <div className="analytics-stat-list">
                <div className="analytics-stat-row">
                  <span>Total Revenue</span>
                  <strong>${totalRevenue.toLocaleString()}</strong>
                </div>
                <div className="analytics-stat-row">
                  <span>Average per Event</span>
                  <strong>${avgBudget.toLocaleString()}</strong>
                </div>
                <div className="analytics-stat-row">
                  <span>Food Cost (reported events)</span>
                  <strong>${kpis.totalFoodCost.toLocaleString()}</strong>
                </div>
              </div>
            </section>
            <section className="card">
              <h3 className="card-header">Event Status</h3>
              <div className="analytics-stat-list">
                <div className="analytics-stat-row">
                  <span className="status-dot status-dot--green">Confirmed</span>
                  <strong>{kpis.confirmedEvents}</strong>
                </div>
                <div className="analytics-stat-row">
                  <span className="status-dot status-dot--yellow">Pending</span>
                  <strong>{kpis.pendingEvents}</strong>
                </div>
                <div className="analytics-stat-row">
                  <span>Total</span>
                  <strong>{kpis.totalEvents}</strong>
                </div>
              </div>
            </section>
            <section className="card">
              <h3 className="card-header">Tasks</h3>
              <div className="analytics-stat-list">
                <div className="analytics-stat-row">
                  <span>Completed</span>
                  <strong>{kpis.completedTasks}</strong>
                </div>
                <div className="analytics-stat-row">
                  <span>Remaining</span>
                  <strong>{kpis.totalTasks - kpis.completedTasks}</strong>
                </div>
                <div className="analytics-stat-row">
                  <span>Completion Rate</span>
                  <strong>{Math.round((kpis.completedTasks / kpis.totalTasks) * 100)}%</strong>
                </div>
              </div>
            </section>
          </div>
        </>
      )}

      {activeTab === "waste" && (
        <>
          {/* Waste trend over time */}
          <section className="card">
            <h3 className="card-header">Waste Trend (6 Months)</h3>
            <div className="waste-trend-chart">
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
          </section>

          <div className="analytics-details-grid">
            {/* Waste by category */}
            <section className="card">
              <h3 className="card-header">Waste by Category</h3>
              <div className="analytics-stat-list">
                {Object.entries(categoryWaste).map(([name, data]) => (
                  <div key={name} className="analytics-stat-row">
                    <div>
                      <span>{name}</span>
                      <p className="text-muted text-small">
                        {data.wasted}/{data.prepared} servings ({(data.prepared > 0 ? (data.wasted / data.prepared) * 100 : 0).toFixed(1)}%)
                      </p>
                    </div>
                    <strong className="waste-cost--high">${data.cost.toFixed(0)}</strong>
                  </div>
                ))}
              </div>
            </section>

            {/* Disposal breakdown */}
            <section className="card">
              <h3 className="card-header">Waste Disposal</h3>
              <div className="disposal-breakdown">
                <div className="disposal-item">
                  <div className="disposal-bar-track">
                    <div
                      className="disposal-bar disposal-bar--donated"
                      style={{ width: totalDisposal > 0 ? `${(totalDonated / totalDisposal) * 100}%` : 0 }}
                    />
                  </div>
                  <div className="disposal-label-row">
                    <span><Heart size={14} className="inline-icon" /> Donated</span>
                    <strong>${totalDonated.toFixed(0)}</strong>
                  </div>
                </div>
                <div className="disposal-item">
                  <div className="disposal-bar-track">
                    <div
                      className="disposal-bar disposal-bar--composted"
                      style={{ width: totalDisposal > 0 ? `${(totalComposted / totalDisposal) * 100}%` : 0 }}
                    />
                  </div>
                  <div className="disposal-label-row">
                    <span><Leaf size={14} className="inline-icon" /> Composted</span>
                    <strong>${totalComposted.toFixed(0)}</strong>
                  </div>
                </div>
                <div className="disposal-item">
                  <div className="disposal-bar-track">
                    <div
                      className="disposal-bar disposal-bar--trash"
                      style={{ width: totalDisposal > 0 ? `${(totalTrashed / totalDisposal) * 100}%` : 0 }}
                    />
                  </div>
                  <div className="disposal-label-row">
                    <span><Trash2 size={14} className="inline-icon" /> Trashed</span>
                    <strong>${totalTrashed.toFixed(0)}</strong>
                  </div>
                </div>
              </div>
            </section>

            {/* Actionable recommendations */}
            <section className="card">
              <h3 className="card-header">Recommendations</h3>
              <div className="recommendations-list">
                {itemWaste
                  .filter((item) => item.wasteRate > 15)
                  .slice(0, 4)
                  .map((item, i) => (
                    <div key={i} className="recommendation-item">
                      <AlertTriangle size={16} className="recommendation-icon" />
                      <div>
                        <p><strong>{item.name}</strong> — {item.wasteRate.toFixed(0)}% waste rate</p>
                        <p className="text-muted text-small">
                          {item.event}: {item.wasted} of {item.prepared} servings wasted (${item.cost.toFixed(2)}).
                          Consider reducing portions by {Math.min(Math.round(item.wasteRate * 0.7), 25)}%.
                        </p>
                      </div>
                    </div>
                  ))}
                {itemWaste.filter((item) => item.wasteRate > 15).length === 0 && (
                  <p className="text-muted">No high-waste items detected. Great job!</p>
                )}
              </div>
            </section>
          </div>

          {/* Top wasted items table */}
          <section className="card">
            <h3 className="card-header">Top Wasted Items (by cost)</h3>
            <div className="prep-table">
              <div className="prep-table-header">
                <span>Item</span>
                <span>Event</span>
                <span>Prepared</span>
                <span>Wasted</span>
                <span>Waste %</span>
                <span>Cost Lost</span>
                <span>Disposal</span>
              </div>
              {itemWaste.slice(0, 8).map((item, i) => (
                <div key={i} className="prep-table-row">
                  <span className="waste-item-name">{item.name}</span>
                  <span className="text-muted text-small">{item.event}</span>
                  <span>{item.prepared}</span>
                  <span className={item.wasteRate > 15 ? "waste-number--alert" : ""}>{item.wasted}</span>
                  <span className={item.wasteRate > 15 ? "waste-number--alert" : ""}>{item.wasteRate.toFixed(1)}%</span>
                  <strong className={item.cost > 50 ? "waste-cost--high" : ""}>${item.cost.toFixed(2)}</strong>
                  <span className={`disposal-badge disposal-badge--${item.disposal}`}>{item.disposal}</span>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {activeTab === "profitability" && (
        <>
          <div className="analytics-grid">
            <div className="analytics-card analytics-card--large">
              <div className="analytics-icon-wrapper analytics-icon--green">
                <DollarSign size={32} />
              </div>
              <div className="analytics-card-content">
                <p className="analytics-value">${kpis.totalRevenue.toLocaleString()}</p>
                <p className="analytics-label">Total Revenue</p>
              </div>
            </div>
            <div className="analytics-card analytics-card--large">
              <div className="analytics-icon-wrapper analytics-icon--red">
                <Trash2 size={32} />
              </div>
              <div className="analytics-card-content">
                <p className="analytics-value">${kpis.totalWasteCost.toLocaleString()}</p>
                <p className="analytics-label">Lost to Waste</p>
              </div>
            </div>
            <div className="analytics-card analytics-card--large">
              <div className="analytics-icon-wrapper analytics-icon--blue">
                <TrendingDown size={32} />
              </div>
              <div className="analytics-card-content">
                <p className="analytics-value">${kpis.totalFoodCost.toLocaleString()}</p>
                <p className="analytics-label">Total Food Cost</p>
              </div>
            </div>
            <div className="analytics-card analytics-card--large">
              <div className="analytics-icon-wrapper analytics-icon--purple">
                <CheckCircle size={32} />
              </div>
              <div className="analytics-card-content">
                <p className="analytics-value">
                  {kpis.totalFoodCost > 0
                    ? ((1 - kpis.totalWasteCost / kpis.totalFoodCost) * 100).toFixed(1)
                    : 100}%
                </p>
                <p className="analytics-label">Food Utilization Rate</p>
              </div>
            </div>
          </div>

          <div className="analytics-details-grid">
            <section className="card">
              <h3 className="card-header">Profitability by Event</h3>
              <div className="analytics-stat-list">
                {wasteReports.map((report) => {
                  const evt = events.find((e) => e.id === report.eventId);
                  let foodCost = 0;
                  let wasteCost = 0;
                  for (const cat of report.categories) {
                    for (const item of cat.items) {
                      foodCost += item.prepared * item.costPerUnit;
                      wasteCost += item.wasted * item.costPerUnit;
                    }
                  }
                  const profit = evt ? evt.budget - foodCost : 0;
                  return (
                    <div key={report.id} className="analytics-stat-row">
                      <div>
                        <span>{report.eventName}</span>
                        <p className="text-muted text-small">
                          Food cost: ${foodCost.toFixed(0)} | Waste: ${wasteCost.toFixed(0)}
                        </p>
                      </div>
                      <strong className={profit >= 0 ? "" : "waste-cost--high"}>
                        ${profit.toFixed(0)}
                      </strong>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="card">
              <h3 className="card-header">Cost Trend</h3>
              <div className="analytics-stat-list">
                {wasteHistory.map((m, i) => (
                  <div key={i} className="analytics-stat-row">
                    <div>
                      <span>{m.month}</span>
                      <p className="text-muted text-small">{m.events} events</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <strong>${m.totalWasteCost.toLocaleString()}</strong>
                      <p className="text-muted text-small">wasted of ${m.totalPreparedCost.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="card">
              <h3 className="card-header">Impact Summary</h3>
              <div className="analytics-stat-list">
                <div className="analytics-stat-row">
                  <span>Waste rate 3 months ago</span>
                  <strong>{wasteHistory[wasteHistory.length - 4]?.wastePercent || 0}%</strong>
                </div>
                <div className="analytics-stat-row">
                  <span>Current waste rate</span>
                  <strong>{wasteHistory[wasteHistory.length - 1]?.wastePercent || 0}%</strong>
                </div>
                <div className="analytics-stat-row">
                  <span>Reduction achieved</span>
                  <strong className="text-green">{kpis.wasteReduction} percentage points</strong>
                </div>
                <div className="analytics-stat-row">
                  <span>Food cost % of revenue</span>
                  <strong>{kpis.totalRevenue > 0 ? ((kpis.totalFoodCost / kpis.totalRevenue) * 100).toFixed(1) : 0}%</strong>
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
}
