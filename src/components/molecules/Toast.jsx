import { useEffect } from 'react'
import Icon from '../atoms/Icon.jsx'

const DURATION_MS = 3000

/**
 * Notifikasi singkat di bawah layar; hilang otomatis.
 * `toast` = { message, type: 'success' | 'danger' (hapus) | 'error' (gagal) }.
 */
export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return undefined
    const timer = setTimeout(onClose, DURATION_MS)
    return () => clearTimeout(timer)
  }, [toast, onClose])

  if (!toast) return null

  const isError = toast.type === 'error'
  const isDanger = toast.type === 'danger' || isError
  const iconName = isError ? 'alert' : isDanger ? 'trash' : 'check'
  return (
    <div className="pointer-events-none fixed inset-x-4 bottom-4 z-[60] flex justify-center">
      <div
        role={isError ? 'alert' : 'status'}
        className="pointer-events-auto flex max-w-lg items-center gap-2.5 rounded-lg bg-ink px-4 py-3 text-sm text-white shadow-lg"
      >
        <span
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
            isDanger ? 'bg-danger' : 'bg-primary'
          }`}
        >
          <Icon name={iconName} size={12} />
        </span>
        {toast.message}
      </div>
    </div>
  )
}
