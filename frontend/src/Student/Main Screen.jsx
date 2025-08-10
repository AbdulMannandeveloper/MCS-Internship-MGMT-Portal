import React, { useState } from 'react';
import StudentSidebar from './Sidebar';
import InternshipForm from './Internship Form';

const StudentMain = () => {
  const [showForm, setShowForm] = useState(false);
  const [cvUploaded, setCvUploaded] = useState(false); // This would come from DB in real app
  const [internships, setInternships] = useState([]); // This would come from DB in real app

  // Sample student data
  const studentData = {
    name: "John Doe",
    registrationNumber: "REG-2022-001",
    batch: "2022",
    department: "Computer Science",
    internshipsDone: 2,
    graduatingYear: 2026
  };

  const handleAddInternship = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleSubmitInternship = (data) => {
    // In a real app, this would send data to the backend
    setInternships([...internships, data]);
    setShowForm(false);
  };

  const handleLogout = () => {
    // Handle logout logic
    console.log("User logged out");
  };

  const handleCvAction = () => {
    if (cvUploaded) {
      // Handle CV download
      console.log("Downloading CV...");
    } else {
      // Handle CV upload
      setCvUploaded(true);
      console.log("Uploading CV...");
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <StudentSidebar 
        onAddInternship={handleAddInternship} 
        studentData={studentData} 
        onLogout={handleLogout} 
      />

      <div style={{ flex: 1, padding: '30px', backgroundColor: '#f5f6fa' }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '25px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          marginBottom: '30px'
        }}>
          <h1 style={{ 
            marginTop: 0,
            color: '#2c3e50',
            borderBottom: '1px solid #eee',
            paddingBottom: '15px'
          }}>
            Student Dashboard
          </h1>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            margin: '20px 0'
          }}>
            <div>
              <h3 style={{ color: '#7f8c8d', marginBottom: '5px' }}>Name</h3>
              <p style={{ fontSize: '18px', margin: 0 }}>{studentData.name}</p>
            </div>
            <div>
              <h3 style={{ color: '#7f8c8d', marginBottom: '5px' }}>Registration Number</h3>
              <p style={{ fontSize: '18px', margin: 0 }}>{studentData.registrationNumber}</p>
            </div>
            <div>
              <h3 style={{ color: '#7f8c8d', marginBottom: '5px' }}>Batch</h3>
              <p style={{ fontSize: '18px', margin: 0 }}>{studentData.batch}</p>
            </div>
            <div>
              <h3 style={{ color: '#7f8c8d', marginBottom: '5px' }}>Department</h3>
              <p style={{ fontSize: '18px', margin: 0 }}>{studentData.department}</p>
            </div>
          </div>

          <div style={{ margin: '30px 0' }}>
            <button 
              onClick={handleCvAction}
              style={{
                backgroundColor: cvUploaded ? '#3498db' : '#2ecc71',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'background-color 0.3s',
                ':hover': {
                  backgroundColor: cvUploaded ? '#2980b9' : '#27ae60'
                }
              }}
            >
              {cvUploaded ? 'Download CV' : 'Upload CV'}
            </button>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          padding: '25px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h2 style={{ margin: 0 }}>Internship Status</h2>
            {internships.length > 0 && (
              <span style={{
                backgroundColor: '#ecf0f1',
                padding: '5px 10px',
                borderRadius: '20px',
                fontSize: '14px'
              }}>
                {internships.length} internship(s) recorded
              </span>
            )}
          </div>

          {internships.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#7f8c8d'
            }}>
              <p style={{ fontSize: '18px' }}>No internships recorded yet.</p>
              <p>Click "Add Internship" in the sidebar to get started.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '14px'
              }}>
                <thead>
                  <tr style={{
                    backgroundColor: '#2c3e50',
                    color: 'white'
                  }}>
                    <th style={{ padding: '12px 15px', textAlign: 'left' }}>Type</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left' }}>Reporting Officer</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left' }}>Organization</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left' }}>Contact</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left' }}>Email</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left' }}>Website</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left' }}>Duration</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left' }}>Year</th>
                    <th style={{ padding: '12px 15px', textAlign: 'left' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {internships.map((internship, index) => (
                    <tr key={index} style={{
                      borderBottom: '1px solid #ddd',
                      ':hover': {
                        backgroundColor: '#f5f5f5'
                      }
                    }}>
                      <td style={{ padding: '12px 15px' }}>{internship.type}</td>
                      <td style={{ padding: '12px 15px' }}>{internship.officer}</td>
                      <td style={{ padding: '12px 15px' }}>{internship.organization}</td>
                      <td style={{ padding: '12px 15px' }}>{internship.contact}</td>
                      <td style={{ padding: '12px 15px' }}>{internship.email}</td>
                      <td style={{ padding: '12px 15px' }}>
                        {internship.website ? (
                          <a href={internship.website} target="_blank" rel="noopener noreferrer" style={{
                            color: '#3498db',
                            textDecoration: 'none',
                            ':hover': {
                              textDecoration: 'underline'
                            }
                          }}>
                            Visit
                          </a>
                        ) : 'N/A'}
                      </td>
                      <td style={{ padding: '12px 15px' }}>{internship.duration} weeks</td>
                      <td style={{ padding: '12px 15px' }}>{internship.year}</td>
                      <td style={{ padding: '12px 15px' }}>
                        <button style={{
                          backgroundColor: '#3498db',
                          color: 'white',
                          border: 'none',
                          padding: '5px 10px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          marginRight: '5px',
                          transition: 'background-color 0.3s',
                          ':hover': {
                            backgroundColor: '#2980b9'
                          }
                        }}>
                          Download Files
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showForm && (
        <InternshipForm 
          onClose={handleCloseForm} 
          onSubmit={handleSubmitInternship} 
        />
      )}
    </div>
  );
};

export default StudentMain;