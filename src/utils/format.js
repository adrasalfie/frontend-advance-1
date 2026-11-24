const trimNumber = (value) => String(Number(value.toFixed(1))).replace('.', ',')

/** 300000 -> "Rp 300K", 1500000 -> "Rp 1,5JT" (format ringkas di kartu kelas) */
export function formatCompactPrice(amount) {
  if (amount >= 1_000_000) return `Rp ${trimNumber(amount / 1_000_000)}JT`
  if (amount >= 1000) return `Rp ${trimNumber(amount / 1000)}K`
  return `Rp ${amount}`
}

/** 300000 -> "Rp 300.000" */
export function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace(/\s/g, ' ')
}

/** "Jenna Ortega" -> "JO" */
export function getInitials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}
