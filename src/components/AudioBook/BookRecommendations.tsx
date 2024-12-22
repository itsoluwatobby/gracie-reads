import BookCard from "../BookCard";

export default function BookRecommendations() {

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

  return (
    <section className='w-full flex flex-col gap-4 mb-4'>
      <div className='flex flex-col'>
        <p>Recommended Audiobooks</p>
        <div className='w-full h-[3px] bg-gradient-to-tr from-gray-200 via-gray-400 to-gray-200'></div>
      </div>

      <div className='customScrollBar w-full flex gap-6 items-center transition-transform overflow-x-scroll p-3'>
      {/* <div className='customScrollBar grid grid-cols-8 gap-48 px-4 overflow-x-scroll'> */}
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

    </section>
  )
}