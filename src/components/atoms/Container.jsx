/** Pembungkus lebar konten + padding responsif yang dipakai semua section. */
export default function Container({ as: Tag = 'div', className = '', children, ...rest }) {
  return (
    <Tag className={`mx-auto w-full max-w-[1148px] px-4 md:px-6 lg:px-8 ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
