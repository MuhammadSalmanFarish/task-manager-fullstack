import { useState } from "react";
import axios from "axios";
import "./form.css"

export default function Form({ close, refresh }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleAddTask = async () => {
    if (!title) {
      alert("Title is required!");
      return;
    }

    await axios.post("http://127.0.0.1:5000/task", {
      title,
      description,
      priority,
      due_date: dueDate
    });

    refresh();  // refresh task list
    close();    // close modal
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add Task</h2>

        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="">Select priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />

        <div className="modal-actions">
          <button onClick={handleAddTask}>Add</button>
          <button className="close-btn" onClick={close}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
