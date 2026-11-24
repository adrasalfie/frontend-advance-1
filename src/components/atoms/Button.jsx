import { Link } from 'react-router-dom'

const VARIANTS = {
  primary: 'border-primary bg-primary text-white hover:bg-primary-dark hover:border-primary-dark',
  outline: 'border-primary bg-white text-primary hover:bg-primary-soft',
  soft: 'border-transparent bg-primary-soft text-primary hover:bg-primary/20',
  accent: 'border-brand-yellow bg-brand-yellow text-white hover:brightness-95',
  social: 'border-line bg-white text-ink hover:bg-gray-50',
  danger: 'border-danger bg-danger text-white hover:brightness-95',
  dangerOutline: 'border-danger/40 bg-white text-danger hover:bg-red-50',
}

const SIZES = {
  sm: 'px-3.5 py-2 text-xs md:text-sm',
  md: 'px-5 py-2.5 text-sm md:text-base',
  lg: 'px-6 py-3 text-base',
}

/**
 * Tombol serbaguna.
 * - `to`   -> render <Link> (navigasi internal)
 * - `href` -> render <a>
 * - lainnya -> render <button>
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon = null,
  to,
  href,
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'inline-flex items-center justify-center gap-2 rounded-lg border font-semibold transition-colors',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
    'disabled:cursor-not-allowed disabled:opacity-60',
    VARIANTS[variant],
    SIZES[size],
    fullWidth ? 'w-full' : '',
    className,
  ].join(' ')

  const content = (
    <>
      {icon}
      {children}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    )
  }
  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  )
}
