import { useState } from 'react';
import './Login.css';

function Login({ onLogin, onSignUp, darkTheme, toggleTheme }) {
  const [credentials, setCredentials] = useState({ name: '', email: '', password: '', designation: 'student' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.name && credentials.email && credentials.password) {
      try {
        const response = await fetch('http://localhost:5001/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials)
        });
        const data = await response.json();
        if (response.ok) {
          onLogin(data.user);
        } else {
          alert(data.message || 'Login failed');
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }
  };

  return (
    <div className={`login-container ${darkTheme ? 'dark-theme' : ''}`}>
      <button className="theme-toggle" onClick={toggleTheme}>
        {darkTheme ? '☀️' : '🌙'}
      </button>
      <div className="login-box">
        <h1>📚 Exam Scheduler</h1>
        <p className="login-subtitle">Sign in to continue</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Role</label>
            <select 
              value={credentials.designation}
              onChange={(e) => setCredentials({...credentials, designation: e.target.value})}
              required
            >
              <option value="student">Student</option>
              <option value="staff">Staff</option>
            </select>
          </div>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={credentials.name}
              onChange={(e) => setCredentials({...credentials, name: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={credentials.email}
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              required
            />
          </div>
          <button type="submit">Login</button>
          <button type="button" onClick={onSignUp}>Create an account</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
