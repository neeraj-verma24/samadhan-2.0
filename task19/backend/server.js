import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./models/User.js";
import Post from "./models/Post.js";

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = "secret_key";
await mongoose.connect("mongodb://127.0.0.1:27017/socialapp");

function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
}

app.post("/auth/register", async (req, res) => {
  const { username, password } = req.body;
  if (await User.findOne({ username })) return res.status(400).json({ message: "User exists" });
  const hash = await bcrypt.hash(password, 10);
  await User.create({ username, password: hash });
  res.json({ message: "ok" });
});

app.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ message: "Invalid" });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: "Invalid" });
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "2h" });
  res.json({ token, username });
});

app.get("/posts", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

app.post("/posts", auth, async (req, res) => {
  const post = await Post.create({ author: req.user.username, content: req.body.content });
  res.status(201).json(post);
});

app.post("/posts/:id/like", auth, async (req, res) => {
  const p = await Post.findById(req.params.id);
  if (!p) return res.status(404).json({ message: "Not found" });
  if (p.likes.includes(req.user.username)) p.likes = p.likes.filter(u => u !== req.user.username);
  else p.likes.push(req.user.username);
  await p.save();
  res.json(p);
});

app.post("/posts/:id/comment", auth, async (req, res) => {
  const p = await Post.findById(req.params.id);
  if (!p) return res.status(404).json({ message: "Not found" });
  p.comments.push({ user: req.user.username, text: req.body.text });
  await p.save();
  res.json(p);
});

app.listen(5000, () => console.log("http://localhost:5000"));