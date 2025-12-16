import { useState, useEffect } from 'react';
import './App.css';

function ExamScheduler({ onLogout, userType }) {
  const [exams, setExams] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    date: '',
    time: '',
    duration: ''
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
        setFormData({ title: '', subject: '', date: '', time: '', duration: '' });
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

  return (
    <div className="App">
      <button className="logout-btn" onClick={onLogout}> Logout</button>
      <h1>Exam Scheduler - {userType === 'staff' ? 'Staff' : 'Student'}</h1>
      
      <div className="scheduler-container">
        {userType === 'staff' && (
          <div className="form-section">
            <h2>Schedule New Exam</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                required
              />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Duration (e.g., 2 hours)"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                required
              />
              <button type="submit">Schedule Exam</button>
            </form>
          </div>
        )}

        <div className="exams-section">
          <h2>Scheduled Exams</h2>
          {exams.length === 0 ? (
            <p>No exams scheduled yet</p>
          ) : (
            <div className="exams-list">
              {exams.map(exam => (
                <div key={exam._id} className="exam-card">
                  <h3>{exam.title}</h3>
                  <p>📚 Subject: {exam.subject}</p>
                  <p>📅 Date: {new Date(exam.date).toLocaleDateString()}</p>
                  <p>🕐 Time: {exam.time}</p>
                  <p>⏱️ Duration: {exam.duration}</p>
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
  );
}

export default ExamScheduler;
