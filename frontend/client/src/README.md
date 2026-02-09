# 📝 Task Manager – Full Stack Application

A modern full-stack **Task Management** application built using  
**React (Frontend)** + **Flask (Backend)** + **MySQL (Database)**.

This project allows users to **create, view, filter, update, and delete tasks** with a clean UI and smooth animations.  
Built to demonstrate **full-stack development skills** — API development, database design, and responsive UI.

---

## 🚀 Features

### ✅ Task CRUD Operations
- ➕ Add new tasks  
- 📄 View all tasks  
- ✏️ Update task status  
- ❌ Delete tasks  

### 🎨 UI/UX Enhancements
- Animated task cards  
- Priority color badges  
- Filter options: *All / Pending / In-Progress / Completed*  
- Popup modal for adding tasks  
- Responsive layout for all screen sizes  

### 🔌 Backend API (Flask)
| Method | Endpoint              | Description              |
|--------|------------------------|--------------------------|
| POST   | `/task`                | Create task              |
| GET    | `/tasks`               | Fetch all tasks          |
| PUT    | `/task/<id>`           | Update task status       |
| DELETE | `/task/<id>`           | Delete task              |

---

## 🗄️ Database (MySQL)

```
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('pending', 'in-progress', 'completed') DEFAULT 'pending',
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    due_date DATE
);
```

---

## 🛠️ Tech Stack

### **Frontend**
- React + Vite
- Axios
- Custom CSS

### **Backend**
- Python Flask
- Flask-CORS
- PyMySQL

### **Database**
- MySQL

---

## ▶️ How to Run the Project

### **1️⃣ Backend**
```bash
cd backend
pip install -r requirements.txt
python app.py
```
Runs at:  
➡️ http://127.0.0.1:5000

---

### **2️⃣ Frontend**
```bash
cd frontend
npm install
npm run dev
```
Runs at:  
➡️ http://localhost:5173

---

## 📌 Author
**Muhammad Salman Farish**  
Full-Stack Python Developer  

---

## ⭐ Show Support
If you liked this project, consider giving it a ⭐ on GitHub!
