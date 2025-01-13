import BookCard from '../BookCard'

type SectionedCardsProps = {
  sectionTitle: string;
  audios: AudioSchema[];
}

export default function SectionedCards({ sectionTitle, audios }: SectionedCardsProps) {

  return (
    <section className='w-full flex flex-col gap-4 mb-4'>
      <div className='flex flex-col'>
        <p>{sectionTitle}</p>
        <div className='w-full h-1 bg-gradient-to-tr from-gray-200 via-gray-400 to-gray-200'></div>
      </div>

      <div className='flex flex-wrap gap-6 items-center justify-center transition-transform'>
      {/* <div className='grid md:grid-cols-5 grid-cols-3 gap-4'> */}
        {
          audios?.map((book) => (
            <BookCard 
              key={book._id}
              bookId={book._id!}
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