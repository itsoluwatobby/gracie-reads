import React, { useEffect, useState } from 'react'

type PaginatedListingProps = {
  paginatedResponse: PaginatedQueryResponseType;
  // setPaginatedQuery: React.Dispatch<React.SetStateAction<PaginatedQueryType>>;
}

const MinTotal = 6;
export default function PaginatedListing({ paginatedResponse }: PaginatedListingProps) {
  const [totalPages, setTotalPages] = useState(0);
  // const [pageStart, setPageStart] = useState(0);
  // const [currentPage, setCurrentPage] = useState(1);
  const [greaterThanMin, setGreaterThanMin] = useState(false);

  useEffect(() => {
    setTotalPages(paginatedResponse.totalPages);
    setGreaterThanMin(paginatedResponse.totalPages > MinTotal);
  }, [paginatedResponse.totalPages])
  // useEffect(() => {
  //   const total = [...Array(totalPages).keys()];
  //   if ([...Array(currentPage).keys()].length === MinTotal) {
  //     setPageStart((prev) => prev + MinTotal + 1);
  //   }

  //   if (total.length > MinTotal && currentPage === 1) {
  //     setTotalPages(total.slice(pageStart, MinTotal).length);
  //     setGreaterThanMin(true);
  //   } else if (pageStart > MinTotal) {
  //     setTotalPages(total.slice(pageStart, MinTotal + pageStart).length);
  //     setGreaterThanMin(true);
  //   }
  // }, [totalPages, paginatedResponse.page, pageStart, currentPage])

  // console.log(greaterThanMin);
  // console.log({currentPage})
  
  // console.log({totalPages})

  // const changePage = (page: number) => {
  //   setCurrentPage(page);
  //   setPaginatedQuery(
  //     (prev) => ({ ...prev, page, limit: paginatedResponse.limit })
  //   );
  // }

  return (
    <div className={`flex items-center gap-1 text-[13px] mt-4 pl-4`}>
      {
        [...Array(totalPages).keys()].map((page) => (
          <button key={page}
            type='button'
            // onClick={() => changePage(page + 1)}
            // className={`${currentPage === (page + 1) ? 'text-black' : 'text-gray-600'} rounded-full hover:bg-sky-200 size-5 text-center cursor-pointer`}
            className={`${paginatedResponse.page === (page + 1) ? 'text-black' : 'text-gray-600'} rounded-full hover:bg-sky-200 size-5 text-center cursor-pointer`}
          >
            {page + 1}
          </button>
        ))
      }
      <span className='text-gray-700 -ml-2'>{greaterThanMin ? '. . .' : ''}</span>
    </div>
  )
}
