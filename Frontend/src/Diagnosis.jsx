import React, { useEffect, useState } from "react";
import './DiagnosisPage.css';
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
function DiagnosisPage() {
  const [diagnoses, setDiagnoses] = useState([]);
  const navigate=useNavigate();
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  useEffect(() => {
    fetch("http://localhost:6969/diagnosis")
      .then(res => res.json())
      .then(data => setDiagnoses(data));
  }, []);

  function handleDelete(id) {
    fetch(`http://localhost:6969/diagnosis/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setDiagnoses((prev) => prev.filter((item) => item._id !== id));
        } else {
          alert("Failed to delete the diagnosis.");
        }
      })
      .catch((err) => {
        console.error("Delete error:", err);
        alert("Something went wrong.");
      });
  }
  return (
    <>
    <div><Navbar /></div>
    <div className="diagnosis-page">
        <br/>
        <br/>
        <br/>
        <br/>

      <h2> Your Saved Diagnoses</h2>
      <div className="diagnosis-grid">
      {diagnoses.map((item, index) => (
  <div key={index} className="diagnosis-card">
    <img src={item.image} alt={item.title} />
    <h3>{item.title}</h3>
    <p>{item.description}</p>
    <div className="card-buttons">
    {deleteConfirmId === item._id ? (
      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <button className="btn btn-outline" onClick={() => setDeleteConfirmId(null)}>Cancel</button>
        <button
          className="delete-btn"
          onClick={() => {
            handleDelete(item._id);
            setDeleteConfirmId(null);
          }}
        >
          Confirm Delete
        </button>
      </div>
    ) : (
      <button
        className="delete-btn"
        onClick={() => setDeleteConfirmId(item._id)}
      >
        🗑 Remove
      </button>

    )}
  </div>
  </div>
))}

      <br/><br/>
      <div>
      

      </div>



    </div>
    </div>
    <Footer/>
    </>
  );
}

export default DiagnosisPage;
