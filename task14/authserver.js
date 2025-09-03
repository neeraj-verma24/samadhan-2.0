const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

const JWT_SECRET = 'secret_key';
let users = []; // For demo; use a DB in production

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (users.some(u => u.username === username))
    return res.status(400).json({ message: 'User already exists' });
  users.push({ username, password });
  res.json({ message: 'Registration successful' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ message: 'Login successful', token });
});

app.listen(4000, () => console.log('Auth API running on http://localhost:4000'));