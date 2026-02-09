import { useState,useEffect } from "react";
import axios from "axios";
import "./dashboard.css";
import Form from "./form";

export default function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [filter,setFilter] = useState("all")
  const [showModal, setShowModal] = useState(false);

  

  useEffect(()=>{
    const load = async ()=>{await fetchTask()}
    load()
  },[])

  const fetchTask = async() =>{
     const res = await axios.get("http://127.0.0.1:5000/tasks");
     setTasks(res.data)
  }

  const updateStatus = async (id,newStatus)=>{
        await axios.put(`http://127.0.0.1:5000/task/${id}`,
        {
            status:newStatus
        })
        fetchTask()
  }

  const deleteTask = async (id)=>{
    await axios.delete(`http://127.0.0.1:5000/task/${id}`)
    fetchTask()
  }
  return (
    <div id="dashboard-container">

      {/* HEADER */}
      <header className="header">
        <h1>Task Dashboard</h1>
         <button className="add-btn" onClick={() => setShowModal(true)}>
          + Add Task
        </button>
      </header>

      {/* FILTER SECTION */}
      <div className="filter-bar">
        <button onClick={()=>setFilter("all")}>All</button>
        <button onClick={()=>setFilter("pending")}>Pending</button>
        <button onClick={()=>setFilter("in-progress")}>In-progress</button>
        <button onClick={()=>setFilter("completed")}>Completed</button>
      </div>

      {/* TASK CARDS */}
      <div className="task-container">
  {tasks.filter(t=>filter==="all"||t.status===filter).map((task,index) => (
    <div className="task-card" key={task.id} style={{ animationDelay: `${index * 0.15}s` }}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>

      <div className={`priority ${task.priority}`}>
        {task.priority}
      </div>

      <p className="due-date">Due: {task.due_date.substring(0, 16)}</p>
      <div className={`status-chip ${task.status}`}>
          <span className="dot"></span> {task.status}
      </div>

      <div className="actions">
        <button onClick={()=>{updateStatus(task.id,"in-progress")}}>Start</button>
        <button onClick={()=>{updateStatus(task.id,"completed")}}>Complete</button>
        <button onClick={()=>deleteTask(task.id)}>Delete</button>
      </div>
    </div>
  ))}
</div>

   {/* Add Task Modal */}
      {showModal && (
        <Form
          close={() => setShowModal(false)}
          refresh={fetchTask}
        />
      )}


    </div>
  );
}
