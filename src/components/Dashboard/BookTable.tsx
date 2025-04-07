/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import {
  initAppState,
  PaginatedQuery,
  PaginatedQueryResponse,
} from '../../utils/initStates';
import { useAppContext } from '../../hooks';
import { appService } from '../../app/appService';
import toast from 'react-hot-toast';
import LoadingBookList from './LoadingBookList';
import { MdErrorOutline } from 'react-icons/md';
import BookList from './BookList';
import PaginationQuery from './PaginationQuery';

export default function BookTable() {
  const { isServerOnline } = useAppContext() as AppContextProps
  const [paginatedQuery, setPaginatedQuery] = useState<PaginatedQueryType>(PaginatedQuery);
  const [paginatedResponse, setPaginatedResponse] = useState<PaginatedQueryResponseType>(PaginatedQueryResponse);
  const [audioBooks, setAudioBooks] = useState<AudioSchema[]>([]);
  const [appState, setAppState] = useState(initAppState);
  const [reload, setReload] = useState<number>(0);

  useEffect(() => {
    if (!isServerOnline) return;
    (async () => {
      if (audioBooks?.length && reload === 0) return;

      setAppState(prev => ({ ...prev, loading: true }));
      try {
        const audioData = await appService.fetchAudios(paginatedQuery);
        const { docs, ...queryParams } = audioData.data;
        const sortedAudios = docs?.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

        setAudioBooks([...sortedAudios]);
        setPaginatedResponse(queryParams);
        setReload(0);
      } catch (err: unknown) {
        const error = err as any;
        const message = error.response?.data?.error?.message || error?.message;
        setAppState((prev) => ({ ...prev, error: true, errMsg: message }));
        toast.error(message);
      } finally {
        setAppState((prev) => ({ ...prev, loading: false }));
      }
    })()
  }, [isServerOnline, reload, audioBooks, paginatedQuery])

  const TableHeading = ['Title', 'Views', 'Likes', 'Rating', 'Comments', 'Status', 'Date', 'Actions'];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden +">

      <h2 className="text-xl font-semibold text-gray-800 p-6">Your Audiobooks</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {
                TableHeading.map((title) => (
                  <th key={title} className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">{title}</th>
                ))
              }
            </tr>
          </thead>
          {
            appState?.loading ?
              <LoadingBookList />
            : (
                appState.error ? (
                  <tbody className='h-14 relative'>
                    <tr>
                      <td className='absolute p-5 left-[31%] right-[31%] flex items-center gap-2 bottom-0 text-red-500'>
                        {appState?.errMsg}
                        <MdErrorOutline className='text-3xl' />
                      </td>
                    </tr>
                  </tbody>
              )
              : 
              (
                audioBooks?.length ? (
                  <BookList 
                    audioBooks={audioBooks}
                    setReload={setReload}
                  />
                ) : (
                  <tbody className='h-14 relative'>
                    <tr>
                      <td className='absolute p-5 left-[31%] right-[31%] bottom-0 text-black'>
                        No Audiobooks to display
                      </td>
                    </tr>
                  </tbody>
                )
              )
            )
          }
        </table>
      </div>

      <PaginationQuery
        loading={appState.loading}
        setPaginatedQuery={setPaginatedQuery}
        paginatedResponse={paginatedResponse}
        setAudioBooks={setAudioBooks}
        setReload={setReload}
      />

    </div>
  )
}