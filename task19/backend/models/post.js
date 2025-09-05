import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  user: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
});

const PostSchema = new mongoose.Schema({
  author: String,
  content: String,
  likes: { type: [String], default: [] },
  comments: { type: [CommentSchema], default: [] },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Post", PostSchema);