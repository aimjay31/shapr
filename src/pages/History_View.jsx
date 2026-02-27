import React from "react";
import HistoryBlockComponent from "../components/History-Block_Component";

export default function HistoryView() {
  const historyData = [
    { id: 1, time: "04/22/2024, 7:00 PM", productive: true },
    { id: 2, time: "04/21/2024, 3:30 PM", productive: false },
    { id: 3, time: "04/20/2024, 8:00 PM", productive: true },
    { id: 4, time: "04/19/2024, 6:00 PM", productive: true },
    { id: 5, time: "04/18/2024, 5:00 PM", productive: false },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 16 }}>History</h2>

      {historyData.map((item) => (
        <HistoryBlockComponent
          key={item.id}
          time={item.time}
          productive={item.productive}
        />
      ))}
    </div>
  );
}