from flask import Flask, request, jsonify
from flask_cors import CORS
from db import get_connection

app = Flask(__name__)
CORS(app)

@app.route("/task",methods=["POST"])
def add_task():
    data = request.get_json()
    title=data.get("title") 
    description = data.get("description")
    priority = data.get("priority")
    due_date = data.get("due_date")

    if not title:
        return jsonify({"error":"Title is required"}),400

    conn=get_connection()
    cur=conn.cursor()

    query="""
        INSERT INTO tasks (title, description, priority, due_date)
        VALUES (%s, %s, %s, %s)
    """
    cur.execute(query,(title,description,priority,due_date))
    conn.commit()
    cur.close()
    conn.close()

    return jsonify({"message":"Task created successfully"})

@app.route("/tasks",methods=["GET"])
def get_tasks():
    conn = get_connection()
    cur = conn.cursor()
    
    cur.execute("SELECT * FROM tasks ORDER BY created_at DESC")
    tasks = cur.fetchall()

    cur.close()
    conn.close()

    return jsonify(tasks)

@app.route("/task/<int:id>",methods=["PUT"])
def update_task(id):
    data=request.get_json()
    status = data.get("status")

    if status not in ["pending", "in-progress", "completed"]:
        return jsonify({"error": "Invalid status"}), 400
    
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("UPDATE tasks SET status=%s WHERE id=%s", (status, id))
    conn.commit()

    cur.close()
    conn.close()

    return jsonify({"message": "Task updated successfully!"})

@app.route("/task/<int:id>", methods=["DELETE"])
def delete_task(id):
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("DELETE FROM tasks WHERE id=%s", (id,))
    conn.commit()

    cur.close()
    conn.close()

    return jsonify({"message": "Task deleted!"})

if __name__ == "__main__":
    app.run(debug=True)