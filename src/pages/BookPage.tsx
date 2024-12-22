import { useParams } from "react-router-dom"
import { AudioBookPlayer, BookRecommendations } from "../components/AudioBook";
import { AiOutlineHeart } from "react-icons/ai";
import { PageHeader } from "../components";

export default function BookPage() {
  const { bookId } = useParams();

  const book = {
    id: '1',
    title: 'Things fall apart',
    author: 'Chinue Achebe',
    thumbnail: '',
  };

  return (
    <div 
    id={bookId}
    className='h-auto w-full flex flex-col px-10 maxMobile:px-5 py-8 gap-12'>

      <PageHeader />

      <div className="flex flex-col gap-6">
        <h1 className="capitalize text-center border-t-2 pt-2 text-3xl font-semibold">{book.author}</h1>

        <article
        className='relative flex items-center bg-gray-600 rounded-md gap-6 md:w-[30rem] text-sm cursor-pointer transition-transform p-2 shadow-md'>
          <figure className='flex-none bg-gray-700 rounded-md w-40 h-44 mobile:h-36 mobile:w-28'>
            {
              book.thumbnail ?
              <img src={book.thumbnail} alt={book.title} 
              className='w-full rounded-md h-full object-cover'
              />
              : null
            }
          </figure>

          <div className="flex flex-col gap-2">
            <p className='capitalize font-medium flex-wrap'>By: <span className="text-red-400">{book.author}</span></p>
            <p className='flex items-center gap-1 overflow-hidden flex-wrap text-[13px]'>
              <span>Categories:</span>
              <span className='capitalize text-red-400 font-medium'>{book.author}</span>
            </p>
          </div>

          <div className="absolute bottom-2 right-4 text-xl">
            <AiOutlineHeart className='hover:scale-[1.04] active:scale-[1] transition-all cursor-pointer' />
          </div>

        </article>

        <div>
          <span className="font-semibold text-base">{book.title}: </span>
          <p className="text-[13px] indent-3 text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, fuga. Perferendis exercitationem rem consequuntur, dolor alias autem nemo veniam rerum odit nesciunt reiciendis consequatur commodi, eum praesentium dolores ab deserunt.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, fuga. Perferendis exercitationem rem consequuntur, dolor alias autem nemo veniam rerum odit nesciunt reiciendis consequatur commodi, eum praesentium dolores ab deserunt.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, fuga. Perferendis exercitationem rem consequuntur, dolor alias autem nemo veniam rerum odit nesciunt reiciendis consequatur commodi, eum praesentium dolores ab deserunt.
          </p>
        </div>
      </div>

      <AudioBookPlayer />

      <BookRecommendations />

    </div>
  )
}