import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getRooms } from '../data/rooms'
import { getBookings } from '../services/api'
import { addDays, countNights, today } from '../utils/dates'
import { formatDate, formatPrice } from '../utils/format'
import StatusBadge from './StatusBadge'

const DAYS = 14

export default function Overview() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [start, setStart] = useState(today())
  const rooms = getRooms()

  useEffect(() => {
    getBookings().then((data) => {
      setBookings(data)
      setLoading(false)
    })
  }, [])

  const active = bookings.filter((b) => b.status !== 'cancelled')
  const days = Array.from({ length: DAYS }, (_, i) => addDays(start, i))

  const stats = useMemo(() => {
    const revenue = active.filter((b) => b.status === 'paid').reduce((sum, b) => sum + b.total, 0)
    const nights = active.reduce((sum, b) => sum + countNights(b.checkIn, b.checkOut), 0)
    const pending = active.filter((b) => b.status === 'pending').length
    return { count: active.length, revenue, nights, pending }
  }, [active])

  const cellStatus = (roomId, day) => {
    const booking = active.find((b) => b.roomId === roomId && b.checkIn <= day && day < b.checkOut)
    return booking ? booking.status : ''
  }

  if (loading) return <p>Loading…</p>

  return (
    <>
      <div className="admin__head">
        <h1>Overview</h1>
        <span>{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
      </div>

      <div className="kpis">
        <div className="card kpi">
          <small>Bookings</small>
          <strong>{stats.count}</strong>
        </div>
        <div className="card kpi">
          <small>Nights booked</small>
          <strong>{stats.nights}</strong>
        </div>
        <div className="card kpi">
          <small>Revenue (paid)</small>
          <strong>{formatPrice(stats.revenue)}</strong>
        </div>
        <div className="card kpi">
          <small>Pending</small>
          <strong>{stats.pending}</strong>
        </div>
      </div>

      <div className="card panel">
        <div className="panel__head">
          <h2>Availability</h2>
          <div className="panel__tools">
            <button className="btn btn-outline" onClick={() => setStart(addDays(start, -7))}>
              ←
            </button>
            <input type="date" className="form-control" value={start} onChange={(e) => setStart(e.target.value)} />
            <button className="btn btn-outline" onClick={() => setStart(addDays(start, 7))}>
              →
            </button>
          </div>
        </div>

        <div className="calendar" style={{ gridTemplateColumns: `140px repeat(${DAYS}, 1fr)` }}>
          <div />
          {days.map((day) => (
            <div key={day} className="calendar__day">
              {formatDate(day)}
            </div>
          ))}
          {rooms.map((room) => (
            <div key={room.id} className="calendar__row">
              <div className="calendar__room">{room.name}</div>
              {days.map((day) => (
                <div key={day} className={`calendar__cell ${cellStatus(room.id, day)}`} />
              ))}
            </div>
          ))}
        </div>

        <div className="legend">
          <span className="legend__paid">Paid</span>
          <span className="legend__pending">Pending</span>
          <span>Free</span>
        </div>
      </div>

      <div className="card panel">
        <div className="panel__head">
          <h2>Latest reservations</h2>
          <Link to="/admin/bookings">See all</Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Guest</th>
              <th>Room</th>
              <th>Dates</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.slice(0, 5).map((b) => (
              <tr key={b.ref}>
                <td>{b.guest}</td>
                <td>{rooms.find((r) => r.id === b.roomId)?.name}</td>
                <td>
                  {formatDate(b.checkIn)} – {formatDate(b.checkOut)}
                </td>
                <td>{formatPrice(b.total)}</td>
                <td>
                  <StatusBadge status={b.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
