import React, { useEffect, useMemo, useState } from "react";
import "../styles/PomTime.css";
import { useNightMode } from "../context/NightModeContext";

const DURATIONS = { focus: 25 * 60, short: 5 * 60, long: 15 * 60 };

const INITIAL_TASKS = [
  { id: 1, text: "Review brand guidelines",      done: true,  active: false },
  { id: 2, text: "Design timer interface",        done: false, active: true  },
  { id: 3, text: "Research animation curves",     done: false, active: false },
];

export default function PomTime() {
  const { nightMode, themeColor } = useNightMode();

  const [mode,      setMode]      = useState("focus");
  const [timeLeft,  setTimeLeft]  = useState(DURATIONS.focus);
  const [isRunning, setIsRunning] = useState(false);
  const [tasks,     setTasks]     = useState(INITIAL_TASKS);

  useEffect(() => {
    if (!isRunning) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { clearInterval(timer); setIsRunning(false); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning]);

  const totalTime = DURATIONS[mode];
  const progress  = useMemo(() => timeLeft / totalTime, [timeLeft, totalTime]);

  const radius         = 140;
  const circumference  = 2 * Math.PI * radius;
  const progressLength = circumference * 0.76;
  const progressOffset = progressLength * (1 - progress);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleModeChange = (nextMode) => { setMode(nextMode); setTimeLeft(DURATIONS[nextMode]); setIsRunning(false); };

  const handlePlayPause = () => {
    if (timeLeft === 0) { setTimeLeft(DURATIONS[mode]); setIsRunning(true); return; }
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => { setIsRunning(false); setTimeLeft(DURATIONS[mode]); };

  const handleSkip = () => {
    if (mode === "focus") handleModeChange("short");
    else handleModeChange("focus");
  };

  const toggleTask = (id) =>
    setTasks((prev) => prev.map((task) => task.id === id ? { ...task, done: !task.done } : task));

  return (
    <div className={`pomtime-page theme-${themeColor}${nightMode ? " night-mode" : ""}`}>
      <div className="pomtime-layout">

        {/* ── Sidebar ── */}
        <aside className="pomtime-sidebar">
          <section className="pomtime-card pomtime-session-card">
            <h2 className="pomtime-section-title">Current Session</h2>
            <div className="session-highlight">
              <div className="session-icon-wrap"><SessionIcon /></div>
              <div className="session-copy">
                <p className="session-title">Deep Work: UI Design</p>
                <p className="session-subtext">2 of 4 sessions complete</p>
              </div>
            </div>
            <div className="session-stats">
              <div className="stat-box">
                <span className="stat-label">TODAY</span>
                <span className="stat-value stat-value-purple">4.5h</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">GOAL</span>
                <span className="stat-value">6.0h</span>
              </div>
            </div>
          </section>

          <section className="pomtime-card pomtime-tasks-card">
            <div className="tasks-header">
              <h2 className="pomtime-section-title">Today&apos;s Tasks</h2>
              <button type="button" className="add-task-btn">+ Add</button>
            </div>
            <div className="task-list">
              {tasks.map((task) => (
                <label key={task.id} className={`task-item ${task.done ? "is-done" : ""}`}>
                  <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} />
                  <span className="custom-checkbox" aria-hidden="true"><CheckIcon /></span>
                  <span className="task-text">{task.text}</span>
                  {task.active && <span className="task-badge">ACTIVE</span>}
                </label>
              ))}
            </div>
          </section>
        </aside>

        {/* ── Main ── */}
        <main className="pomtime-main">
          <div className="pomtime-main-card">
            <div className="pomtime-tabs" role="tablist">
              <button type="button" className={`tab-btn ${mode === "focus" ? "active" : ""}`} onClick={() => handleModeChange("focus")}>Focus</button>
              <button type="button" className={`tab-btn ${mode === "short" ? "active" : ""}`} onClick={() => handleModeChange("short")}>Short Break</button>
              <button type="button" className={`tab-btn ${mode === "long"  ? "active" : ""}`} onClick={() => handleModeChange("long")}>Long Break</button>
            </div>

            <div className="timer-area">
              <div className="timer-ring">
                <svg viewBox="0 0 340 340" className="timer-svg" aria-hidden="true">
                  <circle cx="170" cy="170" r={radius} className="timer-track" />
                  <circle cx="170" cy="170" r={radius} className="timer-progress"
                    style={{ strokeDasharray: `${progressLength} ${circumference}`, strokeDashoffset: progressOffset }}
                  />
                </svg>
                <div className="timer-content">
                  <h1 className="timer-time">{formatTime(timeLeft)}</h1>
                  <p className="timer-label">
                    {mode === "focus" ? "TIME TO FOCUS" : mode === "short" ? "SHORT BREAK" : "LONG BREAK"}
                  </p>
                </div>
              </div>
            </div>

            <div className="timer-controls">
              <button type="button" className="control-btn control-btn-small" onClick={handleReset} aria-label="Reset"><ResetIcon /></button>
              <button type="button" className="control-btn control-btn-play"  onClick={handlePlayPause} aria-label={isRunning ? "Pause" : "Start"}>
                {isRunning ? <PauseIcon /> : <PlayIcon />}
              </button>
              <button type="button" className="control-btn control-btn-small" onClick={handleSkip} aria-label="Skip"><SkipIcon /></button>
            </div>

            <button type="button" className="sound-card">
              <div className="sound-left">
                <span className="sound-icon-wrap"><MusicIcon /></span>
                <div className="sound-copy">
                  <p className="sound-label">SOUNDSCAPE</p>
                  <p className="sound-title">Lo-Fi Study Beats</p>
                </div>
              </div>
              <span className="sound-arrow"><ChevronRightIcon /></span>
            </button>
          </div>
        </main>

      </div>
    </div>
  );
}

function SessionIcon(){return(<svg viewBox="0 0 24 24" className="pt-icon" fill="none"><path d="M4.75 6.25h9.5a1.5 1.5 0 0 1 1.5 1.5v8.5h-11a1.5 1.5 0 0 1-1.5-1.5v-7a1.5 1.5 0 0 1 1.5-1.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M15.75 9.25 20.25 7v10l-4.5-2.25" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M7 9.25h5.75M7 12h5.75M7 14.75h3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>);}
function CheckIcon(){return(<svg viewBox="0 0 24 24" className="pt-check-icon" fill="none"><path d="M6 12.5 10 16l8-9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg>);}
function ResetIcon(){return(<svg viewBox="0 0 24 24" className="pt-icon" fill="none"><path d="M4 4v5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 12a8 8 0 1 1-2.34-5.66L19 7.68" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);}
function PlayIcon(){return(<svg viewBox="0 0 24 24" className="pt-icon-lg" fill="currentColor"><path d="M8 5.5v13l10-6.5-10-6.5Z"/></svg>);}
function PauseIcon(){return(<svg viewBox="0 0 24 24" className="pt-icon-lg" fill="currentColor"><rect x="7" y="5.5" width="3.6" height="13" rx="1"/><rect x="13.4" y="5.5" width="3.6" height="13" rx="1"/></svg>);}
function SkipIcon(){return(<svg viewBox="0 0 24 24" className="pt-icon" fill="currentColor"><path d="M6 6.2v11.6l8.2-5.8L6 6.2Z"/><rect x="15.6" y="6.2" width="2.4" height="11.6" rx="0.8"/></svg>);}
function MusicIcon(){return(<svg viewBox="0 0 24 24" className="pt-icon" fill="none"><path d="M10 17V7.2l8-1.7v9.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="7.5" cy="17.5" r="2.5" fill="currentColor"/><circle cx="18" cy="15.5" r="2.5" fill="currentColor"/></svg>);}
function ChevronRightIcon(){return(<svg viewBox="0 0 24 24" className="pt-icon-sm" fill="none"><path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>);}