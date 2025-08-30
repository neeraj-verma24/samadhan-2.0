import React, { useState } from "react";

function CounterAndPreview() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  return (
    <div style={{ fontFamily: "Arial", textAlign: "center", padding: "20px" }}>
      {/* Counter Section */}
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)} style={btnStyle}>Increment</button>
      <button onClick={() => setCount(count - 1)} style={btnStyle}>Decrement</button>
      <button onClick={() => setCount(0)} style={btnStyle}>Reset</button>

      {/* Live Preview Section */}
      <div style={{ marginTop: "2em" }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something..."
          style={inputStyle}
        />
        <p>Live Preview: <strong>{text}</strong></p>
      </div>
    </div>
  );
}

const btnStyle = {
  margin: "5px",
  padding: "8px 15px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

const inputStyle = {
  padding: "8px",
  width: "200px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  marginBottom: "10px"
};

export default CounterAndPreview;
