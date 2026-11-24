/** Garis pemisah dengan teks di tengah, mis. "atau". */
export default function DividerText({ children }) {
  return (
    <div className="flex items-center gap-3 text-sm text-muted" role="separator">
      <span className="h-px flex-1 bg-line" />
      <span>{children}</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  )
}
