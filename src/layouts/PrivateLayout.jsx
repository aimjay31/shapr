import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import "../App.css";

function PrivateLayout() {
  return (
    <Navigation>
      <Outlet />
    </Navigation>
  );
}

export default PrivateLayout;