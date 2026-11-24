import Rating from '../atoms/Rating.jsx'
import Button from '../atoms/Button.jsx'
import Icon from '../atoms/Icon.jsx'
import TutorInfo from './TutorInfo.jsx'
import { formatCompactPrice } from '../../utils/format.js'

/**
 * Kartu kelas.
 * - Mobile (< sm): layout horizontal, gambar di kiri tanpa deskripsi.
 * - Tablet/desktop (>= sm): layout vertikal, gambar di atas + deskripsi.
 * Props aksi (`onView`, `onEdit`, `onDelete`) opsional: baris tombol hanya tampil jika diberikan.
 */
export default function CourseCard({ course, onView, onEdit, onDelete }) {
  const { title, description, image, price, rating, reviews, tutor, category } = course
  const hasActions = Boolean(onEdit || onDelete)

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onView?.(course)
    }
  }

  return (
    <article className="flex flex-col rounded-xl border border-line bg-white transition-shadow hover:shadow-md">
      <div
        role={onView ? 'button' : undefined}
        tabIndex={onView ? 0 : undefined}
        aria-label={onView ? `Lihat detail ${title}` : undefined}
        onClick={() => onView?.(course)}
        onKeyDown={onView ? handleKeyDown : undefined}
        className={`flex flex-1 gap-3 rounded-t-xl p-3 outline-none focus-visible:ring-2 focus-visible:ring-primary sm:flex-col sm:gap-4 sm:p-4 ${
          onView ? 'cursor-pointer' : ''
        }`}
      >
        <img
          src={image}
          alt=""
          loading="lazy"
          className="h-24 w-24 shrink-0 self-start rounded-lg object-cover sm:aspect-[16/10] sm:h-auto sm:w-full sm:self-auto"
        />

        <div className="flex min-w-0 flex-1 flex-col gap-2.5">
          <span className="w-fit rounded-md bg-primary-soft px-2 py-0.5 text-[11px] font-medium text-primary">
            {category}
          </span>
          <h3 className="font-heading text-sm font-semibold leading-snug text-ink sm:text-base">
            {title}
          </h3>
          <p className="hidden line-clamp-2 text-sm text-muted sm:block">{description}</p>

          <TutorInfo {...tutor} />

          <div className="mt-auto flex items-center justify-between gap-2">
            <Rating value={rating} reviews={reviews > 0 ? reviews : undefined} />
            <span className="font-heading text-base font-semibold text-primary sm:text-lg">
              {formatCompactPrice(price)}
            </span>
          </div>
        </div>
      </div>

      {hasActions && (
        <div className="flex gap-2 border-t border-line p-3 sm:px-4">
          {onEdit && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              icon={<Icon name="pencil" size={15} />}
              aria-label={`Edit ${title}`}
              onClick={() => onEdit(course)}
            >
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              variant="dangerOutline"
              size="sm"
              className="flex-1"
              icon={<Icon name="trash" size={15} />}
              aria-label={`Hapus ${title}`}
              onClick={() => onDelete(course)}
            >
              Hapus
            </Button>
          )}
        </div>
      )}
    </article>
  )
}
