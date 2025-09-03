import React, { useEffect, useState } from "react";

function NoteApp() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/notes")
      .then(res => res.json())
      .then(data => setNotes(data));
  }, []);

  const addNote = async () => {
    const res = await fetch("http://localhost:5000/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    const newNote = await res.json();
    setNotes(prev => [...prev, newNote]);
    setTitle(""); setContent("");
  };

  const updateNote = async () => {
    const res = await fetch(http://localhost:5000/notes/${editId}, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });
    const updated = await res.json();
    setNotes(prev => prev.map(n => (n._id === editId ? updated : n)));
    setEditId(null); setTitle(""); setContent("");
  };

  const deleteNote = async (id) => {
    await fetch(http://localhost:5000/notes/${id}, { method: "DELETE" });
    setNotes(prev => prev.filter(n => n._id !== id));
  };

  const selectNote = (n) => { setEditId(n._id); setTitle(n.title); setContent(n.content); };

  return (
    <div>
      <h2>Notes App</h2>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" />
      <input value={content} onChange={e=>setContent(e.target.value)} placeholder="Content" />
      {editId
        ? <button onClick={updateNote}>Update</button>
        : <button onClick={addNote}>Add</button>}
      <ul>
        {notes.map(n => (
          <li key={n._id}>
            <b>{n.title}</b>: {n.content}
            <button onClick={() => selectNote(n)}>Edit</button>
            <button onClick={() => deleteNote(n._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default NoteApp;
