import React from "react";
import "../styles/Dashboard.css";
import Navigation from "../components/Navigation";

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

  /* =========================
     STATIC VALUES
  ========================== */

  const total = 130;
  const productive = 78;
  const avgHr = 1;
  const avgMin = 20;
  const bestTime = "Evening Hours";
  const confidence = 85;

  /* =========================
     TOP CARDS DATA
  ========================== */

  const cards = [
    {
      id: 1,
      title: "Total Session",
      value: total,
      icon: <IcoCalendar />,
    },
    {
      id: 2,
      title: "Productive Sessions",
      value: `${productive}%`,
      icon: <IcoCheck />,
    },
    {
      id: 3,
      title: "Avg Study Duration",
      value: `${avgHr}hr ${avgMin}min`,
      icon: <IcoClock />,
    },
    {
      id: 4,
      title: "Best Study Time",
      value: bestTime,
      icon: <IcoMoon />,
    },
  ];

  /* =========================
     RECENT SESSIONS DATA
  ========================== */

  const sessions = [
    {
      id: 1,
      date: "04/22/2024, 7:00 PM",
      subject: "English",
      duration: "1hr 10 min",
      mood: "Focused",
      sleep: "6 hrs",
      result: "Productive",
    },
    {
      id: 2,
      date: "04/21/2024, 3:30 PM",
      subject: "Math",
      duration: "45 mins",
      mood: "Tired",
      sleep: "5 hrs",
      result: "Not Productive",
    },
    {
      id: 3,
      date: "04/20/2024, 8:00 PM",
      subject: "History",
      duration: "1hr 30 min",
      mood: "Motivated",
      sleep: "7 hrs",
      result: "Productive",
    },
  ];

  /* =========================
     CHART DATA
  ========================== */

  const lineData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    datasets: [
      {
        label: "Productive",
        data: [0, 22, 32, 35, 40],
        borderColor: "#2FA84F",
        borderWidth: 2,
        tension: 0.35,
      },
      {
        label: "Not Productive",
        data: [0, 10, 13, 15, 30],
        borderColor: "#F07A1A",
        borderWidth: 2,
        tension: 0.35,
      },
    ],
  };

  const lineOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

  const barData = {
    labels: ["Math", "Science", "History", "English", "Literature"],
    datasets: [
      {
        label: "Productive",
        data: [80, 65, 50, 40, 30],
        backgroundColor: "#6b57b9",
        borderRadius: 8,
      },
    ],
  };

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

  const goals = [
  { id: 1, name: "Daily Study Goal", progress: 75 },
  { id: 2, name: "Weekly Study Goal", progress: 60 },
  { id: 3, name: "Monthly Study Goal", progress: 40 },
  ];

  return (
    <>
      <h1 className="dash-h1">Dashboard</h1>

      {/* =========================
         TOP CARDS
      ========================== */}
      <div className="dash-cards">
        {cards.map((card) => (
          <div className="dash-card" key={card.id}>
            <div className="card-top">
              <span className="card-ico purple">
                {card.icon}
              </span>
              <span className="card-title">{card.title}</span>
            </div>
            <div className="card-value">{card.value}</div>
          </div>
        ))}
      </div>

      {/* =========================
         MAIN GRID
      ========================== */}
      <div className="dash-grid">

        {/* LEFT SIDE */}
        <div className="dash-left">

          <div className="panel">
            <div className="panel-head">Productivity Over Time</div>
            <div className="panel-body chart">
              <Line data={lineData} options={lineOptions} />
            </div>
          </div>

          <div className="panel tablepanel">
            <div className="tablehead">
              <div className="tabletitle">Recent Study Sessions</div>
            </div>

            <div className="tablewrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Date & Time</th>
                    <th>Subject</th>
                    <th>Duration</th>
                    <th>Mood</th>
                    <th>Sleep</th>
                    <th>Result</th>
                  </tr>
                </thead>

                <tbody>
                  {sessions.map((s) => (
                    <tr key={s.id}>
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
                          {s.result}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="dash-right">

          <div className="panel predict">
            <div className="predict-head">
              Prediction Result
            </div>

            <div className="ring">
              <div className="ringChart">
                <Doughnut data={donutData} />
              </div>

              <div className="ringCenter">
                <div className="ringBig">{confidence}%</div>
                <div className="ringSmall">CONFIDENCE</div>
              </div>
            </div>
          </div>
          <div className="below-panel">
            <div className="below-panel-title">
              <h2>Study Goals Progress</h2>
            </div>
            <div className="insights">
              <tbody >
                {goals.map(goal => (
                  <tr key={goal.id}>
                    <td>{goal.name}</td>
                    <td>{goal.progress}%</td>
                  </tr>
                ))}
              </tbody>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

/* =========================
   ICON COMPONENTS
   (Keep these in same file)
========================== */

function IcoCalendar() {
  return (
    <svg viewBox="0 0 24 24" className="big">
      <path d="M7 2v3M17 2v3M4 8h16M6 5h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
        fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function IcoCheck() { return <span>✔</span>; }
function IcoClock() { return <span>⏰</span>; }
function IcoMoon() { return <span>🌙</span>; }