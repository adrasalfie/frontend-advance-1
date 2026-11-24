import apiClient from './axiosClient.js'

/**
 * Fungsi pemanggilan API untuk resource "courses" di MockAPI.
 *
 *   GET    /courses       -> getCourses()
 *   GET    /courses/:id   -> getCourseById(id)
 *   POST   /courses       -> addCourse(data)
 *   PUT    /courses/:id   -> updateCourse(id, data)
 *   DELETE /courses/:id   -> deleteCourse(id)
 */

const RESOURCE = '/courses'

/** Data dari server bisa tidak lengkap (mis. diketik manual di MockAPI), jadi diberi nilai bawaan. */
export function normalizeCourse(raw) {
  const tutor = raw.tutor && typeof raw.tutor === 'object' ? raw.tutor : {}
  return {
    id: String(raw.id),
    title: raw.title ?? '(Tanpa judul)',
    description: raw.description ?? '',
    category: raw.category ?? '',
    price: Number(raw.price) || 0,
    rating: Number(raw.rating) || 0,
    reviews: Number(raw.reviews) || 0,
    image: raw.image || '/images/courses/course-1.jpg',
    tutor: {
      name: tutor.name ?? '',
      role: tutor.role ?? '',
      company: tutor.company ?? '',
      avatar: tutor.avatar ?? '',
    },
  }
}

/** GET - ambil semua kelas (yang terbaru di atas). `config` boleh berisi { signal } untuk membatalkan request. */
export async function getCourses(config) {
  const { data } = await apiClient.get(RESOURCE, config)
  const list = Array.isArray(data) ? data : []
  return list.map(normalizeCourse).sort((a, b) => Number(b.id) - Number(a.id))
}

/** GET - ambil satu kelas berdasarkan id. */
export async function getCourseById(id, config) {
  const { data } = await apiClient.get(`${RESOURCE}/${id}`, config)
  return normalizeCourse(data)
}

/** ADD (POST) - tambah kelas baru. Mengembalikan data dari server (sudah ada id). */
export async function addCourse(payload) {
  const { data } = await apiClient.post(RESOURCE, payload)
  return normalizeCourse(data)
}

/** UPDATE (PUT) - ubah kelas dengan id tertentu. */
export async function updateCourse(id, payload) {
  const { data } = await apiClient.put(`${RESOURCE}/${id}`, payload)
  return normalizeCourse(data)
}

/** DELETE - hapus kelas dengan id tertentu. */
export async function deleteCourse(id) {
  await apiClient.delete(`${RESOURCE}/${id}`)
  return id
}
