import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import { NightModeProvider } from "../context/NightModeContext";
import "../App.css";

function PrivateLayout() {
  return (
    <NightModeProvider>
      <Navigation>
        <Outlet />
      </Navigation>
    </NightModeProvider>
  );
}

export default PrivateLayout;