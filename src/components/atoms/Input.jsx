export default function Input({ invalid = false, className = '', ...rest }) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={[
        'w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition',
        'placeholder:text-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20',
        invalid ? 'border-danger' : 'border-line',
        className,
      ].join(' ')}
      {...rest}
    />
  )
}
