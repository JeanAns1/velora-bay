import { useState } from 'react'
import Picture from '../components/Picture'
import { getRooms, updateRoomPrice } from '../data/rooms'
import { formatPrice } from '../utils/format'

export default function RoomsAdmin() {
  const [rooms, setRooms] = useState(getRooms())
  const [editing, setEditing] = useState(null)
  const [price, setPrice] = useState('')

  const startEdit = (room) => {
    setEditing(room.id)
    setPrice(room.price)
  }

  const save = (id) => {
    const value = Number(price)
    if (!value || value < 1) return
    updateRoomPrice(id, value)
    setRooms(getRooms())
    setEditing(null)
  }

  return (
    <>
      <div className="admin__head">
        <h1>Rooms</h1>
        <span>{rooms.length} room types</span>
      </div>

      <div className="admin-rooms">
        {rooms.map((room) => (
          <div key={room.id} className="card admin-room">
            <Picture type={room.picture} className="admin-room__picture" />
            <div className="admin-room__body">
              <h3>{room.name}</h3>
              <p>
                {room.size} m² · {room.bed} · {room.capacity} guests
              </p>

              {editing === room.id ? (
                <div className="admin-room__edit">
                  <input type="number" min="1" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} />
                  <button className="btn btn-dark" onClick={() => save(room.id)}>
                    Save
                  </button>
                  <button className="btn btn-outline" onClick={() => setEditing(null)}>
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="admin-room__price">
                  <strong>{formatPrice(room.price)}</strong> / night
                  <button className="btn btn-outline" onClick={() => startEdit(room)}>
                    Edit price
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
