import { useState } from 'react'
import Picture from '../components/Picture'
import { hours, menu } from '../data/menu'
import { today } from '../utils/dates'
import { formatPrice } from '../utils/format'
import './Dining.css'

export default function Dining() {
  const [active, setActive] = useState(menu[0].category)
  const [sent, setSent] = useState(false)
  const current = menu.find((section) => section.category === active)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      <section className="page-header">
        <div className="container">
          <p className="eyebrow">Restaurant</p>
          <h1>Dining at Velora</h1>
          <p>Local products, fresh seafood and a terrace facing the ocean. Open to everyone.</p>
        </div>
      </section>

      <section className="section">
        <div className="container dining">
          <div>
            <div className="menu-tabs">
              {menu.map((section) => (
                <button
                  key={section.category}
                  className={section.category === active ? 'is-active' : ''}
                  onClick={() => setActive(section.category)}
                >
                  {section.category}
                </button>
              ))}
            </div>

            <ul className="menu-list">
              {current.items.map((item) => (
                <li key={item.name}>
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                  </div>
                  <span>{formatPrice(item.price)}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside>
            <Picture type="food" className="dining__picture" />
            <div className="card dining__hours">
              <h3>Opening hours</h3>
              {hours.map((h) => (
                <div key={h.label}>
                  <span>{h.label}</span>
                  <strong>{h.time}</strong>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--sand">
        <div className="container table-booking">
          <div>
            <p className="eyebrow">Reserve a table</p>
            <h2 className="section-title">
              Join us for <em>dinner</em>
            </h2>
            <p>Send us a request and we will confirm your table by email within the hour.</p>
          </div>

          {sent ? (
            <div className="card table-booking__done">
              <h3>Request sent</h3>
              <p>Thank you! We will get back to you shortly to confirm your table.</p>
            </div>
          ) : (
            <form className="card table-booking__form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input id="name" className="form-control" required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input id="date" type="date" className="form-control" min={today()} required />
                </div>
                <div className="form-group">
                  <label htmlFor="people">People</label>
                  <input id="people" type="number" min="1" max="12" defaultValue="2" className="form-control" required />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="tableEmail">Email</label>
                <input id="tableEmail" type="email" className="form-control" required />
              </div>
              <button className="btn btn-dark">Send request</button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
