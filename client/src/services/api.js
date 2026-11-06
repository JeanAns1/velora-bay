import { createSampleBookings } from '../data/bookings'
import { getRoom } from '../data/rooms'
import { countNights } from '../utils/dates'

const STORAGE_KEY = 'velora_bookings'

// When VITE_API_URL is set the app talks to the Node.js API,
// otherwise bookings are kept in localStorage (static demo).
const API_URL = import.meta.env.VITE_API_URL

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  const data = await res.json().catch(() => null)
  if (!res.ok) throw new Error(data?.message || 'Request failed')
  return data
}

function load() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) return JSON.parse(saved)
  const samples = createSampleBookings()
  localStorage.setItem(STORAGE_KEY, JSON.stringify(samples))
  return samples
}

function save(bookings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
}

function overlaps(booking, checkIn, checkOut) {
  return booking.checkIn < checkOut && checkIn < booking.checkOut
}

function makeRef(checkIn) {
  const [, month, day] = checkIn.split('-')
  const random = Math.floor(1000 + Math.random() * 9000)
  return `VB-${month}${day}-${random}`
}

const wait = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms))

export async function getBookings() {
  if (API_URL) return request('/bookings')
  await wait()
  return load()
}

export async function getBooking(ref) {
  if (API_URL) return request(`/bookings/${ref}`).catch(() => null)
  await wait()
  return load().find((b) => b.ref === ref) || null
}

export async function isAvailable(roomId, checkIn, checkOut) {
  if (API_URL) {
    const params = new URLSearchParams({ roomId, checkIn, checkOut })
    const { available } = await request(`/bookings/availability?${params}`)
    return available
  }
  return !load().some(
    (b) => b.roomId === roomId && b.status !== 'cancelled' && overlaps(b, checkIn, checkOut),
  )
}

export async function createBooking(data) {
  if (API_URL) return request('/bookings', { method: 'POST', body: JSON.stringify(data) })
  await wait(700)
  const room = getRoom(data.roomId)
  if (!room) throw new Error('Room not found')

  const available = await isAvailable(data.roomId, data.checkIn, data.checkOut)
  if (!available) throw new Error('This room is no longer available for these dates')

  const booking = {
    ...data,
    ref: makeRef(data.checkIn),
    total: countNights(data.checkIn, data.checkOut) * room.price,
    status: 'paid',
    createdAt: new Date().toISOString(),
  }

  save([booking, ...load()])
  return booking
}

export async function updateBookingStatus(ref, status) {
  if (API_URL) return request(`/bookings/${ref}`, { method: 'PATCH', body: JSON.stringify({ status }) })
  await wait()
  const bookings = load().map((b) => (b.ref === ref ? { ...b, status } : b))
  save(bookings)
  return bookings.find((b) => b.ref === ref)
}
