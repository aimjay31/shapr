import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import PrivateLayout from "./layouts/PrivateLayout";
import "./App.css";

import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProfileSettings from "./pages/ProfileSettings.jsx"; // Add this import

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/", element: <Landing /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
  {
    element: <PrivateLayout />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/profile-settings", element: <ProfileSettings /> }, // Add this route
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;