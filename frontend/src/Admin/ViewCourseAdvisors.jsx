// src/Admin/View_Course_Advisors.jsx
import React, { useState, useEffect } from 'react';
import AdminSidebar from './Sidebar';
import './admin.css';

const ViewCourseAdvisor = () => {
  const [advisors, setAdvisors] = useState([]);
  const [editingAdvisor, setEditingAdvisor] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newAdvisor, setNewAdvisor] = useState({
    login_id: '',
    advisor_name: '',
    batch_id_fk: '',
    password: ''
  });
  
  const [batches] = useState([
    { batch_id: 'B2020', start_year: 2020, end_year: 2024 },
    { batch_id: 'B2021', start_year: 2021, end_year: 2025 },
    { batch_id: 'B2022', start_year: 2022, end_year: 2026 },
    { batch_id: 'B2023', start_year: 2023, end_year: 2027 },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');

  // Load initial advisor data
  useEffect(() => {
    // In a real app, this would be an API call
    const mockAdvisors = [
      {
        login_id: 'adv001',
        advisor_name: 'Dr. Ayesha Khan',
        batch_id_fk: 'B2020',
        email: 'ayesha.khan@example.com',
        password: '•••••••'
      },
      {
        login_id: 'adv002',
        advisor_name: 'Sir Bilal Ahmed',
        batch_id_fk: 'B2021',
        email: 'bilal.ahmed@example.com',
        password: '•••••••'
      },
      {
        login_id: 'adv003',
        advisor_name: 'Prof. Fatima Ali',
        batch_id_fk: 'B2022',
        email: 'fatima.ali@example.com',
        password: '•••••••'
      },
      {
        login_id: 'adv004',
        advisor_name: 'Dr. Omar Hassan',
        batch_id_fk: 'B2023',
        email: 'omar.hassan@example.com',
        password: '•••••••'
      },
    ];
    setAdvisors(mockAdvisors);
  }, []);

  const handleEditClick = (advisor) => {
    setEditingAdvisor({ ...advisor });
    setIsAdding(false);
  };

  const handleAddClick = () => {
    setIsAdding(true);
    setEditingAdvisor(null);
    setNewAdvisor({
      login_id: '',
      advisor_name: '',
      batch_id_fk: '',
      password: ''
    });
  };

  const handleSaveAdvisor = () => {
    if (editingAdvisor) {
      // Update existing advisor
      setAdvisors(advisors.map(a => 
        a.login_id === editingAdvisor.login_id ? editingAdvisor : a
      ));
      setEditingAdvisor(null);
      alert('Advisor updated successfully!');
    }
  };

  const handleDeleteAdvisor = (loginId) => {
    if (window.confirm('Are you sure you want to delete this advisor?')) {
      setAdvisors(advisors.filter(a => a.login_id !== loginId));
      setEditingAdvisor(null);
      alert('Advisor deleted successfully!');
    }
  };

  const handleInputChange = (e, isNew = false) => {
    const { name, value } = e.target;
    
    if (isAdding && isNew) {
      setNewAdvisor({
        ...newAdvisor,
        [name]: value
      });
    } else if (editingAdvisor) {
      setEditingAdvisor({
        ...editingAdvisor,
        [name]: value
      });
    }
  };

  const getBatchInfo = (batchId) => {
    const batch = batches.find(b => b.batch_id === batchId);
    return batch ? `${batch.batch_id} (${batch.start_year}-${batch.end_year})` : 'Unknown Batch';
  };

  // Filter advisors based on search term
  const filteredAdvisors = advisors.filter(advisor =>
    advisor.advisor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    advisor.login_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <AdminSidebar />
      <div className="main-content">
        <div className="advisor-management">
          <div className="header-section">
            <h1 className="page-title">Course Advisor Management</h1>
          </div>
          
          <div className="search-section">
            <input
              type="text"
              placeholder="Search advisors by name or ID..."
              className="input-style search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Login ID</th>
                  <th>Advisor Name</th>
                  <th>Assigned Batch</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAdvisors.map((advisor) => (
                  <tr key={advisor.login_id}>
                    <td>{advisor.login_id}</td>
                    <td>{advisor.advisor_name}</td>
                    <td>{getBatchInfo(advisor.batch_id_fk)}</td>
                    <td className="actions-cell">
                      <button 
                        className="button-style edit-button"
                        onClick={() => handleEditClick(advisor)}
                      >
                        Edit
                      </button>
                      <button 
                        className="button-style delete-button"
                        onClick={() => handleDeleteAdvisor(advisor.login_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredAdvisors.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">👨‍🏫</div>
                <p className="empty-text">
                  {searchTerm ? 
                    "No advisors match your search" : 
                    "No advisors found. Add a new advisor to get started."
                  }
                </p>
              </div>
            )}
          </div>
          
          {/* Edit Advisor Modal */}
          {editingAdvisor && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h3>Edit Advisor Information</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="label-style">Login ID</label>
                    <input 
                      type="text" 
                      name="login_id" 
                      value={editingAdvisor.login_id}
                      className="input-style"
                      readOnly
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="label-style">Password</label>
                    <input 
                      type="password" 
                      name="password" 
                      value={editingAdvisor.password}
                      onChange={(e) => handleInputChange(e)}
                      className="input-style"
                      placeholder="Set new password"
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="label-style">Advisor Name</label>
                    <input 
                      type="text" 
                      name="advisor_name" 
                      value={editingAdvisor.advisor_name}
                      onChange={(e) => handleInputChange(e)}
                      className="input-style"
                    />
                  </div>
                  
                </div>
                
                <div className="form-group">
                  <label className="label-style">Assigned Batch</label>
                  <select 
                    name="batch_id_fk" 
                    value={editingAdvisor.batch_id_fk}
                    onChange={(e) => handleInputChange(e)}
                    className="select-style"
                  >
                    <option value="">Select Batch</option>
                    {batches.map(batch => (
                      <option key={batch.batch_id} value={batch.batch_id}>
                        {batch.batch_id} ({batch.start_year}-{batch.end_year})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="modal-actions">
                  <button 
                    className="button-style save-button"
                    onClick={handleSaveAdvisor}
                  >
                    Save Changes
                  </button>
                  <button 
                    className="button-style cancel-button"
                    onClick={() => setEditingAdvisor(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Add Advisor Modal */}
          {isAdding && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h3>Add New Course Advisor</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="label-style">Login ID</label>
                    <input 
                      type="text" 
                      name="login_id" 
                      value={newAdvisor.login_id}
                      onChange={(e) => handleInputChange(e, true)}
                      className="input-style"
                      placeholder="e.g., adv001"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="label-style">Password</label>
                    <input 
                      type="password" 
                      name="password" 
                      value={newAdvisor.password}
                      onChange={(e) => handleInputChange(e, true)}
                      className="input-style"
                      placeholder="Set password"
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="label-style">Advisor Name</label>
                    <input 
                      type="text" 
                      name="advisor_name" 
                      value={newAdvisor.advisor_name}
                      onChange={(e) => handleInputChange(e, true)}
                      className="input-style"
                      placeholder="e.g., Dr. Sarah Johnson"
                    />
                  </div>
                  
                  <div className="form-group">
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="label-style">Assigned Batch</label>
                  <select 
                    name="batch_id_fk" 
                    value={newAdvisor.batch_id_fk}
                    onChange={(e) => handleInputChange(e, true)}
                    className="select-style"
                  >
                    <option value="">Select Batch</option>
                    {batches.map(batch => (
                      <option key={batch.batch_id} value={batch.batch_id}>
                        {batch.batch_id} ({batch.start_year}-{batch.end_year})
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="modal-actions">
                  <button 
                    className="button-style save-button"
                    onClick={handleSaveAdvisor}
                  >
                    Create Advisor
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewCourseAdvisor;