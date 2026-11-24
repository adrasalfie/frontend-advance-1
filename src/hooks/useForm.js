import { useState } from 'react'

/**
 * Hook form sederhana (tanpa library tambahan).
 * - initialValues: nilai awal field
 * - validate(values): mengembalikan object error
 * - onSubmit(values): dipanggil jika validasi lolos
 * Mengembalikan juga `setFieldValue(name, value)` untuk kontrol non-input (mis. pemilih gambar).
 */
export default function useForm({ initialValues, validate, onSubmit }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const setFieldValue = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => (prev[name] ? { ...prev, [name]: '' } : prev))
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFieldValue(name, value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) onSubmit(values)
  }

  return { values, errors, handleChange, handleSubmit, setFieldValue }
}
