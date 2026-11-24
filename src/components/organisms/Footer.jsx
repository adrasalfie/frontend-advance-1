import Container from '../atoms/Container.jsx'
import Logo from '../atoms/Logo.jsx'
import FooterLinkGroup from '../molecules/FooterLinkGroup.jsx'
import SocialLinks from '../molecules/SocialLinks.jsx'
import { FOOTER_GROUPS, FOOTER_INFO, SOCIAL_LINKS } from '../../data/footer.js'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <Container className="py-8 md:py-12">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between md:gap-12">
          {/* Info brand */}
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 font-heading text-sm font-semibold leading-snug">
              {FOOTER_INFO.tagline}
            </p>
            <p className="mt-3 text-sm text-muted">{FOOTER_INFO.address}</p>
            <p className="mt-2 text-sm text-muted">{FOOTER_INFO.phone}</p>
          </div>

          {/* Link groups: accordion di mobile, kolom di desktop */}
          <nav
            aria-label="Footer"
            className="grid grid-cols-1 md:grid-cols-[repeat(3,auto)] md:gap-x-10 lg:gap-x-14"
          >
            {FOOTER_GROUPS.map((group) => (
              <FooterLinkGroup key={group.title} {...group} />
            ))}
          </nav>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-line pt-6 md:mt-10 md:flex-row md:items-center md:justify-between">
          <div className="md:order-2">
            <SocialLinks links={SOCIAL_LINKS} />
          </div>
          <p className="text-sm text-muted md:order-1">{FOOTER_INFO.copyright}</p>
        </div>
      </Container>
    </footer>
  )
}
