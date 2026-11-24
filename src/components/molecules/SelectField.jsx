import FormField from './FormField.jsx'
import Icon from '../atoms/Icon.jsx'

/** Dropdown dengan label + error. `options` = [{ value, label }]. */
export default function SelectField({ id, label, required, error, options, className = '', ...selectProps }) {
  return (
    <FormField id={id} label={label} required={required} error={error}>
      <div className="relative">
        <select
          id={id}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={[
            'w-full appearance-none rounded-lg border bg-white px-3.5 py-2.5 pr-10 text-sm text-ink outline-none transition',
            'focus:border-primary focus:ring-2 focus:ring-primary/20',
            error ? 'border-danger' : 'border-line',
            className,
          ].join(' ')}
          {...selectProps}
        >
          {options.map(({ value, label: optionLabel }) => (
            <option key={value} value={value}>
              {optionLabel}
            </option>
          ))}
        </select>
        <Icon
          name="chevron-down"
          size={18}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        />
      </div>
    </FormField>
  )
}
