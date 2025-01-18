import { IconType } from "react-icons";
import BookCard from "../BookCard";
import { useRef } from "react";

export default function BookRecommendations() {
  const containerRef = useRef<HTMLDivElement>();

  const sampleBooks = [
    { id: '1', title: 'Things fall apart', author: 'Chinue Achebe', thumbnail: '' },
    { id: '2', title: 'Things fall apart', author: 'Chinue Achebe', thumbnail: '' },
    { id: '3', title: 'Things fall apart', author: 'Chinue Achebe', thumbnail: '' },
    { id: '4', title: 'Things fall apart', author: 'Chinue Achebe', thumbnail: '' },
    { id: '5', title: 'Things fall apart', author: 'Chinue Achebe', thumbnail: '' },
    { id: '6', title: 'Things fall apart', author: 'Chinue Achebe', thumbnail: '' },
    { id: '7', title: 'Things fall apart', author: 'Chinue Achebe', thumbnail: '' },
    { id: '8', title: 'Things fall apart', author: 'Chinue Achebe', thumbnail: '' },
  ];

  const handleClick = (direction: ScrollDirection) => {
    if (containerRef.current) {
      if (direction === 'left') {
        containerRef.current.scrollLeft -= 200;
      } else {
        containerRef.current.scrollLeft += 200;
      }
    }
  }

  return (
    <section className='w-full flex flex-col gap-4 mb-4'>
      <div className='flex flex-col'>
        <p>Recommended Audiobooks</p>
        <div className='w-full h-[3px] bg-gradient-to-tr from-gray-200 via-gray-400 to-gray-200'></div>
      </div>

      <div 
      ref={containerRef as React.LegacyRef<HTMLDivElement>}
      className='customScrollBar w-full flex gap-6 items-center transition-transform overflow-x-scroll p-3'>
        {
          sampleBooks.map((book) => (
            <BookCard
              key={book.id}
              bookId={book.id}
              author={book.author}
              title={book.title}
              thumbnail={book.thumbnail}
            />
          ))
        }
      </div>

      <div className='self-end flex items-center gap-2'>
        <Button Name={'<'} handleClick={() => handleClick('left')} />
        <Button Name={'>'} handleClick={() => handleClick('right')} />
      </div>

    </section>
  )
}


type ButtonProps = {
  Name: string | IconType;
  handleClick: () => void;
}
function Button({ Name, handleClick }: ButtonProps) {

  return (
    <button
      className="rounded-full text-2xl size-9 grid place-content-center bg-slate-600 shadow-md focus:outline-none border-0 focus:ring-0"
      onClick={handleClick}
    >
      {typeof Name === 'string' ? Name : <Name />}
    </button>
  )
}