import React, { useState } from "react";
import "../styles/Login.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-page">
      {/* Top Bar */}
      <header className="login-topbar">
        <div className="login-brand">ShapR</div>
      </header>

      {/* Content */}
      <main className="login-main">
        <section className="login-card">
          <div className="login-card-inner">
            <h1 className="login-title">ShapR</h1>
            <p className="login-subtitle">Welcome Back!</p>

            {/* Email */}
            <label className="login-label" htmlFor="email">
              Email Address
            </label>
            <div className="login-input-wrap">
              <span className="login-input-icon" aria-hidden="true">
                <MailIcon />
              </span>
              <input
                id="email"
                className="login-input"
                placeholder="name@company.com"
                type="email"
              />
            </div>

            {/* Password row label + forgot */}
            <div className="login-row-between">
              <label className="login-label" htmlFor="password">
                Password
              </label>
              <button className="login-link" type="button">
                Forgot Password?
              </button>
            </div>

            {/* Password */}
            <div className="login-input-wrap">
              <span className="login-input-icon" aria-hidden="true">
                <LockIcon />
              </span>
              <input
                id="password"
                className="login-input"
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
              />
              <button
                className="login-eye"
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((v) => !v)}
              >
                <EyeIcon />
              </button>
            </div>

            {/* Primary Button */}
            <button className="login-primary" type="button">
              <span>Login to Dashboard</span>
              <span className="login-primary-arrow" aria-hidden="true">
                <ArrowIcon />
              </span>
            </button>

            {/* Divider */}
            <div className="login-divider">
              <span className="line" />
              <span className="text">OR CONTINUE WITH</span>
              <span className="line" />
            </div>

            {/* Social Buttons */}
            <div className="login-social">
              <button className="social-btn" type="button">
                <GoogleIcon />
                <span>Google</span>
              </button>
              <button className="social-btn" type="button">
                <FacebookIcon />
                <span>Facebook</span>
              </button>
            </div>

            {/* Bottom divider */}
            <div className="login-bottom-line" />

            {/* Footer */}
            <p className="login-footer">
              Don&apos;t have an account?{" "}
              <button className="login-link" type="button">
                Sign up for free
              </button>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ---------- Icons (inline SVG for pixel consistency) ---------- */

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="ico" aria-hidden="true">
      <path
        d="M4 6h16v12H4z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.9"
      />
      <path
        d="M4 7l8 6 8-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="ico" aria-hidden="true">
      <path
        d="M7 11V8a5 5 0 0 1 10 0v3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M6 11h12v10H6z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 15v3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="ico eye-ico" aria-hidden="true">
      <path
        d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="ico" aria-hidden="true">
      <path
        d="M5 12h12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M13 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="brand-ico" aria-hidden="true">
      <path
        d="M21.6 12.2c0-.7-.1-1.2-.2-1.8H12v3.4h5.4c-.2 1-.9 2.5-2.5 3.5v2.2h3.1c1.8-1.6 2.6-4 2.6-6.3z"
        fill="#4285F4"
      />
      <path
        d="M12 22c2.6 0 4.8-.9 6.4-2.5l-3.1-2.2c-.9.6-2.1 1-3.3 1-2.5 0-4.6-1.7-5.4-4H3.4v2.3C5 19.9 8.2 22 12 22z"
        fill="#34A853"
      />
      <path
        d="M6.6 13.3c-.2-.6-.3-1.1-.3-1.7s.1-1.2.3-1.7V7.6H3.4C2.8 8.8 2.4 10.2 2.4 11.6s.4 2.8 1 4l3.2-2.3z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.9c1.4 0 2.6.5 3.5 1.4l2.6-2.5C16.8 3.4 14.6 2.4 12 2.4 8.2 2.4 5 4.5 3.4 7.6l3.2 2.3c.8-2.3 2.9-4 5.4-4z"
        fill="#EA4335"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="brand-ico" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#2F55A4" />
      <path
        d="M13.2 18v-5h1.7l.3-2h-2V9.7c0-.6.2-1 .9-1h1.2V6.9c-.2 0-.9-.1-1.8-.1-1.8 0-3 1.1-3 3.1V11H8.9v2h1.6v5h2.7z"
        fill="#fff"
      />
    </svg>
  );
}