import { BrowserRouter as Router, Routes, Route } from "react-dom";
import './App.css'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Dashboard from './pages/Dashboard'

import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProfileSettings from "./pages/ProfileSettings.jsx";

      <div className="content">
        <nav className="navigation">
          <Navigation/>
        </nav>
        <Router>
      <Navigation /> {/* navigation buttons */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/predictions" element={<Predictions />} />
        <Route path="/history" element={<History />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
      </Routes>
      </Router>

      { path: "/profile-settings", element: <ProfileSettings /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
