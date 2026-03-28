import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PomTime.css";
import { useNightMode } from "../context/NightModeContext";
import { useSession } from "../context/SessionContext";

export default function PomTime() {
  const { nightMode } = useNightMode();
  const { activeSession, setSessions, setActiveSession } = useSession();
  const navigate = useNavigate();

  // 1. Durations from the form (defaults to 25/5 if form was skipped)
  const DURATIONS = { 
    focus: (activeSession?.workDuration || 25) * 60, 
    short: (activeSession?.breakDuration || 5) * 60, 
    long: 15 * 60 
  };

  const [mode, setMode] = useState("focus");
  const [timeLeft, setTimeLeft] = useState(DURATIONS.focus);
  const [isRunning, setIsRunning] = useState(false);

  // 2. Cycle Tracking Logic
  const targetCycles = activeSession?.cycles || 4;
  const [currentCycle, setCurrentCycle] = useState(1);

  // 3. Post-Session Modal State
  const [showModal, setShowModal] = useState(false);
  const [finalResult, setFinalResult] = useState("Productive");

  // 4. Timer Logic with Auto-Cycle switching
  useEffect(() => {
    if (!isRunning) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { 
          clearInterval(timer); 
          setIsRunning(false); 
          
          if (mode === "focus") {
            if (currentCycle < targetCycles) {
              setMode("short");
              setCurrentCycle(prevCycle => prevCycle + 1);
              return DURATIONS.short;
            } else {
              setMode("long");
              return DURATIONS.long;
            }
          } else {
            setMode("focus");
            return DURATIONS.focus;
          }
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning, mode, currentCycle, targetCycles, DURATIONS]);

 
  const totalTime = DURATIONS[mode];
  const progress  = useMemo(() => timeLeft / totalTime, [timeLeft, totalTime]);
  const radius = 140;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference * 0.76 * (1 - progress);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleModeChange = (nextMode) => { 
    setMode(nextMode); 
    setTimeLeft(DURATIONS[nextMode]); 
    setIsRunning(false); 
  };
  
  const handlePlayPause = () => setIsRunning((prev) => !prev);
  const handleReset = () => { setIsRunning(false); setTimeLeft(DURATIONS[mode]); };
  
  const handleFinish = () => {
    setIsRunning(false);
    setShowModal(true);
  };

 const handleSaveSession = () => {
    const completedSession = {
      ...activeSession, 
      date: activeSession?.date || new Date().toISOString().split('T')[0],
      subject: activeSession?.subject || "Unplanned",
      

      period: activeSession?.period || "Morning Hours", 
      startTime: activeSession?.startTime || "08:00",
      
      duration: `${activeSession?.workDuration || 25} mins`,
      result: finalResult, // 'Productive' or 'Not Productive'
      sleep: activeSession?.sleepHours || 7,
      mood: activeSession?.mood || "Focused"
    };

    setSessions((prev) => [...prev, completedSession]);
    setActiveSession(null);
    setShowModal(false);
    navigate('/dashboard'); 
  };

  return (
    <div className={`pomtime-page${nightMode ? " night-mode" : ""}`}>
      <div className="pomtime-layout">
        
        {/* Sidebar */}
        <aside className="pomtime-sidebar">
          <section className="pomtime-card pomtime-session-card">
            <h2 className="pomtime-section-title">Current Session</h2>
            <div className="session-highlight">
              <div className="session-icon-wrap"><IcoClock /></div>
              <div className="session-copy">
                <p className="session-title">{activeSession?.subject || "No Subject"}</p>
                <p className="session-subtext">{activeSession?.taskName || "General Focus"}</p>
              </div>
            </div>

            <div className="session-stats">
              <div className="stat-box">
                <span className="stat-label">CYCLE</span>
                <span className="stat-value stat-value-purple">{currentCycle} / {targetCycles}</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">GOAL</span>
                <span className="stat-value">{activeSession?.workDuration || 25}m</span>
              </div>
            </div>

            <button onClick={handleFinish} className="control-btn-play" style={{ width: '100%', borderRadius: '12px', height: '50px', marginTop: '15px', fontSize: '14px', fontWeight: '800' }}>
              Finish Session
            </button>
          </section>
        </aside>

        {/* Main Timer Area */}
        <main className="pomtime-main">
          <div className="pomtime-main-card">
            <div className="pomtime-tabs">
              <button className={`tab-btn ${mode === "focus" ? "active" : ""}`} onClick={() => handleModeChange("focus")}>Focus</button>
              <button className={`tab-btn ${mode === "short" ? "active" : ""}`} onClick={() => handleModeChange("short")}>Short Break</button>
              <button className={`tab-btn ${mode === "long" ? "active" : ""}`} onClick={() => handleModeChange("long")}>Long Break</button>
            </div>

            <div className="timer-area">
              <div className="timer-ring">
                <svg viewBox="0 0 340 340" className="timer-svg">
                  <circle cx="170" cy="170" r={radius} className="timer-track" />
                  <circle cx="170" cy="170" r={radius} className="timer-progress" 
                    style={{ strokeDasharray: `${circumference * 0.76} ${circumference}`, strokeDashoffset: progressOffset }} 
                  />
                </svg>
                <div className="timer-content">
                  <h1 className="timer-time">{formatTime(timeLeft)}</h1>
                  <p className="timer-label">{mode === "focus" ? "TIME TO FOCUS" : "TAKE A BREAK"}</p>
                </div>
              </div>
            </div>

            <div className="timer-controls">
              <button className="control-btn control-btn-small" onClick={handleReset}>↺</button>
              <button className="control-btn control-btn-play" onClick={handlePlayPause}>
                {isRunning ? "⏸" : "▶"}
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Productivity Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Session Complete!</h2>
            <p className="modal-subtitle">Was your work on <b>{activeSession?.taskName}</b> productive?</p>
            
            <div className="result-toggle-group">
              <button 
                className={`result-btn ${finalResult === "Productive" ? "active productive" : ""}`}
                onClick={() => setFinalResult("Productive")}>
                ✓ Productive
              </button>
              <button 
                className={`result-btn ${finalResult === "Not Productive" ? "active unproductive" : ""}`}
                onClick={() => setFinalResult("Not Productive")}>
                ✕ Unproductive
              </button>
            </div>

            <button className="save-session-btn" onClick={handleSaveSession}>
              Save & View Analytics
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function IcoClock() { return <svg viewBox="0 0 24 24" className="pt-icon" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>; }