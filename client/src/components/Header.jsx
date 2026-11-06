import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import './Header.css'

const links = [
  { to: '/rooms', label: 'Rooms' },
  { to: '/dining', label: 'Dining' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const solid = scrolled || !isHome || menuOpen

  return (
    <header className={`header ${solid ? 'header--solid' : ''}`}>
      <div className="container header__inner">
        <Link to="/" className="header__logo">
          Velora Bay
        </Link>

        <nav className={`header__nav ${menuOpen ? 'is-open' : ''}`}>
          {links.map((link) => (
            <NavLink key={link.to} to={link.to}>
              {link.label}
            </NavLink>
          ))}
          <Link to="/rooms" className="btn btn-primary header__cta">
            Book now
          </Link>
        </nav>

        <button
          className="header__burger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
