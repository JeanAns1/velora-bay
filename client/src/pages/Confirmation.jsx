import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getRoom } from '../data/rooms'
import { getBooking } from '../services/api'
import { countNights } from '../utils/dates'
import { formatDate, formatPrice } from '../utils/format'
import './Confirmation.css'

export default function Confirmation() {
  const { ref } = useParams()
  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBooking(ref).then((data) => {
      setBooking(data)
      setLoading(false)
    })
  }, [ref])

  if (loading) return <section className="section confirmation">Loading…</section>

  if (!booking) {
    return (
      <section className="section confirmation">
        <div className="container card confirmation__card">
          <h1>Booking not found</h1>
          <Link to="/" className="btn btn-dark">
            Back to home
          </Link>
        </div>
      </section>
    )
  }

  const room = getRoom(booking.roomId)

  return (
    <section className="section confirmation">
      <div className="container card confirmation__card">
        <div className="confirmation__icon">✓</div>
        <h1>Booking confirmed</h1>
        <p>
          Thank you {booking.guest.split(' ')[0]}! A confirmation has been sent to <strong>{booking.email}</strong>.
        </p>

        <dl>
          <dt>Reference</dt>
          <dd>{booking.ref}</dd>
          <dt>Room</dt>
          <dd>{room?.name}</dd>
          <dt>Dates</dt>
          <dd>
            {formatDate(booking.checkIn)} – {formatDate(booking.checkOut)} ({countNights(booking.checkIn, booking.checkOut)} nights)
          </dd>
          <dt>Guests</dt>
          <dd>{booking.guests}</dd>
          <dt>Total paid</dt>
          <dd>{formatPrice(booking.total)}</dd>
        </dl>

        <Link to="/" className="btn btn-dark">
          Back to home
        </Link>
      </div>
    </section>
  )
}
