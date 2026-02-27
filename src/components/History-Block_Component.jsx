import React from "react";

export default function HistoryBlockComponent({
  date,
  subject,
  duration,
  mood,
  sleep,
  productive,
}) {
  return (
    <div style={styles.row}>
      <span>{date}</span>
      <span>{subject}</span>
      <span>{duration}</span>
      <span>{mood}</span>
      <span>{sleep}</span>
      <span style={productive ? styles.productive : styles.notProductive}>
        {productive ? "Productive" : "Not Productive"}
      </span>
    </div>
  );
}

const styles = {
  row: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr",
    padding: "14px 20px",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
    alignItems: "center",
    fontSize: 14,
  },
  productive: {
    background: "#D1FADF",
    color: "#027A48",
    padding: "6px 12px",
    borderRadius: 20,
    width: "fit-content",
  },
  notProductive: {
    background: "#FEE4E2",
    color: "#B42318",
    padding: "6px 12px",
    borderRadius: 20,
    width: "fit-content",
  },
};