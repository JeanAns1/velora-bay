import { addDays, today } from '../utils/dates'

// sample reservations used when the app runs without the API.
// dates are relative to today so the dashboard never looks empty.
const samples = [
  { roomId: 'deluxe-sea-view', guest: 'Sarah Martin', email: 'sarah@example.com', guests: 2, from: -1, nights: 3, status: 'paid' },
  { roomId: 'garden-suite', guest: 'David Kim', email: 'david@example.com', guests: 3, from: 1, nights: 4, status: 'paid' },
  { roomId: 'standard-double', guest: 'Amina Rakoto', email: 'amina@example.com', guests: 1, from: 2, nights: 1, status: 'pending' },
  { roomId: 'ocean-family-room', guest: 'Lucas Bernard', email: 'lucas@example.com', guests: 4, from: 4, nights: 7, status: 'paid' },
  { roomId: 'deluxe-sea-view', guest: 'Emma Wilson', email: 'emma@example.com', guests: 2, from: 6, nights: 4, status: 'pending' },
  { roomId: 'standard-double', guest: 'Noah Andria', email: 'noah@example.com', guests: 2, from: 7, nights: 3, status: 'paid' },
  { roomId: 'garden-suite', guest: 'Chloé Dupont', email: 'chloe@example.com', guests: 2, from: 9, nights: 5, status: 'paid' },
]

const prices = {
  'deluxe-sea-view': 115,
  'garden-suite': 130,
  'standard-double': 85,
  'ocean-family-room': 160,
}

export function createSampleBookings() {
  return samples.map((s, i) => {
    const checkIn = addDays(today(), s.from)
    const [, month, day] = checkIn.split('-')
    return {
      ref: `VB-${month}${day}-${String(4100 + i * 137).slice(-4)}`,
      roomId: s.roomId,
      guest: s.guest,
      email: s.email,
      phone: '',
      guests: s.guests,
      checkIn,
      checkOut: addDays(checkIn, s.nights),
      total: s.nights * prices[s.roomId],
      status: s.status,
      createdAt: new Date(Date.now() - (samples.length - i) * 86400000).toISOString(),
    }
  })
}
