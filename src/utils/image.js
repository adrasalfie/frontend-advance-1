/**
 * Baca file gambar, kecilkan (maks. `maxWidth` px) lalu ubah ke data URL JPEG.
 * Tujuannya agar data yang dikirim ke API tetap kecil (MockAPI membatasi ukuran request).
 */
export function fileToResizedDataUrl(file, { maxWidth = 640, quality = 0.8 } = {}) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new Image()

    img.onload = () => {
      const scale = Math.min(1, maxWidth / img.width)
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(img.width * scale)
      canvas.height = Math.round(img.height * scale)

      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#ffffff' // latar putih untuk PNG transparan
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      URL.revokeObjectURL(url)
      resolve(canvas.toDataURL('image/jpeg', quality))
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Gambar tidak dapat dibaca'))
    }
    img.src = url
  })
}
