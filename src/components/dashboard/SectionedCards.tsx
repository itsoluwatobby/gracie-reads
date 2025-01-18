import BookCard from '../BookCard'
import { MdErrorOutline } from "react-icons/md";

type SectionedCardsProps = {
  sectionTitle: string;
  audios: AudioSchema[];
  appState:{appState}
}

export default function SectionedCards({ sectionTitle, audios, appState }: SectionedCardsProps) {

  return (
    <section className='w-full flex flex-col gap-4 mb-4'>
      <div className='flex flex-col'>
        <p>{sectionTitle}</p>
        <div className='w-full h-1 bg-gradient-to-tr from-gray-200 via-gray-400 to-gray-200'></div>
      </div>

      {
        appState?.loading 
        ? (
          <div className='grid-display gap-6 items-center justify-center transition-transform'>
            {
              [...Array(4).keys()].map((i) => (
                <article key={i} className='rounded-md gap-1 h-40 bg-gray-700 animate-pulse mobile:w-36 mobile:h-52 text-sm transition-transform'></article> 
              ))
            }
          </div>
        ) : (
          appState?.error
          ? (
            <div className='text-red-500 text-lg flex justify-center items-center gap-2'>
            {appState?.errMsg}
            <MdErrorOutline className='text-2xl' />
            </div>
          ) : (
            audios?.length ?
            <div className='grid-display flexflex-wrap gap-4 items-center justify-center transition-transform'>
              {
                audios?.map((book) => (
                  <BookCard 
                    key={book._id}
                    bookId={book._id!}
                    author={book.author}
                    title={book.title}
                    thumbnail={book.thumbnail}
                  />
                ))
              }
            </div>
              :
              <p className='font-mono text-gray-200 text-lg'>No {sectionTitle} available at present</p>
          )
        )
      }

    </section>
  )
}