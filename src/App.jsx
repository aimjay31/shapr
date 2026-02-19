import './App.css'
import Header from './components/header'
import Navigation from './components/navigation'
import Dashboard from './pages/dashboard'

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

        <main className="main">
          <Dashboard/>
        </main>
      </div>

    </div>
  )
}

export default App
