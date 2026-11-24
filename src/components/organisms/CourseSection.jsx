import Button from '../atoms/Button.jsx'
import Icon from '../atoms/Icon.jsx'
import SearchBar from '../molecules/SearchBar.jsx'
import TabNav from '../molecules/TabNav.jsx'
import CourseCard from '../molecules/CourseCard.jsx'
import CourseCardSkeleton from '../molecules/CourseCardSkeleton.jsx'

const SKELETON_COUNT = 6

/**
 * Judul + tombol tambah + pencarian + tab kategori + grid kartu kelas.
 * Komponen ini tidak menyimpan state sendiri: semua data dan handler datang dari parent (HomePage).
 * Menangani 4 kondisi data dari API: loading, error, kosong, dan berisi.
 */
export default function CourseSection({
  id,
  title,
  subtitle,
  categories,
  activeCategory,
  onCategoryChange,
  query,
  onQueryChange,
  courses,
  totalCount,
  loading = false,
  error = '',
  onRetry,
  onAdd,
  onView,
  onEdit,
  onDelete,
  onResetFilters,
}) {
  const isFiltering = query.trim() !== '' || activeCategory !== categories[0]

  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-heading text-2xl font-semibold leading-tight md:text-[28px]">
            {title}
          </h2>
          <p className="mt-1.5 text-sm text-muted md:text-base">{subtitle}</p>
        </div>
        <Button
          size="sm"
          className="w-full py-2.5 md:w-auto"
          icon={<Icon name="plus" size={18} />}
          onClick={onAdd}
          disabled={loading || Boolean(error)}
        >
          Tambah Kelas
        </Button>
      </div>

      <div className="mt-6">
        <SearchBar
          value={query}
          onChange={onQueryChange}
          placeholder="Cari judul kelas, tutor, atau perusahaan"
          label="Cari kelas"
        />
      </div>

      <div className="mt-4 border-b border-line">
        <TabNav items={categories} activeItem={activeCategory} onChange={onCategoryChange} />
      </div>

      <p aria-live="polite" className="mt-4 min-h-5 text-sm text-muted">
        {!loading && !error && `Menampilkan ${courses.length} dari ${totalCount} kelas`}
      </p>

      {loading ? (
        <div
          role="status"
          aria-label="Memuat data kelas"
          className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {Array.from({ length: SKELETON_COUNT }, (_, index) => (
            <CourseCardSkeleton key={index} />
          ))}
        </div>
      ) : error ? (
        <div
          role="alert"
          className="mt-6 flex flex-col items-center gap-3 rounded-xl border border-danger/30 bg-white px-4 py-12 text-center"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-danger">
            <Icon name="alert" size={24} />
          </span>
          <p className="font-heading text-lg font-semibold">Gagal memuat data kelas</p>
          <p className="max-w-md text-sm text-muted">{error}</p>
          <Button variant="outline" size="sm" onClick={onRetry}>
            Coba Lagi
          </Button>
        </div>
      ) : courses.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center gap-3 rounded-xl border border-dashed border-line bg-white px-4 py-12 text-center">
          <p className="font-heading text-lg font-semibold">
            {totalCount === 0 ? 'Belum ada kelas' : 'Kelas tidak ditemukan'}
          </p>
          <p className="max-w-sm text-sm text-muted">
            {totalCount === 0
              ? 'Mulai dengan menambahkan kelas pertamamu.'
              : 'Coba kata kunci atau kategori lain.'}
          </p>
          {isFiltering && totalCount > 0 ? (
            <Button variant="outline" size="sm" onClick={onResetFilters}>
              Reset pencarian
            </Button>
          ) : (
            <Button size="sm" icon={<Icon name="plus" size={16} />} onClick={onAdd}>
              Tambah Kelas
            </Button>
          )}
        </div>
      )}
    </section>
  )
}
