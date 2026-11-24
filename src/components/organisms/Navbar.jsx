import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../atoms/Container.jsx'
import Logo from '../atoms/Logo.jsx'
import Icon from '../atoms/Icon.jsx'
import UserMenu from '../molecules/UserMenu.jsx'
import { CURRENT_USER, MAIN_NAV, USER_MENU } from '../../data/navigation.js'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    setMobileOpen(false)
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <Container className="flex h-16 items-center justify-between md:h-[72px]">
        <Logo />

        {/* Desktop */}
        <nav aria-label="Navigasi utama" className="hidden items-center gap-6 md:flex">
          {MAIN_NAV.map(({ label, href }) => (
            <a key={label} href={href} className="text-sm text-muted transition-colors hover:text-ink">
              {label}
            </a>
          ))}
          <UserMenu user={CURRENT_USER} items={USER_MENU} onLogout={handleLogout} />
        </nav>

        {/* Mobile */}
        <button
          type="button"
          aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
          className="-mr-2 p-2 text-ink md:hidden"
        >
          <Icon name={mobileOpen ? 'x' : 'menu'} size={26} />
        </button>
      </Container>

      {mobileOpen && (
        <nav aria-label="Menu mobile" className="border-t border-line bg-white md:hidden">
          <ul>
            {[...MAIN_NAV, ...USER_MENU].map(({ label, href }) => (
              <li key={label} className="border-b border-line">
                <a
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-6 py-3.5 text-muted transition-colors hover:bg-cream hover:text-ink"
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-6 py-3.5 text-left font-medium text-brand-orange hover:bg-cream"
              >
                Keluar
                <Icon name="logout" size={18} />
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
