import React, { useState } from "react";
import HistoryBlockComponent from "../components/History-Block_Component";
import "../styles/History_View.css";
import Navigation from "../components/Navigation";

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
    <>
      <div className="history-container">
        <h1 className="history-title">History</h1>

        <div className="history-card">
          {/* Search + Filter Bar */}
          <div className="history-controls">
            {/* Search input */}
            <div className="search-wrapper">
              <svg
                className="search-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
            </div>

            {/* Time Filter dropdown */}
            <div className="filter-wrapper">
              <svg
                className="filter-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
              </svg>
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="time-filter"
              >
                {TIME_FILTERS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
              <svg
                className="chevron-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6750A4"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>

          {/* Table */}
          <div className="table-wrapper">
            <table className="history-table">
              <thead>
                <tr className="table-header">
                  {COLUMNS.map((col) => (
                    <th key={col} className="table-header-cell">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((entry) => (
                    <HistoryBlockComponent key={entry.id} entry={entry} />
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="empty-state">
                      No history records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}