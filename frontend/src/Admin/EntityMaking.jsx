// src/Admin/Entity_Making.jsx
import React, { useState } from 'react';
import AdminSidebar from './Sidebar';
import './admin.css';

const EntityMaking = () => {
  const [selectedEntity, setSelectedEntity] = useState('');
  const [formData, setFormData] = useState({});
  
  // State for department editing (if needed)
  const [departments, setDepartments] = useState([
    {
      department_id: 'CS',
      department_name: 'Computer Science',
      head_of_department: 'Dr. Ahsan',
    },
    {
      department_id: 'EE',
      department_name: 'Electrical Engineering',
      head_of_department: 'Dr. Imran',
    },
  ]);

  const handleEntityChange = (e) => {
    setSelectedEntity(e.target.value);
    setFormData({});
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = () => {
    console.log('Adding record:', { entity: selectedEntity, data: formData });
    // Here you would typically make an API call to add the record
    alert(`${selectedEntity} record added successfully!`);
    setFormData({});
    setSelectedEntity('');
  };

  const renderForm = () => {
    switch (selectedEntity) {
      case 'Batch':
        return (
          <>
            <label className="label-style">Batch Name</label>
            <input 
              name="batch_id" 
              className="input-style" 
              onChange={handleInputChange} 
              required
            />
            <label className="label-style">Year</label>
            <input 
              name="start_year" 
              type="number"
              min="2000"
              max="2100"
              className="input-style" 
              onChange={handleInputChange} 
              required
            />
            <label className="label-style">Department</label>
            <select 
              name="department_id_fk" 
              className="select-style" 
              onChange={handleInputChange}
              required
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept.department_id} value={dept.department_id}>
                  {dept.department_name}
                </option>
              ))}
            </select>
          </>
        );

      case 'Department':
        return (
          <>
            <label className="label-style">Department Name</label>
            <input 
              name="department_name" 
              className="input-style" 
              onChange={handleInputChange} 
              required
            />
          </>
        );

      case 'Student':
        return (
          <>
            <label className="label-style">Login ID</label>
            <input 
              name="login_id" 
              className="input-style" 
              onChange={handleInputChange} 
              required
            />
            <label className="label-style">Password</label>
            <input 
              type="password" 
              name="password" 
              className="input-style" 
              onChange={handleInputChange} 
              required
            />
            <label className="label-style">Student Name</label>
            <input 
              name="student_name" 
              className="input-style" 
              onChange={handleInputChange} 
              required
            />
            <label className="label-style">Registration Number</label>
            <input 
              name="registration_number" 
              className="input-style" 
              onChange={handleInputChange} 
              required
            />
            <label className="label-style">Batch</label>
            <select 
              name="batch_id_fk" 
              className="select-style" 
              onChange={handleInputChange}
              required
            >
              <option value="">Select Batch</option>
              <option value="1">Batch 1 (2020-2024)</option>
              <option value="2">Batch 2 (2021-2025)</option>
              <option value="3">Batch 3 (2022-2026)</option>
            </select>
          </>
        );

      case 'Course Advisor':
        return (
          <>
            <label className="label-style">Login ID</label>
            <input 
              name="login_id" 
              className="input-style" 
              onChange={handleInputChange} 
              required
            />
            <label className="label-style">Password</label>
            <input 
              type="password" 
              name="password" 
              className="input-style" 
              onChange={handleInputChange} 
              required
            />
            <label className="label-style">Advisor Name</label>
            <input 
              name="advisor_name" 
              className="input-style" 
              onChange={handleInputChange} 
              required
            />
            <label className="label-style">Batch</label>
            <select 
              name="batch_id_fk" 
              className="select-style" 
              onChange={handleInputChange}
              required
            >
              <option value="">Select Batch</option>
              <option value="1">Batch 1</option>
              <option value="2">Batch 2</option>
              <option value="3">Batch 3</option>
            </select>
          </>
        );

      default:
        return (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <p className="empty-text">Select an entity type to start adding records</p>
          </div>
        );
    }
  };

  return (
    <div className="container">
      <AdminSidebar />
      <div className="main-content">
        <div className="form-container">
          <h1 className="page-title">Add New Record</h1>
          
          <div className="entity-selector">
            <label className="label-style">Select Entity Type</label>
            <select 
              className="select-style" 
              value={selectedEntity} 
              onChange={handleEntityChange}
            >
              <option value="">Select Entity</option>
              <option value="Student">Student</option>
              <option value="Course Advisor">Course Advisor</option>
              <option value="Batch">Batch</option>
              <option value="Department">Department</option>
            </select>
          </div>

          <div className="form-section">
            {renderForm()}
          </div>

          {selectedEntity && (
            <button 
              onClick={handleAdd} 
              className="button-style submit-button"
            >
              Add {selectedEntity}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntityMaking;