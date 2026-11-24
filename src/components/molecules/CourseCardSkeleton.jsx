/** Kerangka kartu kelas yang berkedip saat data sedang diambil dari API. */
export default function CourseCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex animate-pulse gap-3 rounded-xl border border-line bg-white p-3 sm:flex-col sm:gap-4 sm:p-4"
    >
      <div className="h-24 w-24 shrink-0 rounded-lg bg-gray-200 sm:aspect-[16/10] sm:h-auto sm:w-full" />
      <div className="flex flex-1 flex-col gap-3">
        <div className="h-4 w-20 rounded bg-gray-200" />
        <div className="h-4 w-4/5 rounded bg-gray-200" />
        <div className="hidden h-3 w-full rounded bg-gray-200 sm:block" />
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-lg bg-gray-200" />
          <div className="h-3 w-1/2 rounded bg-gray-200" />
        </div>
        <div className="mt-auto flex justify-between">
          <div className="h-3 w-24 rounded bg-gray-200" />
          <div className="h-4 w-14 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  )
}
