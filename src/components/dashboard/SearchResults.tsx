import React from 'react'
import { Link } from 'react-router-dom';

type SearchResultsProps = {
  searchQuery: string;
  searchedAudios: AudioSchema[];
}

export default function SearchResults({ searchQuery, searchedAudios }: SearchResultsProps) {

  return (
    <section className='bg-white -mt-8 text-black border border-sky-200 rounded-md p-2 w-full'>
      <div className='flex flex-col gap-1 p-1 w-full'>
        {
          searchedAudios?.length ?
          searchedAudios.map((audio) => (
            <Link
            to={`/${audio._id}`}
            key={audio._id}
            className='p-2 hover:bg-gray-100 transition-colors w-full last:border-b-0 border-b'
            >
              {audio.title}
            </Link>
          ))
          : <p className='text-gray-800'>Audiobook with title <span className='text-black font-medium whitespace-pre-wrap'>{searchQuery.toUpperCase()}</span> not found</p>
        }
      </div>
    </section>
  )
}