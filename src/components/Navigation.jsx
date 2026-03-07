import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Navigation.css";

import DashboardIcon from '../assets/icons/dashboard.svg?react'
import PredictionsIcon from '../assets/icons/prediction.svg?react'
import HistoryIcon from '../assets/icons/history.svg?react'
import PomodoroIcon from '../assets/icons/timer.svg?react'

import { useNavigate } from "react-icons";

const Navigation = () => {
  const Navigate = useNavigate();
  const links = [
    { Icon: DashboardIcon, name: 'Dashboard' },
    { Icon: PredictionsIcon, name: 'Predictions' },
    { Icon: HistoryIcon, name: 'History' },
    { Icon: PomodoroIcon, name: 'Pomodoro' },
  ]

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
    <nav className="navigation">
      {links.map((link, index) => (
        <NavigationItem key={index} Icon={link.Icon} name={link.name} />
      ))}

        <div style={{ display: "flex", gap: "10px", padding: "10px" }}>
      <button onClick={() => Navigate("/")}>Dashboard</button>
      <button onClick={() => Navigate("/predictions")}>Predictions</button>
      <button onClick={() => Navigate("/history")}>History</button>
      <button onClick={() => Navigate("/pomodoro")}>Pomodoro</button>
      </div>
    </nav>
    
  )
}

export default Navigation;
