import cors from 'cors'
import express from 'express'
import bookingsRouter from './routes/bookings.js'
import roomsRouter from './routes/rooms.js'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))
app.use('/api/rooms', roomsRouter)
app.use('/api/bookings', bookingsRouter)

app.use((req, res) => res.status(404).json({ message: 'Not found' }))

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: 'Something went wrong' })
})

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
})
