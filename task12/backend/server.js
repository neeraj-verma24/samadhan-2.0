const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

let todos = [
  { id: 1, task: "Learn React" },
  { id: 2, task: "Learn Node.js" }
];

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ message: "Task is required" });
  const newTodo = { id: todos.length ? todos[todos.length - 1].id + 1 : 1, task };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ message: "Not found" });
  const deleted = todos.splice(index, 1);
  res.json(deleted);
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));