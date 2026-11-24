import FormField from './FormField.jsx'
import Input from '../atoms/Input.jsx'
import Icon from '../atoms/Icon.jsx'
import Flag from '../atoms/Flag.jsx'
import { COUNTRY_CODES } from '../../data/countryCodes.js'

/**
 * No. HP: kotak kode negara (bendera + select) di kiri, input nomor di kanan.
 * `onChange` dipakai untuk select (name = dialCodeName) maupun input.
 */
export default function PhoneField({
  id,
  label,
  required,
  error,
  dialCode,
  dialCodeName = 'dialCode',
  onChange,
  ...inputProps
}) {
  const selected = COUNTRY_CODES.find((country) => country.code === dialCode)

  return (
    <FormField id={id} label={label} required={required} error={error}>
      <div className="flex gap-2.5 md:gap-5">
        <div className="relative flex h-[42px] w-28 shrink-0 overflow-hidden rounded-lg border border-line bg-white transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 md:w-[130px]">
          <span className="flex w-10 items-center justify-center bg-gray-100">
            <Flag code={selected?.flag} />
          </span>
          <select
            aria-label="Kode negara"
            name={dialCodeName}
            value={dialCode}
            onChange={onChange}
            className="min-w-0 flex-1 appearance-none bg-transparent pl-2.5 pr-7 text-sm text-ink outline-none"
          >
            {COUNTRY_CODES.map(({ code }) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
          <Icon
            name="chevron-down"
            size={16}
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
          />
        </div>
        <Input
          id={id}
          type="tel"
          inputMode="numeric"
          invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={onChange}
          {...inputProps}
        />
      </div>
    </FormField>
  )
}
