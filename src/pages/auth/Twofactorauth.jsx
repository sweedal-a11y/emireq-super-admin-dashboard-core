import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import emireqLogo from "../../assets/emireq-logo.png";
import rocketImg from "../../assets/rocket.png";
import "./TwoFactorAuth.css";

const RESEND_SECONDS = 60;
const CODE_LENGTH = 6;

const TwoFactorAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location?.state?.email || "t@gmail.com";

  const [digits, setDigits] = useState(Array(CODE_LENGTH).fill(""));
  const [timer, setTimer] = useState(RESEND_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const [expired, setExpired] = useState(false);
  const [useAuthApp, setUseAuthApp] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [shake, setShake] = useState(false);

  const inputRefs = useRef([]);

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      setExpired(true);
      return;
    }
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  const handleDigitChange = (e, idx) => {
    const val = e.target.value.replace(/\D/g, "").slice(-1);
    const newDigits = [...digits];
    newDigits[idx] = val;
    setDigits(newDigits);
    if (val && idx < CODE_LENGTH - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (digits[idx]) {
        const newDigits = [...digits];
        newDigits[idx] = "";
        setDigits(newDigits);
      } else if (idx > 0) {
        inputRefs.current[idx - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    } else if (e.key === "ArrowRight" && idx < CODE_LENGTH - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, CODE_LENGTH);
    const newDigits = [...digits];
    for (let i = 0; i < pasted.length; i++) newDigits[i] = pasted[i];
    setDigits(newDigits);
    const nextEmpty = pasted.length < CODE_LENGTH ? pasted.length : CODE_LENGTH - 1;
    inputRefs.current[nextEmpty]?.focus();
  };

  const handleResend = () => {
    if (!canResend) return;
    setDigits(Array(CODE_LENGTH).fill(""));
    setTimer(RESEND_SECONDS);
    setCanResend(false);
    setExpired(false);
    inputRefs.current[0]?.focus();
  };

  const handleVerify = async () => {
    const code = digits.join("");
    if (code.length < CODE_LENGTH) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setVerifying(true);
    await new Promise((r) => setTimeout(r, 1000));
    setVerifying(false);
    setShowSuccess(true);
  };

  const handleContinue = () => {
    navigate("/overview");
  };

  const isFilled = digits.join("").length === CODE_LENGTH;

  return (
    <div className="tfa-page">
      {/* ── LEFT PANEL ── */}
      <div className="tfa-left">
        <div className="tfa-card">
          {/* Shield icon */}
          <div className="tfa-icon-wrap">
            <svg className="tfa-shield-icon" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L4 6v5c0 4.97 3.36 9.63 8 10.93C16.64 20.63 20 15.97 20 11V6l-8-4z"
                stroke="#9ca3af"
                strokeWidth="1.5"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>

          {/* Title */}
          <h1 className="tfa-title">Two-Factor Authentication</h1>
          <p className="tfa-subtitle">Enter the 6-digit code from your authenticator app</p>
          <p className="tfa-sent-to">Sent to {email}</p>

          {/* Expired banner */}
          {expired && (
            <div className="tfa-expired-banner">
              <svg className="tfa-warn-icon" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" stroke="#f5a623" strokeWidth="1.5" />
                <path d="M10 6v4" stroke="#f5a623" strokeWidth="1.6" strokeLinecap="round" />
                <circle cx="10" cy="13.5" r="0.75" fill="#f5a623" />
              </svg>
              <span>
                Code expired.{" "}
                <button className="tfa-request-link" onClick={handleResend}>
                  Request a new one.
                </button>
              </span>
            </div>
          )}

          {/* OTP inputs */}
          <div className={`tfa-otp-row ${shake ? "tfa-shake" : ""}`} onPaste={handlePaste}>
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                className={`tfa-otp-input ${d ? "tfa-otp-input--filled" : ""}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={(e) => handleDigitChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                autoFocus={i === 0}
              />
            ))}
          </div>

          {/* Use authenticator app checkbox */}
          <label className="tfa-check-label">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.333 1.33333H4.66634C3.92996 1.33333 3.33301 1.93028 3.33301 2.66666V13.3333C3.33301 14.0697 3.92996 14.6667 4.66634 14.6667H11.333C12.0694 14.6667 12.6663 14.0697 12.6663 13.3333V2.66666C12.6663 1.93028 12.0694 1.33333 11.333 1.33333Z" stroke="#525252" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 12H8.00667" stroke="#525252" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Use your authenticator app</span>
          </label>

          {/* Resend */}
          {!expired ? (
            <p className="tfa-resend-text">
              Resend code in <strong>{timer}s</strong>
            </p>
          ) : (
            <button className="tfa-resend-link" onClick={handleResend}>
              Resend Code
            </button>
          )}

          {/* Verify button */}
          <button
            className={`tfa-verify-btn ${isFilled && !verifying ? "tfa-verify-btn--active" : ""}`}
            onClick={handleVerify}
            disabled={verifying}
          >
            {verifying ? (
              <span className="tfa-spinner" />
            ) : (
              "Verify Code"
            )}
          </button>

          {/* Back to login */}
          <button className="tfa-back-btn" onClick={() => navigate("/auth/login")}> 
            Back to login
          </button>

          {/* Can't access box */}
          <div className="tfa-help-box">
            <span>Can't access your authenticator? Contact your system administrator</span>
          </div>
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
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}
        />
        <div className="right-inner" style={{ position: "relative", zIndex: 1 }} />
        <p className="support-text">
          Experiencing issues?<br />
          Get assistance via{" "}
          <a href="mailto:support@emireq.com" className="support-link">
            support@emireq.com
          </a>
        </p>
      </div>

      {/* ── SUCCESS MODAL ── */}
      {showSuccess && (
        <div className="tfa-modal-overlay">
          <div className="tfa-modal">
            <button className="tfa-modal-close" onClick={() => setShowSuccess(false)}>
              <svg viewBox="0 0 20 20" fill="none" width="18" height="18">
                <path d="M5 5l10 10M15 5L5 15" stroke="#6b7280" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
            <div className="tfa-modal-icon-wrap">
              <svg className="tfa-modal-check" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="13" stroke="#22c55e" strokeWidth="1.5" />
                <path d="M8.5 14.5l3.5 3.5 7.5-7.5" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="tfa-modal-title">Login Successful!</h2>
            <p className="tfa-modal-body">
              Welcome back! You're being redirected to your<br />Superadmin dashboard.
            </p>
            <button className="tfa-modal-cta" onClick={handleContinue}>
              Continue to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TwoFactorAuth;
