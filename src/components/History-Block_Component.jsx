import React, { useState } from "react";
import { useNightMode } from "../context/NightModeContext";

const HistoryBlockComponent = ({ entry }) => {
  const { dateTime, subject, duration, mood, sleepHrs, result } = entry;
  const isProductive = result === "Productive";
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const { nightMode } = useNightMode();

  const rowBg = hovered
    ? nightMode ? "#1e1e38" : "#faf8ff"
    : "transparent";

  const borderColor = nightMode ? "#2a2a45" : "#ECE2F9";
  const textPrimary  = nightMode ? "#e0e0f0" : "#1E293B";
  const textSubject  = nightMode ? "#ffffff" : "#000000";
  const textMuted    = nightMode ? "#8b8fb8" : "#94A3B8";

  const td = {
    padding: "20px 16px",
    fontSize: "14px",
    verticalAlign: "middle",
    color: textPrimary,
  };

  return (
    <tr
      style={{
        borderBottom: `1px solid ${borderColor}`,
        background: rowBg,
        transition: "background 0.15s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <td style={td}>{dateTime}</td>
      <td style={{ ...td, fontWeight: "700", color: textSubject }}>{subject}</td>
      <td style={td}>{duration}</td>
      <td style={{ ...td, color: textMuted }}>{mood}</td>
      <td style={{ ...td, color: textMuted }}>{sleepHrs} hrs</td>
      <td style={td}>
        <span
          onClick={() => setOpen(!open)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "6px 12px",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: "500",
            backgroundColor: isProductive
              ? nightMode ? "#14532d44" : "#DCFCE7"
              : nightMode ? "#7c2d1244" : "#FFEDD5",
            color: isProductive
              ? nightMode ? "#4ade80" : "#15803D"
              : nightMode ? "#fb923c" : "#C2410C",
            border: `1px solid ${isProductive
              ? nightMode ? "#4ade8055" : "transparent"
              : nightMode ? "#fb923c55" : "transparent"}`,
            minWidth: "140px",
            justifyContent: "space-between",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          <span>{result}</span>
          {open ? (
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 15l-6-6-6 6" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          )}
        </span>
      </td>
    </tr>
  );
};

export default HistoryBlockComponent;