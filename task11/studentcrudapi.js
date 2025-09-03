const express = require('express');
const app = express();
app.use(express.json());

let students = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

app.get('/students', (req, res) => res.json(students));

app.get('/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.json(student);
});

app.post('/students', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ message: 'Name and email required' });

  const newStudent = { id: students.length ? students[students.length - 1].id + 1 : 1, name, email };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.put('/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: 'Student not found' });

  student.name = req.body.name || student.name;
  student.email = req.body.email || student.email;
  res.json(student);
});

app.delete('/students/:id', (req, res) => {
  const index = students.findIndex(s => s.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Student not found' });

  const deletedStudent = students.splice(index, 1);
  res.json(deletedStudent[0]);
});

app.listen(3000, () => console.log('CRUD API server running on http://localhost:3000'));
