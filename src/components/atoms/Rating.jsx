import Icon from './Icon.jsx'

const MAX_STARS = 5

/** Bintang rating (mendukung pecahan, mis. 3.5) + angka rating dan jumlah ulasan. */
export default function Rating({ value, reviews, showCount = true, className = '' }) {
  const fill = Math.max(0, Math.min(100, (value / MAX_STARS) * 100))
  const stars = Array.from({ length: MAX_STARS }, (_, i) => (
    <Icon key={i} name="star" size={14} />
  ))

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div
        className="relative flex"
        role="img"
        aria-label={`Rating ${value} dari ${MAX_STARS}`}
      >
        <div className="flex text-gray-300">{stars}</div>
        <div
          className="absolute inset-y-0 left-0 flex overflow-hidden text-brand-yellow"
          style={{ width: `${fill}%` }}
        >
          {stars}
        </div>
      </div>
      <span className="text-xs text-muted underline decoration-gray-300 underline-offset-2">
        {value}
        {showCount && reviews != null ? ` (${reviews})` : ''}
      </span>
    </div>
  )
}
