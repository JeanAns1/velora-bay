import { useState } from 'react'
import './Contact.css'

const initial = { name: '', email: '', subject: 'Room booking', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const found = {}
    if (!form.name.trim()) found.name = 'Please enter your name'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) found.email = 'Please enter a valid email'
    if (form.message.trim().length < 10) found.message = 'Your message is a bit short'
    setErrors(found)

    if (Object.keys(found).length === 0) {
      setSent(true)
      setForm(initial)
    }
  }

  return (
    <>
      <section className="page-header">
        <div className="container">
          <p className="eyebrow">Contact</p>
          <h1>Get in touch</h1>
          <p>A question about your stay, a group booking or an event? We usually reply within a few hours.</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact">
          <div className="contact__info">
            <div>
              <h3>Address</h3>
              <p>Seaside Road, Bay Area</p>
            </div>
            <div>
              <h3>Phone &amp; WhatsApp</h3>
              <p>+261 34 00 000 00</p>
            </div>
            <div>
              <h3>Email</h3>
              <p>hello@velorabay.com</p>
            </div>
            <div className="contact__map">
              <span>Map</span>
            </div>
          </div>

          <form className="card contact__form" onSubmit={handleSubmit} noValidate>
            {sent && <p className="contact__success">Thank you, your message has been sent.</p>}

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input id="name" className="form-control" value={form.name} onChange={update('name')} />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" className="form-control" value={form.email} onChange={update('email')} />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <select id="subject" className="form-control" value={form.subject} onChange={update('subject')}>
                <option>Room booking</option>
                <option>Restaurant</option>
                <option>Events &amp; groups</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows="5" className="form-control" value={form.message} onChange={update('message')} />
              {errors.message && <span className="form-error">{errors.message}</span>}
            </div>

            <button className="btn btn-dark">Send message</button>
          </form>
        </div>
      </section>
    </>
  )
}
