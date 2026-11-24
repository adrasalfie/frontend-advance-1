export const ALL_CATEGORY = 'Semua Kelas'

/** Kategori yang bisa dipilih saat membuat/mengedit kelas. */
export const CATEGORY_OPTIONS = ['Pemasaran', 'Desain', 'Pengembangan Diri', 'Bisnis']

/** Tab filter di Homepage = "Semua Kelas" + kategori. */
export const COURSE_CATEGORIES = [ALL_CATEGORY, ...CATEGORY_OPTIONS]

/** Gambar bawaan yang bisa dipilih di form. */
export const COURSE_IMAGES = Array.from(
  { length: 9 },
  (_, index) => `/images/courses/course-${index + 1}.jpg`,
)

const DESCRIPTION =
  'Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan jadwal belajar yang fleksibel.'

const makeCourse = (id, category, title, price, rating, reviews, name, role, company) => ({
  id,
  title,
  description: DESCRIPTION,
  category,
  price,
  rating,
  reviews,
  image: `/images/courses/course-${id}.jpg`,
  tutor: { name, role, company, avatar: `/images/avatars/tutor-${id}.jpg` },
})

/** Data awal (seed). State aslinya hidup di HomePage lewat useState. */
export const initialCourses = [
  makeCourse(1, 'Pemasaran', 'Big 4 Auditor Financial Analyst', 300000, 3.5, 86, 'Jenna Ortega', 'Senior Accountant', 'Gojek'),
  makeCourse(2, 'Desain', 'UI/UX Design Fundamentals untuk Pemula', 250000, 4, 120, 'Rafi Pratama', 'Product Designer', 'Tokopedia'),
  makeCourse(3, 'Pengembangan Diri', 'Public Speaking dan Percaya Diri', 200000, 4.5, 64, 'Maya Anindita', 'Communication Coach', 'Ruangguru'),
  makeCourse(4, 'Bisnis', 'Dasar Manajemen Keuangan UMKM', 350000, 4, 52, 'Dimas Aditya', 'Business Analyst', 'Bukalapak'),
  makeCourse(5, 'Pemasaran', 'Digital Marketing dari Nol sampai Mahir', 300000, 3.5, 86, 'Salsabila Putri', 'Marketing Lead', 'Traveloka'),
  makeCourse(6, 'Desain', 'Desain Grafis dengan Figma', 275000, 4, 98, 'Kevin Wijaya', 'Visual Designer', 'Gojek'),
  makeCourse(7, 'Pengembangan Diri', 'Manajemen Waktu dan Produktivitas', 150000, 4.5, 41, 'Nadia Rahma', 'Career Mentor', 'Kampus Merdeka'),
  makeCourse(8, 'Bisnis', 'Strategi Memulai Startup', 400000, 4, 73, 'Fajar Nugroho', 'Founder', 'Startupku'),
  makeCourse(9, 'Pemasaran', 'Content Marketing untuk Media Sosial', 225000, 3.5, 59, 'Citra Lestari', 'Content Strategist', 'Shopee'),
]
