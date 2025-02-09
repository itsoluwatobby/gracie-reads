/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom';
import { BASE_URL } from '../app/app.config';
import { Headphones } from 'lucide-react';
import { useEffect, useState } from 'react';
import { appService } from '../app/appService';

export default function BookCard(
  {
    thumbnail, title, author, bookId,
  }: BookCardProps
) {
  // const [hoverIndex, setHoverIndex] = useState(0);

  // const modifyHoverCount = () => {
  //   const randomIndex = Math.floor(Math.random() * hoverEffects.length);
  //   setHoverIndex(randomIndex);
  // }

  return (
    <Link
      to={`/${bookId}`}
      title={author}
      // onMouseEnter={modifyHoverCount}
      className={`flex flex-col rounded-md gap-1 h-56 mobile:h-52 text-sm cursor-pointer transition-transform`}>
      <figure className='bg-gray-700 rounded-md hover:scale-[1.01] w-full h-[80%]'>
        {
          thumbnail ?
            <img src={`${BASE_URL}/${thumbnail}`} alt={title} loading="lazy"
              className='w-full rounded-md h-full object-cover'
            />
            : null
        }
      </figure>
      <span className='text-center capitalize font-medium'>{title}</span>
      <p className='flex items-center gap-1 overflow-hidden whitespace-nowrap text-[13px]'>
        <span>author:</span>
        <span className='capitalize font-medium'>{author}</span>
      </p>
    </Link>
  )
}

type BookCardProps = {
  thumbnail: string;
  title: string;
  author: string;
  bookId: string;
  chapterId: string;
}

export function AudiobookCard(
  {
    thumbnail, title, author,
    bookId, chapterId
  }: BookCardProps
) {
  const [episodeLength, setEpisodeLength] = useState(0);

  useEffect(() => {
    if (!chapterId) return;
    (async () => {
      try {
        const chapter = await appService.getAudioChapterById(chapterId);
        setEpisodeLength(chapter.data.chapters.length);
      } catch (err: unknown) {
        const error = err as any;
        const message = error.response?.data?.error?.message || error?.message;
        console.log(message);
        return;
        // toast.error(message);
      }
    })();
  }, [chapterId])

  return (
    <Link
      to={bookId}
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
      <img src={thumbnail} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-gray-800 text-lg">{title}</h3>
        <p className="text-gray-600">{author}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="flex items-center text-gray-500">
            <Headphones size={16} className="mr-1" />
            {/* {book.duration} */}
            {episodeLength} {episodeLength > 1 ? 'chapters' : 'chapter'}
          </span>
          {/* {featured && (
            <span className="flex items-center text-yellow-500">
              <Star size={16} className="mr-1" fill="currentColor" />
              {book.rating}
            </span>
          )} */}
        </div>
      </div>
    </Link>
  );
}
