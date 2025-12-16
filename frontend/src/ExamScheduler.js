import { useState, useEffect } from 'react';
import './App.css';

function ExamScheduler({ onLogout, userType, toggleTheme }) {
  const [exams, setExams] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    date: '',
    time: '',
    duration: '',
    venue: ''
  });

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/exams');
      const data = await response.json();
      setExams(data);
    } catch (error) {
      console.error('Error fetching exams:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        fetchExams();
        setFormData({ title: '', subject: '', date: '', time: '', duration: '', venue: '' });
      }
    } catch (error) {
      alert('Error creating exam: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/exams/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchExams();
      }
    } catch (error) {
      alert('Error deleting exam: ' + error.message);
    }
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="app-title">Exam Scheduler</div>
        <div className="header-actions">
          <div className="profile-container">
            <button className="profile-btn" onClick={() => setShowProfile(!showProfile)}>
              👤
            </button>
            {showProfile && (
              <div className="profile-dropdown">
                <p><strong>Role:</strong> {userType === 'staff' ? 'Staff' : 'Student'}</p>
                <p><strong>Status:</strong> Active</p>
              </div>
            )}
          </div>
          <button className="theme-btn" onClick={toggleTheme}>🌓</button>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </header>
      
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Welcome, {userType === 'staff' ? 'Staff' : 'Student'}</h1>
          <p>{userType === 'staff' ? 'Manage and schedule exams' : 'View your exam schedule'}</p>
        </div>
        
        <div className="scheduler-container">
        {userType === 'staff' && (
          <div className="form-section">
            <h2>Schedule New Exam</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Exam Title</label>
                <input
                  type="text"
                  placeholder="e.g., Mid-Term Examination"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  placeholder="e.g., Mathematics"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Time</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Duration</label>
                <input
                  type="text"
                  placeholder="e.g., 2 hours"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Venue</label>
                <input
                  type="text"
                  placeholder="e.g., Room 101"
                  value={formData.venue}
                  onChange={(e) => setFormData({...formData, venue: e.target.value})}
                  required
                />
              </div>
              <button type="submit">Schedule Exam</button>
            </form>
          </div>
        )}

        <div className="exams-section">
          <h2>Scheduled Exams</h2>
          {exams.length === 0 ? (
            <div className="empty-state">
              <p>No exams scheduled yet</p>
            </div>
          ) : (
            <div className="exams-list">
              {exams.map(exam => (
                <div key={exam._id} className="exam-card">
                  <h3>{exam.title}</h3>
                  <div className="exam-details">
                    <div className="exam-detail">
                      <span>📚</span> {exam.subject}
                    </div>
                    <div className="exam-detail">
                      <span>📅</span> {new Date(exam.date).toLocaleDateString()}
                    </div>
                    <div className="exam-detail">
                      <span>🕐</span> {formatTime(exam.time)}
                    </div>
                    <div className="exam-detail">
                      <span>⏱️</span> {exam.duration}
                    </div>
                    <div className="exam-detail">
                      <span>📍</span> {exam.venue}
                    </div>
                  </div>
                  {userType === 'staff' && (
                    <button onClick={() => handleDelete(exam._id)} className="delete-btn">Delete</button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}

export default ExamScheduler;
