const EMAIL_PATTERN = /^\S+@\S+\.\S+$/
const PHONE_PATTERN = /^\d{8,13}$/

export const isValidEmail = (value) => EMAIL_PATTERN.test(value.trim())

/** Semua validator mengembalikan object { namaField: 'pesan error' } (kosong jika valid). */

export function validateLogin({ email, password }) {
  const errors = {}
  if (!email.trim()) errors.email = 'E-Mail wajib diisi'
  else if (!isValidEmail(email)) errors.email = 'Format e-mail tidak valid'

  if (!password) errors.password = 'Kata sandi wajib diisi'
  return errors
}

export function validateRegister({ fullName, email, gender, phone, password, confirmPassword }) {
  const errors = {}
  if (!fullName.trim()) errors.fullName = 'Nama lengkap wajib diisi'

  if (!email.trim()) errors.email = 'E-Mail wajib diisi'
  else if (!isValidEmail(email)) errors.email = 'Format e-mail tidak valid'

  if (!gender) errors.gender = 'Jenis kelamin wajib dipilih'

  if (!phone.trim()) errors.phone = 'No. HP wajib diisi'
  else if (!PHONE_PATTERN.test(phone)) errors.phone = 'No. HP harus 8-13 digit angka'

  if (!password) errors.password = 'Kata sandi wajib diisi'
  else if (password.length < 8) errors.password = 'Kata sandi minimal 8 karakter'

  if (!confirmPassword) errors.confirmPassword = 'Konfirmasi kata sandi wajib diisi'
  else if (confirmPassword !== password) errors.confirmPassword = 'Kata sandi tidak sama'
  return errors
}

export function validateCourse({
  title,
  description,
  category,
  price,
  rating,
  image,
  tutorName,
  tutorRole,
}) {
  const errors = {}

  if (!title.trim()) errors.title = 'Judul kelas wajib diisi'
  else if (title.trim().length > 60) errors.title = 'Judul maksimal 60 karakter'

  if (!description.trim()) errors.description = 'Deskripsi wajib diisi'
  else if (description.trim().length < 20) errors.description = 'Deskripsi minimal 20 karakter'

  if (!category) errors.category = 'Pilih kategori kelas'

  const priceNumber = Number(price)
  if (String(price).trim() === '') errors.price = 'Harga wajib diisi'
  else if (!Number.isFinite(priceNumber) || priceNumber <= 0) errors.price = 'Harga harus lebih dari 0'

  if (String(rating).trim() !== '') {
    const ratingNumber = Number(rating)
    if (!Number.isFinite(ratingNumber) || ratingNumber < 0 || ratingNumber > 5) {
      errors.rating = 'Rating harus 0 sampai 5'
    }
  }

  if (!tutorName.trim()) errors.tutorName = 'Nama tutor wajib diisi'
  if (!tutorRole.trim()) errors.tutorRole = 'Jabatan tutor wajib diisi'
  if (!image) errors.image = 'Pilih atau unggah gambar kelas'

  return errors
}

export function validateEmailOnly(email) {
  if (!email.trim()) return 'E-Mail wajib diisi'
  if (!isValidEmail(email)) return 'Format e-mail tidak valid'
  return ''
}
