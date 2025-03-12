/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom"
import {
  AudioBookPlayer,
  AudioRating,
  BookRecommendations,
} from "../components/AudioBook";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useEffect, useState } from "react";
import { appService } from "../app/appService";
import toast from "react-hot-toast";
import { Button } from "../components/AudioBook";
import { helper } from "../utils";
import { initAppState } from "../utils/initStates";

export default function BookPage() {
  const MaxAudioStoryLength = 680;
  const { bookId } = useParams();
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState('');
  const [audioBook, setAudioBook] = useState<AudioSchema>();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [viewMore, setViewMore] = useState<boolean>(false);
  const [canviewMore, setCanViewMore] = useState<boolean>(false);
  const [appState, setAppState] = useState<AppState>(initAppState);
  
  const { loading } = appState!;

  useEffect(() => {
    if (!currentUser || !audioBook?.likes) return;
    setIsLiked(audioBook?.likes.includes(currentUser));
  }, [currentUser, audioBook?.likes])

  useEffect(() => {
    if (!bookId) return;

    (async () => {
      try {
        const audioData = await appService.getAudio(bookId);
        const user = await appService.getUser();

        setCurrentUser(user.data.ipAddress);
        setAudioBook(audioData.data);
        setCanViewMore((audioData.data.about!).length > MaxAudioStoryLength);
      } catch (err: unknown) {
        const error = err as any;
        const message = error.response?.data?.error?.message || error?.message;
        toast.error(message);
      }
    })();
  }, [bookId])

  const toggleLike = async () => {
    if (loading) return;
    try {
      setAppState((prev) => ({ ...prev, loading: true }));
      const audio = await appService.likeAudio(bookId as string);
      setAudioBook(audio.data);
    } catch (err: unknown) {
      const error = err as any;
      const message = error.response?.data?.error?.message || error?.message;
      setAppState((prev) => ({ ...prev, error: true, errMsg: message }));
      toast.error(message);
    } finally {
      setAppState((prev) => ({ ...prev, loading: false }));
    }
  }

  const rateAudiobook = async (rating: number) => {
    try {
      const audio = await appService.rateAudiobook({ audioId: bookId!, rating });
      setAudioBook(audio.data);
    } catch (err: unknown) {
      const error = err as any;
      const message = error.response?.data?.error?.message || error?.message;
      toast.error(message);
    }
  }

  return (
    <div
      id={bookId}
      className='h-auto w-full flex flex-col bg-gradient-to-b from-sky-100 to-white text-black px-10 maxMobile:px-5 py-8 gap-12 mx-auto lg:w-[70%]'>

      {/* <PageHeader /> */}
      <div className="-mt-4 -mb-5 w-fit">
        <Button Name={'<'} handleClick={() => navigate('/')} />
      </div>

      <div className="flex flex-col gap-6">
        <h1 className="capitalize md:text-start text-center border-t-2 pt-2 text-3xl font-semibold">{audioBook?.title}</h1>

        <article
          className='flex items-center bg-white rounded-md gap-6 md:w-[30rem] text-sm transition-transform p-2 shadow-md'>
          <figure className='flex-none bg-gray-200 rounded-md w-40 h-44 mobile:h-36 mobile:w-28'>
            {
              audioBook?.thumbnail ?
                <img src={audioBook.thumbnail} alt={audioBook.title}
                  className='w-full rounded-md h-full object-cover'
                />
                : null
            }
          </figure>

          <section className="flex flex-col justify-between h-full w-full">
            <div className="mt-12 flex flex-col gap-2">
              <p className='capitalize font-medium flex-wrap'>By: <span className="">{audioBook?.author}</span></p>
              <div className='flex items-center gap-1 overflow-hidden flex-wrap text-[13px]'>
                <span>Categories:</span>
                <div className='pl-1 flex items-center flex-wrap gap-1'>
                  {
                    audioBook?.genre?.map((genre, i) => (
                      <span key={i} className='capitalize font-medium bg-sky-100 rounded-sm p-0.5 px-1.5'>{genre}</span>
                    ))
                  }
                </div>
              </div>
            </div>

            <div className="flex items-center maxMobile:mt-2 justify-between text-xl w-full pr-3">
              <AudioRating
                rateAudiobook={rateAudiobook}
                rating={audioBook?.rating as Rating[]}
              />

              <div className="flex gap-0.5">
                {
                  isLiked ?
                    <AiFillHeart
                      onClick={toggleLike}
                      className={`hover:scale-[1.04] active:scale-[1] transition-all cursor-pointer text-sky-500 ${loading ? 'animate-pulse' : ''}`}
                      />
                    :
                    <AiOutlineHeart
                      onClick={toggleLike}
                      className={`hover:scale-[1.04] active:scale-[1] transition-all cursor-pointer text-sky-400 ${loading ? 'animate-pulse' : ''}`}
                    />
                }
                <span className="self-end text-gray-600 text-sm">{helper.checkCount(audioBook?.likes)}</span>
              </div>
            </div>
          </section>

        </article>

        <div className={`flex flex-col capitalize text-base`}>
          <h5 className="font-semibold">About:</h5>
          <p 
          onClick={() => setViewMore((prev) => !prev)}
          className={`first-letter:capitalize p-2 text-[12px] indent-3 text-justify ${viewMore ? 'h-64 overflow-y-scroll' : ''}`}>{viewMore ? audioBook?.about : helper.reduceTextLength(audioBook?.about ?? '', MaxAudioStoryLength)}</p>
        </div>

        {
          canviewMore ?
          <span className="underline underline-offset-2 self-center -mt-4 cursor-pointer text-blue-500 text-xs"
          onClick={() => setViewMore((prev) => !prev)}
          >{viewMore ? 'view less' : 'view more'}</span> : null
        }
      </div>

      <AudioBookPlayer chapterId={audioBook?.chapterId as string} />

      <BookRecommendations currentBookId={bookId!} />

    </div>
  )
}