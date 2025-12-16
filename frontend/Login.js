import { useState } from 'react';
import './Login.css';

function Login({ onLogin, onSignUp }) {
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
    <div className="login-container">
      <div className="login-box">
        <h1>Exam Scheduler Login</h1>
        <form onSubmit={handleSubmit}>
          <select 
            value={credentials.designation}
            onChange={(e) => setCredentials({...credentials, designation: e.target.value})}
            required
          >
            <option value="student">Student</option>
            <option value="staff">Staff</option>
          </select>
          <input
            type="text"
            placeholder="Name"
            value={credentials.name}
            onChange={(e) => setCredentials({...credentials, name: e.target.value})}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={credentials.email}
            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            required
          />
          <button type="submit">Login</button>
          <button type="button" onClick={onSignUp}>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
