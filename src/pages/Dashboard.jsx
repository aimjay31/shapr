import React from "react";
import "../styles/Dashboard.css";
import Navigation from "../components/Navigation";
import { useState } from "react";
import TipsComponent from "../components/TipsComponent";
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend);

export default function Dashboard() {
  // static values (replace later)
  const total = 130;
  const productive = 78;
  const avgHr = 1;
  const avgMin = 20;
  const bestTime = "Evening Hours";
  const confidence = 85;

  const lineData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    datasets: [
      {
        label: "Productive",
        data: [0, 22, 32, 35, 40],
        borderColor: "#2FA84F",
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.35,
      },
      {
        label: "Not Productive",
        data: [0, 10, 13, 15, 30],
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
      legend: { position: "bottom", labels: { usePointStyle: true, boxWidth: 8 } },
    },
    scales: {
      y: {
        min: 0,
        max: 40,
        ticks: { stepSize: 10, callback: (v) => `${v}%`, color: "#6b57b9", font: { size: 11, weight: "700" } },
        grid: { color: "rgba(0,0,0,0.10)" },
      },
      x: {
        ticks: { color: "#6b57b9", font: { size: 11, weight: "700" } },
        grid: { display: false },
      },
    },
  };

  const barData = {
    labels: ["Math", "Science", "History", "English", "Literature"],
    datasets: [
      {
        label: "Productive",
        data: [80, 65, 50, 40, 30],
        backgroundColor: ["#43C872", "#79D99A", "#FFB06E", "#FFC08A", "#FFD0AC"],
        borderRadius: 8,
        barThickness: 30,
      },
      {
        label: "Not Productive",
        data: [0, 0, 0, 0, 0],
        backgroundColor: "#F07A1A",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom", labels: { usePointStyle: true, boxWidth: 8 } },
    },
    scales: {
      y: { display: false, grid: { display: false } },
      x: { ticks: { color: "#6b57b9", font: { size: 11, weight: "700" } }, grid: { display: false } },
    },
  };

  const donutData = {
    labels: ["Confidence", "Remaining"],
    datasets: [
      { data: [confidence, 100 - confidence], backgroundColor: ["#ffffff", "rgba(255,255,255,0.25)"], borderWidth: 0, cutout: "74%" },
    ],
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
  };

  const [showTips, setShowTips] = useState(true);

    <button onClick={() => setShowTips(!showTips)}>
      Toggle Tips
    </button>

  {showTips && <TipsComponent />}

  return (
    <>
      <div className="dashboard-with-button">
        <h1 className="dash-h1">Dashboard</h1>
        <button 
          className="toggle-btn"
          onClick={() => setShowTips(!showTips)}
        >
          {showTips ? "Hide Tips" : "Show Tips"}
        </button>
      </div>


      {/* Top cards */}
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
            {productive}% <span className="card-sub">Productive</span>
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

      {/* Grid */}
      <div className="dash-grid">
        {/* Left content */}
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
                    <th>DATE &amp; TIME</th>
                    <th>SUBJECT</th>
                    <th>DURATION</th>
                    <th>MOOD</th>
                    <th>SLEEP (HRS)</th>
                    <th>RESULT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>04/22/2024, 7:00 PM</td>
                    <td className="b">English</td>
                    <td>1hr 10 min</td>
                    <td className="m">Focused</td>
                    <td>6 hrs</td>
                    <td><span className="pill ok">Productive <span className="pc">▾</span></span></td>
                  </tr>
                  <tr>
                    <td>04/21/2024, 3:30 PM</td>
                    <td className="b">Math</td>
                    <td>45 mins</td>
                    <td className="m">Tired</td>
                    <td>5 hrs</td>
                    <td><span className="pill warn">Not Productive <span className="pc">▾</span></span></td>
                  </tr>
                  <tr>
                    <td>04/20/2024, 8:00 PM</td>
                    <td className="b">History</td>
                    <td>1hr 30 min</td>
                    <td className="m">Motivated</td>
                    <td>7 hrs</td>
                    <td><span className="pill ok">Productive <span className="pc">▾</span></span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="dash-right">
          <div className="panel predict">
            <div className="predict-head">
              <span className="predico"><IcoTrend /></span>
              <span>Prediction Result</span>
            </div>

            <div className="predict-row">
              <span className="miniCal"><IcoMiniCalendar /></span>
              <span className="predtext">Prediction Outcome : <b>Productive</b></span>
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
            {showTips && <TipsComponent/>}
          </div>
        </div>
      </div>
    </>
  );
}

/* --- small inline icons for the cards/right panels --- */
function IcoCalendar(){return(<svg viewBox="0 0 24 24" className="big" aria-hidden="true"><path d="M7 2v3M17 2v3M4 8h16M6 5h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>);}
function IcoCheck(){return(<svg viewBox="0 0 24 24" className="big" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M22 4 12 14.01l-3-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);}
function IcoClock(){return(<svg viewBox="0 0 24 24" className="big" aria-hidden="true"><path d="M12 22a10 10 0 1 1 10-10 10 10 0 0 1-10 10Z" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M12 6v6l4 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>);}
function IcoMoon(){return(<svg viewBox="0 0 24 24" className="big" aria-hidden="true"><path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.5 6.5 0 0 0 9.8 9.8Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>);}
function IcoTrend(){return(<svg viewBox="0 0 24 24" className="mini" aria-hidden="true"><path d="M4 16l6-6 4 4 6-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M18 6h2v6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>);}
function IcoMiniCalendar(){return(<svg viewBox="0 0 24 24" className="mini purple" aria-hidden="true"><path d="M7 2v2M17 2v2M4 7h16M6 4h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>);}
function IcoSun(){return(<svg viewBox="0 0 24 24" className="mini green" aria-hidden="true"><path d="M12 18a6 6 0 1 0-6-6 6 6 0 0 0 6 6Z" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M5 19l1.5-1.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>);}
function IcoWarn(){return(<svg viewBox="0 0 24 24" className="mini orange" aria-hidden="true"><path d="M12 3 2 21h20L12 3Z" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M12 9v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M12 17h.01" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg>);}