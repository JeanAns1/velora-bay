# Velora Bay

Booking site for a boutique hotel & restaurant — guests can browse rooms, check availability, book and pay online, and the hotel team manages everything from an admin dashboard.

> Demo project. Velora Bay is a fictional hotel; names and figures are sample data.

## Features

**Guest side**
- Home page with booking bar (dates & guests)
- Rooms list with filters and sorting, room detail page
- 3-step booking: dates → guest details → payment (demo)
- Booking confirmation with reference number
- Restaurant menu with table request form
- Photo gallery with filters and lightbox
- Contact form with validation
- Fully responsive (mobile, tablet, desktop)

**Admin dashboard** (`/admin`)
- Overview: bookings, nights, revenue, pending
- Availability calendar per room
- Bookings list with search, status filter and status update
- Room prices editing

Demo login: `admin@velorabay.com` / `demo1234`

## Tech stack

- **Client:** React 19, React Router, Vite, plain CSS
- **Server:** Node.js, Express 5, JSON file storage

## Project structure

```
velora-bay/
├── client/          # React app
│   └── src/
│       ├── admin/       # dashboard pages
│       ├── components/  # header, footer, cards...
│       ├── data/        # rooms, menu, sample bookings
│       ├── pages/       # public pages
│       ├── services/    # api / localStorage
│       ├── styles/
│       └── utils/
└── server/          # Express API
    ├── data/
    └── src/
```

## Getting started

Requirements: Node.js 20+

### Client only (static demo)

Bookings are saved in the browser (localStorage).

```bash
cd client
npm install
npm run dev
```

Open http://localhost:5173

### Client + API

```bash
# terminal 1
cd server
npm install
npm run dev

# terminal 2
cd client
cp .env.example .env   # then uncomment VITE_API_URL=/api
npm install
npm run dev
```

The API runs on http://localhost:4000 and Vite proxies `/api` to it.

## API

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/rooms` | List rooms |
| GET | `/api/rooms/:id` | Room detail |
| GET | `/api/bookings` | List bookings (`?status=paid`) |
| GET | `/api/bookings/availability` | `?roomId=&checkIn=&checkOut=` |
| GET | `/api/bookings/:ref` | Booking detail |
| POST | `/api/bookings` | Create a booking |
| PATCH | `/api/bookings/:ref` | Update status |

## Deploy

The client can be deployed as a static site on Vercel or Netlify:
- Root directory: `client`
- Build command: `npm run build`
- Output directory: `dist`

`client/vercel.json` handles the routes for the single page app.

## Git workflow

- `master` — stable releases
- `develop` — integration branch
- `feature/*` — new features, branched from `develop`
- `fix/*` — bug fixes, branched from `develop`

## License

MIT
