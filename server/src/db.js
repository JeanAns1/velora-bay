import { existsSync } from 'node:fs'
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const dataDir = new URL('../data/', import.meta.url)
const dbFile = fileURLToPath(new URL('db.json', dataDir))
const seedFile = fileURLToPath(new URL('seed.json', dataDir))
const roomsFile = fileURLToPath(new URL('rooms.json', dataDir))

async function readJson(file) {
  return JSON.parse(await readFile(file, 'utf8'))
}

export async function getRooms() {
  return readJson(roomsFile)
}

export async function getBookings() {
  if (!existsSync(dbFile)) {
    const seed = await readJson(seedFile)
    await saveBookings(seed)
    return seed
  }
  return readJson(dbFile)
}

export async function saveBookings(bookings) {
  await writeFile(dbFile, JSON.stringify(bookings, null, 2))
}
