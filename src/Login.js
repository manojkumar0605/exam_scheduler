import { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({ username: '', password: '', userType: 'student' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username && credentials.password) {
      onLogin(credentials.userType);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Exam Scheduler Login</h1>
        <form onSubmit={handleSubmit}>
          <select 
            value={credentials.userType}
            onChange={(e) => setCredentials({...credentials, userType: e.target.value})}
            required
          >
            <option value="student">Student</option>
            <option value="staff">Staff</option>
          </select>
          <input
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) => setCredentials({...credentials, username: e.target.value})}
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
        </form>
      </div>
    </div>
  );
}

export default Login;
