import PaginatedListing from "../PaginatedListing";

type PaginatedNavProps = {
  loading: boolean;
  paginatedResponse: PaginatedQueryResponseType;
  setPaginatedQuery: React.Dispatch<React.SetStateAction<PaginatedQueryType>>;
  setReload: React.Dispatch<React.SetStateAction<number>>;
  setAudioBooks: (value: React.SetStateAction<AudioSchema[]>) => void
}

export default function PaginationQuery({ setPaginatedQuery, setReload, setAudioBooks, loading, paginatedResponse }: PaginatedNavProps) {

  const handlePaginatedQuery = (direction: ScrollDirection) => {
    if (loading) return;

    if (direction === 'right') {
      if (!paginatedResponse.hasNextPage) return;
      setPaginatedQuery(
        (prev) => ({ ...prev, page: paginatedResponse.nextPage, limit: paginatedResponse.limit })
      );
    } else if (direction === 'left') {
      if (!paginatedResponse.hasPrevPage) return;
      setPaginatedQuery(
        (prev) => ({ ...prev, page: paginatedResponse.prevPage, limit: paginatedResponse.limit })
      );
    }
    setAudioBooks([]);
    setReload((prev) => prev + 1);
  };

  return (
    <section
      className={`bg-gradient-to-b from-sky-50 to-white pr-4 w-full flex items-center justify-between gap-x-3 pb-6`}
    >
      <PaginatedListing 
        paginatedResponse={paginatedResponse}
        // setPaginatedQuery={setPaginatedQuery}
      />

      <div className="flex items-center gap-3">
        <Button
          name='<'
          disabled={loading}
          canShow={paginatedResponse.hasPrevPage}
          handleClick={() => handlePaginatedQuery('left')}
        />
        <Button
          name='>'
          disabled={loading}
          canShow={paginatedResponse.hasNextPage}
          handleClick={() => handlePaginatedQuery('right')}
        />
      </div>
    </section>
  );
}

type ButtonProps = {
  name: string;
  disabled: boolean;
  canShow: boolean;
  handleClick: () => void;
}
const Button = ({ name, disabled, canShow, handleClick }: ButtonProps) => {

  return (
    <button
      disabled={disabled}
      className={`focus:outline-none ring-0 w-12 p-0.5 mt-4 grid place-content-center rounded-md bg-sky-500 disabled:bg-black text-white hover:bg-sky-600 transition-all text-xl active:scale-95 ${canShow ? 'block' : 'hidden'}`}
      onClick={handleClick}
    >
      {name}
    </button>
  )
}