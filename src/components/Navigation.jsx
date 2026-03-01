import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Navigation.css";

export default function Navigation({ children }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="app-shell">
      {/* SIDEBAR */}
      <aside className="nav-sidebar">
        <div className="nav-brand">ShapR</div>

        <nav className="nav-menu">
          <NavItem to="/dashboard" icon={<IconDashboard />} label="Dashboard" />
          <NavItem to="/study-session-form" icon={<IconForm />} label="Study Session Form" />
          <NavItem to="/productivity-prediction" icon={<IconPrediction />} label="Productivity Prediction" />
          <NavItem to="/history" icon={<IconHistory />} label="History" />
          <NavItem to="/analytics-reports" icon={<IconAnalytics />} label="Analytics Reports" />
          <NavItem to="/pomodoro" icon={<IconPomodoro />} label="Pomodoro Timer" />

          <div className="nav-divider" />

          <NavItem to="/profile-settings" icon={<IconSettings />} label="Profile & Settings" />
        </nav>
      </aside>

      {/* MAIN */}
      <div className="app-main">
        {/* TOP BAR */}
        <header className="topbar">
          <div className="topbar-left" />

          <div className="topbar-right">
            <button className="topbtn" type="button">
              <span className="topicon"><IconGlobe /></span>
              <span className="toptext">EN</span>
            </button>

            <button className="topbtn icon-only" type="button" aria-label="Notifications">
              <span className="topicon"><IconBell /></span>
            </button>

            <button className="topuser" type="button" onClick={() => setShowDropdown(!showDropdown)}>
              <img
                className="topavatar"
                src="https://i.pravatar.cc/80?img=5"
                alt="User"
              />
              <span className="caret">▾</span>
            </button>

            {showDropdown && (
              <div className="user-dropdown">
                <button 
                  className="dropdown-item" 
                  type="button" 
                  onClick={() => {
                    setShowDropdown(false);
                    navigate('/login');
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="page">{children}</main>
      </div>
    </div>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
    >
      <span className="nav-ico">{icon}</span>
      <span className="nav-label">{label}</span>
    </NavLink>
  );
}

/* ---------- Sidebar Icons (simple + consistent) ---------- */
function IconDashboard() {
  return (
    <svg viewBox="0 0 24 24" className="sico" aria-hidden="true">
      <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" fill="currentColor" />
    </svg>
  );
}
function IconForm() {
  return (
    <svg viewBox="0 0 24 24" className="sico" aria-hidden="true">
      <path d="M6 3h12v18H6z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M8 8h8M8 12h8M8 16h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function IconPrediction() {
  return (
    <svg viewBox="0 0 24 24" className="sico" aria-hidden="true">
      <path d="M4 16l6-6 4 4 6-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 20h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function IconHistory() {
  return (
    <svg viewBox="0 0 24 24" className="sico" aria-hidden="true">
      <path d="M12 22a10 10 0 1 1 10-10 10 10 0 0 1-10 10Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v5l3 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function IconAnalytics() {
  return (
    <svg viewBox="0 0 24 24" className="sico" aria-hidden="true">
      <path d="M6 4h12v16H6z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M9 17V11M12 17V7M15 17v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function IconPomodoro() {
  return (
    <svg viewBox="0 0 24 24" className="sico" aria-hidden="true">
      <path d="M9 2h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 8v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 22a9 9 0 1 1 9-9 9 9 0 0 1-9 9Z" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function IconSettings() {
  return (
    <svg viewBox="0 0 24 24" className="sico" aria-hidden="true">
      <path d="M12 15.2a3.2 3.2 0 1 0-3.2-3.2 3.2 3.2 0 0 0 3.2 3.2Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path
        d="M19 12a7 7 0 0 0-.1-1l2-1.2-2-3.4-2.3.8a7 7 0 0 0-1.7-1L14.6 3h-5.2L9.1 6.2a7 7 0 0 0-1.7 1L5.1 6.4l-2 3.4 2 1.2a7 7 0 0 0 0 2l-2 1.2 2 3.4 2.3-.8a7 7 0 0 0 1.7 1L9.4 21h5.2l.3-3.2a7 7 0 0 0 1.7-1l2.3.8 2-3.4-2-1.2c.1-.3.1-.7.1-1Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------- Topbar Icons ---------- */
function IconGlobe() {
  return (
    <svg viewBox="0 0 24 24" className="tico" aria-hidden="true">
      <path d="M12 22a10 10 0 1 1 10-10 10 10 0 0 1-10 10Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M2 12h20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 2c3.5 3 3.5 17 0 20" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function IconBell() {
  return (
    <svg viewBox="0 0 24 24" className="tico" aria-hidden="true">
      <path
        d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M10 19a2 2 0 0 0 4 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}