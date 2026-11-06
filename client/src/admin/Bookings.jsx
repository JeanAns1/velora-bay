import { useEffect, useMemo, useState } from 'react'
import { getRooms } from '../data/rooms'
import { getBookings, updateBookingStatus } from '../services/api'
import { countNights } from '../utils/dates'
import { formatDate, formatPrice } from '../utils/format'
import StatusBadge from './StatusBadge'

export default function Bookings() {
  const [bookings, setBookings] = useState([])
  const [status, setStatus] = useState('all')
  const [query, setQuery] = useState('')
  const rooms = getRooms()

  useEffect(() => {
    getBookings().then(setBookings)
  }, [])

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    return bookings.filter((b) => {
      if (status !== 'all' && b.status !== status) return false
      if (!q) return true
      return b.guest.toLowerCase().includes(q) || b.ref.toLowerCase().includes(q) || b.email.toLowerCase().includes(q)
    })
  }, [bookings, status, query])

  const changeStatus = async (ref, value) => {
    const updated = await updateBookingStatus(ref, value)
    setBookings((prev) => prev.map((b) => (b.ref === ref ? updated : b)))
  }

  return (
    <>
      <div className="admin__head">
        <h1>Bookings</h1>
        <span>{list.length} result{list.length > 1 ? 's' : ''}</span>
      </div>

      <div className="card panel">
        <div className="panel__tools panel__tools--wide">
          <input
            className="form-control"
            placeholder="Search by guest, email or reference"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="all">All status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Reference</th>
                <th>Guest</th>
                <th>Room</th>
                <th>Dates</th>
                <th>Nights</th>
                <th>Total</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {list.map((b) => (
                <tr key={b.ref}>
                  <td className="table__ref">{b.ref}</td>
                  <td>
                    {b.guest}
                    <small>{b.email}</small>
                  </td>
                  <td>{rooms.find((r) => r.id === b.roomId)?.name}</td>
                  <td>
                    {formatDate(b.checkIn)} – {formatDate(b.checkOut)}
                  </td>
                  <td>{countNights(b.checkIn, b.checkOut)}</td>
                  <td>{formatPrice(b.total)}</td>
                  <td>
                    <StatusBadge status={b.status} />
                  </td>
                  <td>
                    <select className="form-control form-control--small" value={b.status} onChange={(e) => changeStatus(b.ref, e.target.value)}>
                      <option value="paid">Paid</option>
                      <option value="pending">Pending</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
              {list.length === 0 && (
                <tr>
                  <td colSpan="8" className="table__empty">
                    No booking found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
