import React from 'react';
import mcsLogo from '../images/mcs-logo.png';

const StudentSidebar = ({ onAddInternship, studentData, onLogout }) => {
  return (
    <div style={{
      width: '250px',
      height: '100vh',
      backgroundColor: '#2c3e50',
      color: '#ecf0f1',
      padding: '20px 0',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
    }}>
      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <img 
          src={mcsLogo} 
          alt="MCS Logo" 
          style={{ width: '80px', height: 'auto' }} 
        />
        <h2 style={{ marginTop: '10px', fontSize: '18px' }}>Student Portal</h2>
      </div>

      {/* Navigation */}
      <div style={{ padding: '0 20px' }}>
        <h3 style={{
          color: '#bdc3c7',
          fontSize: '14px',
          textTransform: 'uppercase',
          marginBottom: '15px'
        }}>Navigation</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{
            padding: '10px 15px',
            borderRadius: '4px',
            backgroundColor: '#34495e',
            marginBottom: '5px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{ marginLeft: '10px' }}>Student Dashboard</span>
          </li>
          <li 
            style={{
              padding: '10px 15px',
              borderRadius: '4px',
              marginBottom: '5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              transition: 'background-color 0.3s',
              ':hover': {
                backgroundColor: '#34495e'
              }
            }}
            onClick={onAddInternship}
          >
            <span style={{ marginLeft: '10px' }}>Add Internship</span>
          </li>
        </ul>
      </div>

      {/* Student Info */}
      <div style={{
        padding: '20px',
        marginTop: 'auto',
        backgroundColor: '#34495e',
        borderRadius: '4px',
        margin: '20px'
      }}>
        <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>Student Information</h3>
        <p style={{ fontSize: '14px', margin: '5px 0' }}>Name: {studentData.name}</p>
        <p style={{ fontSize: '14px', margin: '5px 0' }}>Internships: {studentData.internshipsDone}</p>
        <p style={{ fontSize: '14px', margin: '5px 0' }}>Graduating: {studentData.graduatingYear}</p>
      </div>

      {/* Logout */}
      <button 
        onClick={onLogout}
        style={{
          backgroundColor: '#e74c3c',
          color: 'white',
          border: 'none',
          padding: '10px 15px',
          borderRadius: '4px',
          margin: '0 20px 20px',
          cursor: 'pointer',
          fontSize: '14px',
          transition: 'background-color 0.3s',
          ':hover': {
            backgroundColor: '#c0392b'
          }
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default StudentSidebar;