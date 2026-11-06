import { Router } from 'express'
import { getRooms } from '../db.js'

const router = Router()

router.get('/', async (req, res) => {
  res.json(await getRooms())
})

router.get('/:id', async (req, res) => {
  const rooms = await getRooms()
  const room = rooms.find((r) => r.id === req.params.id)
  if (!room) return res.status(404).json({ message: 'Room not found' })
  res.json(room)
})

export default router
