import { DollarSign, Trash2, CheckCircle, Target, CalendarDays, TrendingUp } from "lucide-react";
import { kpis, events } from "../data/sampleData";

export default function AnalyticsPage() {
  const totalRevenue = events.reduce((sum, e) => sum + e.budget, 0);
  const avgBudget = totalRevenue / events.length;

  return (
    <div className="page">
      <h2 className="page-title">Analytics</h2>

      <div className="analytics-grid">
        <div className="analytics-card analytics-card--large">
          <div className="analytics-icon-wrapper analytics-icon--green">
            <DollarSign size={32} />
          </div>
          <div className="analytics-card-content">
            <p className="analytics-value">${kpis.mrr.toLocaleString()} MRR</p>
            <p className="analytics-label">Profit</p>
          </div>
        </div>

        <div className="analytics-card analytics-card--large">
          <div className="analytics-icon-wrapper analytics-icon--red">
            <Trash2 size={32} />
          </div>
          <div className="analytics-card-content">
            <p className="analytics-value">-{kpis.wasteReduction}%</p>
            <p className="analytics-label">Food Waste Reduction</p>
          </div>
        </div>

        <div className="analytics-card analytics-card--large">
          <div className="analytics-icon-wrapper analytics-icon--blue">
            <CheckCircle size={32} />
          </div>
          <div className="analytics-card-content">
            <p className="analytics-value">{kpis.tasksPerWeek} tasks/week</p>
            <p className="analytics-label">Productivity</p>
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
              <span>Monthly Recurring</span>
              <strong>${kpis.mrr.toLocaleString()}</strong>
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
          <h3 className="card-header">Performance Metrics</h3>
          <div className="analytics-stat-list">
            <div className="analytics-stat-row">
              <span>Tasks Completed / Week</span>
              <strong>{kpis.tasksPerWeek}</strong>
            </div>
            <div className="analytics-stat-row">
              <span>Food Waste Reduction</span>
              <strong>{kpis.wasteReduction}%</strong>
            </div>
            <div className="analytics-stat-row">
              <span>Client Satisfaction</span>
              <strong>4.8/5</strong>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
