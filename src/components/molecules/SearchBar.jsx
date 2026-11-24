import Icon from '../atoms/Icon.jsx'

/** Kolom pencarian dengan ikon dan tombol hapus teks. */
export default function SearchBar({ value, onChange, placeholder = 'Cari...', label = 'Cari' }) {
  return (
    <div className="relative">
      <label htmlFor="course-search" className="sr-only">
        {label}
      </label>
      <Icon
        name="search"
        size={18}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <input
        id="course-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-line bg-white py-2.5 pl-10 pr-10 text-sm text-ink outline-none transition placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Hapus pencarian"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-gray-400 hover:text-ink"
        >
          <Icon name="x" size={16} />
        </button>
      )}
    </div>
  )
}
