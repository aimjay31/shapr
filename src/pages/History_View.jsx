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
  
  // NEW: State to hold the data for the popup modal
  const [selectedEntry, setSelectedEntry] = useState(null); 

  const filtered = sessions.filter((entry) => {
    const q = search.toLowerCase();
    return (
      entry.subject?.toLowerCase().includes(q) ||
      entry.taskName?.toLowerCase().includes(q) ||
      entry.period?.toLowerCase().includes(q) ||
      entry.environment?.toLowerCase().includes(q) ||
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
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input type="text" placeholder="Search Subject, Task, or Mood..." value={search} onChange={(e) => setSearch(e.target.value)} className="search-input" />
          </div>

          <div className="filter-wrapper">
            <svg className="filter-icon" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round">
              <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
            </svg>
            <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)} className="time-filter">
              {TIME_FILTERS.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
            <svg className="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="#7C5BD6" strokeWidth="2" strokeLinecap="round">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table className="history-table">
            <thead>
              <tr className="table-header">
                {COLUMNS.map((col) => <th key={col} className="table-header-cell">{col}</th>)}
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                [...filtered].reverse().map((entry, i) => (
                  <HistoryBlockComponent 
                    key={i} 
                    entry={entry} 
                    onView={() => setSelectedEntry(entry)} // Opens the modal!
                  />
                ))
              ) : (
                <tr><td colSpan={6} className="empty-state">No history records found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================== */}
      {/* THE DETAILS POPUP MODAL                      */}
      {/* ========================================== */}
      {selectedEntry && (
        <div className="history-modal-overlay" onClick={() => setSelectedEntry(null)}>
          <div className="history-modal-content" onClick={e => e.stopPropagation()}>
            <h2 className="history-modal-title">Session Details</h2>
            <p className="history-modal-subtitle">
              Reviewing your work on <b>{selectedEntry.taskName || selectedEntry.subject}</b>
            </p>

            <div className="details-grid">
              <div className="detail-item"><span>Date & Time</span><strong>{selectedEntry.date} • {selectedEntry.startTime}</strong></div>
              <div className="detail-item"><span>Study Period</span><strong>{selectedEntry.period}</strong></div>
              <div className="detail-item"><span>Environment</span><strong>{selectedEntry.environment}</strong></div>
              <div className="detail-item"><span>Target Cycles</span><strong>{selectedEntry.cycles} Completed</strong></div>
              <div className="detail-item"><span>Duration</span><strong>{selectedEntry.duration}</strong></div>
              <div className="detail-item"><span>Wellness Status</span><strong>{selectedEntry.mood} • {selectedEntry.sleep} hrs sleep</strong></div>
            </div>

            <button className="history-close-btn" onClick={() => setSelectedEntry(null)}>Close Details</button>
          </div>
        </div>
      )}

    </div>
  );
}