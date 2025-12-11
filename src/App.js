import { useState } from 'react';
import Login from './Login';
import ExamScheduler from './ExamScheduler';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('');

  const handleLogin = (type) => {
    setUserType(type);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType('');
  };

  return (
    <>
      {isLoggedIn ? <ExamScheduler onLogout={handleLogout} userType={userType} /> : <Login onLogin={handleLogin} />}
    </>
  );
}

export default App;
