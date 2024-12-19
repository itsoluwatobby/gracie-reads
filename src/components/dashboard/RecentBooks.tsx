import BookCard from '../BookCard'

export default function RecentBooks() {

  const sampleBooks = [
    { id: '1', title: 'Give love a chance', author: 'Hannah Benson', thumbnail: '' },
    { id: '2', title: 'Give love a chance', author: 'Hannah Benson', thumbnail: '' },
    { id: '3', title: 'Give love a chance', author: 'Hannah Benson', thumbnail: '' },
    { id: '4', title: 'Give love a chance', author: 'Hannah Benson', thumbnail: '' },
  ]

  return (
    <section className='w-full flex flex-col gap-4'>
      <div className='flex flex-col'>
        <p>Featured Audiobooks</p>
        <div className='w-full h-1 bg-gray-300'></div>
      </div>

      <div className='flex flex-wrap gap-6 items-center justify-center transition-transform'>
      {/* <div className='grid grid-cols-5 gap-4'> */}
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