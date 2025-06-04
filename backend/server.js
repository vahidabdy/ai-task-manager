const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const TASKS_FILE = path.join(__dirname, "data", "tasks.json");

app.get("/tasks", (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(TASKS_FILE));
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(TASKS_FILE));
  const newTask = { id: Date.now(), ...req.body };
  tasks.push(newTask);
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
  res.status(201).json(newTask);
});

app.delete("/tasks/:id", (req, res) => {
  const tasks = JSON.parse(fs.readFileSync(TASKS_FILE));
  const filtered = tasks.filter(t => t.id !== Number(req.params.id));
  fs.writeFileSync(TASKS_FILE, JSON.stringify(filtered, null, 2));
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`✅ Backend is running at http://localhost:${PORT}`);
});