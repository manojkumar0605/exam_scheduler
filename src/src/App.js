import { useState, useEffect } from 'react';
import Login from './Login';
import Register from './Register';
import ExamScheduler from './ExamScheduler';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  useEffect(() => {
    document.body.className = darkTheme ? 'dark-theme' : 'light-theme';
  }, [darkTheme]);

  const handleLogin = (user) => {
    setUserType(user.designation);
    setIsLoggedIn(true);
  };

  const handleRegister = (formData) => {
    setUserType(formData.designation);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType('');
  };

  if (isLoggedIn) {
    return <ExamScheduler onLogout={handleLogout} userType={userType} darkTheme={darkTheme} toggleTheme={() => setDarkTheme(!darkTheme)} />;
  }

  return showRegister ? 
    <Register onRegister={handleRegister} onBackToLogin={() => setShowRegister(false)} darkTheme={darkTheme} toggleTheme={() => setDarkTheme(!darkTheme)} /> : 
    <Login onLogin={handleLogin} onSignUp={() => setShowRegister(true)} darkTheme={darkTheme} toggleTheme={() => setDarkTheme(!darkTheme)} />;
}

export default App;