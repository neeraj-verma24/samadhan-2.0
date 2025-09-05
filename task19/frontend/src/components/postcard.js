import React, { useState } from "react";
import API from "../api";

export default function PostCard({ post, onUpdate }) {
  const [text, setText] = useState("");

  const like = async () => {
    const { data } = await API.post(/posts/${post._id}/like);
    onUpdate(data);
  };

  const comment = async e => {
    e.preventDefault();
    if (!text.trim()) return;
    const { data } = await API.post(/posts/${post._id}/comment, { text });
    setText("");
    onUpdate(data);
  };

  return (
    <div style={{ border: "1px solid #ddd", padding: 12, marginBottom: 12, borderRadius: 8 }}>
      <div style={{ fontWeight: "bold" }}>{post.author}</div>
      <div style={{ margin: "8px 0" }}>{post.content}</div>
      <button onClick={like}>❤ {post.likes.length}</button>
      <div style={{ marginTop: 8 }}>
        {post.comments.map((c, i) => (
          <div key={i} style={{ fontSize: 14, marginTop: 4 }}>
            <b>{c.user}:</b> {c.text}
          </div>
        ))}
      </div>
      <form onSubmit={comment} style={{ marginTop: 8 }}>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Write a comment..." />
        <button type="submit" style={{ marginLeft: 6 }}>Send</button>
      </form>
    </div>
  );
}