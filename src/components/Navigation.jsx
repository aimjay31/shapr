import '../styles/Navigation.css'

function NavigationItem({ logo, name }) {
  // This is the template for ONE navigation link
  return (
    <div className="nav-item">
      <span className="nav-logo">{logo}</span>
      <span className="nav-name">{name}</span>
    </div>
  )
}

function Navigation() {
  // Example navigation links
  const links = [
    { logo: 'icon', name: 'Dashboard' },
    { logo: 'icon', name: 'Predictions' },
    { logo: 'icon', name: 'History' },
    { logo: 'icon', name: 'Pomodoro' },
  ]

  return (
    <nav className="navigation">
      {links.map((link, index) => (
        <NavigationItem key={index} logo={link.logo} name={link.name} />
      ))}
    </nav>
  )
}

export default Navigation
