import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import CreateEventPage from "./pages/CreateEventPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import MenuPage from "./pages/MenuPage";
import MenuEditorPage from "./pages/MenuEditorPage";
import TasksPage from "./pages/TasksPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/new" element={<CreateEventPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
          <Route path="/events/:id/edit" element={<CreateEventPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/menu/new" element={<MenuEditorPage />} />
          <Route path="/menu/:id/edit" element={<MenuEditorPage />} />
          <Route path="/tasks" element={<TasksPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
