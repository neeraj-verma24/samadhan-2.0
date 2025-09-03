import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Students() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");
      setStudents(res.data);
    } catch {
      navigate("/login");
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    await API.post("/students", { name, email });
    setName("");
    setEmail("");
    fetchStudents();
  };

  const handleDeleteStudent = async (id) => {
    await API.delete(/students/${id});
    fetchStudents();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Students</h2>
      <button onClick={handleLogout}>Logout</button>
      <form onSubmit={handleAddStudent}>
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Student Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Add Student</button>
      </form>
      <ul>
        {students.map((s) => (
          <li key={s.id}>
            {s.name} ({s.email})
            <button onClick={() => handleDeleteStudent(s.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Students;
