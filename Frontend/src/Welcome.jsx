import React from 'react'
import{ useNavigate } from 'react-router-dom'
import './Welcome.css'

function Welcome() {
    const navigate=useNavigate();
  return (
    <div className='welcome'>
        <nav className='nav'>
        <div className="logo">🌿 CropLens</div>
        <div className="nav-buttons">
          <button className="btn outline" onClick={() => navigate('/login')}>Log In</button>
          <button className="btn primary" onClick={() => navigate('/login')}>Sign Up Free</button>
        </div>
        </nav>
        <div className="main">
        <div className="main-text">
          <h1 style={{fontFamily:'times new roman',fontSize:'50px'}}>Welcome to <span style={{fontFamily:'times new roman',fontSize:'50px'}}className="highlight">CropLens</span> 🌱</h1>
          <p style={{fontFamily:'times new roman',fontSize:'30px'}}>
            A smart disease identification platform that helps farmers and agriculturists detect plant problems,
            submit field reports, and take action quickly. Simplify your farming with CropLens.
          </p>
          <button className="btn primary" onClick={() => navigate('/login')}>
            Get Started
          </button>
        </div>
        <img
          className="main-img"
          src="https://cdn-icons-png.flaticon.com/512/2917/2917995.png"
          alt="Plant Diagnosis"
        />
      </div>

    </div>
  )
}

export default Welcome