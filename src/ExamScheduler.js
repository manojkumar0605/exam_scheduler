import { useState } from 'react';
import './App.css';

function ExamScheduler({ onLogout, userType }) {
  const [exams, setExams] = useState([]);
  const [formData, setFormData] = useState({
    subject: '',
    date: '',
    time: '',
    duration: '',
    room: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setExams([...exams, { ...formData, id: Date.now() }]);
    setFormData({ subject: '', date: '', time: '', duration: '', room: '' });
  };

  const handleDelete = (id) => {
    setExams(exams.filter(exam => exam.id !== id));
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
              <input
                type="text"
                placeholder="Room Number"
                value={formData.room}
                onChange={(e) => setFormData({...formData, room: e.target.value})}
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
                <div key={exam.id} className="exam-card">
                  <h3>{exam.subject}</h3>
                  <p>📅 Date: {exam.date}</p>
                  <p>🕐 Time: {exam.time}</p>
                  <p>⏱️ Duration: {exam.duration}</p>
                  <p>🚪 Room: {exam.room}</p>
                  {userType === 'staff' && (
                    <button onClick={() => handleDelete(exam.id)} className="delete-btn">Delete</button>
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
