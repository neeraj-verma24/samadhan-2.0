import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setU] = useState("");
  const [password, setP] = useState("");
  const [mode, setMode] = useState("login");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const submit = async e => {
    e.preventDefault();
    try {
      if (mode === "register") {
        await axios.post("http://localhost:5000/auth/register", { username, password });
        setMode("login");
        setP("");
      } else {
        const res = await axios.post("http://localhost:5000/auth/login", { username, password });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username);
        nav("/");
      }
    } catch {
      setErr("Failed");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>{mode === "login" ? "Login" : "Register"}</h2>
      {err && <p style={{ color: "red" }}>{err}</p>}
      <form onSubmit={submit}>
        <input value={username} onChange={e => setU(e.target.value)} placeholder="Username" required />
        <br />
        <input type="password" value={password} onChange={e => setP(e.target.value)} placeholder="Password" required />
        <br />
        <button type="submit">{mode === "login" ? "Login" : "Create account"}</button>
      </form>
      <button onClick={() => setMode(mode === "login" ? "register" : "login")} style={{ marginTop: 8 }}>
        {mode === "login" ? "Go to Register" : "Go to Login"}
      </button>
    </div>
  );
}