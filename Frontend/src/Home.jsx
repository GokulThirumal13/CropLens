import React, { useEffect, useState } from "react";
import "./App.css";
import Footer from "./Footer";
import { useNavigate ,Link} from "react-router-dom";
import DiagnoseModal from "./model";
import Navbar from "./navbar";
import Welcome from "./Welcome";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState("All Problems");
  const [diseases, setDiseases] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [reportName, setReportName] = useState('');
  const [reportLocation, setReportLocation] = useState('');
  const [reportDisease, setReportDisease] = useState('');
  const [reportNotes, setReportNotes] = useState('');

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("subscriptionActive");
    localStorage.removeItem("planName");
    navigate("/welcome");
  };
  const [isSubscribed, setIsSubscribed] = useState(localStorage.getItem("subscriptionActive") === "true");

  useEffect(() => {
    setIsSubscribed(localStorage.getItem("subscriptionActive") === "true");
  }, []);

  useEffect(() => {
    async function fetchDiseases() {
      let endpoint = "";
      switch (selectedTab) {
        case "Red Rot":
          endpoint = "redRot";
          break;
        case "Yellow":
          endpoint = "yellow";
          break;
        case "Rust":
          endpoint = "rust";
          break;
        case "Mosaic":
          endpoint = "mosaic";
          break;
        default:
          endpoint = "all"; 
          break;
      }

      try {
        const res = await fetch(`http://localhost:6969/${endpoint}?page=${page}&limit=4`);
        const data = await res.json();
        setDiseases(data.data);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Error fetching diseases:", err);
      }
    }

    fetchDiseases();
  }, [selectedTab, page]);

  function handleSubmitReport() {
    const newReport = {
      name: reportName,
      location: reportLocation,
      disease: reportDisease,
      notes: reportNotes,
    };

    fetch("http://localhost:6969/submit-report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReport)
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        setReportName('');
        setReportLocation('');
        setReportDisease('');
        setReportNotes('');
        setShowForm(false);
      })
      .catch(() => alert("Error submitting report"));
  };

  const handleLogin = () => navigate('/Login');
  const addNew = () => navigate('/addnew');

  return (
    <div>
      {isLoggedIn ? (
        <Navbar />
      ) : (
        <nav className="navbar">
          <div className="logo">🌿 CropLens</div>
          <ul className="nav-links">
            <li><Link to="/app">Home</Link></li>
            <li onClick={() => navigate('/blog')}>Blog</li>
            <li onClick={() => navigate('/feed')}>Feed</li>
            <li onClick={() => navigate('/company')}>Company</li>
            <li onClick={() => navigate('/treatment')}>Treatment</li>
          </ul>
          <div className="right-nav">
            <button style={{ backgroundColor: "purple" }} className="btn btn-primary" onClick={() => navigate("/premium")}>
              Premium
            </button>
            <button className="icon-badge" onClick={() => navigate("/page")} style={{ cursor: "pointer" }}>
              <img src="https://www.shutterstock.com/image-vector/vector-illustration-set-green-sugarcane-260nw-2380005581.jpg" alt="Plant" />
            </button>
            <button className="icon-badge">
              <img src="https://static.vecteezy.com/system/resources/thumbnails/002/359/770/small_2x/bell-icon-free-vector.jpg" alt="Notifications" />
            </button>
            {username && (
              <>
                <span>{username.slice(0, 6)}</span>
                <div className="avatar-circle">{username[0]}</div>
              </>
            )}
            <button onClick={handleLogout} className="btn btn-outline">Logout</button>
          </div>
        </nav>
      )}
      <div className="hero">
        <div className="hero-text">
          <h1>Sugarcane Leaf Disease Identification Tool</h1>
          <p>
          We can’t let your plants suffer from diseases or disorders. Start healing now with our simple treatment scheduler and in-app disease logging tool.
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            <div>
              <button onClick={() => setShowModal(true)} className="btn btn-primary">
                📷 Diagnose a Plant
              </button>
              {showModal && <DiagnoseModal onClose={() => setShowModal(false)} />}
            </div>
            {isSubscribed ? (
              <button className="btn btn-outline" onClick={addNew}>
                ➕ Add New Disease
              </button>
            ) : (
              <button className="btn btn-outline" onClick={() => navigate("/premium")}>
                🔒 Add New Disease (Upgrade to Premium)
              </button>
            )}
          </div>
        </div>
        <div className="hero-img">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2917/2917995.png"
            alt="Plant Diagnosis"
          />
        </div>
      </div>

      <div className="tabs">
        {["All Problems", "Red Rot", "Yellow", "Rust", "Mosaic"].map(tab => (
          <span
            key={tab}
            className={selectedTab === tab ? "active" : ""}
            onClick={() => {
              setSelectedTab(tab);
              setPage(1);
            }}
          >
            {tab}
          </span>
        ))}
      </div>

      <div className="disease-cards">
        {diseases.map((disease, index) => (
          <div className="disease-card" key={index}>
            <img src={disease.image} alt={disease.title} />
            <h3>{disease.title}</h3>
            <p>{disease.description}</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button style={{color:'white',marginLeft:'100px'}}disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
        <span  style={{ margin: "0 10px" }}>Page {page} of {totalPages}</span>
        <button style={{color:'white'}} disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>

      <div style={{ marginTop: "40px", padding: "20px", borderTop: "1px solid #ccc" }}>
        <h2>Submit a Field Report</h2>
        <button
          style={{ marginRight: "30px" }}
          className="btn btn-outline"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "➕ Add Report"}
        </button>
        <button className="btn btn-outline" onClick={() => navigate('/report')}>
          Show All Field Reports
        </button>
        {showForm && (
          <div className="report-form">
            <input
              placeholder="Your Name"
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
              style={{ display: "block", marginTop: "10px", width: "500px" }}
            />
            <input
              placeholder="Location"
              value={reportLocation}
              onChange={(e) => setReportLocation(e.target.value)}
              style={{ display: "block", marginTop: "10px", width: "500px" }}
            />
            <input
              placeholder="Disease Name"
              value={reportDisease}
              onChange={(e) => setReportDisease(e.target.value)}
              style={{ display: "block", marginTop: "10px", width: "500px" }}
            />
            <textarea
              placeholder="Add any notes"
              value={reportNotes}
              onChange={(e) => setReportNotes(e.target.value)}
              style={{ display: "block", marginTop: "10px", width: "500px" }}
            />
            <button
              className="btn btn-primary"
              style={{ marginTop: "10px" }}
              onClick={handleSubmitReport}
            >
              Submit Report
            </button>
          </div>
        )}
      </div>

      <div style={{ marginTop: "60px", padding: "20px", borderTop: "1px solid #ccc" }}>
        <h2>Community Forum</h2>
        <div className="forum-preview">
          <div className="forum-post">
            <h3>How to treat Red Rot naturally?</h3>
            <p>I’ve heard that neem oil helps, but unsure how to apply. Any suggestions?</p>
            <span>— Gokul</span>
          </div>
          <div className="forum-post">
            <h3>Yellowing on edges – what’s the fix?</h3>
            <p>My sugarcane leaves are turning yellow from the tips. Possible causes?</p>
            <span>— Priya</span>
          </div>
        </div>
        <button className="btn btn-outline" style={{ marginTop: "10px" }}>
          View All Discussions
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default App;
