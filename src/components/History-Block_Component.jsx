import React from "react";

export default function HistoryBlockComponent({ time, productive }) {
  return (
    <div style={styles.row}>
      <span style={styles.time}>{time}</span>

      <span style={productive ? styles.productive : styles.notProductive}>
        {productive ? "Productive" : "Not Productive"}
      </span>
    </div>
  );
}

const styles = {
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 0",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
  },
  time: { fontSize: 14, fontWeight: 500 },
  productive: {
    background: "#D1FADF",
    color: "#027A48",
    padding: "6px 12px",
    borderRadius: 999,
    fontSize: 13,
  },
  notProductive: {
    background: "#FEE4E2",
    color: "#B42318",
    padding: "6px 12px",
    borderRadius: 999,
    fontSize: 13,
  },
};