import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

// Import your assets like this in your project:
import emireqLogo from "../../assets/emireq-logo.png";
import rocketImg from "../../assets/rocket.png";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [globalError, setGlobalError] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ── Validation helpers ──────────────────────────────────────────────────────
  const validateField = (name, value) => {
    if (name === "username") {
      if (!value.trim()) return "Username is required";
      return "";
    }
    if (name === "password") {
      if (!value) return "Password is required";
      if (value.length < 6) return "Password must be at least 6 characters";
      return "";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear errors on type
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setGlobalError("");
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usernameErr = validateField("username", formData.username);
    const passwordErr = validateField("password", formData.password);

    if (usernameErr || passwordErr) {
      setErrors({ username: usernameErr, password: passwordErr });
      return;
    }

    setLoading(true);
    setGlobalError("");

    // Simulate API call
    await new Promise((res) => setTimeout(res, 1000));
    setLoading(false);

    // Demo: accept admin / password123 — otherwise show errors
    if (
      formData.username === "admin" &&
      formData.password === "password123"
    ) {
      alert("Login successful! Redirecting to dashboard…");
    } else {
      // Mimic the figma states: wrong username / wrong password
      const newErrors = {};
      if (formData.username !== "admin") newErrors.username = "Wrong username";
      if (formData.password !== "password123") newErrors.password = "Wrong Password";
      setErrors(newErrors);
      setGlobalError("Invalid username or password. Please try again.");
    }
  };

  const hasFieldError = (field) => !!errors[field];

  return (
    <div className="login-root">
      {/* ── Left panel ── */}
      <div className="login-left">
        <div className="login-card">
          {/* Lock icon */}
          <div className="lock-icon-wrap">
            <span className="lock-icon"><svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.6663 11.9998V9.33317C22.6663 5.59984 19.733 2.6665 15.9997 2.6665C12.2663 2.6665 9.33301 5.59984 9.33301 9.33317V11.9998C7.06634 11.9998 5.33301 13.7332 5.33301 15.9998V25.3332C5.33301 27.5998 7.06634 29.3332 9.33301 29.3332H22.6663C24.933 29.3332 26.6663 27.5998 26.6663 25.3332V15.9998C26.6663 13.7332 24.933 11.9998 22.6663 11.9998ZM11.9997 9.33317C11.9997 7.0665 13.733 5.33317 15.9997 5.33317C18.2663 5.33317 19.9997 7.0665 19.9997 9.33317V11.9998H11.9997V9.33317Z" fill="#717182"/>
</svg>
</span>
          </div>

          <h1 className="login-title">Superadmin Login</h1>
          <p className="login-subtitle">
            Enter your credentials to access the admin panel
          </p>

          {/* Global error banner */}
          {globalError && (
            <div className="global-error-banner" role="alert">
              <span className="error-circle-icon">⊙</span>
              {globalError}
            </div>
          )}

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            {/* Email / Username */}
            <div className="form-group">
              <label className="form-label" htmlFor="username">
                Email or Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                className={`form-input ${hasFieldError("username") ? "input-error" : ""}`}
                placeholder="admin@company.com"
                value={formData.username}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="username"
              />
              {errors.username && (
                <span className="field-error">
                  <span className="error-icon">⊙</span> {errors.username}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className={`form-input ${hasFieldError("password") ? "input-error" : ""}`}
                placeholder="••••••••••••"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="current-password"
              />
              {errors.password && (
                <span className="field-error">
                  <span className="error-icon">⊙</span> {errors.password}
                </span>
              )}
            </div>

            {/* Sign In button */}
            <button
              type="submit"
              className={`btn-signin ${loading ? "btn-loading" : ""}`}
              disabled={loading}
            >
              {loading ? (
                <span className="btn-spinner" />
              ) : (
                "Sign In"
              )}
            </button>

            {/* Footer row */}
            <div className="login-footer-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  checked={keepSignedIn}
                  onChange={(e) => setKeepSignedIn(e.target.checked)}
                />
                <span className="checkbox-custom" />
                Keep me signed in
              </label>
              <button
                type="button"
                className="forgot-link"
                style={{ background: "none", border: "none", padding: 0, color: "#3f51b5", cursor: "pointer" }}
                onClick={() => navigate("/auth/ForgotPassword1")}
              >
                Forget Password
              </button>
            </div>
          </form>

          <p className="security-note">Protected by enterprise-grade security</p>
        </div>
      </div>

      {/* ── Right panel ── */}
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
        <div className="right-inner" style={{ position: "relative", zIndex: 1 }}>
        </div>
        {/* Support text at bottom */}
        <p className="support-text">
          Experiencing issues?<br />
          Get assistance via{" "}
          <a href="mailto:support@emireq.com" className="support-link">
            support@emireq.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
