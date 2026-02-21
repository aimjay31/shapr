import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import "../App.css";

function PrivateLayout() {
  return (
    <div
    style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #F3E8FF, #E9D5FF)",
    }}
    >
      <header className="header">
        <Header />
      </header>

      <div className="content">
        <nav className="navigation">
          <Navigation />
        </nav>

        <main className="main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default PrivateLayout;