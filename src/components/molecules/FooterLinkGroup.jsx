import { useState } from 'react'
import Icon from '../atoms/Icon.jsx'

/**
 * Grup link footer.
 * Mobile: accordion (klik judul untuk buka/tutup). Desktop (md+): selalu terbuka.
 */
export default function FooterLinkGroup({ title, links }) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between py-3 text-left md:pointer-events-none md:py-0"
      >
        <h3 className="font-heading text-sm font-semibold text-ink">{title}</h3>
        <Icon
          name="chevron-right"
          size={18}
          className={`text-muted transition-transform md:hidden ${open ? 'rotate-90' : ''}`}
        />
      </button>
      <ul className={`${open ? 'block' : 'hidden'} space-y-3 pb-3 md:mt-4 md:block md:pb-0`}>
        {links.map((link) => (
          <li key={link}>
            <a href="#" className="text-sm text-muted transition-colors hover:text-ink">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
