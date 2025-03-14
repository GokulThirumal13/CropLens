import React from "react";
import "./Footer.css"; 
import "@fortawesome/fontawesome-free/css/all.min.css"
import { Link,useNavigate } from "react-router-dom";

function Footer() {
  const navigate=useNavigate();
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h2 className="logo">🌿 CropLens</h2>
          <p>
            Our plant identifier with database of more than 17,000 species is also
            the best place to Ask the Botanist, get plant watering
            recommendations, try disease identification, and much more!
          </p>
          <p>Perungudi industrial estate, greeta tower, 2nd Floor, Perungudi, Chennai</p>
        </div>

        <div className="footer-section">
          <h4>Plants Care</h4>
          <ul>
            <li>Plant Identifier</li>
            <li>Plant Problems</li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="https://www.sciencedirect.com/science/article/abs/pii/B9780323852142000033"></Link>Ask the botanist</li>
            <li>Weed community</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li>About us</li>
            <li>App Review</li>
            <li>Ratings and Reviews</li>
            <li>FAQ</li>
            <li>Contact us</li>
            <li>Subscription</li>
            
          </ul>
        </div>

        <div className="footer-section">
          <h4>Terms and conditions</h4>
          <ul>
            <li>Terms of Service</li>
            <li>Money Back Policy</li>
            <li>Subscription Policy</li>
            <li>Privacy Policy</li>
            <li>Cookie Settings</li>
            <li>Do not sell my personal information</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Get our app</h4>

          <a 
          href="https://www.apple.com/in/app-store/"
          target="_blank"
          rel="noopener noreferrer"
          >
          <img
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="App Store"
            className="app-badge"
          />
          </a>
          <a
  href="https://play.google.com/store/games?hl=en&pli=1"
  target="_blank"
  rel="noopener noreferrer"
>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/512px-Google_Play_Store_badge_EN.svg.png"
            alt="Google Play"
            className="app-badge"
          />
          </a>
          <div className="social-icons">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
            <a href="https://www.facebook.com/login/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
            <a href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-pinterest-p"></i></a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        ©2025 CropLens. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
