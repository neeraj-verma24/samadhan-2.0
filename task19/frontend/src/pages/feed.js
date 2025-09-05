import React, { useEffect, useState } from "react";
import API from "../api";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const nav = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    API.get("/posts").then(r => setPosts(r.data));
  }, []);

  const create = async e => {
    e.preventDefault();
    if (!content.trim()) return;
    const { data } = await API.post("/posts", { content });
    setPosts([data, ...posts]);
    setContent("");
  };

  const updatePost = p => setPosts(ps => ps.map(x => (x._id === p._id ? p : x)));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    nav("/login");
  };

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Social Feed</h2>
        <div>
          <span style={{ marginRight: 12 }}>{username}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
      <form onSubmit={create} style={{ marginBottom: 16 }}>
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="What's happening?" rows={3} style={{ width: "100%" }} />
        <button type="submit" style={{ marginTop: 8 }}>Post</button>
      </form>
      {posts.map(p => (
        <PostCard key={p._id} post={p} onUpdate={updatePost} />
      ))}
    </div>
  );
}