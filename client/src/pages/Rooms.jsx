import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import RoomCard from '../components/RoomCard'
import { getRooms } from '../data/rooms'
import './Rooms.css'

export default function Rooms() {
  const [searchParams] = useSearchParams()
  const [guests, setGuests] = useState(Number(searchParams.get('guests')) || 1)
  const [sort, setSort] = useState('recommended')

  const list = useMemo(() => {
    const result = getRooms().filter((room) => room.capacity >= guests)
    if (sort === 'price-asc') return [...result].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') return [...result].sort((a, b) => b.price - a.price)
    return result
  }, [guests, sort])

  const search = searchParams.toString() ? `?${searchParams}` : ''

  return (
    <>
      <section className="page-header">
        <div className="container">
          <p className="eyebrow">Stay with us</p>
          <h1>Rooms &amp; suites</h1>
          <p>Every room has air conditioning, free Wi-Fi and a view on the garden or the ocean.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="rooms-toolbar">
            <span>
              {list.length} room{list.length > 1 ? 's' : ''} available
            </span>
            <div className="rooms-toolbar__filters">
              <select className="form-control" value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>
                    {n}+ guest{n > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
              <select className="form-control" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
              </select>
            </div>
          </div>

          <div className="rooms-grid">
            {list.map((room) => (
              <RoomCard key={room.id} room={room} search={search} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
