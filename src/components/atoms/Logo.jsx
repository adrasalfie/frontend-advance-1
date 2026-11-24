import { Link } from 'react-router-dom'

export default function Logo({ className = '' }) {
  return (
    <Link
      to="/"
      aria-label="videobelajar - kembali ke beranda"
      className={`bg-linear-to-r from-brand-yellow from-45% to-brand-orange bg-clip-text font-heading text-2xl font-semibold tracking-tight text-transparent ${className}`}
    >
      videobelajar
    </Link>
  )
}
