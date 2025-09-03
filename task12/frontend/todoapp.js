import React, { useEffect, useState } from "react";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
        setLoading(false);
      });
  }, []);

  const addTodo = async () => {
    if (!input.trim()) return;
    const res = await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: input })
    });
    const newTodo = await res.json();
    setTodos((prev) => [...prev, newTodo]);
    setInput("");
  };

  const deleteTodo = async (id) => {
    await fetch(http://localhost:5000/todos/${id}, { method: "DELETE" });
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>To-Do List</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add new task"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.task}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
