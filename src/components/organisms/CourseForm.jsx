import TextField from '../molecules/TextField.jsx'
import TextAreaField from '../molecules/TextAreaField.jsx'
import SelectField from '../molecules/SelectField.jsx'
import ImagePicker from '../molecules/ImagePicker.jsx'
import Button from '../atoms/Button.jsx'
import useForm from '../../hooks/useForm.js'
import { validateCourse } from '../../utils/validators.js'

/**
 * Form tambah / edit kelas (dipakai ulang untuk Create dan Update).
 * Props: initialValues, categories, images, submitLabel, submitting, onSubmit(values), onCancel.
 * `submitting` = true saat data sedang dikirim ke API (tombol dinonaktifkan agar tidak terkirim dua kali).
 */
export default function CourseForm({
  initialValues,
  categories,
  images,
  submitLabel,
  submitting = false,
  onSubmit,
  onCancel,
}) {
  const { values, errors, handleChange, handleSubmit, setFieldValue } = useForm({
    initialValues,
    validate: validateCourse,
    onSubmit,
  })

  const categoryOptions = [
    { value: '', label: 'Pilih kategori' },
    ...categories.map((category) => ({ value: category, label: category })),
  ]

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <TextField
        id="course-title"
        name="title"
        label="Judul Kelas"
        required
        maxLength={60}
        placeholder="Contoh: Belajar React untuk Pemula"
        value={values.title}
        onChange={handleChange}
        error={errors.title}
      />

      <TextAreaField
        id="course-description"
        name="description"
        label="Deskripsi"
        required
        rows={3}
        placeholder="Ceritakan apa yang akan dipelajari di kelas ini"
        value={values.description}
        onChange={handleChange}
        error={errors.description}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField
          id="course-category"
          name="category"
          label="Kategori"
          required
          options={categoryOptions}
          value={values.category}
          onChange={handleChange}
          error={errors.category}
        />
        <TextField
          id="course-price"
          name="price"
          type="number"
          inputMode="numeric"
          min="0"
          step="1000"
          label="Harga (Rp)"
          required
          placeholder="300000"
          value={values.price}
          onChange={handleChange}
          error={errors.price}
        />
      </div>

      <ImagePicker
        label="Gambar Kelas"
        required
        presets={images}
        value={values.image}
        onChange={(image) => setFieldValue('image', image)}
        error={errors.image}
      />

      <fieldset className="flex flex-col gap-4 rounded-lg border border-line p-4">
        <legend className="px-1 text-sm font-medium text-ink">Tutor</legend>
        <TextField
          id="course-tutor-name"
          name="tutorName"
          label="Nama Tutor"
          required
          value={values.tutorName}
          onChange={handleChange}
          error={errors.tutorName}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            id="course-tutor-role"
            name="tutorRole"
            label="Jabatan"
            required
            placeholder="Senior Accountant"
            value={values.tutorRole}
            onChange={handleChange}
            error={errors.tutorRole}
          />
          <TextField
            id="course-tutor-company"
            name="tutorCompany"
            label="Perusahaan"
            placeholder="Gojek"
            value={values.tutorCompany}
            onChange={handleChange}
            error={errors.tutorCompany}
          />
        </div>
      </fieldset>

      <TextField
        id="course-rating"
        name="rating"
        type="number"
        min="0"
        max="5"
        step="0.5"
        label="Rating (0 - 5)"
        placeholder="0"
        value={values.rating}
        onChange={handleChange}
        error={errors.rating}
      />

      <div className="grid grid-cols-2 gap-3 pt-1">
        <Button variant="social" size="sm" onClick={onCancel} disabled={submitting}>
          Batal
        </Button>
        <Button type="submit" size="sm" disabled={submitting}>
          {submitting ? 'Menyimpan...' : submitLabel}
        </Button>
      </div>
    </form>
  )
}
