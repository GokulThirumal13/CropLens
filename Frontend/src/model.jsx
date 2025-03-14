import React, { useState } from 'react';
import './DiagnoseModal.css';

function DiagnoseModal({ onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newDiagnosis = { title, description, image };

    try {
      const res = await fetch('http://localhost:6969/submit-diagnosis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDiagnosis),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Diagnosis submitted successfully!');
        setTitle('');
        setDescription('');
        setImage('');
        setTimeout(() => {
          setMessage('');
          onClose();
        }, 1500);
      } else {
        setMessage(data.message || 'Submission failed');
      }
    } catch (error) {
      setMessage('Server error, please try again later.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Submit Diagnosis</h2>

        <form onSubmit={handleSubmit} className="diagnose-form">
          <label>Title of Disease</label>
          <input
            type="text"
            placeholder="e.g. Yellow Stripe Virus"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Description</label>
          <textarea
            placeholder="Describe the symptom"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label>Image URL</label>
          <input
            type="text"
            placeholder="Paste image link here"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />

          {image && (
            <img src={image} alt="Preview" className="preview-img" />
          )}

          <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
            Submit
          </button>
        </form>

        {message && <p style={{ marginTop: '15px' }}>{message}</p>}
      </div>
    </div>
  );
}

export default DiagnoseModal;
