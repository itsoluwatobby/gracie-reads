/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom';
import { Headphones } from 'lucide-react';
import { useEffect, useState } from 'react';
import { appService } from '../app/appService';
import { CacheKeys, helper } from '../utils';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { RiDeleteBin6Line } from 'react-icons/ri';
import toast from 'react-hot-toast';

type BookCardProps = {
  thumbnail: string;
  title: string;
  author: string;
  bookId: string;
  chapterId?: string;
  setReload?: React.Dispatch<React.SetStateAction<number>>;
  classNames?: string;
}

export function AudiobookCard(
  {
    thumbnail, title, author, classNames='',
    bookId, setReload,
  }: BookCardProps
) {
  const { getCachedData } = useLocalStorage();
  // const [episodeLength, setEpisodeLength] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoggedIn(
      // appInfo?.isLoggedIn
      Boolean(getCachedData<{ session: string }>(CacheKeys.login_session)?.session)
      || false
    )
  }, [getCachedData])
  
  const deleteAudio = async() => {
    if (loading) return;

    try {
      setLoading(true)
      await appService.deleteAudio(bookId);
      (setReload!)((prev) => prev + 1);
      toast.success('Audiobook deleted');
    } catch (err: unknown) {
      const error = err as any;
      const message = error.response?.data?.error?.message || error?.message;
      // console.log(message);
      toast.error(message);
      // return;
    } finally {
      setLoading(false)
    }
  };

  // useEffect(() => {
  //   if (!chapterId) return;
  //   (async () => {
  //     try {
  //       const chapter = await appService.getAudioChapterById(chapterId);
  //       setEpisodeLength(chapter.data.chapters.length);
  //     } catch (err: unknown) {
  //       const error = err as any;
  //       const message = error.response?.data?.error?.message || error?.message;
  //       console.log(message);
  //       return;
  //       // toast.error(message);
  //     }
  //   })();
  // }, [chapterId])

  return (
    <div className={`relative ${classNames}`}>
      <Link
        to={`/${bookId}`}
        className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
        <img src={thumbnail} alt={title} className="rounded-md w-full h-40 object-cover" />
        <div className="p-3">
          <h3 className="font-bold text-gray-800 text-base">{helper.reduceTextLength(title)}</h3>
          <p className="text-gray-600 text-sm">{helper.reduceTextLength(author)}</p>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center text-gray-500">
              <Headphones size={16} className="mr-1" />
              {/* <span className='hidden'> */}
                {/* {book.duration} */}
                {/* {episodeLength} {episodeLength > 1 ? 'chapters' : 'chapter'} */}
              {/* </span> */}
            </div>
            {/* {featured && (
              <span className="flex items-center text-yellow-500">
                <Star size={16} className="mr-1" fill="currentColor" />
                {book.rating}
              </span>
            )} */} 
          </div>
        </div>
      </Link>

        {
          loggedIn ?
          <RiDeleteBin6Line 
          onClick={deleteAudio}
          className={`absolute z-10 text-2xl top-1 right-1 bg-black rounded-md p-0.5 ${loading ? 'hidden' : ''}`}
          /> : null
        }
    </div>
  );
}
