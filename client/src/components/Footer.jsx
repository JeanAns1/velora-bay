import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <div className="footer__logo">Velora Bay</div>
          <p>Boutique hotel &amp; restaurant by the ocean.</p>
        </div>

        <div>
          <h4>Explore</h4>
          <Link to="/rooms">Rooms</Link>
          <Link to="/dining">Dining</Link>
          <Link to="/gallery">Gallery</Link>
        </div>

        <div>
          <h4>Contact</h4>
          <span>+261 34 00 000 00</span>
          <span>hello@velorabay.com</span>
          <span>Seaside Road, Bay Area</span>
        </div>

        <div>
          <h4>Hours</h4>
          <span>Reception 24/7</span>
          <span>Restaurant 7am – 10pm</span>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} Velora Bay</span>
        <span>Demo project · fictional hotel</span>
      </div>
    </footer>
  )
}
