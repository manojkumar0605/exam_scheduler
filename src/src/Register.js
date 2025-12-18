import { useState } from 'react';
import './Login.css';

function Register({ onRegister, onBackToLogin }) {
  const [formData, setFormData] = useState({ 
    name: '', 
    designation: 'student', 
    email: '', 
    password: '' 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.password) {
      try {
        const response = await fetch('http://localhost:5001/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (response.ok) {
          alert('Registration successful!');
          onRegister(formData);
        } else {
          alert(data.message || 'Registration failed');
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Create Account</h1>
        <p className="login-subtitle">Join the exam scheduler platform</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select 
              value={formData.designation}
              onChange={(e) => setFormData({...formData, designation: e.target.value})}
              required
            >
              <option value="student">Student</option>
              <option value="staff">Staff</option>
            </select>
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          <button type="submit">Create Account</button>
          <button type="button" onClick={onBackToLogin}>Already have an account? Login</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
