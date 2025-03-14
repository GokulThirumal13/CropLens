import React, { useState } from 'react';
import './AddDiseaseForm.css'; 
import Navbar from './navbar';
import Footer from './Footer';

function AddDiseaseForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newDisease = { title, description, image };

    try {
      const res = await fetch("http://localhost:6969/add-disease", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDisease),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(" Disease added successfully");
        setTitle('');
        setDescription('');
        setImage('');
      } else {
        setMessage(data.message || "Failed to add disease");
      }
    } catch (error) {
      setMessage(" Server error");
    }
  };

  return (
    <>
      <Navbar />
      <div className="add-disease-container">
        <br/><br/>
        <h2>Add New Disease</h2>
        <form onSubmit={handleSubmit} className="add-disease-form">
          <label>Disease Title</label>
          <input
            type="text"
            value={title}
            placeholder="Enter title (e.g., Red Rot)"
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Description</label>
          <textarea
            value={description}
            placeholder="Description of the disease"
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label>Image URL</label>
          <input
            type="text"
            value={image}
            placeholder="https://example.com/image.jpg"
            onChange={(e) => setImage(e.target.value)}
            required
          />

          {image && <img src={image} alt="Preview" className="preview-image" />}

          <button className="btn btn-primary" type="submit">Submit</button>
          {message && <p className="status-message">{message}</p>}
        </form>
      </div>
      <Footer />
    </>
  );
}

export default AddDiseaseForm;
