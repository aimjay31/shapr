import React, { useState } from "react";
import "../styles/SessionForm.css";

export default function SessionForm() {
  const [date, setDate] = useState("2024-04-25");
  const [startTime, setStartTime] = useState("08:00");
  const [duration, setDuration] = useState(90);
  const [status, setStatus] = useState("productive"); // productive | unproductive
  const [mood, setMood] = useState("Focused");
  const [sleepHours, setSleepHours] = useState(7);
  const [breaksTaken, setBreaksTaken] = useState(2);
  const [environment, setEnvironment] = useState("Quiet Room");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      date,
      startTime,
      duration,
      status,
      mood,
      sleepHours,
      breaksTaken,
      environment,
      notes,
    };
    console.log("Study Session:", payload);
    // TODO: connect to backend / local storage later
  };

  return (
    <div className="sf-main">
      <h1 className="sf-title">Study Session Form</h1>

      <form className="sf-form" onSubmit={handleSubmit}>
          {/* Session Info */}
          <section className="sf-panel">
            <div className="sf-panel-head">Session Info</div>

            <div className="sf-panel-body">
              <div className="sf-grid-2">
                <div className="sf-field">
                  <label className="sf-label">Date</label>
                  <div className="sf-inputWrap">
                    <span className="sf-icon" aria-hidden="true">
                      <IcoCalendar />
                    </span>
                    <input
                      className="sf-input"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="sf-field">
                  <label className="sf-label">Start Time</label>
                  <div className="sf-inputWrap">
                    <span className="sf-icon" aria-hidden="true">
                      <IcoClock />
                    </span>
                    <input
                      className="sf-input"
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="sf-grid-2 sf-grid-2-tight">
                <div className="sf-field">
                  <label className="sf-label">Duration (minutes)</label>
                  <input
                    className="sf-input plain"
                    type="number"
                    min="1"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                  />
                </div>

                <div className="sf-field" />
              </div>

              <div className="sf-field sf-mt">
                <label className="sf-label">Actual Result</label>

                <div className="sf-statusRow">
                  <button
                    type="button"
                    className={`sf-statusBtn ${status === "productive" ? "active ok" : ""}`}
                    onClick={() => setStatus("productive")}
                  >
                    <span className="sf-statusIcon">
                      <IcoCheck />
                    </span>
                    Productive
                  </button>

                  <button
                    type="button"
                    className={`sf-statusBtn ${status === "unproductive" ? "active bad" : ""}`}
                    onClick={() => setStatus("unproductive")}
                  >
                    <span className="sf-statusIcon">
                      <IcoX />
                    </span>
                    Unproductive
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Lower grid */}
          <div className="sf-lowerGrid">
            {/* Wellness & Context */}
            <section className="sf-panel">
              <div className="sf-panel-head withIco">
                <span className="sf-headIco" aria-hidden="true">
                  <IcoSpark />
                </span>
                Wellness &amp; Context
              </div>

              <div className="sf-panel-body">
                <div className="sf-field">
                  <label className="sf-label">Mood</label>
                  <select
                    className="sf-input plain"
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                  >
                    <option>Focused</option>
                    <option>Motivated</option>
                    <option>Neutral</option>
                    <option>Tired</option>
                    <option>Stressed</option>
                    <option>Sleepy</option>
                  </select>
                </div>

                <div className="sf-sleepTop">
                  <label className="sf-label">Sleep Hours</label>
                  <span className="sf-sleepVal">{sleepHours}h</span>
                </div>

                <input
                  className="sf-range"
                  type="range"
                  min="0"
                  max="12"
                  value={sleepHours}
                  onChange={(e) => setSleepHours(Number(e.target.value))}
                />
                <div className="sf-rangeMarks">
                  <span>0</span>
                  <span>12</span>
                </div>
              </div>
            </section>

            {/* Environment */}
            <section className="sf-panel">
              <div className="sf-panel-head withIco">
                <span className="sf-headIco home" aria-hidden="true">
                  <IcoHome />
                </span>
                Environment
              </div>

              <div className="sf-panel-body">
                <div className="sf-field">
                  <label className="sf-label">Breaks Taken</label>
                  <input
                    className="sf-input plain"
                    type="number"
                    min="0"
                    value={breaksTaken}
                    onChange={(e) => setBreaksTaken(Number(e.target.value))}
                  />
                </div>

                <div className="sf-field">
                  <label className="sf-label">Environment</label>
                  <select
                    className="sf-input plain"
                    value={environment}
                    onChange={(e) => setEnvironment(e.target.value)}
                  >
                    <option>Quiet Room</option>
                    <option>Library</option>
                    <option>Room with Music</option>
                    <option>Noisy</option>
                  </select>
                </div>
              </div>
            </section>
          </div>

          {/* Notes */}
          <section className="sf-panel sf-notesPanel">
            <div className="sf-panel-body">
              <div className="sf-field">
                <label className="sf-label">Notes</label>
                <textarea
                  className="sf-textarea"
                  rows={4}
                  placeholder=""
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <div className="sf-actions">
                <button type="submit" className="sf-saveBtn">
                  Save Session
                </button>
              </div>
            </div>
          </section>
        </form>
    </div>
  );
}

/* --- tiny inline icons --- */
function IcoCalendar() {
  return (
    <svg viewBox="0 0 24 24" className="sf-svg" aria-hidden="true">
      <path
        d="M7 2v3M17 2v3M4 8h16M6 5h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IcoClock() {
  return (
    <svg viewBox="0 0 24 24" className="sf-svg" aria-hidden="true">
      <path
        d="M12 22a10 10 0 1 1 10-10 10 10 0 0 1-10 10Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M12 6v6l4 2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IcoCheck() {
  return (
    <svg viewBox="0 0 24 24" className="sf-svg" aria-hidden="true">
      <path
        d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M22 4 12 14.01l-3-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IcoX() {
  return (
    <svg viewBox="0 0 24 24" className="sf-svg" aria-hidden="true">
      <path
        d="M18 6 6 18M6 6l12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IcoSpark() {
  return (
    <svg viewBox="0 0 24 24" className="sf-svg" aria-hidden="true">
      <path
        d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IcoHome() {
  return (
    <svg viewBox="0 0 24 24" className="sf-svg" aria-hidden="true">
      <path
        d="M3 10.5 12 3l9 7.5V21a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2V10.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}