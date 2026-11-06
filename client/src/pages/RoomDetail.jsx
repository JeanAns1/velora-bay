import { Link, useParams, useSearchParams } from 'react-router-dom'
import Picture from '../components/Picture'
import { getRoom } from '../data/rooms'
import { formatPrice } from '../utils/format'
import NotFound from './NotFound'
import './RoomDetail.css'

export default function RoomDetail() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const room = getRoom(id)

  if (!room) return <NotFound />

  const search = searchParams.toString() ? `?${searchParams}` : ''

  return (
    <>
      <section className="room-gallery">
        <Picture type={room.picture} className="room-gallery__main" />
        <Picture type="sea" className="room-gallery__side" />
        <Picture type="garden" className="room-gallery__side" />
      </section>

      <section className="section">
        <div className="container room-detail">
          <div>
            <Link to={`/rooms${search}`} className="room-detail__back">
              ← All rooms
            </Link>
            <h1>{room.name}</h1>
            <p className="room-detail__meta">
              {room.size} m² · {room.bed} · up to {room.capacity} guests
            </p>
            <p className="room-detail__text">{room.description}</p>

            <h3>Amenities</h3>
            <ul className="amenities">
              {room.amenities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h3>Good to know</h3>
            <ul className="room-detail__info">
              <li>Check-in from 2pm, check-out until 11am</li>
              <li>Free cancellation up to 48 hours before arrival</li>
              <li>Extra bed available on request</li>
            </ul>
          </div>

          <aside className="room-detail__aside card">
            <p className="room-detail__price">
              <strong>{formatPrice(room.price)}</strong> / night
            </p>
            <p>Taxes and breakfast included. Pay securely online.</p>
            <Link to={`/booking/${room.id}${search}`} className="btn btn-primary">
              Book this room
            </Link>
          </aside>
        </div>
      </section>
    </>
  )
}
