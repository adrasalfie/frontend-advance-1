import axios from 'axios'

/**
 * Instance Axios tunggal untuk seluruh aplikasi.
 * - URL dasar dibaca dari file .env (VITE_API_BASE_URL), tidak ditulis langsung di kode.
 * - Interceptor request : validasi URL, header default, logging (mode development).
 * - Interceptor response: logging + mengubah error teknis menjadi pesan yang ramah (`error.userMessage`).
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL
const IS_DEV = import.meta.env.DEV

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

const createUserError = (message, original) =>
  Object.assign(original ?? new Error(message), { userMessage: message })

/** Pesan error yang mudah dipahami pengguna. */
export function getErrorMessage(error) {
  if (error?.userMessage) return error.userMessage
  if (!error?.response) {
    return 'Tidak dapat terhubung ke server. Periksa koneksi internet dan URL API di file .env.'
  }

  const { status } = error.response
  if (status === 404) return 'Data tidak ditemukan (404). Pastikan resource "courses" sudah dibuat di MockAPI.'
  if (status === 429) return 'Terlalu banyak permintaan ke server. Tunggu sebentar lalu coba lagi.'
  if (status >= 500) return 'Server sedang bermasalah. Coba lagi beberapa saat.'
  return `Permintaan gagal (kode ${status}).`
}

/* ---------- Interceptor request ---------- */
apiClient.interceptors.request.use(
  (config) => {
    if (!BASE_URL || BASE_URL.includes('GANTI_DENGAN')) {
      return Promise.reject(
        createUserError('URL API belum diatur. Isi VITE_API_BASE_URL di file .env lalu restart npm run dev.'),
      )
    }

    // Contoh otorisasi terpusat: jika ada token di .env, kirim di setiap request.
    const token = import.meta.env.VITE_API_TOKEN
    if (token) config.headers.Authorization = `Bearer ${token}`

    if (IS_DEV) console.info(`[API] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`)
    return config
  },
  (error) => Promise.reject(error),
)

/* ---------- Interceptor response ---------- */
apiClient.interceptors.response.use(
  (response) => {
    if (IS_DEV) console.info(`[API] ${response.status} ${response.config.url}`)
    return response
  },
  (error) => {
    if (axios.isCancel(error)) return Promise.reject(error)
    if (IS_DEV) console.error('[API] error:', error.response?.status ?? error.message)
    return Promise.reject(createUserError(getErrorMessage(error), error))
  },
)

export default apiClient
