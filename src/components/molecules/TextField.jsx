import FormField from './FormField.jsx'
import Input from '../atoms/Input.jsx'

/** Field teks biasa: label + input + error. Props lain diteruskan ke <Input />. */
export default function TextField({ id, label, required, error, ...inputProps }) {
  return (
    <FormField id={id} label={label} required={required} error={error}>
      <Input
        id={id}
        invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...inputProps}
      />
    </FormField>
  )
}
