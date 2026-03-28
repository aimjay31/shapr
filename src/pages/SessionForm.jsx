import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SessionForm.css";
import { useNightMode } from "../context/NightModeContext";
import { useSession } from "../context/SessionContext";

export default function SessionForm() {
  const { nightMode } = useNightMode();
  const { setActiveSession } = useSession(); 
  const navigate = useNavigate();

  // 1. Timer & Task Setup
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState("08:00"); 
  const [subject, setSubject] = useState("");
  const [taskName, setTaskName] = useState(""); 
  
  // Initialize with numbers, but allow empty strings for easy typing
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [cycles, setCycles] = useState(4);

  // 2. ML Predictor Variables
  const [mood, setMood] = useState("Focused");
  const [sleepHours, setSleepHours] = useState(7);
  const [environment, setEnvironment] = useState("Quiet Room");

  // Helper to determine the "Period" label for your Dashboard Analytics [cite: 31]
  const getStudyPeriod = (timeStr) => {
    const hour = parseInt(timeStr.split(":")[0], 10);
    if (hour >= 6 && hour < 12) return "Morning Hours";
    if (hour >= 12 && hour < 18) return "Afternoon Hours";
    if (hour >= 18 && hour < 24) return "Evening Hours";
    return "Late Night Hours";
  };

  const handleStartSession = (e) => {
    e.preventDefault();

    // Package the data with fallbacks so the ML model doesn't get empty strings [cite: 61, 62]
    const pendingSession = {
      date,
      startTime,
      period: getStudyPeriod(startTime),
      subject: subject || "General Study", 
      taskName: taskName || "Quick Focus", 
      workDuration: workDuration || 25, // Fallback if cleared
      breakDuration: breakDuration || 5,   // Fallback if cleared
      cycles: cycles || 4,                 // Fallback if cleared
      mood,
      sleepHours,
      environment,
    };

    setActiveSession(pendingSession);
    console.log("Starting Session:", pendingSession);
    
    navigate('/pomtime');
  };

  return (
    <div className={`sf-main${nightMode ? " night-mode" : ""}`}>
      <h1 className="sf-title">Prepare Study Session</h1>

      <form className="sf-form" onSubmit={handleStartSession}>

        {/* --- Timer Setup Section --- */}
        <section className="sf-panel">
          <div className="sf-panel-head">Target & Timer</div>
          <div className="sf-panel-body">
            
            <div className="sf-grid-3">
              <div className="sf-field">
                <label className="sf-label">Date</label>
                <div className="sf-inputWrap">
                  <span className="sf-icon"><IcoCalendar /></span>
                  <input className="sf-input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
              </div>

              <div className="sf-field">
                <label className="sf-label">Study Start Time</label>
                <div className="sf-inputWrap">
                  <span className="sf-icon"><IcoClock /></span>
                  <input 
                    className="sf-input" 
                    type="time" 
                    value={startTime} 
                    onChange={(e) => setStartTime(e.target.value)} 
                    required 
                  />
                </div>
              </div>

              <div className="sf-field">
                <label className="sf-label">Subject</label>
                <div className="sf-inputWrap">
                  <span className="sf-icon"><IcoHome /></span>
                  <input className="sf-input" type="text" placeholder="e.g., Statistics" value={subject} onChange={(e) => setSubject(e.target.value)} required />
                </div>
              </div>
            </div>

            <div className="sf-grid-3 sf-mt">
              <div className="sf-field">
                <label className="sf-label">Specific Task</label>
                <div className="sf-inputWrap">
                  <span className="sf-icon"><IcoSpark /></span>
                  <input className="sf-input" type="text" placeholder="e.g., Chapter 4 Quiz" value={taskName} onChange={(e) => setTaskName(e.target.value)} required />
                </div>
              </div>

              <div className="sf-field">
                <label className="sf-label">Work (mins)</label>
                <input 
                  className="sf-input plain" 
                  type="number" 
                  min="1" 
                  value={workDuration} 
                  onChange={(e) => {
                    const val = e.target.value;
                    setWorkDuration(val === "" ? "" : parseInt(val, 10));
                  }} 
                />
              </div>

              <div className="sf-field">
                <label className="sf-label">Target Cycles</label>
                <input 
                  className="sf-input plain" 
                  type="number" 
                  min="1" 
                  value={cycles} 
                  onChange={(e) => {
                    const val = e.target.value;
                    setCycles(val === "" ? "" : parseInt(val, 10));
                  }} 
                />
              </div>
            </div>
          </div>
        </section>

        {/* --- ML Predictor Variables Section --- */}
        <div className="sf-lowerGrid">
          <section className="sf-panel">
            <div className="sf-panel-head withIco">
              <span className="sf-headIco"><IcoSpark /></span>
              Wellness Predictors
            </div>
            <div className="sf-panel-body">
              <div className="sf-field">
                <label className="sf-label">Current Mood</label>
                <select className="sf-input plain" value={mood} onChange={(e) => setMood(e.target.value)}>
                  <option>Focused</option><option>Motivated</option><option>Neutral</option>
                  <option>Tired</option><option>Stressed</option><option>Sleepy</option>
                </select>
              </div>

              <div className="sf-sleepTop">
                <label className="sf-label">Sleep Hours (Last Night)</label>
                <span className="sf-sleepVal">{sleepHours}h</span>
              </div>
              <input className="sf-range" type="range" min="0" max="12" value={sleepHours} onChange={(e) => setSleepHours(Number(e.target.value))} />
              <div className="sf-rangeMarks"><span>0</span><span>12</span></div>
            </div>
          </section>

          <section className="sf-panel">
            <div className="sf-panel-head withIco">
              <span className="sf-headIco home"><IcoHome /></span>
              Environment
            </div>
            <div className="sf-panel-body">
              <div className="sf-field">
                <label className="sf-label">Study Environment</label>
                <select className="sf-input plain" value={environment} onChange={(e) => setEnvironment(e.target.value)}>
                  <option>Quiet Room</option><option>Library</option><option>Room with Music</option><option>Noisy</option>
                </select>
              </div>

              {/* Added Break Duration input fix here as well */}
              <div className="sf-field sf-mt">
                <label className="sf-label">Break (mins)</label>
                <input 
                  className="sf-input plain" 
                  type="number" 
                  min="1" 
                  value={breakDuration} 
                  onChange={(e) => {
                    const val = e.target.value;
                    setBreakDuration(val === "" ? "" : parseInt(val, 10));
                  }} 
                />
              </div>
            </div>
          </section>
        </div>

        <div className="sf-actions sf-mt">
          <button type="submit" className="sf-saveBtn">Start Focus Timer</button>
        </div>

      </form>
    </div>
  );
}

/* Icons */
function IcoCalendar(){return(<svg viewBox="0 0 24 24" className="sf-svg" aria-hidden="true"><path d="M7 2v3M17 2v3M4 8h16M6 5h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>);}
function IcoClock(){return(<svg viewBox="0 0 24 24" className="sf-svg" aria-hidden="true"><path d="M12 22a10 10 0 1 1 10-10 10 10 0 0 1-10 10Z" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M12 6v6l4 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>);}
function IcoSpark(){return(<svg viewBox="0 0 24 24" className="sf-svg" aria-hidden="true"><path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>);}
function IcoHome(){return(<svg viewBox="0 0 24 24" className="sf-svg" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5V21a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2V10.5Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>);}