import { Outlet } from 'react-router-dom'
import Container from '../components/atoms/Container.jsx'
import Logo from '../components/atoms/Logo.jsx'

/** Layout halaman login/register: header logo + kartu di tengah. */
export default function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-line bg-white shadow-md md:shadow-none">
        <Container className="flex h-16 items-center md:h-[72px]">
          <Logo />
        </Container>
      </header>
      <main className="flex flex-1 items-start justify-center px-4 py-5 md:items-center md:py-12">
        <Outlet />
      </main>
    </div>
  )
}
