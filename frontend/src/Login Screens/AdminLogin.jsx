import React, { useState } from 'react';
import './AdminLogin.css';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate
import bcrypt from 'bcryptjs';
import nustLogo from '../images/nust-logo.png';
import mcsLogo from '../images/mcs-logo.png';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // ✅ Create navigate function

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      console.log('Entered Username:', username);
      console.log('Hashed Password:', hashedPassword);

      // alert(`Admin Login Successful\nUsername: ${username}\nEncrypted Password: ${hashedPassword}`);
 


    } catch (error) {
      console.error('Error encrypting password:', error);
    }
       navigate('/admin/entity'); // Change this path to your desired route
  };

  return (
    <div className="login-container">
      <div className="login-box admin-theme">
        <div className="login-box-header">
          <img src={nustLogo} alt="NUST Logo" className="nust-logo" />
          <img src={mcsLogo} alt="MCS Logo" className="mcs-logo" />

        </div>

        <div className="login-header">
          <h1>Admin Login</h1>
          <p>Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin}>
          <label htmlFor="username">UserName</label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
