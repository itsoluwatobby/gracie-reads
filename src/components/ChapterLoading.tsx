
export default function ChapterLoading() {
  return (
    <>
      {
        [...Array(4).keys()]?.map((_, index) => (
          <article
          key={index}
          className="flex items-center justify-between text-sm cursor-default rounded px-1.5 py-3 last:border-b-0 border-b border-b-gray-700"
          >
            <p className="flex items-center gap-6">
              <span className="self-start animate-pulse bg-gray-200 h-4 w-5 rounded-sm"></span>
              <span className="animate-pulse bg-gray-200 h-4 w-52 rounded-sm"></span>
            </p>
            <span className="animate-pulse bg-gray-200 h-4 w-16 rounded-sm"></span>
          </article>
        ))
      }
    </>
  )
}