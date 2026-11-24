export default function ForgotPasswordLink({ href = '#' }) {
  return (
    <a
      href={href}
      className="self-end text-xs text-muted transition-colors hover:text-ink md:text-sm"
    >
      Lupa Password?
    </a>
  )
}
