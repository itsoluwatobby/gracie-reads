/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom';
import { BASE_URL } from '../app/app.config';
import { Headphones } from 'lucide-react';
import { useEffect, useState } from 'react';
import { appService } from '../app/appService';
import { helper } from '../utils';

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
      to={`/${bookId}`}
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
      <img src={`${BASE_URL}/${thumbnail}`} alt={title} className="w-full h-40 object-cover" />
      <div className="p-3">
        <h3 className="font-bold text-gray-800 text-base">{helper.reduceTextLength(title)}</h3>
        <p className="text-gray-600 text-sm">{helper.reduceTextLength(author)}</p>
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
