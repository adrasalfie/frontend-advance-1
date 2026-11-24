import Icon from '../atoms/Icon.jsx'

export default function SocialLinks({ links }) {
  return (
    <ul className="flex items-center gap-2.5">
      {links.map(({ name, icon, href }) => (
        <li key={name}>
          <a
            href={href}
            aria-label={name}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/70 text-ink transition-colors hover:bg-ink hover:text-white"
          >
            <Icon name={icon} size={15} />
          </a>
        </li>
      ))}
    </ul>
  )
}
