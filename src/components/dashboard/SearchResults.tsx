import React from 'react'

type SearchResultsProps = {
  searchedAudios: AudioSchema[];
}

export default function SearchResults({ searchedAudios }: SearchResultsProps) {

  return (
    <section>
      {
        searchedAudios?.map((audio) => (
          <div></div>
        ))
      }
    </section>
  )
}