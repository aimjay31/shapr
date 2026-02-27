import React from "react";
import HistoryBlockComponent from "../components/History-Block_Component";

export default function HistoryView() {
  const historyData = [
    {
      id: 1,
      date: "04/22/2024, 7:00 PM",
      subject: "English",
      duration: "1 hr 10 mins",
      mood: "Focused",
      sleep: "6 hrs",
      productive: true,
    },
    {
      id: 2,
      date: "04/21/2024, 3:30 PM",
      subject: "Math",
      duration: "45 mins",
      mood: "Tired",
      sleep: "5 hrs",
      productive: false,
    },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>History</h2>

      <div style={styles.card}>
        <div style={styles.header}>
          <span>DATE & TIME</span>
          <span>SUBJECT</span>
          <span>DURATION</span>
          <span>MOOD</span>
          <span>SLEEP (HRS)</span>
          <span>RESULT</span>
        </div>

        {historyData.map((item) => (
          <HistoryBlockComponent key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: 32,
  },
  title: {
    marginBottom: 20,
  },
  card: {
    background: "#FFFFFF",
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    overflow: "hidden",
  },
  header: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr",
    padding: "16px 20px",
    fontWeight: 600,
    fontSize: 13,
    borderBottom: "2px solid #eee",
  },
};