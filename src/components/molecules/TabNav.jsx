/** Tab kategori horizontal (bisa di-scroll di mobile) dengan garis indikator pada tab aktif. */
export default function TabNav({ items, activeItem, onChange, label = 'Kategori kelas' }) {
  return (
    <div role="tablist" aria-label={label} className="no-scrollbar flex gap-6 overflow-x-auto md:gap-8">
      {items.map((item) => {
        const active = item === activeItem
        return (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item)}
            className={`relative shrink-0 pb-3 text-sm transition-colors ${
              active ? 'font-medium text-brand-orange' : 'text-muted hover:text-ink'
            }`}
          >
            {item}
            {active && (
              <span className="absolute bottom-0 left-0 h-1 w-9 rounded-full bg-brand-orange" />
            )}
          </button>
        )
      })}
    </div>
  )
}
