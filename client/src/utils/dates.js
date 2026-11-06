const DAY = 24 * 60 * 60 * 1000

// toISOString() uses UTC, which gives the wrong day around midnight in UTC+3
export function toInputDate(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function today() {
  return toInputDate(new Date())
}

export function addDays(value, days) {
  const date = new Date(`${value}T12:00:00`)
  date.setDate(date.getDate() + days)
  return toInputDate(date)
}

export function countNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0
  return Math.round((new Date(checkOut) - new Date(checkIn)) / DAY)
}
