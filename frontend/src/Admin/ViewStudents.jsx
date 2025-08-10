// src/Admin/View_Students.jsx
import React, { useState, useEffect } from 'react';
import AdminSidebar from './Sidebar';
import './admin.css';

const ViewStudentsAdmin = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [batchFilter, setBatchFilter] = useState('');
  const [internshipFilter, setInternshipFilter] = useState('all');
  
  const [batches] = useState([
    { batch_id: 'B2020', start_year: 2020, end_year: 2024 },
    { batch_id: 'B2021', start_year: 2021, end_year: 2025 },
    { batch_id: 'B2022', start_year: 2022, end_year: 2026 },
    { batch_id: 'B2023', start_year: 2023, end_year: 2027 },
  ]);

  // Load initial student data
  useEffect(() => {
    // In a real app, this would be an API call
    const mockStudents = [
  {
    id: 'S001',
    login_id: 'stu001',
    student_name: 'Ali Raza',
    registration_number: 'FA20-BSE-001',
    batch_id_fk: 'B2020',
    email: 'ali.raza@example.com',
    cgpa: 3.7,
    internship: {
      organization: 'Tech Solutions',
      type: 'Summer Internship',
      duration: '6 weeks',
      status: 'Completed'
    },
    internshipRecords: [
      {
        durationWeeks: 6,
        yearOfCompletion: 2023,
        internshipType: 'Summer Internship',
        organization: 'Tech Solutions',
        reportingOfficer: 'John Smith',
        contact: '03001234567',
        email: 'john.smith@techsolutions.com',
        website: 'https://techsolutions.com',
        evidences: '/downloads/evidence1.pdf',
        survey1: '/downloads/survey1.pdf',
        survey2: '/downloads/survey2.pdf',
        survey3: '/downloads/survey3.pdf'
      }
    ],
    cv: 'ali_raza_cv.pdf'
  },
  {
    id: 'S002',
    login_id: 'stu002',
    student_name: 'Sara Khan',
    registration_number: 'FA20-BSE-002',
    batch_id_fk: 'B2020',
    email: 'sara.khan@example.com',
    cgpa: 3.9,
    internship: {
      organization: 'InnovateX',
      type: 'Research Internship',
      duration: '8 weeks',
      status: 'Completed'
    },
    internshipRecords: [
      {
        durationWeeks: 8,
        yearOfCompletion: 2023,
        internshipType: 'Research Internship',
        organization: 'InnovateX',
        reportingOfficer: 'Sarah Johnson',
        contact: '03007654321',
        email: 'sarah.j@innovatex.com',
        website: 'https://innovatex.com',
        evidences: '/downloads/evidence2.pdf',
        survey1: '/downloads/survey4.pdf',
        survey2: '/downloads/survey5.pdf',
        survey3: '/downloads/survey6.pdf'
      }
    ],
    cv: 'sara_khan_cv.pdf'
  }
];
    setStudents(mockStudents);
  }, []);

  const handleViewClick = (student) => {
    setSelectedStudent(student);
    setIsEditing(false);
  };

  const handleEditClick = (student) => {
    setSelectedStudent({...student});
    setIsEditing(true);
  };

  const handleSaveStudent = () => {
    // Update student in the list
    setStudents(students.map(s => 
      s.id === selectedStudent.id ? selectedStudent : s
    ));
    setSelectedStudent(null);
    alert('Student information updated successfully!');
  };

  const handleDeleteStudent = (studentId) => {
    if (window.confirm('Are you sure you want to delete this student record?')) {
      setStudents(students.filter(s => s.id !== studentId));
      setSelectedStudent(null);
      alert('Student record deleted successfully!');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedStudent({
      ...selectedStudent,
      [name]: value
    });
  };

  const handleInternshipChange = (e) => {
    const { name, value } = e.target;
    setSelectedStudent({
      ...selectedStudent,
      internship: {
        ...selectedStudent.internship,
        [name]: value
      }
    });
  };

  const getBatchInfo = (batchId) => {
    const batch = batches.find(b => b.batch_id === batchId);
    return batch ? `${batch.batch_id} (${batch.start_year}-${batch.end_year})` : 'Unknown Batch';
  };

  // Filter students based on search and filters
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.registration_number.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBatch = batchFilter ? student.batch_id_fk === batchFilter : true;
    
    const matchesInternship = 
      internshipFilter === 'all' ? true : 
      internshipFilter === 'has' ? student.internship !== null :
      student.internship === null;
    
    return matchesSearch && matchesBatch && matchesInternship;
  });

  const downloadCV = (cvFilename) => {
    alert(`Downloading CV: ${cvFilename}`);
    // In a real app, this would trigger a download
  };

  return (
    <div className="container">
      <AdminSidebar />
      <div className="main-content">
        <div className="student-management">
          <div className="header-section">
            <h1 className="page-title">Student Management</h1>
            <div className="summary-stats">
              <span>Total Students: {students.length}</span>
              <span>With Internship: {students.filter(s => s.internship).length}</span>
            </div>
          </div>
          
          <div className="filters-section">
            <div className="search-filter">
              <input
                type="text"
                placeholder="Search students by name or ID..."
                className="input-style search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="filter-group">
              <label className="filter-label">Batch:</label>
              <select
                className="select-style filter-select"
                value={batchFilter}
                onChange={(e) => setBatchFilter(e.target.value)}
              >
                <option value="">All Batches</option>
                {batches.map(batch => (
                  <option key={batch.batch_id} value={batch.batch_id}>
                    {batch.batch_id} ({batch.start_year}-{batch.end_year})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label className="filter-label">Internship:</label>
              <select
                className="select-style filter-select"
                value={internshipFilter}
                onChange={(e) => setInternshipFilter(e.target.value)}
              >
                <option value="all">All Students</option>
                <option value="has">With Internship</option>
                <option value="none">Without Internship</option>
              </select>
            </div>
          </div>
          
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Reg No</th>
                  <th>Student Name</th>
                  <th>Batch</th>
                  <th>Internship</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>{student.registration_number}</td>
                    <td>{student.student_name}</td>
                    <td>{getBatchInfo(student.batch_id_fk)}</td>
                    <td>
                      {student.internship ? (
                        <div className="internship-status completed">
                          <span className="status-icon">✓</span>
                          {student.internship.status}
                        </div>
                      ) : (
                        <div className="internship-status not-started">
                          <span className="status-icon">!</span>
                          Not Started
                        </div>
                      )}
                    </td>
                    <td className="actions-cell">
                      <button 
                        className="button-style view-button"
                        onClick={() => handleViewClick(student)}
                      >
                        View
                      </button>
                      <button 
                        className="button-style edit-button"
                        onClick={() => handleEditClick(student)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredStudents.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">👨‍🎓</div>
                <p className="empty-text">
                  {searchTerm || batchFilter || internshipFilter !== 'all' ? 
                    "No students match your search criteria" : 
                    "No students found. Add students to get started."
                  }
                </p>
              </div>
            )}
          </div>
          
          {/* Student Detail Modal */}
          {selectedStudent && !isEditing && (
            <div className="modal-overlay">
              <div className="modal-content wide-modal">
                <h3>Student Details: {selectedStudent.student_name}</h3>
                
                <div className="detail-section">
                  <div className="detail-group">
                    <h4 className="detail-heading">Personal Information</h4>
                    <div className="detail-row">
                      <span className="detail-label">Registration Number:</span>
                      <span className="detail-value">{selectedStudent.registration_number}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Batch:</span>
                      <span className="detail-value">{getBatchInfo(selectedStudent.batch_id_fk)}</span>
                    </div>
                  </div>
                  
                  <div className="detail-group">
                    <h4 className="detail-heading">CV Document</h4>
                    <div className="cv-document">
                      <div className="cv-icon">📄</div>
                      <div className="cv-info">
                        <div className="cv-name">{selectedStudent.cv || 'No CV uploaded'}</div>
                        {selectedStudent.cv && (
                          <button 
                            className="button-style download-button"
                            onClick={() => downloadCV(selectedStudent.cv)}
                          >
                            Download CV
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {selectedStudent.internshipRecords && Array.isArray(selectedStudent.internshipRecords) ? (
  selectedStudent.internshipRecords.length > 0 ? (
    <div className="detail-section">
      <h4 className="detail-heading">Internship Details</h4>
      <table className="internship-details-table">
        <thead>
          <tr>
            <th>Weeks</th>
            <th>Year</th>
            <th>Type</th>
            <th>Organization</th>
            <th>Reporting Officer</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Website</th>
            <th>Evidence</th>
            <th>Survey 1</th>
            <th>Survey 2</th>
            <th>Survey 3</th>
          </tr>
        </thead>
        <tbody>
          {selectedStudent.internshipRecords.map((rec, i) => (
            <tr key={i}>
              <td>{rec.durationWeeks}</td>
              <td>{rec.yearOfCompletion}</td>
              <td>{rec.internshipType}</td>
              <td>{rec.organization}</td>
              <td>{rec.reportingOfficer}</td>
              <td>{rec.contact}</td>
              <td>{rec.email}</td>
              <td><a href={rec.website} target="_blank" rel="noopener noreferrer">Link</a></td>
              <td><a href={rec.evidences} download>Evidence</a></td>
              <td><a href={rec.survey1} download>S1</a></td>
              <td><a href={rec.survey2} download>S2</a></td>
              <td><a href={rec.survey3} download>S3</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="detail-section">
      <h4 className="detail-heading">Internship Status</h4>
      <div className="no-internship">
        <div className="warning-icon">⚠️</div>
        <p>This student has not started an internship yet.</p>
      </div>
    </div>
  )
) : (
  <div className="detail-section">
    <h4 className="detail-heading">Internship Status</h4>
    <div className="no-internship">
      <div className="warning-icon">⚠️</div>
      <p>No internship data available for this student.</p>
    </div>
  </div>
)}

                
                <div className="modal-actions">
                  <button 
                    className="button-style close-button"
                    onClick={() => setSelectedStudent(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Edit Student Modal */}
          {selectedStudent && isEditing && (
            <div className="modal-overlay">
              <div className="modal-content wide-modal">
                <h3>Edit Student: {selectedStudent.student_name}</h3>
                
                <div className="form-section">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="label-style">Student Name</label>
                      <input
                        type="text"
                        name="student_name"
                        value={selectedStudent.student_name}
                        onChange={handleInputChange}
                        className="input-style"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="label-style">Registration Number</label>
                      <input
                        type="text"
                        name="registration_number"
                        value={selectedStudent.registration_number}
                        onChange={handleInputChange}
                        className="input-style"
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    
                    <div className="form-group">
                      <label className="label-style">Batch</label>
                      <select
                        name="batch_id_fk"
                        value={selectedStudent.batch_id_fk}
                        onChange={handleInputChange}
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
                  </div>
                  
                  <div className="form-group">
                  </div>
                  
                  <div className="form-section-header">
                    <h4>Internship Information</h4>
                    {!selectedStudent.internship && (
                      <button 
                        className="button-style small-button"
                        onClick={() => setSelectedStudent({
                          ...selectedStudent,
                          internship: {
                            organization: '',
                            type: '',
                            duration: '',
                            status: 'Pending'
                          }
                        })}
                      >
                        Add Internship
                      </button>
                    )}
                  </div>
                  
                  {selectedStudent.internship && (
                    <div className="form-row">
                      <div className="form-group">
                        <label className="label-style">Organization</label>
                        <input
                          type="text"
                          name="organization"
                          value={selectedStudent.internship.organization}
                          onChange={handleInternshipChange}
                          className="input-style"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="label-style">Type</label>
                        <select
                          name="type"
                          value={selectedStudent.internship.type}
                          onChange={handleInternshipChange}
                          className="select-style"
                        >
                          <option value="">Select Type</option>
                          <option value="Summer Internship">Summer Internship</option>
                          <option value="Research Internship">Research Internship</option>
                          <option value="Industrial Training">Industrial Training</option>
                          <option value="Part-time Internship">Part-time Internship</option>
                        </select>
                      </div>
                    </div>
                  )}
                  
                  {selectedStudent.internship && (
                    <div className="form-row">
                      <div className="form-group">
                        <label className="label-style">Duration</label>
                        <input
                          type="text"
                          name="duration"
                          value={selectedStudent.internship.duration}
                          onChange={handleInternshipChange}
                          className="input-style"
                          placeholder="e.g., 8 weeks"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label className="label-style">Status</label>
                        <select
                          name="status"
                          value={selectedStudent.internship.status}
                          onChange={handleInternshipChange}
                          className="select-style"
                        >
                          <option value="Pending Approval">Pending Approval</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="modal-actions">
                  <button 
                    className="button-style save-button"
                    onClick={handleSaveStudent}
                  >
                    Save Changes
                  </button>
                  <button 
                    className="button-style delete-button"
                    onClick={() => handleDeleteStudent(selectedStudent.id)}
                  >
                    Delete Student
                  </button>
                  <button 
                    className="button-style cancel-button"
                    onClick={() => setSelectedStudent(null)}
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

export default ViewStudentsAdmin;