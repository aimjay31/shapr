import { useState } from "react"
import "../styles/Header.css"

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="header">
      <div className="logo">
        ShapR
      </div>

      <div className="header-right">
        <span className="language">EN</span>

        <span className="bell">bell icon</span>

        <div className="profile" onClick={() => setOpen(!open)}>
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="profile-pic"
          />

          {open && (
            <div className="dropdown">
              <p>Profile</p>
              <p>Settings</p>
              <p>Logout</p>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
