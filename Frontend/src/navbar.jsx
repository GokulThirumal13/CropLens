
import React from "react";
import { Link,useNavigate } from "react-router-dom";
import './navbar.css'


function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username") || "User";
 

  function handleLogout(){
    localStorage.clear();
    navigate("/");
    window.location.reload(); 
  };

  return (
    <div className="navbar">
      <div className="logo">🌿 CropLens</div>
        <ul className="nav-links">
          <li><Link to='/app'>Home</Link></li>
          <li onClick={() => navigate('/blog')}>Blog</li>
          <li onClick={()=>navigate('/feed')}>Feed</li>
          <li onClick={()=>navigate('/company')}>Company</li>
          <li onClick={()=>navigate('/treatment')}>Treatment</li>
        </ul>

      <div className="right-nav">
        {token ? (
          <>
            <button style={{backgroundColor:"purple"}}className="btn btn-primary" onClick={()=>navigate("/premium")}>Premium</button>
            < button className="icon-badge" onClick={() => navigate("/page")}
  style={{ cursor: "pointer" }}>
              <img src="https://www.shutterstock.com/image-vector/vector-illustration-set-green-sugarcane-260nw-2380005581.jpg" alt="Plant" />
            </button>
            <button className="icon-badge">
              <img src="https://static.vecteezy.com/system/resources/thumbnails/002/359/770/small_2x/bell-icon-free-vector.jpg" alt="Notifications" />
            </button>
            <span style={{fontFamily:'times new roman'}}>{username.slice(0,6)}</span>
            <div className="avatar-circle">{username[0]}</div>
            <button onClick={handleLogout} className="btn btn-outline">
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-outline" onClick={() => navigate("/login")}>Log In</button>
            <button className="btn btn-primary" onClick={() => navigate("/login")}>Sign Up Free</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
