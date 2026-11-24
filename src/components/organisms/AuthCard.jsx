/** Kartu putih untuk halaman login/register: judul, subjudul, isi (form), dan footer opsional. */
export default function AuthCard({ title, subtitle, children, footer }) {
  return (
    <section className="w-full max-w-[490px] rounded-md border border-line bg-white p-4 sm:p-[30px]">
      <header className="text-center">
        <h1 className="font-heading text-[22px] font-semibold leading-tight md:text-[28px]">
          {title}
        </h1>
        <p className="mt-1.5 text-xs text-muted md:text-sm">{subtitle}</p>
      </header>
      <div className="mt-6">{children}</div>
      {footer && <div className="mt-6 text-center text-sm text-muted">{footer}</div>}
    </section>
  )
}
