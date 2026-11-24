import { useEffect, useRef, useState } from 'react'
import Avatar from '../atoms/Avatar.jsx'
import Icon from '../atoms/Icon.jsx'

/** Avatar pengguna + dropdown menu (desktop). Tertutup saat klik di luar atau tekan Escape. */
export default function UserMenu({ user, items, onLogout }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const handlePointer = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) setOpen(false)
    }
    const handleKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handlePointer)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handlePointer)
      document.removeEventListener('keydown', handleKey)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Menu pengguna"
        onClick={() => setOpen((prev) => !prev)}
        className="block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <Avatar src={user.avatar} alt={user.name} size={36} />
      </button>

      {open && (
        <ul
          role="menu"
          className="absolute right-0 top-full z-50 mt-3 w-48 overflow-hidden rounded-lg border border-line bg-white shadow-lg"
        >
          {items.map(({ label, href }) => (
            <li key={label} role="none">
              <a
                role="menuitem"
                href={href}
                className="block border-b border-line px-4 py-3 text-sm text-muted transition-colors hover:bg-cream hover:text-ink"
              >
                {label}
              </a>
            </li>
          ))}
          <li role="none">
            <button
              type="button"
              role="menuitem"
              onClick={onLogout}
              className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-medium text-brand-orange transition-colors hover:bg-cream"
            >
              Keluar
              <Icon name="logout" size={16} />
            </button>
          </li>
        </ul>
      )}
    </div>
  )
}
