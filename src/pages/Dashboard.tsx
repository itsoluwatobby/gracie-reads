/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Headphones, ArrowBigUp } from 'lucide-react';
import SectionedCards from '../components/dashboard/SectionedCards';
import { useAppContext, useIntersectionObserver } from '../hooks';
import { appService } from '../app/appService';
import toast from 'react-hot-toast';
import SearchResults from '../components/dashboard/SearchResults';
import SearchBar from '../components/dashboard/SearchBar';
import { RecentDuration } from '../utils';

type AudioTypes = {
  recent: AudioSchema[];
  featured: AudioSchema[];
}

export default function Dashboard() {
  const { intersecting, observerRef } = useIntersectionObserver(
    { screenPosition: '0px', threshold: 0.9 },
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedAudios, setSearchedAudios] = useState<AudioSchema[]>([]);
  const [retries, setRetries] = useState(0);
  const { isServerOnline, current } = useAppContext();
  const [appState, setappState] = useState<AppState>(
    {
      loading: false, error: false, errMsg: ''
    }
  );
  const [audios, setAudios] = useState<AudioTypes>(
    { recent: [], featured: [] }
  );

  useEffect(() => {
    if (!isServerOnline) return;
    (async () => {
      setappState(prev => ({...prev, error: false, loading: true }));
      if (retries >= 5) return;
      try {
        await appService.logout();
        const audioData = await appService.fetchAudios();
        const data = audioData.data.docs;
        const sortedAudios =  data?.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  
        const currentTime = new Date().getTime();
        // Calculate the threshold timestamp (5 days ago from now)
        const thresholdTime = currentTime - RecentDuration;

        const recent = sortedAudios.filter((audio) => new Date(audio.createdAt).getTime() >= thresholdTime);
        setAudios({ recent, featured: sortedAudios }); 
        setappState({ error: false, errMsg: '', loading: false });
        setRetries(0);
      } catch (err: unknown) {
        setRetries((prev) => prev + 1);
        const error = err as any;
        const message = error.response?.data?.error?.message || error?.message;
        setappState({ error: true, loading: false, errMsg: message });
        toast.error(message);
      }
    })()
  }, [retries, isServerOnline])
  
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current.currentGenre, searchQuery])

  return (
    <div className="bg-gradient-to-b from-sky-50 to-white">
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
        appState={appState}
        audios={audios.recent}
      />
  
      <SectionedCards sectionTitle='featured'
      appState={appState}
      audios={audios.featured}
      />

      <a href="#home"
        className={`${!intersecting.isIntersecting ? 'fixed' : 'hidden'} bottom-10 right-5 shadow-md border-gray-600 focus:outline-none border-2 animate-pulse rounded-full w-8 h-8 grid place-content-center hover:bg-black hover:text-white transition-colors`}>
        <ArrowBigUp className='text-black' />
      </a>

    </div>
  );
}