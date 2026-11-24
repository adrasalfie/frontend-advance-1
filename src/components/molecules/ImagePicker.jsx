import { useState } from 'react'
import Icon from '../atoms/Icon.jsx'
import { fileToResizedDataUrl } from '../../utils/image.js'

const MAX_FILE_SIZE = 5 * 1024 * 1024

/** Pilih gambar dari daftar bawaan (`presets`) atau unggah sendiri. Nilai = URL / data URL. */
export default function ImagePicker({ label, value, onChange, presets, error, required }) {
  const [uploadError, setUploadError] = useState('')
  const options = !value || presets.includes(value) ? presets : [value, ...presets]
  const message = uploadError || error

  const handleFile = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setUploadError('File harus berupa gambar')
      return
    }
    if (file.size > MAX_FILE_SIZE) {
      setUploadError('Ukuran gambar maksimal 5 MB')
      return
    }

    try {
      // Gambar dikecilkan dulu supaya ringan saat dikirim ke API.
      const dataUrl = await fileToResizedDataUrl(file)
      setUploadError('')
      onChange(dataUrl)
    } catch {
      setUploadError('Gambar tidak dapat dibaca. Coba file lain.')
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span id="image-picker-label" className="text-xs text-muted md:text-sm">
        {label}
        {required && <span className="ml-1 text-danger">*</span>}
      </span>

      <div
        role="radiogroup"
        aria-labelledby="image-picker-label"
        className="grid grid-cols-4 gap-2 sm:grid-cols-5"
      >
        {options.map((src, index) => {
          const selected = src === value
          return (
            <button
              key={src.slice(0, 80) + index}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={`Gambar ${index + 1}`}
              onClick={() => {
                setUploadError('')
                onChange(src)
              }}
              className={`relative aspect-[4/3] overflow-hidden rounded-lg border-2 transition ${
                selected ? 'border-primary' : 'border-transparent hover:border-line'
              }`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
              {selected && (
                <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white">
                  <Icon name="check" size={12} />
                </span>
              )}
            </button>
          )
        })}

        <label className="flex aspect-[4/3] cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-line text-xs text-muted transition hover:border-primary hover:text-primary focus-within:border-primary">
          <Icon name="plus" size={18} />
          Unggah
          <input type="file" accept="image/*" onChange={handleFile} className="sr-only" />
        </label>
      </div>

      {message && (
        <p role="alert" className="text-xs text-danger">
          {message}
        </p>
      )}
    </div>
  )
}
