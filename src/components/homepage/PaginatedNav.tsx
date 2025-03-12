
type PaginatedNavProps = {
  loading: boolean;
  paginatedResponse: PaginatedQueryResponseType;
  setPaginatedQuery: React.Dispatch<React.SetStateAction<PaginatedQueryType>>;
  setReload: React.Dispatch<React.SetStateAction<number>>;
  setAudios: (value: React.SetStateAction<AudioTypes>) => void
}

export default function PaginatedNav({ setPaginatedQuery, setReload, setAudios, loading, paginatedResponse }: PaginatedNavProps) {

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
      setAudios((prev) => ({ ...prev, featured: []}));
      setReload((prev) => prev + 1);
    };
  

  return (
    <section
    className={`bg-gradient-to-b from-sky-50 to-white pr-4 w-full flex items-center justify-end gap-x-3 pb-6`}
    >
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
    className={`focus:outline-none ring-0 w-12 p-2 grid place-content-center rounded-md bg-sky-500 disabled:bg-black text-white hover:bg-sky-600 transition-all text-2xl active:scale-95 ${canShow ? 'visible' : 'invisible'}`}
    onClick={handleClick}
    >
    {name}
    </button>
  )
}