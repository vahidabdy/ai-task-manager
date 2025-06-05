import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:3001/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    if (text.trim()) {
      await axios.post("http://localhost:3001/tasks", { text, dueDate });
      setText("");
      setDueDate("");
      fetchTasks();
    }
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:3001/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>📝 Task Manager</h1>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a task"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.text}
            {task.dueDate ? ` (due ${task.dueDate})` : ""}
            <button onClick={() => deleteTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
