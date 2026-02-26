import React from "react";
import { useNavigate } from "react-router-dom";
import emireqLogo from "../../assets/emireq-logo.png";
import "./Accountlocked.css";

const AccountLocked = () => {
  const navigate = useNavigate();

  const handleTryAgainLater = () => {
    // Close tab or show a message — here we just go back
    window.history.back();
  };

  const handleBackToLogin = () => {
    navigate("/auth/login");
  };

  return (
    <div className="al-page">
      {/* ── TOP LOGO ── */}
      <div className="al-header">
        <img
          src={emireqLogo}
          alt="emireq logo"
          className="al-logo"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        <div className="al-logo-fallback" style={{ display: "none" }}>
          <span className="al-logo-icon">ea</span>
          <span className="al-logo-text">emireq</span>
        </div>
      </div>

      {/* ── MAIN CARD ── */}
      <main className="al-main">
        <div className="al-card">
          {/* Illustration */}
          <div className="al-illustration">
            <svg
              className="al-shield-svg"
              viewBox="0 0 96 96"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Shield body */}
              <path
                d="M44 10L14 22v20c0 18.78 12.88 36.34 30 41 17.12-4.66 30-22.22 30-41V22L44 10z"
                fill="#dbeafe"
                stroke="#3b82f6"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              {/* Check on shield */}
              <path
                d="M31 43l9 9 17-16"
                stroke="#3b82f6"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Lock body */}
              <rect
                x="56"
                y="52"
                width="28"
                height="22"
                rx="5"
                fill="#dbeafe"
                stroke="#3b82f6"
                strokeWidth="2"
              />
              {/* Lock shackle */}
              <path
                d="M62 52v-6a8 8 0 0116 0v6"
                stroke="#3b82f6"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Lock keyhole */}
              <circle cx="70" cy="62" r="3" fill="#3b82f6" />
              <rect x="68.5" y="63" width="3" height="5" rx="1.5" fill="#3b82f6" />
            </svg>
          </div>

          {/* Text */}
          <h1 className="al-title">Account Temporarily Locked</h1>
          <p className="al-subtitle">
            Your account has been locked due to multiple<br />failed login attempts
          </p>

          {/* Warning banner */}
          <div className="al-warning-box">
            <div className="al-warning-header">
              <svg className="al-warn-icon" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" stroke="#d97706" strokeWidth="1.5" />
                <path d="M10 6v4.5" stroke="#d97706" strokeWidth="1.8" strokeLinecap="round" />
                <circle cx="10" cy="13.5" r="0.9" fill="#d97706" />
              </svg>
              <span className="al-warning-title">Security Measure Activated</span>
            </div>
            <p className="al-warning-body">
              For your protection, this account has been temporarily
              locked. Please wait 15 minutes or contact your administrator.
            </p>
          </div>

          {/* Buttons */}
          <div className="al-btn-row">
            <button className="al-btn-secondary" onClick={handleTryAgainLater}>
              Try Again Later
            </button>
            <button className="al-btn-primary" onClick={handleBackToLogin}>
              Back to Login
            </button>
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="al-footer">
        <p className="al-footer-text">
          Experiencing issues?<br />
          Get assistance via{" "}
          <a href="mailto:support@emireq.com" className="al-footer-link">
            support@emireq.com
          </a>
        </p>
      </footer>
    </div>
  );
};

export default AccountLocked;
