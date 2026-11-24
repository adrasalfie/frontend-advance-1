import Button from '../atoms/Button.jsx'

/** Banner utama dengan gambar latar gelap, judul, deskripsi, dan tombol CTA. */
export default function Hero({ title, description, ctaLabel, ctaHref, image }) {
  return (
    <section className="relative overflow-hidden rounded-xl bg-ink text-center text-white">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/70" aria-hidden="true" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-4 px-5 py-10 sm:px-8 md:gap-5 md:py-20">
        <h1 className="font-heading text-2xl font-semibold leading-tight sm:text-3xl md:text-5xl">
          {title}
        </h1>
        <p className="text-sm leading-relaxed text-white/90 md:text-base">{description}</p>
        <Button href={ctaHref} size="md" className="mt-1">
          {ctaLabel}
        </Button>
      </div>
    </section>
  )
}
