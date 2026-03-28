import React, { useState } from "react";
import HistoryBlockComponent from "../components/History-Block_Component";
import "../styles/History_View.css";
import { useNightMode } from "../context/NightModeContext";
import { useSession } from "../context/SessionContext";

const COLUMNS = ["DATE & TIME", "SUBJECT", "DURATION", "MOOD", "SLEEP (HRS)", "RESULT"];
const TIME_FILTERS = ["All time", "This week", "This month", "This year"];

export default function HistoryView() {
  const { nightMode } = useNightMode();
  const { sessions } = useSession();

  const [search, setSearch] = useState("");
  const [timeFilter, setTimeFilter] = useState("All time");

  /* ---------------- REAL DATA ---------------- */

  const filtered = sessions.filter((entry) => {
    const q = search.toLowerCase();

    return (
      entry.subject?.toLowerCase().includes(q) ||
      entry.mood?.toLowerCase().includes(q) ||
      entry.date?.toLowerCase().includes(q) ||
      entry.result?.toLowerCase().includes(q)
    );
  });

  return (
    <div className={`history-container${nightMode ? " night-mode" : ""}`}>
      <h1 className="history-title">History</h1>

      <div className="history-card">
        {/* Search + Filter Bar */}
        <div className="history-controls">
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
                filtered.map((entry, i) => (
                  <HistoryBlockComponent key={i} entry={entry} />
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
  );
}