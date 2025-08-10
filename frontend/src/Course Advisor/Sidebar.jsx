import React from 'react';
import mcsLogo from '../images/mcs-logo.png';

import { Link } from 'react-router-dom';

const Sidebar = () => {
  const styles = {
    sidebar: {
      width: '280px',
      height: '100vh',
      backgroundColor: '#1e2a38',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      boxShadow: '2px 0 10px rgba(0,0,0,0.2)',
    },
    logo: {
      width: '80px',
      marginBottom: '20px',
    },
    header: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    title: {
      fontSize: '18px',
      margin: 0,
    },
    subtitle: {
      fontSize: '14px',
      fontWeight: '400',
      color: '#ccc',
      marginTop: '4px',
    },
    advisorInfo: {
      width: '100%',
      fontSize: '14px',
      lineHeight: '1.6',
      backgroundColor: '#2f3b4c',
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '20px',
    },
    nav: {
      width: '100%',
      marginBottom: 'auto',
    },
    navItem: {
      backgroundColor: '#34495e',
      padding: '10px 15px',
      borderRadius: '6px',
      textAlign: 'center',
      cursor: 'pointer',
      fontSize: '14px',
      marginBottom: '10px',
      transition: 'background-color 0.3s',
    },
    footer: {
      width: '100%',
      marginBottom: '40px',
    },
    logoutBtn: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#e74c3c',
      border: 'none',
      borderRadius: '6px',
      color: 'white',
      cursor: 'pointer',
      fontSize: '14px',
    },
  };

  return (
    <aside style={styles.sidebar}>
      <img src={mcsLogo} alt="MCS Logo" style={styles.logo} />
      <div style={styles.header}>
        <h2 style={styles.title}>Internship Management</h2>
        <h4 style={styles.subtitle}>Course Advisor Panel</h4>
      </div>

      <div style={styles.advisorInfo}>
        <p><strong>Name:</strong> Dr. Ayesha Khan</p>
        <p><strong>Course:</strong> Software Engineering</p>
        <p><strong>Department:</strong> Computer Science</p>
      </div>

      <nav style={styles.nav}>
        <div style={styles.navItem}>Dashboard</div>
      </nav>

<div style={styles.footer}>
  <Link to="/login/teacher">
    <button style={styles.logoutBtn}>Logout</button>
  </Link>
</div>

    </aside>
  );
};

export default Sidebar;
