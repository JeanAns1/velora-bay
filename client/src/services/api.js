import { sampleBookings } from '../data/bookings'
import { getRoom } from '../data/rooms'
import { countNights } from '../utils/dates'

const STORAGE_KEY = 'velora_bookings'

function load() {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) return JSON.parse(saved)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleBookings))
  return sampleBookings
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
  await wait()
  return load()
}

export async function getBooking(ref) {
  await wait()
  return load().find((b) => b.ref === ref) || null
}

export async function isAvailable(roomId, checkIn, checkOut) {
  return !load().some(
    (b) => b.roomId === roomId && b.status !== 'cancelled' && overlaps(b, checkIn, checkOut),
  )
}

export async function createBooking(data) {
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
  await wait()
  const bookings = load().map((b) => (b.ref === ref ? { ...b, status } : b))
  save(bookings)
  return bookings.find((b) => b.ref === ref)
}
