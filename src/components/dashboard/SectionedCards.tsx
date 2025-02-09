import { ChevronRight, Star } from 'lucide-react';
import { AudiobookCard } from '../BookCard'
import { MdErrorOutline } from "react-icons/md";

type SectionedCardsProps = {
  sectionTitle: string;
  audios: AudioSchema[];
  appState: AppState;
}

export default function SectionedCards({ sectionTitle, audios, appState }: SectionedCardsProps) {

  return (
    <section
    id='featured'
    className='py-16 bg-sky-50'
    >
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Star className="text-sky-600 mr-2" />
          <h2 className="text-2xl capitalize font-bold text-gray-800">{sectionTitle} Audiobooks</h2>
        </div>
        <button className="flex items-center text-sky-600 hover:text-sky-700">
          View all <ChevronRight size={20} />
        </button>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* <div className='grid-display flexflex-wrap gap-4 items-center justify-center transition-transform'> */}
              {
                audios?.map((book) => (
                  <AudiobookCard 
                    key={book._id}
                    bookId={book._id!}
                    author={book.author}
                    title={book.title}
                    thumbnail={book.thumbnail}
                    chapterId={book.chapterId}
                  />
                ))
              }
            </div>
              :
              <p className='font-mono text-gray-200 text-lg'>No {sectionTitle} available at present</p>
          )
        )
      }
      </div>

    </section>
  )
}