import Button from '../atoms/Button.jsx'
import Icon from '../atoms/Icon.jsx'
import Rating from '../atoms/Rating.jsx'
import TutorInfo from '../molecules/TutorInfo.jsx'
import { formatRupiah } from '../../utils/format.js'

/** Isi modal detail kelas (Read satu data). */
export default function CourseDetail({ course, onEdit, onDelete, onClose }) {
  const { title, description, image, price, rating, reviews, tutor, category } = course

  return (
    <div className="flex flex-col gap-4">
      <img src={image} alt={title} className="aspect-[16/9] w-full rounded-lg object-cover" />

      <div className="flex flex-col gap-3">
        <span className="w-fit rounded-md bg-primary-soft px-2 py-0.5 text-xs font-medium text-primary">
          {category}
        </span>
        <h3 className="font-heading text-xl font-semibold leading-snug">{title}</h3>
        <p className="text-sm leading-relaxed text-muted">{description}</p>
        <TutorInfo {...tutor} />
        <div className="flex items-center justify-between gap-3 border-t border-line pt-3">
          <Rating value={rating} reviews={reviews > 0 ? reviews : undefined} />
          <span className="font-heading text-lg font-semibold text-primary">{formatRupiah(price)}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <Button
          variant="outline"
          size="sm"
          icon={<Icon name="pencil" size={15} />}
          onClick={() => onEdit(course)}
        >
          Edit
        </Button>
        <Button
          variant="dangerOutline"
          size="sm"
          icon={<Icon name="trash" size={15} />}
          onClick={() => onDelete(course)}
        >
          Hapus
        </Button>
        <Button variant="social" size="sm" onClick={onClose}>
          Tutup
        </Button>
      </div>
    </div>
  )
}
