import React, { useState, useEffect } from "react";

function StudentDirectory() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/students")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Student Directory</h2>
      <ul>
        {students.map((s) => (
          <li key={s.id}>{s.name} ({s.email})</li>
        ))}
      </ul>
    </div>
  );
}

export default StudentDirectory;