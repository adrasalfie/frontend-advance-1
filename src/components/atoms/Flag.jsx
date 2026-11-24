/** Bendera kecil (inline SVG agar tampil di semua OS; emoji bendera tidak tampil di Windows). */
export default function Flag({ code, className = '' }) {
  if (code !== 'id') return <span className={`inline-block h-4 w-6 ${className}`} aria-hidden="true" />

  return (
    <svg
      viewBox="0 0 24 16"
      className={`h-4 w-6 rounded-[2px] ${className}`}
      aria-hidden="true"
    >
      <rect width="24" height="8" fill="#E70011" />
      <rect y="8" width="24" height="8" fill="#FFFFFF" />
      <rect width="24" height="16" fill="none" stroke="#00000014" />
    </svg>
  )
}
