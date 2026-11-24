import Avatar from '../atoms/Avatar.jsx'

/** Foto + nama + jabatan tutor. Nama perusahaan hanya tampil di layar >= sm. */
export default function TutorInfo({ name, role, company, avatar }) {
  return (
    <div className="flex items-center gap-2.5">
      <Avatar src={avatar} alt={name} size={36} />
      <div className="min-w-0 leading-tight">
        <p className="truncate text-sm font-medium text-ink">{name}</p>
        <p className="truncate text-xs text-muted">
          {role}
          {company && (
            <span className="hidden sm:inline">
              {' di '}
              <strong className="font-bold text-ink">{company}</strong>
            </span>
          )}
        </p>
      </div>
    </div>
  )
}
