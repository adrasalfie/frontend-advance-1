import { Outlet } from 'react-router-dom'
import Navbar from '../components/organisms/Navbar.jsx'
import Footer from '../components/organisms/Footer.jsx'

/** Layout halaman utama: navbar + konten + footer. */
export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
