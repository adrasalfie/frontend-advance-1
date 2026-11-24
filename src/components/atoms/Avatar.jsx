import { getInitials } from '../../utils/format.js'

/**
 * Foto profil kecil. `size` dalam px, `rounded` = 'full' | 'lg'.
 * Jika `src` kosong, tampil inisial dari `alt` (nama).
 */
export default function Avatar({ src, alt = '', size = 40, rounded = 'lg', className = '' }) {
  const shape = rounded === 'full' ? 'rounded-full' : 'rounded-lg'

  if (!src) {
    return (
      <span
        role="img"
        aria-label={alt}
        style={{ width: size, height: size, fontSize: Math.round(size * 0.38) }}
        className={`flex shrink-0 items-center justify-center bg-primary-soft font-semibold text-primary ${shape} ${className}`}
      >
        {getInitials(alt)}
      </span>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      style={{ width: size, height: size }}
      className={`shrink-0 object-cover ${shape} ${className}`}
    />
  )
}
