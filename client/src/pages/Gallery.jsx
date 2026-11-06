import { useEffect, useState } from 'react'
import Picture from '../components/Picture'
import './Gallery.css'

const photos = [
  { type: 'sea', label: 'Sunset on the bay', tag: 'Hotel' },
  { type: 'room', label: 'Deluxe Sea View', tag: 'Rooms' },
  { type: 'garden', label: 'Tropical garden', tag: 'Hotel' },
  { type: 'food', label: 'Catch of the day', tag: 'Restaurant' },
  { type: 'room', label: 'Garden Suite', tag: 'Rooms' },
  { type: 'sea', label: 'Private beach', tag: 'Hotel' },
  { type: 'food', label: 'Breakfast on the terrace', tag: 'Restaurant' },
  { type: 'garden', label: 'Pool area', tag: 'Hotel' },
  { type: 'room', label: 'Ocean Family Room', tag: 'Rooms' },
]

const filters = ['All', 'Hotel', 'Rooms', 'Restaurant']

export default function Gallery() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const list = filter === 'All' ? photos : photos.filter((p) => p.tag === filter)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setSelected(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <section className="page-header">
        <div className="container">
          <p className="eyebrow">Gallery</p>
          <h1>Life at Velora Bay</h1>
          <p>A look at our rooms, the garden, the beach and the restaurant.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="menu-tabs">
            {filters.map((f) => (
              <button key={f} className={f === filter ? 'is-active' : ''} onClick={() => setFilter(f)}>
                {f}
              </button>
            ))}
          </div>

          <div className="gallery">
            {list.map((photo, i) => (
              <button key={photo.label + i} className="gallery__item" onClick={() => setSelected(photo)}>
                <Picture type={photo.type} />
                <span>{photo.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {selected && (
        <div className="lightbox" onClick={() => setSelected(null)}>
          <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
            <Picture type={selected.type} className="lightbox__picture" />
            <div className="lightbox__caption">
              <span>{selected.label}</span>
              <button onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
