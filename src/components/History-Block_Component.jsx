import React, { useState } from "react";

const HistoryBlockComponent = ({ entry }) => {
  const { dateTime, subject, duration, mood, sleepHrs, result } = entry;
  const isProductive = result === "Productive";
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <tr
      style={{
        borderBottom: "1px solid #ECE2F9",
        background: hovered ? "#faf8ff" : "transparent",
        transition: "background 0.15s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <td style={td}>{dateTime}</td>
      <td style={{ ...td, fontWeight: "700", color: "#000000" }}>{subject}</td>
      <td style={td}>{duration}</td>
      <td style={{ ...td, color: "#94A3B8" }}>{mood}</td>
      <td style={{ ...td, color: "#94A3B8" }}>{sleepHrs} hrs</td>
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
            backgroundColor: isProductive ? "#DCFCE7" : "#FFEDD5",
            color: isProductive ? "#15803D" : "#C2410C",
            minWidth: "140px",
            justifyContent: "space-between",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          <span>{result}</span>
          {/* Chevron icon — inline SVG, no library needed */}
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

const td = {
  padding: "20px 16px",
  fontSize: "14px",
  verticalAlign: "middle",
  color: "#1E293B",
};

export default HistoryBlockComponent;