/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom"
import {
  AudioBookPlayer,
  AudioRating,
  BookRecommendations,
} from "../components/AudioBook";
import { AiOutlineHeart } from "react-icons/ai";
// import { PageHeader } from "../components";
import { useEffect, useState } from "react";
import { BASE_URL } from "../app/app.config";
import { appService } from "../app/appService";
import toast from "react-hot-toast";
import { Button } from "../components/AudioBook";

export default function BookPage() {
  const { bookId } = useParams();
  const navigate = useNavigate()
  const [audioBook, setAudioBook] = useState<AudioSchema>();

  useEffect(() => {
    if (!bookId) return;

    (async () => {
      try {
        const audioData = await appService.getAudio(bookId);
        setAudioBook(audioData.data);
      } catch (err: unknown) {
        const error = err as any;
        const message = error.response?.data?.error?.message || error?.message;
        toast.error(message);
      }
    })();
  }, [bookId])

  return (
    <div
      id={bookId}
      className='h-auto w-full flex flex-col text-black px-10 maxMobile:px-5 py-8 gap-12 mx-auto lg:w-[80%]'>

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
                <img src={`${BASE_URL}/${audioBook.thumbnail}`} alt={audioBook.title}
                  className='w-full rounded-md h-full object-cover'
                />
                : null
            }
          </figure>

          <section className="flex flex-col justify-between h-full w-full">
            <div className="mt-12 flex flex-col gap-2">
              <p className='capitalize font-medium flex-wrap'>By: <span className="">{audioBook?.author}</span></p>
              <p className='flex items-center gap-1 overflow-hidden flex-wrap text-[13px]'>
                <span>Categories:</span>
                <div className='pl-1 flex items-center flex-wrap gap-1'>
                  {
                    audioBook?.genre?.map((genre, i) => (
                      <span key={i} className='capitalize font-medium bg-sky-100 rounded-sm p-0.5 px-1.5'>{genre}</span>
                    ))
                  }
                </div>
              </p>
            </div>

            <div className="flex items-center justify-between text-xl w-full pr-3">
              <AudioRating rating={audioBook?.rating as number} />
              <AiOutlineHeart className='hover:scale-[1.04] active:scale-[1] transition-all cursor-pointer' />
            </div>
          </section>

        </article>

        <div className="flex flex-col capitalize text-base">
          <h5 className="font-semibold">About:</h5>
          <p className="first-letter:capitalize text-[13px] indent-3 text-justify">{audioBook?.about}</p>
        </div>
      </div>

      <AudioBookPlayer chapterId={audioBook?.chapterId as string} />

      <BookRecommendations currentBookId={bookId!} />

    </div>
  )
}