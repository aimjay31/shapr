import '../styles/Navigation.css'

import DashboardIcon from '../assets/icons/dashboard.svg?react'
import PredictionsIcon from '../assets/icons/prediction.svg?react'
import HistoryIcon from '../assets/icons/history.svg?react'
import PomodoroIcon from '../assets/icons/timer.svg?react'

function NavigationItem({ Icon, name }) {
  return (
    <div className="nav-item">
      <Icon className="nav-logo" />
      <span className="nav-name">{name}</span>
    </div>
  )
}

function Navigation() {
  const links = [
    { Icon: DashboardIcon, name: 'Dashboard' },
    { Icon: PredictionsIcon, name: 'Predictions' },
    { Icon: HistoryIcon, name: 'History' },
    { Icon: PomodoroIcon, name: 'Pomodoro' },
  ]

  return (
    <nav className="navigation">
      {links.map((link, index) => (
        <NavigationItem key={index} Icon={link.Icon} name={link.name} />
      ))}
    </nav>
  )
}

export default Navigation