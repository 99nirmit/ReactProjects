import React, { useState } from "react";

const Employee = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [employee, setEmployee] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleSubmit = () => {
    if (
      name.trim === "" ||
      mobile.trim === "" ||
      department.trim === "" ||
      salary.trim === ""
    )
      return;

    const newEployee = {
      id: Date.now(),
      name,
      mobile,
      department,
      salary,
    };
    setEmployee((prev) => [...prev, newEployee]);

    setName("");
    setMobile("");
    setDepartment("");
    setSalary("");
  };

  const handleEditAndUpdate = (emp) => {
    if (editId != null) {
      setEmployee((prev) =>
        prev.map((employee) =>
          employee.id == editId
            ? { ...employee, name, mobile, department, salary }
            : employee
        )
      );
      setEditId(null);
      setName("");
      setMobile("");
      setDepartment("");
      setSalary("");
    } else {
      setEditId(emp.id);
      setName(emp.name);
      setMobile(emp.mobile);
      setDepartment(emp.department);
      setSalary(emp.salary);
    }
  };

  const handleDelete = (id) => {
    const updated = employee.filter((emp) => emp.id != id);
    setEmployee(updated);
  };

  return (
    <div>
      <div className="container mt-5 p-4 rounded shadow">
        <h2 className="text-center fw-bold mb-4">Employee Management System</h2>
        <div className="mb-3 d-flex justify-content-space-between gap-5">
          <input
            type="text"
            className="form-control mb-2"
            label="Enter Employee Name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            className="form-control mb-2"
            placeholder="Enter Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

        <div className="mb-3 d-flex justify-content-space-between gap-5">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Enter Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />

          <input
            type="number"
            className="form-control mb-2"
            placeholder="Enter Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
        <div className="d-flex justify content between gap-5">
          <button className="btn btn-secondary w-100" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>

      <div className="container mt-5 p-4 border rounded shadow">
        <h2 className="text-center fw-bold mb-4">Employee List</h2>
        <table className="table table-striped table-bordered">
          <thead className="tablr-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Extra</th>
            </tr>
          </thead>

          <tbody>
            {employee.map((emp, index) => (
              <tr key={emp.id}>
                <td>{index + 1}</td>
                <td>{emp.name}</td>
                <td>{emp.mobile}</td>
                <td>{emp.department}</td>
                <td>{emp.salary}</td>
                <td className="d-flex gap-3">
                  <button
                    className="btn btn-warning"
                    onClick={() => handleEditAndUpdate(emp)}
                  >
                    {editId === emp.id ? "Update" : "Edit"}
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleDelete(emp.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
