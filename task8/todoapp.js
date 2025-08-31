import React, { useState } from "react";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim() !== "") {
      setTodos([...todos, input]);
      setInput("");
    }
  };

  const deleteTodo = (idx) => {
    setTodos(todos.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <h2>To-Do List</h2>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, idx) => (
          <li key={idx}>
            {todo}
            <button onClick={() => deleteTodo(idx)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;