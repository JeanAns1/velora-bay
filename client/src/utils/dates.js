const DAY = 24 * 60 * 60 * 1000

export function toInputDate(date) {
  return date.toISOString().slice(0, 10)
}

export function today() {
  return toInputDate(new Date())
}

export function addDays(value, days) {
  const date = new Date(value)
  date.setDate(date.getDate() + days)
  return toInputDate(date)
}

export function countNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0
  return Math.round((new Date(checkOut) - new Date(checkIn)) / DAY)
}
