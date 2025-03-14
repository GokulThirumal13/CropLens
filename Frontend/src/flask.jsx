import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setResult(null);
  };

  const handlePredict = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setResult(response.data);
    } catch (error) {
      alert('Prediction failed: ' + error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>🌿 Plant Disease Classifier</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handlePredict} disabled={loading || !image}>
        {loading ? 'Predicting...' : 'Predict'}
      </button>

      {result && (
        <div style={styles.result}>
          <p><strong>Prediction:</strong> {result.prediction}</p>
          <p><strong>Confidence:</strong> {(result.confidence * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 400,
    margin: '50px auto',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    border: '1px solid #ccc',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  result: {
    marginTop: 20,
    background: '#e3f2fd',
    padding: 10,
    borderRadius: 8,
  }
};

export default App;
