/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Headphones, ArrowBigUp } from 'lucide-react';
import SectionedCards from '../components/homepage/SectionedCards';
import { useAppContext, useIntersectionObserver } from '../hooks';
import { appService } from '../app/appService';
import toast from 'react-hot-toast';
import SearchResults from '../components/homepage/SearchResults';
import PaginatedNav from '../components/homepage/PaginatedNav';
import SearchBar from '../components/homepage/SearchBar';
import { initAppState, PaginatedQuery, PaginatedQueryResponse } from '../utils/initStates';
import { MetaTags } from '../layout/OGgraph';

export default function HomePage() {
  const { intersecting, observerRef } = useIntersectionObserver(
    { screenPosition: '0px', threshold: 0.9 },
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedAudios, setSearchedAudios] = useState<AudioSchema[]>([]);
  const [retries, setRetries] = useState(0);
  const [retries1, setRetries1] = useState(0);
  const { isServerOnline, current, appInfo } = useAppContext() as AppContextProps
  const [paginatedQuery, setPaginatedQuery] = useState<PaginatedQueryType>(PaginatedQuery);
  const [paginatedResponse, setPaginatedResponse] = useState<PaginatedQueryResponseType>(PaginatedQueryResponse);
  const [appState, setappState] = useState<AppState>(initAppState);
  const [appState1, setappState1] = useState<AppState>(initAppState);
  const [reload, setReload] = useState<number>(0)
  const [audios, setAudios] = useState<AudioTypes>({ recent: [], featured: [] });
  const [hostname, setHostname] = useState('');

  useEffect(() => {
    setHostname(window?.location?.href || 'https://lovelyaudios.com');
    if (!isServerOnline) return;
    (async () => {
      if (audios?.featured?.length) return;

      setappState(prev => ({...prev, loading: true }));
      if (retries >= 10) return;
      try {
        const audioData = await appService.fetchAudios(paginatedQuery);
        const { docs, ...queryParams } = audioData.data;
        const sortedAudios =  docs?.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        
        setAudios((prev) => ({ ...prev, featured: sortedAudios }));
        setPaginatedResponse(queryParams)
        setRetries(0);
        setReload(0);
      } catch (err: unknown) {
        setRetries((prev) => prev + 1);
        const error = err as any;
        const message = error.response?.data?.error?.message || error?.message;
        setappState((prev) => ({ ...prev, error: true, errMsg: message }));
        toast.error(message);
      } finally {
        setappState((prev) => ({ ...prev, loading: false }));
      }
    })()
  }, [retries, reload, isServerOnline, audios?.featured])
  
  useEffect(() => {
    if (!isServerOnline) return;
    (async () => {
      if (audios?.recent?.length) return;

      setappState1(prev => ({...prev, loading: true }));
      if (retries1 >= 3) return;
      try {
        const recendtAudiosData = await appService.fetchRecommendedAudios();
        const sortedRecentAudios =  recendtAudiosData?.data?.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

        setAudios((prev) => ({ ...prev, recent: sortedRecentAudios }));
        setRetries1(0);
        setReload(0);
      } catch (err: unknown) {
        setRetries1((prev) => prev + 1);
        const error = err as any;
        const message = error.response?.data?.error?.message || error?.message;
        setappState1((prev) => ({ ...prev, error: true, errMsg: message }));
        toast.error(message);
      } finally {
        setappState1((prev) => ({ ...prev, loading: false }));
      }
    })()
  }, [retries1, reload, isServerOnline, audios?.recent])
  
  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const filtered = audios?.featured?.filter((audio) => {
        return (
          audio.title.toLowerCase()?.includes(query)
          || audio.author?.includes(query)
          || audio.genre?.includes(current.currentGenre as Name)
        );
      });
      setSearchedAudios(filtered);
    }
  }, [current.currentGenre, searchQuery])

  return (
    <div className="bg-gradient-to-b from-sky-50 to-white">
      
      <MetaTags 
        appName={appInfo?.name || 'Lovely Audios'}
        title={appInfo?.name || 'Lovely Audios'}
        description="Your Journey Through Stories Begins Here"
        url={hostname}
        image='/files/lovely-audio.png'
      />

      <header 
      ref={observerRef}
      id='home'
      className="bg-sky-100 py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="max-w-2xl">
              <h2 className="text-5xl font-bold text-gray-800 mb-6">
                Your Journey Through Stories Begins Here
              </h2>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Discover thousands of audiobooks narrated by world-class performers.
                Listen anywhere, anytime.
              </p>

              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

              {
                searchQuery
                  ? <SearchResults
                      searchQuery={searchQuery}
                      searchedAudios={searchedAudios}
                    />
                  : null
              }

              <a
              href='#featured'
              className={`${searchQuery ? 'hidden' : ''} bg-sky-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-sky-700 transition-colors`}>
                Start Listening Now
              </a>
            </div>
            <div className="hidden lg:block">
              <Headphones size={300} className="text-sky-200" />
            </div>
          </div>
        </div>
      </header>

      <SectionedCards sectionTitle='recent'
        appState={appState1}
        audios={audios.recent}
        setReload={setReload!}
      />
  
      <SectionedCards sectionTitle='featured'
      appState={appState}
      audios={audios.featured}
      setReload={setReload!}
      />

      <PaginatedNav
        loading={appState.loading || appState1.loading}
        setPaginatedQuery={setPaginatedQuery}
        paginatedResponse={paginatedResponse}
        setAudios={setAudios}
        setReload={setReload}
      />

      <a href="#home"
        className={`${!intersecting.isIntersecting ? 'fixed' : 'hidden'} bottom-10 right-5 shadow-md border-gray-600 focus:outline-none border-2 animate-pulse rounded-full w-8 h-8 grid place-content-center hover:bg-black hover:text-white transition-colors`}>
        <ArrowBigUp className='text-black' />
      </a>

    </div>
  );
}