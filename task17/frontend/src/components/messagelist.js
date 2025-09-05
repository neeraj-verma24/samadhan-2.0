import React from "react";

function MessageList({ messages }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
        height: "300px",
        overflowY: "auto",
      }}
    >
      {messages.map((msg, idx) => (
        <div key={idx} style={{ marginBottom: "5px" }}>
          {msg}
        </div>
      ))}
    </div>
  );
}

export default MessageList;