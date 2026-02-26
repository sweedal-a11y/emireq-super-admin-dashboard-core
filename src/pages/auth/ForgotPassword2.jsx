import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import emireqLogo from "../../assets/emireq-logo.png";
import rocketImg from "../../assets/rocket.png";
import "./ForgotPassword2.css";

const ForgotPassword2 = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get the email passed from ForgotPassword1, or fallback
  const email = location?.state?.email || "admin@company.com";

  const [resendStatus, setResendStatus] = useState(null); // null | "sending" | "sent" | "error"
  const [resendCount, setResendCount] = useState(0);

  const handleBackToLogin = () => {
    navigate("/auth/login");
  };

  const handleTryAgain = () => {
    navigate("/auth/ForgotPassword1");
  };

  return (
    <div className="fp2-page">
      {/* ── LEFT PANEL ── */}
      <div className="fp2-left">
        <div className="fp2-card">
          {/* Check icon */}
          <div className="fp2-icon-wrap">
            <svg
              className="fp2-check-icon"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="11" stroke="#22c55e" strokeWidth="1.5" />
              <path
                d="M7.5 12.5l3 3 6-6"
                stroke="#22c55e"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Title */}
          <h1 className="fp2-title">Check Your Email</h1>

          {/* Subtitle */}
          <p className="fp2-subtitle">
            We've sent password reset instructions to
            <br />
            <span className="fp2-email">{email}</span>
          </p>

          {/* Info box */}
          <div className="fp2-info-box">
            <span className="fp2-info-text">
              Click the link in the email to reset your password. The link will
              expire in 24 hours.
            </span>
          </div>

          {/* Back to login button */}
          <button
            className="fp2-back-btn"
            onClick={handleBackToLogin}
          >
            <svg
              className="fp2-arrow-icon"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 10H5M5 10l4-4M5 10l4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to login
          </button>

          {/* Resend */}
          <p className="fp2-resend-text">
            Didn't receive an email?{" "}
            <button
              className={`fp2-try-again-btn ${resendStatus === "sending" ? "fp2-try-again-btn--loading" : ""} ${resendStatus === "sent" ? "fp2-try-again-btn--sent" : ""}`}
              onClick={handleTryAgain}
              disabled={resendStatus === "sending"}
            >
              {resendStatus === "sending"
                ? "Sending..."
                : resendStatus === "sent"
                ? "Email sent!"
                : "Try again"}
            </button>
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="login-right">
        <div className="brand-logo">
          <img
            src={emireqLogo}
            alt="emireq logo"
            className="logo-img"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          <div className="logo-fallback" style={{ display: "none" }}>
            <span className="logo-icon-fallback">ea</span>
            <span className="logo-text-fallback">emireq</span>
          </div>
        </div>
        <img
          src={rocketImg}
          alt="Rocket illustration"
          className="rocket-img"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        />
        <div className="right-inner" style={{ position: "relative", zIndex: 1 }} />
        <p className="support-text">
          Experiencing issues?
          <br />
          Get assistance via{" "}
          <a href="mailto:support@emireq.com" className="support-link">
            support@emireq.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword2;
