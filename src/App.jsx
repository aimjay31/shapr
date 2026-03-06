import { BrowserRouter as Router, Routes, Route } from "react-dom";
import './App.css'
import Header from './components/Header'
import Navigation from './components/Navigation'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <div className="container">
      
      <header className="header">
        <Header/>
      </header>

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

        <main className="main">
          <Dashboard/>
        </main>
      </div>

    </div>
  )
}

export default App;
