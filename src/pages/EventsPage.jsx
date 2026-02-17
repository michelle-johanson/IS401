import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, ArrowRight } from "lucide-react";
import EventImage from "../components/EventImage";

const API = "http://localhost:3001/api";

export default function EventsPage() {
  const [allEvents, setAllEvents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${API}/events`).then((r) => r.json()).then(setAllEvents);
  }, []);

  const filtered = allEvents.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.client.toLowerCase().includes(search.toLowerCase()) ||
      e.venue.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <div className="page-header">
        <h2 className="page-title">Events</h2>
        <Link to="/events/new" className="btn btn--primary">
          <Plus size={18} /> Create Event
        </Link>
      </div>

      <div className="search-bar">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="events-grid">
        {filtered.map((evt) => (
          <Link to={`/events/${evt.id}`} key={evt.id} className="event-card">
            <div className="event-card-image-wrapper">
              <EventImage
                src={evt.image}
                alt={evt.name}
                className="event-card-image"
              />
            </div>
            <div className="event-card-body">
              <div className="event-card-header">
                <h3 className="event-card-title">{evt.name}</h3>
                <ArrowRight size={18} className="event-card-arrow" />
              </div>
              <p className="text-muted">{evt.client}</p>
              <p className="text-muted">{evt.venue}</p>
              <p className="text-muted">{evt.date} &middot; {evt.time}</p>
              <span className={`badge badge--${evt.status.toLowerCase()}`}>
                {evt.status}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
