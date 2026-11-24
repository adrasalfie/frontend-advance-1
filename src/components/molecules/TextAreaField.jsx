import FormField from './FormField.jsx'
import Textarea from '../atoms/Textarea.jsx'

/** Field teks panjang: label + textarea + error. */
export default function TextAreaField({ id, label, required, error, ...textareaProps }) {
  return (
    <FormField id={id} label={label} required={required} error={error}>
      <Textarea
        id={id}
        invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...textareaProps}
      />
    </FormField>
  )
}
