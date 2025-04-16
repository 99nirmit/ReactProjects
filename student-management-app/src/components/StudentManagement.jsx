import React, { useState } from "react";
import "./StudentManagement.css";

const StudentManagement = () => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleAddOrUpdate = () => {
    if (name.trim === "" || course.trim === "") return;

    if (editId != null) {
      setStudents((prev) =>
        prev.map((student) =>
          student.id === editId ? { ...student, name, course } : student
        )
      );

      setEditId(null);
    } else {
      const newStudent = {
        id: Date.now(),
        name,
        course,
      };
      setStudents((prev) => [...prev, newStudent]);
    }
    setName("");
    setCourse("");
  };

  const handleEdit = (student) => {
    setEditId(student.id);
    setName(student.name);
    setCourse(student.course);
  };

  const handleDelete = (id) => {
    const updated = students.filter((s) => s.id !== id);
    setStudents(updated);
  };

  return (
    <div className="container mt-5 p-4 border rounded shadow">
      <h2 className="text-center fw-bold mb-4">Student Management</h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter Student name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          className="form-control mb-2"
          placeholder="Enter Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />

        <button className="btn btn-primary w-100" onClick={handleAddOrUpdate}>
          {editId !== null ? "Update" : "Add"}
        </button>
      </div>

      <ul className="list-group">
        {students.map((student) => (
          <li
            key={student.id}
            className="list-group-item d-flex justify content between align-items-center"
          >
            <div>
              <strong>{student.name}</strong> - {student.course}
            </div>

            <div>
              <button
                className="btn btn-sm btn-outline-primary me-2"
                onClick={() => handleEdit(student)}
              >
                Edit
              </button>

              <button
                className="btn btn-sm btn-outline-danger me-2"
                onClick={() => handleDelete(student.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentManagement;
