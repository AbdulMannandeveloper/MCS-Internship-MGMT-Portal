// src/Admin/View_Department.jsx
import React, { useState, useEffect } from 'react';
import AdminSidebar from './Sidebar';
import './admin.css';

const ViewDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    // Mock data (replace with API call later)
    setDepartments([
      { department_id: 'DEPT01', department_name: 'Computer Science' },
      { department_id: 'DEPT02', department_name: 'Electrical Engineerng' },
      { department_id: 'DEPT03', department_name: 'Information Security' }
    ]);
  }, []);

  const handleEditClick = (dept) => {
    setEditingDepartment(dept.department_id);
    setNewName(dept.department_name);
  };

  const handleSave = () => {
    setDepartments(departments.map(d =>
      d.department_id === editingDepartment
        ? { ...d, department_name: newName }
        : d
    ));
    setEditingDepartment(null);
    setNewName('');
  };

  const handleDelete = (deptId) => {
    if (window.confirm('Are you sure you want to delete this Department?')) {
      setDepartments(departments.filter(d => d.department_id !== deptId));
    }
  };

  return (
    <div className="container">
      <AdminSidebar />
      <div className="main-content">
        <h1 className="page-title">Department Management</h1>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Department Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept) => (
                <tr key={dept.department_id}>
                  <td>
                    {editingDepartment === dept.department_id ? (
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="input-style"
                      />
                    ) : (
                      dept.department_name
                    )}
                  </td>
                  <td>
                    {editingDepartment === dept.department_id ? (
                      <>
                        <button className="button-style save-button" onClick={handleSave}>
                          Save
                        </button>
                        <button
                          className="button-style cancel-button"
                          onClick={() => setEditingDepartment(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="button-style edit-button"
                          onClick={() => handleEditClick(dept)}
                        >
                          Edit
                        </button>
                        <button
                          className="button-style delete-button"
                          onClick={() => handleDelete(dept.department_id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {departments.length === 0 && (
                <tr>
                  <td colSpan="2" style={{ textAlign: 'center' }}>
                    No Departments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewDepartment;
