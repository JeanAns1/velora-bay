import { Link } from 'react-router-dom'
import BookingBar from '../components/BookingBar'
import Picture from '../components/Picture'
import RoomCard from '../components/RoomCard'
import { getRooms } from '../data/rooms'
import './Home.css'

const highlights = [
  { title: 'On the beach', text: 'Direct access to a quiet sandy beach, a few steps from your room.' },
  { title: 'Local cuisine', text: 'Fresh seafood and seasonal products from the nearby market.' },
  { title: 'Free airport pickup', text: 'For every stay of 3 nights or more, just tell us your flight.' },
  { title: 'Best price online', text: 'Book directly with us and get the lowest rate, no hidden fees.' },
]

export default function Home() {
  return (
    <>
      <section className="hero">
        <Picture className="hero__bg" />
        <div className="container hero__content">
          <p className="eyebrow">Boutique hotel &amp; restaurant</p>
          <h1>
            Wake up <br />
            by the ocean
          </h1>
          <p className="hero__text">
            Twelve rooms, one beach and a restaurant facing the bay. A calm place to slow down.
          </p>
          <BookingBar />
        </div>
      </section>

      <section className="section">
        <div className="container about">
          <div>
            <p className="eyebrow">Welcome</p>
            <h2 className="section-title">
              A small hotel with a <em>big view</em>
            </h2>
            <p>
              Velora Bay is a family-run hotel built between the palm trees and the sea. Every room
              opens onto the garden or the ocean, and our team is here to help you plan your days:
              boat trips, diving, or simply doing nothing at all.
            </p>
            <Link to="/gallery" className="btn btn-outline">
              Discover the hotel
            </Link>
          </div>
          <Picture type="garden" className="about__picture" />
        </div>
      </section>

      <section className="section section--sand">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Our rooms</p>
              <h2 className="section-title">
                Find your <em>favorite room</em>
              </h2>
            </div>
            <Link to="/rooms" className="btn btn-dark">
              See all rooms
            </Link>
          </div>
          <div className="rooms-grid">
            {getRooms().slice(0, 3).map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container highlights">
          {highlights.map((item) => (
            <div key={item.title} className="highlight">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="dining-teaser">
        <Picture type="food" className="dining-teaser__picture" />
        <div className="dining-teaser__text">
          <p className="eyebrow">Restaurant</p>
          <h2>Dinner with your feet in the sand</h2>
          <p>
            Our chef cooks with the catch of the day and local spices. Open to hotel guests and
            visitors, every day from breakfast to dinner.
          </p>
          <Link to="/dining" className="btn btn-primary">
            See the menu
          </Link>
        </div>
      </section>
    </>
  )
}
