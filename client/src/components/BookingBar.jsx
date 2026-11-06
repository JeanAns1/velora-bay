import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addDays, today } from '../utils/dates'
import './BookingBar.css'

export default function BookingBar() {
  const navigate = useNavigate()
  const [checkIn, setCheckIn] = useState(today())
  const [checkOut, setCheckOut] = useState(addDays(today(), 2))
  const [guests, setGuests] = useState(2)

  const handleSubmit = (e) => {
    e.preventDefault()
    const params = new URLSearchParams({ checkIn, checkOut, guests })
    navigate(`/rooms?${params}`)
  }

  return (
    <form className="booking-bar" onSubmit={handleSubmit}>
      <div className="booking-bar__field">
        <label htmlFor="checkIn">Check-in</label>
        <input
          id="checkIn"
          type="date"
          value={checkIn}
          min={today()}
          onChange={(e) => setCheckIn(e.target.value)}
        />
      </div>

      <div className="booking-bar__field">
        <label htmlFor="checkOut">Check-out</label>
        <input
          id="checkOut"
          type="date"
          value={checkOut}
          min={today()}
          onChange={(e) => setCheckOut(e.target.value)}
        />
      </div>

      <div className="booking-bar__field">
        <label htmlFor="guests">Guests</label>
        <select id="guests" value={guests} onChange={(e) => setGuests(e.target.value)}>
          {[1, 2, 3, 4].map((n) => (
            <option key={n} value={n}>
              {n} {n > 1 ? 'adults' : 'adult'}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-dark">
        Check availability
      </button>
    </form>
  )
}
