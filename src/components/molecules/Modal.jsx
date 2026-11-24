import { useEffect, useRef } from 'react'
import Icon from '../atoms/Icon.jsx'

const SIZES = {
  sm: 'sm:max-w-md',
  md: 'sm:max-w-xl',
  lg: 'sm:max-w-2xl',
}

/**
 * Dialog modal. Dirender hanya saat parent menampilkannya (`{open && <Modal />}`),
 * sehingga state di dalamnya (mis. form) otomatis ter-reset setiap dibuka.
 * Tutup lewat tombol X, klik latar, atau tombol Escape.
 */
export default function Modal({ title, onClose, size = 'md', children }) {
  const panelRef = useRef(null)
  const closeRef = useRef(onClose)

  useEffect(() => {
    closeRef.current = onClose
  })

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const previouslyFocused = document.activeElement
    document.body.style.overflow = 'hidden'
    panelRef.current?.focus()

    const handleKey = (event) => {
      if (event.key === 'Escape') closeRef.current()
    }
    document.addEventListener('keydown', handleKey)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKey)
      previouslyFocused?.focus?.()
    }
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={`flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-xl outline-none sm:rounded-xl ${SIZES[size]}`}
      >
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
          <h2 className="font-heading text-lg font-semibold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="-mr-1.5 rounded-lg p-1.5 text-muted transition-colors hover:bg-cream hover:text-ink"
          >
            <Icon name="x" size={20} />
          </button>
        </div>
        <div className="overflow-y-auto px-5 py-5">{children}</div>
      </div>
    </div>
  )
}
