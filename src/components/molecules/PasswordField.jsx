import { useState } from 'react'
import FormField from './FormField.jsx'
import Input from '../atoms/Input.jsx'
import Icon from '../atoms/Icon.jsx'

/** Field kata sandi. Ikon mata tercoret = tersembunyi (sesuai mockup), klik untuk menampilkan. */
export default function PasswordField({ id, label, required, error, ...inputProps }) {
  const [visible, setVisible] = useState(false)

  return (
    <FormField id={id} label={label} required={required} error={error}>
      <div className="relative">
        <Input
          id={id}
          type={visible ? 'text' : 'password'}
          invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className="pr-11"
          {...inputProps}
        />
        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          aria-label={visible ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-gray-500 hover:text-ink"
        >
          <Icon name={visible ? 'eye' : 'eye-off'} size={18} />
        </button>
      </div>
    </FormField>
  )
}
