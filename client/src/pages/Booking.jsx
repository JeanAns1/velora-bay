import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Picture from '../components/Picture'
import { getRoom } from '../data/rooms'
import { createBooking, isAvailable } from '../services/api'
import { addDays, countNights, today } from '../utils/dates'
import { formatDate, formatPrice } from '../utils/format'
import NotFound from './NotFound'
import './Booking.css'

const steps = ['Dates', 'Your details', 'Payment']

export default function Booking() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const room = getRoom(id)

  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    checkIn: searchParams.get('checkIn') || today(),
    checkOut: searchParams.get('checkOut') || addDays(today(), 2),
    guests: Number(searchParams.get('guests')) || 1,
    guest: '',
    email: '',
    phone: '',
    requests: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
  })
  const [available, setAvailable] = useState(true)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!room) return
    isAvailable(room.id, form.checkIn, form.checkOut).then(setAvailable)
  }, [room, form.checkIn, form.checkOut])

  if (!room) return <NotFound />

  const nights = countNights(form.checkIn, form.checkOut)
  const total = nights * room.price

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const next = (e) => {
    e.preventDefault()
    setError('')

    if (step === 0 && !available) {
      setError('This room is already booked for these dates. Please choose other dates.')
      return
    }
    if (step === 1 && (!form.guest.trim() || !form.email.includes('@'))) {
      setError('Please enter your full name and a valid email.')
      return
    }
    setStep(step + 1)
  }

  const pay = async (e) => {
    e.preventDefault()
    setError('')

    if (form.cardNumber.replace(/\s/g, '').length < 16 || !form.cardExpiry || form.cardCvc.length < 3) {
      setError('Please check your card details.')
      return
    }

    setLoading(true)
    try {
      const booking = await createBooking({
        roomId: room.id,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        guests: Number(form.guests),
        guest: form.guest.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        requests: form.requests.trim(),
      })
      navigate(`/booking/confirmation/${booking.ref}`)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <section className="section booking">
      <div className="container booking__grid">
        <div>
          <Link to={`/rooms/${room.id}`} className="room-detail__back">
            ← Back to room
          </Link>
          <h1>Book your stay</h1>

          <ol className="steps">
            {steps.map((label, i) => (
              <li key={label} className={i === step ? 'is-active' : i < step ? 'is-done' : ''}>
                <span>{i + 1}</span>
                {label}
              </li>
            ))}
          </ol>

          {step === 0 && (
            <form className="card booking__form" onSubmit={next}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="checkIn">Check-in</label>
                  <input id="checkIn" type="date" className="form-control" value={form.checkIn} min={today()} onChange={update('checkIn')} />
                </div>
                <div className="form-group">
                  <label htmlFor="checkOut">Check-out</label>
                  <input id="checkOut" type="date" className="form-control" value={form.checkOut} min={today()} onChange={update('checkOut')} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="guests">Guests</label>
                <select id="guests" className="form-control" value={form.guests} onChange={update('guests')}>
                  {Array.from({ length: room.capacity }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n} guest{n > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
              {!available && <p className="form-error">Not available for these dates.</p>}
              {error && <p className="form-error">{error}</p>}
              <button className="btn btn-dark">Continue</button>
            </form>
          )}

          {step === 1 && (
            <form className="card booking__form" onSubmit={next}>
              <div className="form-group">
                <label htmlFor="guest">Full name</label>
                <input id="guest" className="form-control" value={form.guest} onChange={update('guest')} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" className="form-control" value={form.email} onChange={update('email')} />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone (optional)</label>
                  <input id="phone" className="form-control" value={form.phone} onChange={update('phone')} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="requests">Special requests (optional)</label>
                <textarea id="requests" rows="3" className="form-control" value={form.requests} onChange={update('requests')} />
              </div>
              {error && <p className="form-error">{error}</p>}
              <div className="booking__actions">
                <button type="button" className="btn btn-outline" onClick={() => setStep(0)}>
                  Back
                </button>
                <button className="btn btn-dark">Continue to payment</button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form className="card booking__form" onSubmit={pay}>
              <p className="booking__demo">Demo mode: no real payment is made. Use any 16-digit number.</p>
              <div className="form-group">
                <label htmlFor="cardName">Name on card</label>
                <input id="cardName" className="form-control" value={form.cardName} onChange={update('cardName')} />
              </div>
              <div className="form-group">
                <label htmlFor="cardNumber">Card number</label>
                <input id="cardNumber" className="form-control" inputMode="numeric" placeholder="4242 4242 4242 4242" value={form.cardNumber} onChange={update('cardNumber')} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="cardExpiry">Expiry</label>
                  <input id="cardExpiry" className="form-control" placeholder="MM/YY" value={form.cardExpiry} onChange={update('cardExpiry')} />
                </div>
                <div className="form-group">
                  <label htmlFor="cardCvc">CVC</label>
                  <input id="cardCvc" className="form-control" inputMode="numeric" maxLength="4" value={form.cardCvc} onChange={update('cardCvc')} />
                </div>
              </div>
              {error && <p className="form-error">{error}</p>}
              <div className="booking__actions">
                <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>
                  Back
                </button>
                <button className="btn btn-primary" disabled={loading}>
                  {loading ? 'Processing…' : `Pay ${formatPrice(total)}`}
                </button>
              </div>
            </form>
          )}
        </div>

        <aside className="card summary">
          <Picture type={room.picture} className="summary__picture" />
          <div className="summary__body">
            <h3>{room.name}</h3>
            <dl>
              <dt>Dates</dt>
              <dd>
                {formatDate(form.checkIn)} – {formatDate(form.checkOut)}
              </dd>
              <dt>Nights</dt>
              <dd>{nights}</dd>
              <dt>Guests</dt>
              <dd>{form.guests}</dd>
              <dt>Price per night</dt>
              <dd>{formatPrice(room.price)}</dd>
            </dl>
            <div className="summary__total">
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
