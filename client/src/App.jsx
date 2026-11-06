import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Rooms from './pages/Rooms'
import RoomDetail from './pages/RoomDetail'
import Booking from './pages/Booking'
import Confirmation from './pages/Confirmation'
import Dining from './pages/Dining'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import AdminLayout from './admin/AdminLayout'
import Bookings from './admin/Bookings'
import Login from './admin/Login'
import Overview from './admin/Overview'
import RequireAuth from './admin/RequireAuth'
import RoomsAdmin from './admin/RoomsAdmin'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:id" element={<RoomDetail />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/booking/confirmation/:ref" element={<Confirmation />} />
          <Route path="/dining" element={<Dining />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <AdminLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Overview />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="rooms" element={<RoomsAdmin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
