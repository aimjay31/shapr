import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navigation.css";

export default function Navigation({ children }) {
  return (
    <div className="layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo">ShapR</div>

        <nav className="nav-links">
          <NavLink to="/dashboard" className="nav-item">
            Dashboard
          </NavLink>

          <NavLink to="/study-session-form" className="nav-item">
            Study Session Form
          </NavLink>

          <NavLink to="/productivity-prediction" className="nav-item">
            Productivity Prediction
          </NavLink>

          <NavLink to="/history" className="nav-item">
            History
          </NavLink>

          <NavLink to="/analytics-reports" className="nav-item">
            Analytics Reports
          </NavLink>

          <NavLink to="/pomodoro" className="nav-item">
            Pomodoro Timer
          </NavLink>

          <div className="nav-divider" />

          <NavLink to="/profile-settings" className="nav-item">
            Profile & Settings
          </NavLink>
        </nav>
      </aside>

      {/* MAIN AREA */}
      <div className="main-wrapper">
        <header className="topbar">
          <div />
          <div className="top-right">
            <div className="lang">🌐 EN</div>
            <div className="notif">🔔</div>
            <div className="user">
              <img
                src="https://i.pravatar.cc/100?img=5"
                alt="user"
                className="avatar"
              />
              <span>▾</span>
            </div>
          </div>
        </header>

        <main className="content">{children}</main>
      </div>
    </div>
  );
}