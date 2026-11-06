import { Router } from 'express'
import { getBookings, getRooms, saveBookings } from '../db.js'

const router = Router()
const DAY = 24 * 60 * 60 * 1000
const STATUSES = ['paid', 'pending', 'cancelled']

const nights = (checkIn, checkOut) => Math.round((new Date(checkOut) - new Date(checkIn)) / DAY)

const overlaps = (b, checkIn, checkOut) =>
  b.status !== 'cancelled' && b.checkIn < checkOut && checkIn < b.checkOut

function makeRef(checkIn) {
  const [, month, day] = checkIn.split('-')
  return `VB-${month}${day}-${Math.floor(1000 + Math.random() * 9000)}`
}

router.get('/', async (req, res) => {
  const bookings = await getBookings()
  const { status } = req.query
  res.json(status ? bookings.filter((b) => b.status === status) : bookings)
})

router.get('/availability', async (req, res) => {
  const { roomId, checkIn, checkOut } = req.query
  if (!roomId || !checkIn || !checkOut) {
    return res.status(400).json({ message: 'roomId, checkIn and checkOut are required' })
  }
  const bookings = await getBookings()
  const available = !bookings.some((b) => b.roomId === roomId && overlaps(b, checkIn, checkOut))
  res.json({ available })
})

router.get('/:ref', async (req, res) => {
  const bookings = await getBookings()
  const booking = bookings.find((b) => b.ref === req.params.ref)
  if (!booking) return res.status(404).json({ message: 'Booking not found' })
  res.json(booking)
})

router.post('/', async (req, res) => {
  const { roomId, checkIn, checkOut, guests, guest, email, phone = '', requests = '' } = req.body

  if (!roomId || !checkIn || !checkOut || !guest || !email) {
    return res.status(400).json({ message: 'Missing required fields' })
  }
  if (nights(checkIn, checkOut) < 1) {
    return res.status(400).json({ message: 'Check-out must be after check-in' })
  }

  const rooms = await getRooms()
  const room = rooms.find((r) => r.id === roomId)
  if (!room) return res.status(404).json({ message: 'Room not found' })
  if (guests > room.capacity) {
    return res.status(400).json({ message: `This room is for ${room.capacity} guests maximum` })
  }

  const bookings = await getBookings()
  if (bookings.some((b) => b.roomId === roomId && overlaps(b, checkIn, checkOut))) {
    return res.status(409).json({ message: 'This room is no longer available for these dates' })
  }

  const booking = {
    ref: makeRef(checkIn),
    roomId,
    guest,
    email,
    phone,
    requests,
    guests: Number(guests) || 1,
    checkIn,
    checkOut,
    total: nights(checkIn, checkOut) * room.price,
    status: 'paid',
    createdAt: new Date().toISOString(),
  }

  await saveBookings([booking, ...bookings])
  res.status(201).json(booking)
})

router.patch('/:ref', async (req, res) => {
  const { status } = req.body
  if (!STATUSES.includes(status)) {
    return res.status(400).json({ message: 'Invalid status' })
  }

  const bookings = await getBookings()
  const index = bookings.findIndex((b) => b.ref === req.params.ref)
  if (index === -1) return res.status(404).json({ message: 'Booking not found' })

  bookings[index] = { ...bookings[index], status }
  await saveBookings(bookings)
  res.json(bookings[index])
})

export default router
