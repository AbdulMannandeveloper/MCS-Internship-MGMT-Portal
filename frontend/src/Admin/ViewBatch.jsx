// src/Admin/View_Batch.jsx
import React, { useState, useEffect } from 'react';
import AdminSidebar from './Sidebar';
import './admin.css';

const ViewBatch = () => {
  const [batches, setBatches] = useState([]);
  const [editingBatch, setEditingBatch] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newBatch, setNewBatch] = useState({
    batch_id: '',
    start_year: '',
    end_year: '',
    department_id_fk: ''
  });
  
  const [departments] = useState([
    { department_id: 'CS', department_name: 'Computer Science' },
    { department_id: 'EE', department_name: 'Electrical Engineering' },
    { department_id: 'ME', department_name: 'Mechanical Engineering' },
    { department_id: 'CE', department_name: 'Civil Engineering' },
  ]);

  // Load initial batch data
  useEffect(() => {
    // In a real app, this would be an API call
    const mockBatches = [
      { batch_id: 'B2020', start_year: 2020, end_year: 2024, department_id_fk: 'CS' },
      { batch_id: 'B2021', start_year: 2021, end_year: 2025, department_id_fk: 'EE' },
      { batch_id: 'B2022', start_year: 2022, end_year: 2026, department_id_fk: 'ME' },
      { batch_id: 'B2023', start_year: 2023, end_year: 2027, department_id_fk: 'CE' },
    ];
    setBatches(mockBatches);
  }, []);

  const handleEditClick = (batch) => {
    setEditingBatch(batch);
    setIsAdding(false);
  };

  const handleAddClick = () => {
    setIsAdding(true);
    setEditingBatch(null);
    setNewBatch({
      batch_id: '',
      start_year: '',
      end_year: '',
      department_id_fk: ''
    });
  };

  const handleSaveBatch = () => {
    if (editingBatch) {
      // Update existing batch
      setBatches(batches.map(b => 
        b.batch_id === editingBatch.batch_id ? editingBatch : b
      ));
      setEditingBatch(null);
      alert('Batch updated successfully!');
    } 
  };

  const handleDeleteBatch = (batchId) => {
    if (window.confirm('Are you sure you want to delete this batch?')) {
      setBatches(batches.filter(b => b.batch_id !== batchId));
      setEditingBatch(null);
      alert('Batch deleted successfully!');
    }
  };

  const handleInputChange = (e, isNew = false) => {
    const { name, value } = e.target;
    
    if (isAdding && isNew) {
      setNewBatch({
        ...newBatch,
        [name]: value
      });
    } else if (editingBatch) {
      setEditingBatch({
        ...editingBatch,
        [name]: value
      });
    }
  };

  const getDepartmentName = (deptId) => {
    const dept = departments.find(d => d.department_id === deptId);
    return dept ? dept.department_name : 'Unknown';
  };

  return (
    <div className="container">
      <AdminSidebar />
      <div className="main-content">
        <div className="batch-management">
          <div className="header-section">
            <h1 className="page-title">Batch Management</h1>
          </div>
          
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Batch</th>
                  <th>Year</th>
                  <th>Department</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {batches.map((batch) => (
                  <tr key={batch.batch_id}>
                    <td>{batch.batch_id}</td>
                    <td>{batch.start_year}</td>
                    <td>{getDepartmentName(batch.department_id_fk)}</td>
                    <td className="actions-cell">
                      <button 
                        className="button-style edit-button"
                        onClick={() => handleEditClick(batch)}
                      >
                        Edit
                      </button>
                      <button 
                        className="button-style delete-button"
                        onClick={() => handleDeleteBatch(batch.batch_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {batches.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">📋</div>
              </div>
            )}
          </div>
          
          {/* Edit Batch Modal */}
          {editingBatch && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h3>Edit Batch Information</h3>
                
                <div className="form-group">
                  <label className="label-style">Batch</label>
                  <input 
                    type="text" 
                    name="batch_id" 
                    value={editingBatch.batch_id}
                    className="input-style"
                    readOnly
                  />
                </div>
                
                <div className="form-group">
                  <label className="label-style">Year</label>
                  <input 
                    type="number" 
                    name="start_year" 
                    value={editingBatch.start_year}
                    onChange={(e) => handleInputChange(e)}
                    className="input-style"
                    min="2000"
                    max="2030"
                  />
                </div>
                
                
                <div className="form-group">
                  <label className="label-style">Department</label>
                  <select 
                    name="department_id_fk" 
                    value={editingBatch.department_id_fk}
                    onChange={(e) => handleInputChange(e)}
                    className="select-style"
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept.department_id} value={dept.department_id}>
                        {dept.department_name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="modal-actions">
                  <button 
                    className="button-style save-button"
                    onClick={handleSaveBatch}
                  >
                    Save Changes
                  </button>
                  <button 
                    className="button-style cancel-button"
                    onClick={() => setEditingBatch(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
           
                <div className="modal-actions">
                  <button 
                    className="button-style save-button"
                    onClick={handleSaveBatch}
                  >
                    Create Batch
                  </button>
                  <button 
                    className="button-style cancel-button"
                    onClick={() => setIsAdding(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
        </div>
  );
};

export default ViewBatch;