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
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
          <select 
            value={formData.designation}
            onChange={(e) => setFormData({...formData, designation: e.target.value})}
            required
          >
            <option value="student">Student</option>
            <option value="staff">Staff</option>
          </select>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          <button type="submit">Register</button>
          <button type="button" onClick={onBackToLogin}>Back to Login</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
