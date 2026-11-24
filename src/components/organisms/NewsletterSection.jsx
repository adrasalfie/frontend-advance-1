import NewsletterForm from '../molecules/NewsletterForm.jsx'

export default function NewsletterSection({ eyebrow, title, description, image, onSubscribe }) {
  return (
    <section className="relative overflow-hidden rounded-xl bg-ink text-center text-white shadow-xl">
      <img src={image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/70" aria-hidden="true" />

      <div className="relative mx-auto flex max-w-xl flex-col items-center gap-3 px-5 py-10 md:gap-4 md:py-16">
        <p className="text-xs uppercase tracking-wider text-white/80 md:text-sm">{eyebrow}</p>
        <h2 className="font-heading text-2xl font-semibold md:text-3xl">{title}</h2>
        <p className="mb-2 text-sm leading-relaxed text-white/90">{description}</p>
        <NewsletterForm onSubscribe={onSubscribe} />
      </div>
    </section>
  )
}
