
type BookLoadingStateProps = {
  containerRef?: React.LegacyRef<HTMLDivElement>;
}
export default function BookLoadingState({ containerRef }: BookLoadingStateProps) {

  return (
    <div 
    ref={containerRef as React.LegacyRef<HTMLDivElement>}
    className='customScrollBar w-full grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))] gap-4 transition-transform overflow-x-scroll p-3'>
      {
        [...Array(2).keys()].map((_, index) => (
          <div
          key={index}
          className='rounded-md h-48 bg-sky-100 animate-pulse mobile:w-36 mobile:h-52 text-sm transition-transform'
          />
        ))
      }
    </div>
  )
}