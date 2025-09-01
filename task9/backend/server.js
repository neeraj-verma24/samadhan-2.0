const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const students = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
  { id: 3, name: "Charlie", email: "charlie@example.com" }
];

app.get('/api/students', (req, res) => {
  res.json(students);
});

const PORT = 5000;
app.listen(PORT, () => console.log(Server started on port ${PORT}));