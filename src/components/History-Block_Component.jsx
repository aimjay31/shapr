import React, { useState } from "react";
import { useNightMode } from "../context/NightModeContext";

const HistoryBlockComponent = ({ entry, onView }) => {
  const { date, startTime, subject, taskName, duration, mood, sleep, result } = entry;
  const isProductive = result === "Productive";
  const [hovered, setHovered] = useState(false);
  const { nightMode } = useNightMode();

  const rowBg = hovered ? (nightMode ? "#1e1e38" : "#faf8ff") : "transparent";
  const borderColor = nightMode ? "#2a2a45" : "#ECE2F9";
  const textPrimary  = nightMode ? "#e0e0f0" : "#1E293B";
  const textSubject  = nightMode ? "#ffffff" : "#000000";
  const textMuted    = nightMode ? "#8b8fb8" : "#94A3B8";
  const brandPurple  = nightMode ? "#a78bfa" : "#7C5BD6";

  const td = {
    padding: "20px 16px",
    fontSize: "14px",
    verticalAlign: "middle",
    color: textPrimary,
    cursor: "pointer", // Lets the user know it's clickable
  };

  return (
    <tr
      onClick={onView} // Triggers the popup modal!
      style={{
        borderBottom: `1px solid ${borderColor}`,
        background: rowBg,
        transition: "background 0.15s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <td style={td}>
        {date} <br/>
        <span style={{ fontSize: "0.85em", color: textMuted }}>{startTime}</span>
      </td>
      <td style={{ ...td, fontWeight: "700", color: textSubject }}>
        {subject} <br/>
        <span style={{ fontSize: "0.85em", fontWeight: "600", color: brandPurple }}>{taskName}</span>
      </td>
      <td style={td}>{duration}</td>
      <td style={{ ...td, color: textMuted }}>{mood}</td>
      <td style={{ ...td, color: textMuted }}>{sleep} hrs</td>
      <td style={{ padding: "16px" }}>
        <span
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            padding: "6px 12px", borderRadius: "8px", fontSize: "13px", fontWeight: "700",
            backgroundColor: isProductive ? (nightMode ? "rgba(47,168,79,0.15)" : "#e6f4ea") : (nightMode ? "rgba(240,122,26,0.15)" : "#fce8d5"),
            color: isProductive ? (nightMode ? "#4ade80" : "#2FA84F") : (nightMode ? "#fb923c" : "#F07A1A"),
            border: `1px solid ${isProductive ? (nightMode ? "rgba(74, 222, 128, 0.3)" : "transparent") : (nightMode ? "rgba(251, 146, 60, 0.3)" : "transparent")}`,
            minWidth: "140px", justifyContent: "space-between", userSelect: "none",
          }}
        >
          <span>{result}</span>
          {/* Arrow points right to indicate "View More" instead of down */}
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M9 18l6-6-6-6" /> 
          </svg>
        </span>
      </td>
    </tr>
  );
};

export default HistoryBlockComponent;