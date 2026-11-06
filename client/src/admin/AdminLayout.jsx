import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { logout } from './auth'
import './admin.css'

const links = [
  { to: '/admin', label: 'Overview', end: true },
  { to: '/admin/bookings', label: 'Bookings' },
  { to: '/admin/rooms', label: 'Rooms' },
]

export default function AdminLayout() {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="admin">
      <aside className="admin__side">
        <div className="admin__logo">Velora</div>
        <nav>
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="admin__side-bottom">
          <a href="/" target="_blank" rel="noreferrer">
            View site ↗
          </a>
          <button onClick={handleLogout}>Log out</button>
        </div>
      </aside>
      <div className="admin__main">
        <Outlet />
      </div>
    </div>
  )
}
