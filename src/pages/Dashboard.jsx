import React, { useState } from "react";
import "../styles/Dashboard.css";
import TipsComponent from "../components/TipsComponent";
import { useNightMode } from "../context/NightModeContext";
import { useSession } from "../context/SessionContext";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const { nightMode } = useNightMode();
  const { sessions } = useSession();

  const [showTips, setShowTips] = useState(true);

  /* ---------------- REAL DATA ---------------- */

  const total = sessions.length;

  const productiveCount = sessions.filter(
    (s) => s.result === "Productive"
  ).length;

  const notProductiveCount = total - productiveCount;

  const confidence = total
    ? Math.round((productiveCount / total) * 100)
    : 0;

  const avgHr = 1;
  const avgMin = 20;
  const bestTime = "Evening Hours";

  const gridColor = nightMode
    ? "rgba(255,255,255,0.07)"
    : "rgba(0,0,0,0.10)";
  const tickColor = nightMode ? "#a78bfa" : "#6b57b9";

  /* ---------------- LINE CHART (REAL SESSIONS) ---------------- */

  const labels = sessions.map((_, i) => `S${i + 1}`);

  const productiveData = sessions.map((s) =>
    s.result === "Productive" ? 1 : 0
  );

  const notProductiveData = sessions.map((s) =>
    s.result !== "Productive" ? 1 : 0
  );

  const lineData = {
    labels,
    datasets: [
      {
        label: "Productive",
        data: productiveData,
        borderColor: "#2FA84F",
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.35,
      },
      {
        label: "Not Productive",
        data: notProductiveData,
        borderColor: "#F07A1A",
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.35,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          color: nightMode ? "#c0c0d0" : "#374151",
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 1,
        ticks: {
          stepSize: 1,
          color: tickColor,
          font: { size: 11, weight: "700" },
        },
        grid: { color: gridColor },
      },
      x: {
        ticks: {
          color: tickColor,
          font: { size: 11, weight: "700" },
        },
        grid: { display: false },
      },
    },
  };

  /* ---------------- BAR (REAL SUBJECT DATA) ---------------- */

  const subjectMap = {};

  sessions.forEach((s) => {
    if (!subjectMap[s.subject]) subjectMap[s.subject] = 0;
    subjectMap[s.subject] += s.result === "Productive" ? 1 : 0;
  });

  const barData = {
    labels: Object.keys(subjectMap),
    datasets: [
      {
        label: "Productive",
        data: Object.values(subjectMap),
        backgroundColor: "#43C872",
        borderRadius: 8,
        barThickness: 30,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          color: nightMode ? "#c0c0d0" : "#374151",
        },
      },
    },
    scales: {
      y: { display: false, grid: { display: false } },
      x: {
        ticks: {
          color: tickColor,
          font: { size: 11, weight: "700" },
        },
        grid: { display: false },
      },
    },
  };

  /* ---------------- DONUT ---------------- */

  const donutData = {
    labels: ["Confidence", "Remaining"],
    datasets: [
      {
        data: [confidence, 100 - confidence],
        backgroundColor: ["#ffffff", "rgba(255,255,255,0.25)"],
        borderWidth: 0,
        cutout: "74%",
      },
    ],
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  /* ---------------- UI ---------------- */

  return (
    <div className={nightMode ? "night-mode" : ""}>
      <div className="dashboard-with-button">
        <h1 className="dash-h1">Dashboard</h1>

        <button
          className="toggle-btn"
          onClick={() => setShowTips(!showTips)}
        >
          {showTips ? "Hide Tips" : "Show Tips"}
        </button>
      </div>

      {/* TOP CARDS */}
      <div className="dash-cards">
        <div className="dash-card">
          <div className="card-top">
            <span className="card-ico purple">
              <IcoCalendar />
            </span>
            <span className="card-title">Total Session</span>
          </div>
          <div className="card-value">{total}</div>
        </div>

        <div className="dash-card">
          <div className="card-top">
            <span className="card-ico purple">
              <IcoCheck />
            </span>
            <span className="card-title">Productive Sessions</span>
          </div>
          <div className="card-value">
            {productiveCount} <span className="card-sub">Productive</span>
          </div>
        </div>

        <div className="dash-card">
          <div className="card-top">
            <span className="card-ico purple">
              <IcoClock />
            </span>
            <span className="card-title">Avg Study Duration</span>
          </div>
          <div className="card-value">
            {avgHr}
            <span className="u">hr</span> {avgMin}
            <span className="u">min</span>
          </div>
        </div>

        <div className="dash-card">
          <div className="card-top">
            <span className="card-ico purple">
              <IcoMoon />
            </span>
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
              <div className="panel-body chart">
                <Line data={lineData} options={lineOptions} />
              </div>
            </div>

            <div className="panel">
              <div className="panel-head">Productivity by Subject</div>
              <div className="panel-body chart">
                <Bar data={barData} options={barOptions} />
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="panel tablepanel">
            <div className="tablehead">
              <div className="tabletitle">Recent Study Sessions</div>
              <div className="tablefilter">
                <span className="filtericon">≡</span>
                <span>All time</span>
                <span className="filtercaret">▾</span>
              </div>
            </div>

            <div className="tablewrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>DATE & TIME</th>
                    <th>SUBJECT</th>
                    <th>DURATION</th>
                    <th>MOOD</th>
                    <th>SLEEP (HRS)</th>
                    <th>RESULT</th>
                  </tr>
                </thead>

                <tbody>
                  {sessions.slice(-5).map((s, i) => (
                    <tr key={i}>
                      <td>{s.date}</td>
                      <td className="b">{s.subject}</td>
                      <td>{s.duration}</td>
                      <td className="m">{s.mood}</td>
                      <td>{s.sleep}</td>
                      <td>
                        <span
                          className={`pill ${
                            s.result === "Productive" ? "ok" : "warn"
                          }`}
                        >
                          {s.result} <span className="pc">▾</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="dash-right">
          <div className="panel predict">
            <div className="predict-head">
              <span className="predico">
                <IcoTrend />
              </span>
              <span>Prediction Result</span>
            </div>

            <div className="predict-row">
              <span className="miniCal">
                <IcoMiniCalendar />
              </span>
              <span className="predtext">
                Prediction Outcome : <b>Productive</b>
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

/* ICONS (UNCHANGED) */
function IcoCalendar(){return(<svg viewBox="0 0 24 24" className="big"><path d="M7 2v3M17 2v3M4 8h16M6 5h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" fill="none" stroke="currentColor" strokeWidth="2"/></svg>);}
function IcoCheck(){return(<svg viewBox="0 0 24 24" className="big"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M22 4 12 14.01l-3-3" fill="none" stroke="currentColor" strokeWidth="2"/></svg>);}
function IcoClock(){return(<svg viewBox="0 0 24 24" className="big"><path d="M12 22a10 10 0 1 1 10-10 10 10 0 0 1-10 10Z" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M12 6v6l4 2" fill="none" stroke="currentColor" strokeWidth="2"/></svg>);}
function IcoMoon(){return(<svg viewBox="0 0 24 24" className="big"><path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.5 6.5 0 0 0 9.8 9.8Z" fill="none" stroke="currentColor" strokeWidth="2"/></svg>);}
function IcoTrend(){return(<svg viewBox="0 0 24 24" className="mini"><path d="M4 16l6-6 4 4 6-8" fill="none" stroke="currentColor" strokeWidth="2"/></svg>);}
function IcoMiniCalendar(){return(<svg viewBox="0 0 24 24" className="mini purple"><path d="M7 2v2M17 2v2M4 7h16" fill="none" stroke="currentColor" strokeWidth="2"/></svg>);}