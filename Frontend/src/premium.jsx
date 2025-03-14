import React, { useState, useEffect } from 'react';
import "./pr.css";
import Navbar from './navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

function PremiumPage() {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionEnd, setSubscriptionEnd] = useState(null);

  useEffect(() => {
    const active = localStorage.getItem("subscriptionActive") === "true";
    const end = localStorage.getItem("subscriptionEnd");

    if (active && end) {
      const endDate = new Date(end);
      const now = new Date();

      if (now > endDate) {
        localStorage.removeItem("subscriptionActive");
        localStorage.removeItem("subscriptionEnd");
        localStorage.removeItem("planName");
        setIsSubscribed(false);
      } else {
        setIsSubscribed(true);
        setSubscriptionEnd(endDate);
      }
    }
  }, []);

  function handleSubscribe(planName) {
    const now = new Date();
    let endDate;

    if (planName === '7-day') {
      endDate = new Date(now.setDate(now.getDate() + 7));
    } else if (planName === '30-day') {
      endDate = new Date(now.setDate(now.getDate() + 30));
    } else if (planName === '90-day') {
      endDate = new Date(now.setDate(now.getDate() + 90));
    }

    localStorage.setItem("subscriptionActive", "true");
    localStorage.setItem("planName", planName);
    localStorage.setItem("subscriptionEnd", endDate.toISOString());

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      navigate('/app');
    }, 2000);
  }

  return (
    <>
      <Navbar />
      <br />
      <br />
      <br />
      <div className="premium-page">
        <h2>How much does CropLens Premium cost?</h2>
        <p>Start a 3-day trial of any subscription plan of your choice</p>

        {isSubscribed ? (
          <div className="subscription-info">
            <p style={{ color: "green", fontWeight: "bold" }}>You’re already subscribed!</p>
            <p>Subscription valid till: <strong>{subscriptionEnd?.toDateString()}</strong></p>
          </div>
        ) : (
          <div className="plans">
            <div className="plan">
              <h4>7 Days Access</h4>
              <p>RS.49</p>
              <small>2 RS per day • 3-day trial</small>
              <button style={{ color: "black" }} onClick={() => handleSubscribe("7-day")}>Subscribe</button>
            </div>
            <div className="plan">
              <h4>30 Days Access</h4>
              <p>RS 399</p>
              <small>2 RS per day • 3-day trial</small>
              <button style={{ color: "black" }} onClick={() => handleSubscribe("30-day")}>Subscribe</button>
            </div>
            <div className="plan">
              <h4>90 Days Access</h4>
              <p>RS 999</p>
              <small>2 RS per day • 3-day trial</small>
              <button style={{ color: "black" }} onClick={() => handleSubscribe("90-day")}>Subscribe</button>
            </div>
          </div>
        )}

        <div className="plan-features">
          <h4>All plans include:</h4>
          <ul>
            <li>✅ Submit New Diagnoses</li>
            <li>✅ Access Field Reports</li>
            <li>✅ Save Unlimited Diagnoses</li>
            <li>✅ Priority Support</li>
          </ul>
        </div>
      </div>

      {showToast && (
        <div className="toast">
          🎉 Subscription Activated!
        </div>
      )}
      <Footer />
    </>
  );
}

export default PremiumPage;
