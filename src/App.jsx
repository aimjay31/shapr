import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import PrivateLayout from "./layouts/PrivateLayout";
import "./App.css";

import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProfileSettings from "./pages/ProfileSettings.jsx";
import HistoryView from "./pages/History_View.jsx";
import PomTime from "./pages/PomTime.jsx";
import SessionForm from "./pages/SessionForm.jsx";
import { SessionProvider } from "./context/SessionContext.jsx";

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
      { path: "/pomtime", element: <PomTime /> },
      { path: "/profile-settings", element: <ProfileSettings /> },
      { path: "/history", element: <HistoryView /> },
      { path: "/SessionForm", element: <SessionForm /> },
    ],
  },
]);

function App() {
  return (
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  );
}

export default App;