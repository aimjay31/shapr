import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Signup.css";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Simulate account creation and redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="signup-page">
      <header className="signup-topbar">
        <div className="signup-brand">ShapR</div>
      </header>

      <main className="signup-main">
        <section className="signup-card">
          <div className="signup-card-inner">
            <h1 className="signup-title">ShapR</h1>
            
            
            <form onSubmit={handleSignup}>
              <label className="signup-label" htmlFor="fullname">Full Name</label>
              <div className="signup-input-wrap">
                <span className="signup-input-icon"><IcoUser /></span>
                <input id="fullname" className="signup-input" placeholder="Enter your full name" type="text" required />
              </div>

              <label className="signup-label" htmlFor="email">Email Address</label>
              <div className="signup-input-wrap">
                <span className="signup-input-icon"><IcoMail /></span>
                <input id="email" className="signup-input" placeholder="name@company.com" type="email" required />
              </div>

              <label className="signup-label" htmlFor="password">Password</label>
              <div className="signup-input-wrap">
                <span className="signup-input-icon"><IcoLock /></span>
                <input
                  id="password"
                  className="signup-input"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  required
                />
                <button 
                  type="button" 
                  className="signup-pass-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <button className="signup-btn-primary" type="button" onClick={() => navigate("/login")} >
                Create Account
                <IcoArrow />
              </button>
            </form>

            <div className="signup-divider">
              <span>or sign up with</span>
            </div>

            <button className="signup-btn-google" type="button">
              <IcoGoogle />
              Sign up with Google
            </button>

            <p className="signup-footer-text">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

// Minimal Icons for "Pixel Perfect" look
function IcoMail() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="s-icon"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>; }
function IcoLock() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="s-icon"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>; }
function IcoUser() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="s-icon"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>; }
function IcoArrow() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="s-icon-sm"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>; }
function IcoGoogle() { return <svg viewBox="0 0 24 24" className="s-icon"><path d="M21.6 12.2c0-.7-.1-1.2-.2-1.8H12v3.4h5.4c-.2 1-.9 2.5-2.5 3.5v2.2h3.1c1.8-1.6 2.6-4 2.6-6.3z" fill="#4285F4"/><path d="M12 22c2.6 0 4.8-.9 6.4-2.5l-3.1-2.2c-.9.6-2.1 1-3.3 1-2.5 0-4.6-1.7-5.4-4H3v2.4C4.6 20 8.1 22 12 22z" fill="#34A853"/><path d="M6.6 14.3c-.2-.6-.3-1.3-.3-2.3s.1-1.7.3-2.3V7.3H3c-.6 1.2-1 2.6-1 4.7s.4 3.5 1 4.7l3.6-2.4z" fill="#FBBC05"/><path d="M12 5.3c1.4 0 2.7.5 3.7 1.4l2.8-2.8C16.8 2.3 14.6 1.3 12 1.3 8.1 1.3 4.6 3.3 3 6.6l3.6 2.4c.8-2.3 2.9-4 5.4-4z" fill="#EA4335"/></svg>; }