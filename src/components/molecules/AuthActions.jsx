import Button from '../atoms/Button.jsx'
import Icon from '../atoms/Icon.jsx'
import DividerText from './DividerText.jsx'

/**
 * Grup tombol untuk halaman auth:
 * tombol utama (submit), tombol sekunder (link ke halaman lain), pemisah "atau", dan tombol SSO.
 */
export default function AuthActions({
  primaryLabel,
  secondaryLabel,
  secondaryTo,
  ssoLabel,
  onSso,
}) {
  return (
    <div className="flex flex-col gap-3">
      <Button type="submit" size="sm" fullWidth>
        {primaryLabel}
      </Button>
      <Button to={secondaryTo} variant="soft" size="sm" fullWidth>
        {secondaryLabel}
      </Button>
      <DividerText>atau</DividerText>
      <Button
        variant="social"
        size="sm"
        fullWidth
        onClick={onSso}
        icon={<Icon name="google" size={20} />}
      >
        {ssoLabel}
      </Button>
    </div>
  )
}
