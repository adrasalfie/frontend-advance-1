import { useState } from 'react'
import Button from '../atoms/Button.jsx'
import { validateEmailOnly } from '../../utils/validators.js'

/** Input email + tombol Subscribe. Di mobile bertumpuk, di >= sm menyatu dalam satu "pill" putih. */
export default function NewsletterForm({ onSubscribe }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    const message = validateEmailOnly(email)
    setError(message)
    if (message) return
    onSubscribe?.(email)
    setDone(true)
    setEmail('')
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full max-w-md">
      <div className="flex flex-col gap-3 sm:flex-row sm:rounded-lg sm:bg-white sm:p-1.5">
        <label htmlFor="newsletter-email" className="sr-only">
          Email
        </label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
            setDone(false)
          }}
          placeholder="Masukkan Emailmu"
          aria-invalid={Boolean(error) || undefined}
          className="w-full rounded-lg bg-white px-4 py-3 text-sm text-ink outline-none placeholder:text-gray-400 sm:flex-1 sm:py-2"
        />
        <Button type="submit" variant="accent" size="sm" className="py-3 sm:py-2">
          Subscribe
        </Button>
      </div>
      {error && (
        <p role="alert" className="mt-2 text-xs text-brand-yellow">
          {error}
        </p>
      )}
      {done && (
        <p role="status" className="mt-2 text-xs text-primary">
          Terima kasih! Kamu sudah berlangganan newsletter kami.
        </p>
      )}
    </form>
  )
}
