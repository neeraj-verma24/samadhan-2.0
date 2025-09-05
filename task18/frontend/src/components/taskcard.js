import React from "react";

function TaskCard({ task }) {
  return (
    <div style={{ padding: "10px", margin: "5px", background: "#fff", border: "1px solid #ccc", borderRadius: "5px" }}>
      {task.title}
    </div>
  );
}

export default TaskCard;