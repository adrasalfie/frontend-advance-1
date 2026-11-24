/**
 * Mengisi MockAPI dengan data awal kelas (src/data/courses.js).
 *
 * Pakai:   npm run seed            -> menambah 9 kelas awal
 *          npm run seed -- --reset -> hapus SEMUA data di resource "courses" dulu, baru isi ulang
 *
 * URL dibaca dari file .env (VITE_API_BASE_URL). Butuh Node.js 20.6+.
 */
import { initialCourses } from '../src/data/courses.js'

const BASE_URL = process.env.VITE_API_BASE_URL
const RESET = process.argv.includes('--reset')
const DELAY_MS = 350 // jeda antar request supaya tidak kena rate limit MockAPI

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers },
  })
  if (!response.ok) {
    throw new Error(`${options.method ?? 'GET'} ${path} gagal (HTTP ${response.status})`)
  }
  return response.status === 204 ? null : response.json()
}

async function main() {
  if (!BASE_URL || BASE_URL.includes('GANTI_DENGAN')) {
    console.error('VITE_API_BASE_URL belum diisi di file .env. Isi dulu dengan URL MockAPI milikmu.')
    process.exit(1)
  }

  if (RESET) {
    const existing = await request('/courses')
    console.log(`Menghapus ${existing.length} data lama...`)
    for (const item of existing) {
      await request(`/courses/${item.id}`, { method: 'DELETE' })
      await sleep(DELAY_MS)
    }
  }

  // Dikirim dari yang terakhir agar kelas pertama mendapat id terbesar (tampil paling atas).
  const payloads = [...initialCourses].reverse().map(({ id, ...rest }) => rest)
  console.log(`Menambahkan ${payloads.length} kelas ke ${BASE_URL}/courses ...`)

  for (const [index, payload] of payloads.entries()) {
    const created = await request('/courses', { method: 'POST', body: JSON.stringify(payload) })
    console.log(`  ${index + 1}/${payloads.length}  id=${created.id}  ${created.title}`)
    await sleep(DELAY_MS)
  }
  console.log('Selesai! Jalankan "npm run dev" untuk melihat hasilnya.')
}

main().catch((error) => {
  console.error('Gagal:', error.message)
  console.error('Pastikan resource "courses" sudah dibuat di MockAPI dan URL di .env benar.')
  process.exit(1)
})
