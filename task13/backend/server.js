const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Note = require('./models/Note');
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/notesdb');

app.get('/notes', async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

app.post('/notes', async (req, res) => {
  const note = new Note(req.body);
  await note.save();
  res.status(201).json(note);
});

app.put('/notes/:id', async (req, res) => {
  const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(note);
});

app.delete('/notes/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));