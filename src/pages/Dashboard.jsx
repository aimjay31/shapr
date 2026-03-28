import React, { useState } from "react";
import "../styles/Dashboard.css";
import TipsComponent from "../components/TipsComponent";
import { useNightMode } from "../context/NightModeContext";
import { useSession } from "../context/SessionContext";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, ArcElement, Tooltip, Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Tooltip, Legend
);

export default function Dashboard() {
  const { nightMode } = useNightMode();
  const { sessions } = useSession(); 
  const [showTips, setShowTips] = useState(true);
  const [timeFilter, setTimeFilter] = useState("All time");

  /* ---------------- 1. MASTER FILTER LOGIC ---------------- */
  // This now filters the data for the ENTIRE dashboard!
  const filteredSessions = sessions.filter((s) => {
    if (timeFilter === "All time") return true;

    const sessionDate = new Date(s.date);
    const today = new Date();

    if (timeFilter === "Today") {
      return sessionDate.toDateString() === today.toDateString();
    }
    
    if (timeFilter === "This week") {
      const diffTime = Math.abs(today - sessionDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    }
    
    if (timeFilter === "This month") {
      return (
        sessionDate.getMonth() === today.getMonth() &&
        sessionDate.getFullYear() === today.getFullYear()
      );
    }
    return true;
  });

  /* ---------------- 2. DYNAMIC CALCULATIONS ---------------- */
  // Notice how these all use 'filteredSessions' now instead of 'sessions'
  
  const total = filteredSessions.length;

  const productiveSessions = filteredSessions.filter((s) => s.result === "Productive");
  const productiveCount = productiveSessions.length;

  // Confidence Score
  const confidence = total ? Math.round((productiveCount / total) * 100) : 0;

  // Average Study Duration
  let totalMins = 0;
  filteredSessions.forEach(s => {
    const mins = parseInt(s.duration) || 0; 
    totalMins += mins;
  });
  const avgTotalMins = total ? Math.round(totalMins / total) : 0;
  const avgHr = Math.floor(avgTotalMins / 60);
  const avgMin = avgTotalMins % 60;

  // Best Study Time
  const periodMap = {};
  let bestTime = "No Data";
  let maxPeriodCount = 0;

  productiveSessions.forEach(s => {
    const p = s.period || "Morning Hours"; 
    periodMap[p] = (periodMap[p] || 0) + 1;
    if (periodMap[p] > maxPeriodCount) {
      maxPeriodCount = periodMap[p];
      bestTime = p;
    }
  });

  /* ---------------- 3. CHART SETUP & COLORS ---------------- */

  const gridColor = nightMode ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.10)";
  const tickColor = nightMode ? "#a78bfa" : "#6b57b9";

  // LINE CHART
  const labels = filteredSessions.map((_, i) => `S${i + 1}`);
  const productiveData = filteredSessions.map((s) => s.result === "Productive" ? 1 : 0);
  const notProductiveData = filteredSessions.map((s) => s.result !== "Productive" ? 1 : 0);

  const lineData = {
    labels,
    datasets: [
      { label: "Productive", data: productiveData, borderColor: "#2FA84F", borderWidth: 2, pointRadius: 0, tension: 0.35 },
      { label: "Not Productive", data: notProductiveData, borderColor: "#F07A1A", borderWidth: 2, pointRadius: 0, tension: 0.35 },
    ],
  };

  const lineOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { position: "bottom", labels: { usePointStyle: true, boxWidth: 8, color: nightMode ? "#c0c0d0" : "#374151" } } },
    scales: {
      y: { min: 0, max: 1, ticks: { stepSize: 1, color: tickColor, font: { size: 11, weight: "700" } }, grid: { color: gridColor } },
      x: { ticks: { color: tickColor, font: { size: 11, weight: "700" } }, grid: { display: false } },
    },
  };

  // BAR CHART
  const subjectMap = {};
  filteredSessions.forEach((s) => {
    const sub = s.subject || "General";
    if (!subjectMap[sub]) subjectMap[sub] = 0;
    subjectMap[sub] += s.result === "Productive" ? 1 : 0;
  });

  const barData = {
    labels: Object.keys(subjectMap),
    datasets: [{ label: "Productive Sessions", data: Object.values(subjectMap), backgroundColor: "#43C872", borderRadius: 8, barThickness: 30 }],
  };

  const barOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { position: "bottom", labels: { usePointStyle: true, boxWidth: 8, color: nightMode ? "#c0c0d0" : "#374151" } } },
    scales: {
      y: { display: false, grid: { display: false } },
      x: { ticks: { color: tickColor, font: { size: 11, weight: "700" } }, grid: { display: false } },
    },
  };

  // DONUT CHART
  const donutData = {
    labels: ["Confidence", "Remaining"],
    datasets: [{ data: [confidence, 100 - confidence], backgroundColor: ["#ffffff", "rgba(255,255,255,0.25)"], borderWidth: 0, cutout: "74%" }],
  };

  const donutOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { enabled: false } } };

  /* ---------------- 4. UI ---------------- */

  return (
    <div className={nightMode ? "night-mode" : ""}>
      <div className="dashboard-with-button">
        <h1 className="dash-h1">Dashboard</h1>

        <button className="toggle-btn" onClick={() => setShowTips(!showTips)}>
          {showTips ? "Hide Tips" : "Show Tips"}
        </button>
      </div>

      {/* TOP CARDS */}
      <div className="dash-cards">
        <div className="dash-card">
          <div className="card-top">
            <span className="card-ico purple"><IcoCalendar /></span>
            <span className="card-title">Total Session</span>
          </div>
          <div className="card-value">{total}</div>
        </div>

        <div className="dash-card">
          <div className="card-top">
            <span className="card-ico purple"><IcoCheck /></span>
            <span className="card-title">Productive Sessions</span>
          </div>
          <div className="card-value">
            {productiveCount} <span className="card-sub">Productive</span>
          </div>
        </div>

        <div className="dash-card">
          <div className="card-top">
            <span className="card-ico purple"><IcoClock /></span>
            <span className="card-title">Avg Study Duration</span>
          </div>
          <div className="card-value">
            {avgHr}<span className="u">hr</span> {avgMin}<span className="u">min</span>
          </div>
        </div>

        <div className="dash-card">
          <div className="card-top">
            <span className="card-ico purple"><IcoMoon /></span>
            <span className="card-title">Best Study Time</span>
          </div>
          <div className="card-value small">{bestTime}</div>
        </div>
      </div>

      {/* GRID */}
      <div className="dash-grid">
        <div className="dash-left">
          <div className="dash-panels-2">
            <div className="panel">
              <div className="panel-head">Productivity Over Time</div>
              <div className="panel-body chart"><Line data={lineData} options={lineOptions} /></div>
            </div>

            <div className="panel">
              <div className="panel-head">Productivity by Subject</div>
              <div className="panel-body chart"><Bar data={barData} options={barOptions} /></div>
            </div>
          </div>

          {/* DYNAMIC TABLE */}
          <div className="panel tablepanel">
            <div className="tablehead">
              <div className="tabletitle">Recent Study Sessions</div>
              
              <div className="tablefilter" style={{ position: "relative", display: "flex", alignItems: "center", color: nightMode ? "#8b8fb8" : "#64748b", fontWeight: "700" }}>
                <span className="filtericon" style={{ marginRight: "6px" }}>≡</span>
                <select 
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  style={{
                    appearance: "none", background: "transparent", border: "none", 
                    color: "inherit", fontSize: "14px", fontWeight: "inherit", fontFamily: "inherit",
                    cursor: "pointer", outline: "none", paddingRight: "16px"
                  }}
                >
                  <option value="All time">All time</option>
                  <option value="Today">Today</option>
                  <option value="This week">This week</option>
                  <option value="This month">This month</option>
                </select>
                <span className="filtercaret" style={{ position: "absolute", right: 0, pointerEvents: "none" }}>▾</span>
              </div>
            </div>

            <div className="tablewrap">
              <table className="table">
                <thead style={{ borderBottom: nightMode ? "1px solid #4a3b8c" : "1px solid #7C5BD6" }}>
                  <tr>
                    {["DATE & TIME", "SUBJECT", "DURATION", "MOOD", "SLEEP (HRS)", "RESULT"].map((col) => (
                      <th key={col} style={{ color: nightMode ? "#a78bfa" : "#7C5BD6", paddingBottom: "12px", fontSize: "12px", letterSpacing: "0.5px" }}>
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {filteredSessions.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center", padding: "30px", color: nightMode ? "#8b8fb8" : "#94A3B8" }}>
                        No sessions found for "{timeFilter}".
                      </td>
                    </tr>
                  ) : (
                    [...filteredSessions].reverse().slice(0, 5).map((s, i) => (
                      <tr key={i} style={{ borderBottom: nightMode ? "1px solid #2a2a45" : "1px solid #f3f4f7" }}>
                        <td style={{ padding: "16px 0" }}>
                          <span style={{ color: nightMode ? "#e0e0f0" : "#1e293b" }}>{s.date}</span> <br/>
                          <span style={{ fontSize: '0.85em', color: nightMode ? '#8b8fb8' : '#94A3B8' }}>{s.startTime}</span>
                        </td>
                        <td className="b" style={{ padding: "16px 0" }}>
                          <span style={{ color: nightMode ? "#ffffff" : "#000000", fontWeight: "800" }}>{s.subject}</span> <br/>
                          <span style={{ fontSize: '0.85em', color: nightMode ? '#a78bfa' : '#7C5BD6', fontWeight: "700" }}>{s.taskName}</span>
                        </td>
                        <td style={{ padding: "16px 0", color: nightMode ? "#e0e0f0" : "#475569" }}>{s.duration}</td>
                        <td className="m" style={{ padding: "16px 0", color: nightMode ? "#e0e0f0" : "#1e293b", fontWeight: "700" }}>{s.mood}</td>
                        <td style={{ padding: "16px 0", color: nightMode ? "#e0e0f0" : "#475569" }}>{s.sleep}</td>
                        <td style={{ padding: "16px 0" }}>
                          <span 
                            style={{
                              display: "inline-flex", alignItems: "center", gap: "6px",
                              padding: "6px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: "800",
                              backgroundColor: s.result === "Productive" ? (nightMode ? "rgba(47,168,79,0.15)" : "#e6f4ea") : (nightMode ? "rgba(240,122,26,0.15)" : "#fce8d5"),
                              color: s.result === "Productive" ? (nightMode ? "#4ade80" : "#2FA84F") : (nightMode ? "#fb923c" : "#F07A1A"),
                            }}
                          >
                            {s.result} <span style={{ fontSize: "10px" }}>▾</span>
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="dash-right">
          <div className="panel predict">
            <div className="predict-head">
              <span className="predico"><IcoTrend /></span>
              <span>Prediction Result</span>
            </div>

            <div className="predict-row">
              <span className="miniCal"><IcoMiniCalendar /></span>
              <span className="predtext">
                Prediction Outcome : <b>{confidence >= 50 ? "Productive" : "Unproductive"}</b>
              </span>
            </div>

            <div className="predict-sub">Confidence Score:</div>

            <div className="ring">
              <div className="ringChart">
                <Doughnut data={donutData} options={donutOptions} />
              </div>

              <div className="ringCenter">
                <div className="ringBig">{confidence}%</div>
                <div className="ringSmall">CONFIDENCE</div>
              </div>
            </div>
          </div>

          <div className="panel tips">
            {showTips && <TipsComponent />}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ICONS */
function IcoCalendar(){return(<svg viewBox="0 0 24 24" className="big"><path d="M7 2v3M17 2v3M4 8h16M6 5h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" fill="none" stroke="currentColor" strokeWidth="2"/></svg>);}
function IcoCheck(){return(<svg viewBox="0 0 24 24" className="big"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M22 4 12 14.01l-3-3" fill="none" stroke="currentColor" strokeWidth="2"/></svg>);}
function IcoClock(){return(<svg viewBox="0 0 24 24" className="big"><path d="M12 22a10 10 0 1 1 10-10 10 10 0 0 1-10 10Z" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M12 6v6l4 2" fill="none" stroke="currentColor" strokeWidth="2"/></svg>);}
function IcoMoon(){return(<svg viewBox="0 0 24 24" className="big"><path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.5 6.5 0 0 0 9.8 9.8Z" fill="none" stroke="currentColor" strokeWidth="2"/></svg>);}
function IcoTrend(){return(<svg viewBox="0 0 24 24" className="mini"><path d="M4 16l6-6 4 4 6-8" fill="none" stroke="currentColor" strokeWidth="2"/></svg>);}
function IcoMiniCalendar(){return(<svg viewBox="0 0 24 24" className="mini purple"><path d="M7 2v2M17 2v2M4 7h16" fill="none" stroke="currentColor" strokeWidth="2"/></svg>);}