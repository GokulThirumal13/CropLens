import React from 'react'
import Footer from './Footer';
import Navbar from './navbar';
import './Company.css';

function Company() {
    return (
        <div>
          <Navbar />
          <div className="company-container" style={{ padding: "30px", maxWidth: "800px", margin: "0 auto" }}>
            <h1>About CropLens 🌱</h1>
            <p>
              At <strong>CropLens</strong>, we are committed to empowering farmers, researchers, and plant enthusiasts 
              with cutting-edge plant disease detection technology. Our goal is to make plant care smarter, faster, and more effective.
            </p>
    
            <h2> Our Mission</h2>
            <p>
              To revolutionize agriculture with AI-powered tools that help detect diseases early and 
              provide effective solutions to maintain crop health and productivity.
            </p>
    
            <h2>💡 What We Do</h2>
            <ul>
              <li>🌾 Detect sugarcane leaf diseases using AI & image recognition</li>
              <li>🧠 Provide remedies and treatments for plant problems</li>
              <li>👨‍🌾 Help farmers share field reports & experiences</li>
              <li>🌍 Build a strong community of plant lovers and experts</li>
            </ul>
    
            <h2>🚀 Our Vision</h2>
            <p>
              To become the go-to digital companion for every farmer, making plant healthcare accessible, 
              reliable, and accurate across the globe.
            </p>
          </div>
          <Footer />
        </div>
      );
}

export default Company