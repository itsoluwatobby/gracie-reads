/* eslint-disable @typescript-eslint/no-explicit-any */
import { AudiobookCard } from "../BookCard";
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../hooks";
import Button from './Button';
import { appService } from "../../app/appService";
import BookLoadingState from "../BookLoadingState";
import { MdErrorOutline } from "react-icons/md";

type BookRecommendationsProps = {
  currentBookId: string;
}

export default function BookRecommendations({ currentBookId }: BookRecommendationsProps) {
  const containerRef = useRef<HTMLDivElement>();
  const { isServerOnline } = useAppContext() as AppContextProps
  const [recommended, setRecommended] = useState<AudioSchema[]>([]);
  const [appState, setappState] = useState<AppState>(
    {
      loading: false, error: false, errMsg: ''
    }
  );

  const handleClick = (direction: ScrollDirection) => {
    if (containerRef.current) {
      if (direction === 'left') {
        containerRef.current.scrollLeft -= 200;
      } else {
        containerRef.current.scrollLeft += 200;
      }
    }
  }

  useEffect(() => {
    if (!isServerOnline) return;
    (async () => {
      setappState(prev => ({...prev, error: false, loading: true }));

      try {
        const audioData = await appService.fetchRecommendedAudios();
        const data = audioData.data;
        const sortedAudios =  data?.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

        const recommendedAudios = sortedAudios.filter((audio) => audio._id !== currentBookId);
        setRecommended(recommendedAudios);
        setappState({ error: false, errMsg: '', loading: false });
      } catch (err: unknown) {
        const error = err as any;
        const message = error.response?.data?.error?.message || error?.message;
        setappState({ error: true, loading: false, errMsg: message });
      }
    })()
  }, [isServerOnline, currentBookId])

  return (
    <section className='w-full flex flex-col gap-4 mb-4'>
      <div className='flex flex-col'>
        <p>Recommended Audiobooks</p>
        <div className='w-full h-[3px] bg-gradient-to-tr from-gray-200 via-gray-400 to-gray-200'></div>
      </div>

        {
          appState.loading ?
            <BookLoadingState 
              classNames="flex items-center flex-nowrap"
              containerRef={containerRef as React.LegacyRef<HTMLDivElement>}
            />
          :
          appState.error ?
          <span className="text-red-500 text-lg flex justify-center items-center gap-2">
            {appState.errMsg}
            <MdErrorOutline className='text-2xl' />
          </span>
          :
          <div 
          ref={containerRef as React.LegacyRef<HTMLDivElement>}
          className='customScrollBar w-full flex items-center flex-nowrap gap-4 transition-transform overflow-x-scroll p-3'>
          {
            recommended?.length ?
              recommended.map((book) => (
                <AudiobookCard
                  key={book._id}
                  bookId={book._id!}
                  author={book.author}
                  title={book.title}
                  thumbnail={book.thumbnail}
                  chapterId={book.chapterId}
                  classNames="w-[17rem] mobile:w-[23rem] flex-none"
                />
              ))
              : <span className="whitespace-nowrap">No recommended audiobooks</span>
          }
        </div>
      }

      {
        recommended?.length ?
        <div className='self-end flex items-center gap-2'>
          <Button Name={'<'} handleClick={() => handleClick('left')} />
          <Button Name={'>'} handleClick={() => handleClick('right')} />
        </div>
        : null
      }

    </section>
  )
}
