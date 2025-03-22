
type BookLoadingStateProps = {
  containerRef?: React.LegacyRef<HTMLDivElement>;
  classNames?: string;
}
export default function BookLoadingState({ containerRef, classNames }: BookLoadingStateProps) {

  return (
    <div 
    ref={containerRef as React.LegacyRef<HTMLDivElement>}
    className={`customScrollBar w-full ${classNames ? classNames : 'grid grid-cols-[repeat(auto-fill,minmax(14rem,1fr))]'} gap-4 transition-transform overflow-x-scroll p-3`}>
      {
        [...Array(2).keys()].map((_, index) => (
          <div
          key={index}
          className={`rounded-md h-48 bg-sky-100 animate-pulse ${classNames ? 'flex-none w-[17rem] mobile:w-[23rem]' : 'mobile:h-52 mobile:w-36'} text-sm transition-transform`}
          />
        ))
      }
    </div>
  )
}