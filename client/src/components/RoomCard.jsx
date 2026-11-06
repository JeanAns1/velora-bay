import { Link } from 'react-router-dom'
import Picture from './Picture'
import { formatPrice } from '../utils/format'
import './RoomCard.css'

export default function RoomCard({ room, search = '' }) {
  return (
    <article className="room-card card">
      <Picture type={room.picture} className="room-card__picture" />
      <div className="room-card__body">
        <h3>{room.name}</h3>
        <p className="room-card__meta">
          {room.size} m² · {room.bed} · up to {room.capacity} guests
        </p>
        <p>{room.short}</p>
        <div className="room-card__footer">
          <span>
            <strong>{formatPrice(room.price)}</strong> / night
          </span>
          <Link to={`/rooms/${room.id}${search}`} className="btn btn-outline">
            View room
          </Link>
        </div>
      </div>
    </article>
  )
}
