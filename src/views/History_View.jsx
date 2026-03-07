import React, { useState } from "react";
import HistoryBlockComponent from "../components/History-Block_Component";

const historyData = [
  {
    id: 1,
    dateTime: "04/22/2024, 7:00 PM",
    subject: "English",
    duration: "1 hr 10 mins",
    mood: "Focused",
    sleepHrs: 6,
    result: "Productive",
  },
  {
    id: 2,
    dateTime: "04/21/2024, 3:30 PM",
    subject: "Math",
    duration: "45 mins",
    mood: "Tired",
    sleepHrs: 5,
    result: "Not Productive",
  },
  {
    id: 3,
    dateTime: "04/20/2024, 8:00 PM",
    subject: "History",
    duration: "1 hr 30 mins",
    mood: "Motivated",
    sleepHrs: 7,
    result: "Productive",
  },
  {
    id: 4,
    dateTime: "04/19/2024, 6:00 PM",
    subject: "Science",
    duration: "1 hr 10 mins",
    mood: "Focused",
    sleepHrs: 7,
    result: "Productive",
  },
  {
    id: 5,
    dateTime: "04/18/2024, 5:00 PM",
    subject: "Math",
    duration: "1 hr 15 mins",
    mood: "Focused",
    sleepHrs: 6,
    result: "Productive",
  },
  {
    id: 6,
    dateTime: "04/17/2024, 7:00 PM",
    subject: "English",
    duration: "40 mins",
    mood: "Distracted",
    sleepHrs: 3,
    result: "Not Productive",
  },
];

const COLUMNS = ["DATE & TIME", "SUBJECT", "DURATION", "MOOD", "SLEEP (HRS)", "RESULT"];
const TIME_FILTERS = ["All time", "This week", "This month", "This year"];

export default function HistoryView() {
  const [search, setSearch] = useState("");
  const [timeFilter, setTimeFilter] = useState("All time");

  const filtered = historyData.filter((entry) => {
    const q = search.toLowerCase();
    return (
      entry.subject.toLowerCase().includes(q) ||
      entry.mood.toLowerCase().includes(q) ||
      entry.dateTime.toLowerCase().includes(q) ||
      entry.result.toLowerCase().includes(q)
    );
  });

  return (
    <div style={{ padding: "32px 40px", background: "#F1F5F9", minHeight: "100vh" }}>

      {/* Page Title */}
      <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1E293B", marginBottom: "24px" }}>
        History
      </h1>

      {/* Main Card */}
      <div style={{
        background: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 1px 12px rgba(103,80,164,0.08)",
        overflow: "hidden",
      }}>

        {/* Search + Filter Bar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px",
          gap: "12px",
        }}>

          {/* Search input */}
          <div style={{ position: "relative", flex: 1 }}>
            {/* Search icon — inline SVG */}
            <svg
              viewBox="0 0 24 24" width="17" height="17"
              fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"
              style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px 10px 38px",
                border: "1px solid #ECE2F9",
                borderRadius: "10px",
                fontSize: "14px",
                color: "#1E293B",
                background: "#F8FAFC",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Time Filter dropdown */}
          <div style={{ position: "relative" }}>
            {/* Filter icon — inline SVG */}
            <svg
              viewBox="0 0 24 24" width="15" height="15"
              fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"
              style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}
            >
              <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
            </svg>
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              style={{
                appearance: "none",
                padding: "10px 36px 10px 34px",
                border: "1px solid #ECE2F9",
                borderRadius: "10px",
                fontSize: "14px",
                color: "#1E293B",
                background: "#F8FAFC",
                cursor: "pointer",
                outline: "none",
              }}
            >
              {TIME_FILTERS.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
            {/* Chevron icon */}
            <svg
              viewBox="0 0 24 24" width="14" height="14"
              fill="none" stroke="#6750A4" strokeWidth="2" strokeLinecap="round"
              style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "700px" }}>

            {/* Header */}
            <thead>
              <tr style={{ borderTop: "1.5px solid #ECE2F9", borderBottom: "1.5px solid #ECE2F9" }}>
                {COLUMNS.map((col) => (
                  <th
                    key={col}
                    style={{
                      padding: "14px 16px",
                      textAlign: "left",
                      fontSize: "11px",
                      fontWeight: "700",
                      color: "#64748B",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      background: "#fff",
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body — auto-generates a row per entry in historyData */}
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((entry) => (
                  <HistoryBlockComponent key={entry.id} entry={entry} />
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    style={{ textAlign: "center", padding: "40px", color: "#94A3B8", fontSize: "14px" }}
                  >
                    No history records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}