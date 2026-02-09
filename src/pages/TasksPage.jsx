import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, GripVertical } from "lucide-react";
import { tasks as initialTasks, events } from "../data/sampleData";

export default function TasksPage() {
  const [taskList, setTaskList] = useState(initialTasks);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTask, setNewTask] = useState({
    label: "",
    description: "",
    assignedTo: "",
    eventId: "",
  });

  const toggleTask = (id) => {
    setTaskList(
      taskList.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    const task = {
      id: Date.now(),
      label: newTask.label,
      description: newTask.description,
      assignedTo: newTask.assignedTo,
      eventId: newTask.eventId ? Number(newTask.eventId) : null,
      completed: false,
    };
    setTaskList([...taskList, task]);
    setNewTask({ label: "", description: "", assignedTo: "", eventId: "" });
    setShowCreateForm(false);
  };

  const pendingTasks = taskList.filter((t) => !t.completed);
  const completedTasks = taskList.filter((t) => t.completed);

  const [draggedId, setDraggedId] = useState(null);

  const handleDragStart = (id) => {
    setDraggedId(id);
  };

  const handleDragOver = (e, targetId) => {
    e.preventDefault();
    if (draggedId === null || draggedId === targetId) return;

    setTaskList((prev) => {
      const list = [...prev];
      const dragIdx = list.findIndex((t) => t.id === draggedId);
      const targetIdx = list.findIndex((t) => t.id === targetId);
      const [dragged] = list.splice(dragIdx, 1);
      list.splice(targetIdx, 0, dragged);
      return list;
    });
  };

  const handleDragEnd = () => {
    setDraggedId(null);
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2 className="page-title">Tasks</h2>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="btn btn--primary"
        >
          <Plus size={18} /> Create Task
        </button>
      </div>

      {showCreateForm && (
        <form onSubmit={handleCreateTask} className="form-card form-card--compact">
          <h3 className="card-header">New Task</h3>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Task Name</label>
              <input
                type="text"
                value={newTask.label}
                onChange={(e) =>
                  setNewTask({ ...newTask, label: e.target.value })
                }
                className="form-input"
                placeholder="e.g. Order table linens"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Assigned To</label>
              <input
                type="text"
                value={newTask.assignedTo}
                onChange={(e) =>
                  setNewTask({ ...newTask, assignedTo: e.target.value })
                }
                className="form-input"
                placeholder="e.g. Emily"
                required
              />
            </div>
            <div className="form-group form-group--full">
              <label className="form-label">Description</label>
              <input
                type="text"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                className="form-input"
                placeholder="Task details..."
              />
            </div>
            <div className="form-group">
              <label className="form-label">Event (optional)</label>
              <select
                value={newTask.eventId}
                onChange={(e) =>
                  setNewTask({ ...newTask, eventId: e.target.value })
                }
                className="form-input"
              >
                <option value="">No event</option>
                {events.map((evt) => (
                  <option key={evt.id} value={evt.id}>
                    {evt.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn--primary">
              Add Task
            </button>
            <button
              type="button"
              onClick={() => setShowCreateForm(false)}
              className="btn btn--secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <section className="card">
        <h3 className="card-header">To Do ({pendingTasks.length})</h3>
        <ul className="todo-list">
          {pendingTasks.map((task) => {
            const event = events.find((e) => e.id === task.eventId);
            return (
              <li
                key={task.id}
                className={`todo-item todo-item--draggable ${
                  draggedId === task.id ? "todo-item--dragging" : ""
                }`}
                draggable
                onDragStart={() => handleDragStart(task.id)}
                onDragOver={(e) => handleDragOver(e, task.id)}
                onDragEnd={handleDragEnd}
              >
                <GripVertical size={16} className="drag-handle" />
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="todo-checkbox"
                />
                <div>
                  <strong>{task.label}</strong>
                  <p className="text-muted">{task.description}</p>
                  <p className="text-muted text-small">
                    Assigned to: {task.assignedTo}
                    {event && <> &middot; {event.name}</>}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {completedTasks.length > 0 && (
        <section className="card">
          <h3 className="card-header">Completed ({completedTasks.length})</h3>
          <ul className="todo-list">
            {completedTasks.map((task) => {
              const event = events.find((e) => e.id === task.eventId);
              return (
                <li key={task.id} className="todo-item todo-item--completed">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="todo-checkbox"
                  />
                  <div>
                    <strong>{task.label}</strong>
                    <p className="text-muted">{task.description}</p>
                    <p className="text-muted text-small">
                      Assigned to: {task.assignedTo}
                      {event && <> &middot; {event.name}</>}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}
