import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import Footer from './Footer';
import './Treatment.css';
import Countdowntimer from './Countdowntimer';

function Treatment() {
  const [title, setTitle] = useState('');
  const [disease, setDisease] = useState('');
  const [date, setDate] = useState('');
  const [treatments, setTreatments] = useState([]);
  const [expiredTreatments, setExpiredTreatments] = useState([]);

  
async function fetchTreatments() {
    const res = await fetch("http://localhost:6969/add-treatment");
    const data = await res.json();
    setTreatments(data);
  };

  useEffect(() => {
    fetchTreatments();
  }, []);

  const handleSubmit = async () => {
    const payload = {
      title,
      disease,
      date,
      user: localStorage.getItem("username") || "Anonymous",
    };

    localStorage.setItem("Date",date);
    const res = await fetch("http://localhost:6969/add-treatment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    alert(data.message);
    setTitle('');
    setDisease('');
    setDate('');
    fetchTreatments();
  };

  const markCompleted = async (id) => {
    await fetch(`http://localhost:6969/add-treatment/${id}`, {
      method: "PUT"
    });
    fetchTreatments();
  };

  return (
    <>
      <Navbar />
      <div className="treatment-page">
        <div className="treatment-form">
          <h2>Treatment Scheduler</h2>
          <input
            type="text"
            placeholder="Treatment Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Disease Name"
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}

          />
          
          <button onClick={handleSubmit}>Add Treatment</button>
        </div>

        <div className="treatment-list-container">
          <h2>Upcoming Treatments</h2>
          {treatments.length === 0 ? (
            <p>No treatments scheduled.</p>
          ) : (
            <div className="treatment-cards">
              {treatments.map((t) => (
                <div className={`treatment-card ${t.completed ? "done" : ""}`} key={t._id}>
                  <h3>{t.title}</h3>
                  <p><strong>Disease:</strong> {t.disease}</p>
                  <p><strong>Date:</strong> {t.date}</p>
                  <Countdowntimer targetDate={t.date}/>
                  
                  <p><strong>By:</strong> {t.user}</p>
                  {!t.completed && (
                    <button onClick={() => markCompleted(t._id)}>Mark as Done</button>
                  )}
                  {t.completed && <span className="done-badge"> Completed</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Treatment;
