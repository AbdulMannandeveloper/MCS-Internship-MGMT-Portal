import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs'; // ✅ Import bcrypt

const AdminSignUp = () => {
  const [form, setForm] = useState({ username: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(form.password, saltRounds);

      // Simulate API payload
      const payload = {
        username: form.username,
        password: hashedPassword
      };

      console.log("📦 Data to send over API:", payload);

      alert("Admin registered successfully (simulation)");
      navigate('/login/admin');
    } catch (err) {
      console.error("Error hashing password:", err);
      alert("An error occurred while processing your request.");
    }
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>Admin Sign Up</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          style={styles.input}
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          style={styles.input}
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit" style={styles.button}>Sign Up</button>
      </form>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    background: '#f1f5f9',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '4rem',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '2rem',
    color: '#1f2937',
  },
  form: {
    width: '100%',
    maxWidth: '400px',
    background: '#fff',
    padding: '2rem',
    borderRadius: '0.5rem',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    marginBottom: '1rem',
    border: '1px solid #ccc',
    borderRadius: '0.375rem',
    fontSize: '1rem'
  },
  button: {
    backgroundColor: '#4f46e5',
    color: 'white',
    padding: '0.75rem',
    width: '100%',
    border: 'none',
    borderRadius: '0.375rem',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};

export default AdminSignUp;
