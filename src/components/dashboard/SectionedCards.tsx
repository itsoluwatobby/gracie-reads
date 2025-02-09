import { ChevronRight, Star } from 'lucide-react';
import { AudiobookCard } from '../BookCard'
import { MdErrorOutline } from "react-icons/md";
import { useEffect, useState } from 'react';

type SectionedCardsProps = {
  sectionTitle: string;
  audios: AudioSchema[];
  appState: AppState;
}

export default function SectionedCards({ sectionTitle, audios, appState }: SectionedCardsProps) {
  const [isAvailable, setisAvailable] = useState(true);

  useEffect(() => {
    let isMounted = true;
    if (isMounted && audios) setisAvailable(audios?.length >= 1);

    return () => {
      isMounted = false;
    }
  }, [audios])

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
        {
          isAvailable 
            ? <button className="flex items-center text-sky-600 hover:text-sky-700">
          View all <ChevronRight size={20} />
          </button>
          : null
        }
      </div>
      {
        appState?.loading 
        ? (
          <div className='grid grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-4 transition-transform'>
            {
              [...Array(4).keys()].map((i) => (
                <article key={i} className='rounded-md h-48 bg-sky-100 animate-pulse mobile:w-36 mobile:h-52 text-sm transition-transform'></article> 
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
            isAvailable ?
              <div className="grid grid-cols-2 md:grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-4">
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
              <p className='font-mono text-gray-800 text-center text-xl capitalize'>No {sectionTitle} audiobooks available at present</p>
          )
        )
      }
      </div>

    </section>
  )
}