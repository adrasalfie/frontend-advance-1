import { useCallback, useMemo, useState } from 'react'
import Container from '../components/atoms/Container.jsx'
import Hero from '../components/organisms/Hero.jsx'
import CourseSection from '../components/organisms/CourseSection.jsx'
import CourseForm from '../components/organisms/CourseForm.jsx'
import CourseDetail from '../components/organisms/CourseDetail.jsx'
import NewsletterSection from '../components/organisms/NewsletterSection.jsx'
import Modal from '../components/molecules/Modal.jsx'
import ConfirmDialog from '../components/molecules/ConfirmDialog.jsx'
import Toast from '../components/molecules/Toast.jsx'
import useCourses from '../hooks/useCourses.js'
import {
  ALL_CATEGORY,
  CATEGORY_OPTIONS,
  COURSE_CATEGORIES,
  COURSE_IMAGES,
} from '../data/courses.js'
import { filterCourses, toCourseData, toFormValues } from '../utils/courseCrud.js'

/**
 * Halaman Homepage = "parent" yang memegang state tampilan (useState):
 *
 * - query / activeCategory : pencarian dan tab kategori
 * - formState              : null | { mode: 'create' } | { mode: 'edit', course }  -> modal form
 * - detailId               : id kelas yang sedang dilihat (modal detail)
 * - deleteTarget           : kelas yang akan dihapus (dialog konfirmasi)
 * - toast                  : notifikasi hasil aksi
 *
 * Data kelas & pemanggilan API (GET/ADD/UPDATE/DELETE) dikelola custom hook `useCourses`,
 * yang memanggil fungsi di src/services/api. Child component hanya menerima nilai & handler lewat props.
 */
export default function HomePage() {
  const {
    courses,
    loading,
    error,
    saving,
    reload,
    createCourse,
    editCourse,
    removeCourseById,
  } = useCourses()

  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY)
  const [formState, setFormState] = useState(null)
  const [detailId, setDetailId] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [toast, setToast] = useState(null)

  const visibleCourses = useMemo(
    () => filterCourses(courses, { category: activeCategory, query }),
    [courses, activeCategory, query],
  )
  const detailCourse = courses.find((course) => course.id === detailId) ?? null

  const closeToast = useCallback(() => setToast(null), [])
  const showToast = (message, type = 'success') => setToast({ message, type })

  const resetFilters = () => {
    setQuery('')
    setActiveCategory(ALL_CATEGORY)
  }

  /* ---------- ADD & UPDATE ---------- */
  const openCreateForm = () => setFormState({ mode: 'create' })
  const openEditForm = (course) => {
    setDetailId(null)
    setFormState({ mode: 'edit', course })
  }
  const closeForm = () => {
    if (!saving) setFormState(null)
  }

  const handleSave = async (values) => {
    try {
      if (formState.mode === 'create') {
        await createCourse(toCourseData(values))
        resetFilters() // pastikan kelas baru langsung terlihat
        showToast('Kelas berhasil ditambahkan')
      } else {
        const { course } = formState
        await editCourse(course.id, toCourseData(values, course))
        showToast('Perubahan kelas berhasil disimpan')
      }
      setFormState(null)
    } catch (err) {
      // Modal dibiarkan terbuka agar isian pengguna tidak hilang.
      showToast(err.userMessage ?? 'Gagal menyimpan data', 'error')
    }
  }

  /* ---------- DELETE ---------- */
  const askDelete = (course) => {
    setDetailId(null)
    setDeleteTarget(course)
  }
  const confirmDelete = async () => {
    try {
      await removeCourseById(deleteTarget.id)
      showToast(`Kelas "${deleteTarget.title}" dihapus`, 'danger')
      setDeleteTarget(null)
    } catch (err) {
      showToast(err.userMessage ?? 'Gagal menghapus data', 'error')
    }
  }

  return (
    <Container className="flex flex-col gap-10 py-6 md:gap-16 md:py-10">
      <Hero
        image="/images/hero.jpg"
        title="Revolusi Pembelajaran: Temukan Ilmu Baru melalui Platform Video Interaktif!"
        description="Temukan ilmu baru yang menarik dan mendalam melalui koleksi video pembelajaran berkualitas tinggi. Tidak hanya itu, Anda juga dapat berpartisipasi dalam latihan interaktif yang akan meningkatkan pemahaman Anda."
        ctaLabel="Temukan Video Course untuk Dipelajari!"
        ctaHref="#koleksi"
      />

      {/* GET: daftar kelas dari API + pencarian + filter */}
      <CourseSection
        id="koleksi"
        title="Koleksi Video Pembelajaran Unggulan"
        subtitle="Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!"
        categories={COURSE_CATEGORIES}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        query={query}
        onQueryChange={setQuery}
        courses={visibleCourses}
        totalCount={courses.length}
        loading={loading}
        error={error}
        onRetry={reload}
        onAdd={openCreateForm}
        onView={(course) => setDetailId(course.id)}
        onEdit={openEditForm}
        onDelete={askDelete}
        onResetFilters={resetFilters}
      />

      <NewsletterSection
        image="/images/newsletter.jpg"
        eyebrow="Newsletter"
        title="Mau Belajar Lebih Banyak?"
        description="Daftarkan dirimu untuk mendapatkan informasi terbaru dan penawaran spesial dari program-program terbaik hariesok.id"
      />

      {formState && (
        <Modal
          title={formState.mode === 'create' ? 'Tambah Kelas Baru' : 'Edit Kelas'}
          onClose={closeForm}
          size="lg"
        >
          <CourseForm
            initialValues={toFormValues(formState.course)}
            categories={CATEGORY_OPTIONS}
            images={COURSE_IMAGES}
            submitLabel={formState.mode === 'create' ? 'Tambah Kelas' : 'Simpan Perubahan'}
            submitting={saving}
            onSubmit={handleSave}
            onCancel={closeForm}
          />
        </Modal>
      )}

      {detailCourse && (
        <Modal title="Detail Kelas" onClose={() => setDetailId(null)}>
          <CourseDetail
            course={detailCourse}
            onEdit={openEditForm}
            onDelete={askDelete}
            onClose={() => setDetailId(null)}
          />
        </Modal>
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Hapus Kelas?"
          message={`Kelas "${deleteTarget.title}" akan dihapus dan tidak bisa dikembalikan.`}
          busy={saving}
          onConfirm={confirmDelete}
          onCancel={() => !saving && setDeleteTarget(null)}
        />
      )}

      <Toast toast={toast} onClose={closeToast} />
    </Container>
  )
}
