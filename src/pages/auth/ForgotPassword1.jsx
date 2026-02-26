import React, { useState } from "react";
import "./ForgotPassword.css";
import emireqLogo from "../../assets/emireq-logo.png";
import rocketImg from "../../assets/rocket.png";
import { useNavigate } from "react-router-dom";

const ForgotPassword1 = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Enter a valid email address");
      return;
    }

    setError("");
    setLoading(true);

    // simulate API
    setTimeout(() => {
      setLoading(false);
      navigate("/auth/ForgotPassword2");
    }, 1500);
  };

  return (
    <div className="forgot-container">
      {/* LEFT PANEL */}
      <div className="forgot-left">
        <div className="forgot-card">
          <div className="mail-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M26.667 5.33301H5.33366C3.8609 5.33301 2.66699 6.52692 2.66699 7.99967V23.9997C2.66699 25.4724 3.8609 26.6663 5.33366 26.6663H26.667C28.1397 26.6663 29.3337 25.4724 29.3337 23.9997V7.99967C29.3337 6.52692 28.1397 5.33301 26.667 5.33301Z" stroke="#717182" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M29.3337 9.33301L17.3737 16.933C16.962 17.1909 16.4861 17.3277 16.0003 17.3277C15.5146 17.3277 15.0386 17.1909 14.627 16.933L2.66699 9.33301" stroke="#717182" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

          </div>

          <h2 className="forgot-title">Reset Password</h2>
          <p className="forgot-subtitle">
            Enter your email and we’ll send you link
          </p>

          <form onSubmit={handleSubmit}>
            <label className="input-label">Email Address</label>
            <input
              type="email"
              placeholder="admin@company.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              className={`email-input ${error ? "input-error" : ""}`}
            />

            {error && <p className="error-text">{error}</p>}

            <button
              type="submit"
              className="send-btn"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send link"}
            </button>
          </form>

          <p
            className="back-login"
            onClick={() => navigate("/auth/login")}
          >
            ← Back to login
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="login-right">
        <div className="brand-logo">
          <img
            src={emireqLogo}
            alt="emireq logo"
            className="logo-img"
          />
        </div>

        <img
          src={rocketImg}
          alt="Rocket"
          className="rocket-img"
        />

        <p className="support-text">
          Experiencing issues? <br />
          Get assistance via{" "}
          <a href="mailto:support@emireq.com" className="support-link">
            support@emireq.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword1;