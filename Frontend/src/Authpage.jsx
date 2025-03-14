import React, { useState } from 'react';
import './Authpage.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); 
  async function handleAuth() {
    const endpoint = isLogin ? "/login" : "/register";
    const payload = { email, password };
    try {
      const res = await fetch(`http://localhost:6969${endpoint}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Something went wrong");
      } else {
        setMessage(data.message);

        if (isLogin && data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", email);

          navigate("/app");
         
        }
        if (!isLogin) {
          setIsLogin(true);
          navigate("/app");
        }

        setEmail('');
        setPassword('');
      }
    } catch (error) {
      setMessage("Server error. Try again later.");
    }
  };

  return (
    <div className="auth-container">
      <div className="form-section">
        <div className="tabs">
          <button
            onClick={() => { setIsLogin(true); setMessage(""); }}
            className={isLogin ? 'tab active' : 'tab'}
          >
            Sign in
          </button>
          <button
            onClick={() => { setIsLogin(false); setMessage(""); }}
            className={!isLogin ? 'tab active' : 'tab'}
          >
            Sign up
          </button>
        </div>

        <div className="form-box">
          <h2 style={{ marginBottom: "20px", color: "#3bb77e" }}>
            {isLogin ? "Welcome Back 🌱" : "Create Your Account"}
          </h2>

          <div className="icon-group">
            <button className="icon-button">
              <img onClick={()=> window.open("https://accounts.google.com/v3/signin/identifier?service=accountsettings&continue=https%3A%2F%2Fmyaccount.google.com%2F%3Fpli%3D1&ec=GAlAwAE&hl=en_GB&authuser=0&ddm=1&flowName=GlifWebSignIn&flowEntry=AddSession")}src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="Google" />
            </button>
            <button className="icon-button">
              <img onClick={()=>window.open("https://secure6.store.apple.com/in/shop/signIn?ssi=1AAABlZMDNMYgaeh30xFTilOI8CAKpRFDGLJXO9ueEi5kMbn2zwVow-QAAAAbaHR0cHM6Ly93d3cuYXBwbGUuY29tL2luL3x8AAIBDPJ9E-C03sWtYNiz_7UqoU_JnfXX1tknsnQJOBAdn2I")}src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" />
            </button>
            <button className="icon-button">
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png" alt="Facebook" />
            </button>
          </div>

          <div style={{color:"black"}}className="separator">Or</div>

          <input
            type="email"
            placeholder="email@email.com"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="forgot-password">Forgot password?</div>

          <button className="auth-btn" onClick={handleAuth}>
            {isLogin ? 'Sign in' : 'Sign up'}
          </button>

          {message && <p style={{ marginTop: "15px", color: isLogin ? "#3bb77e" : "crimson" }}>{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
