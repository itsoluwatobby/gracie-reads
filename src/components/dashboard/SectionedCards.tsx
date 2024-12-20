import React from 'react'
import BookCard from '../BookCard'

type SectionedCardsProps = {
  sectionTitle: string
}

export default function SectionedCards({ sectionTitle }: SectionedCardsProps) {

  const sampleBooks = [
    { id: '1', title: 'Things fall apart', author: 'Chinue Achebe', thumbnail: '' },
    { id: '2', title: 'Things fall apart', author: 'Chinue Achebe', thumbnail: '' },
    { id: '3', title: 'Things fall apart', author: 'Chinue Achebe', thumbnail: '' },
    { id: '4', title: 'Things fall apart', author: 'Chinue Achebe', thumbnail: '' },
    { id: '5', title: 'Things fall apart', author: 'Chinue Achebe', thumbnail: '' },
    { id: '6', title: 'Things fall apart', author: 'Chinue Achebe', thumbnail: '' },
    { id: '7', title: 'Things fall apart', author: 'Chinue Achebe', thumbnail: '' },
    { id: '8', title: 'Things fall apart', author: 'Chinue Achebe', thumbnail: '' },
  ]

  return (
    <section className='w-full flex flex-col gap-4 mb-4'>
      <div className='flex flex-col'>
        <p>{sectionTitle}</p>
        <div className='w-full h-1 bg-gradient-to-tr from-gray-200 via-gray-400 to-gray-200'></div>
      </div>

      <div className='flex flex-wrap gap-6 items-center justify-center transition-transform'>
      {/* <div className='grid md:grid-cols-5 grid-cols-3 gap-4'> */}
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