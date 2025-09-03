const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const JWT_SECRET = 'secret_key';

let users = [];
let students = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.json({ message: 'Registration successful' });
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Token required' });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

app.get('/students', authenticateToken, (req, res) => {
  res.json(students);
});

app.post('/students', authenticateToken, (req, res) => {
  const { name, email } = req.body;
  const newStudent = {
    id: students.length ? students[students.length - 1].id + 1 : 1,
    name,
    email,
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.put('/students/:id', authenticateToken, (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) return res.status(404).json({ message: 'Student not found' });
  student.name = req.body.name || student.name;
  student.email = req.body.email || student.email;
  res.json(student);
});

app.delete('/students/:id', authenticateToken, (req, res) => {
  const index = students.findIndex(s => s.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Student not found' });
  const deletedStudent = students.splice(index, 1);
  res.json(deletedStudent[0]);
});

const PORT = 4000;
app.listen(PORT, () => console.log(Backend running on http://localhost:${PORT}));
