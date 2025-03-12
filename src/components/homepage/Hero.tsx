// /* eslint-disable @typescript-eslint/no-explicit-any */
//  import TypewriterEffect from "../TypewriterEffect";
// import { CiSearch } from 'react-icons/ci';
// import { FormEvent, useEffect, useState } from 'react';
// import SectionedCards from "./SectionedCards";
// import SearchResults from "./SearchResults";
// import { appService } from "../../app/appService";
// import PageHeader from "../PageHeader";
// import { RecentDuration } from "../../utils";
// import toast from "react-hot-toast";
// import { useAppContext } from "../../hooks";

// type HeroProps = {
//   observerRef: React.LegacyRef<HTMLDivElement>;
// }

// type AudioTypes = {
//   recent: AudioSchema[];
//   featured: AudioSchema[];
// }
// export default function Hero({ observerRef }: HeroProps) {
//   const [search, setSearch] = useState('');
//   const [searchedAudios, setSearchedAudios] = useState<AudioSchema[]>([]);
//   const [retries, setRetries] = useState(0);
//   const { isServerOnline, current } = useAppContext();
//   const [appState, setappState] = useState<AppState>(
//     {
//       loading: false, error: false, errMsg: ''
//     }
//   );
//   const [audios, setAudios] = useState<AudioTypes>(
//     { recent: [], featured: [] }
//   );

//   const handleSearch = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     if (!search) return;
//   }

//   useEffect(() => {
//     if (!isServerOnline) return;
//     (async () => {
//       setappState(prev => ({...prev, error: false, loading: true }));
//       if (retries >= 5) return;
//       try {
//         const audioData = await appService.fetchAudios();
//         const data = audioData.data.docs;
//         const sortedAudios =  data?.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  
//         const recent = sortedAudios.filter((audio) => new Date(audio.createdAt).getTime() >= RecentDuration);
//         setAudios({ recent, featured: sortedAudios });
//         setappState({ error: false, errMsg: '', loading: false });
//         setRetries(0)
//       } catch (err: unknown) {
//         setRetries((prev) => prev + 1);
//         const error = err as any;
//         const message = error.response?.data?.error?.message || error?.message;
//         setappState({ error: true, loading: false, errMsg: message });
//         toast.error(message);
//       }
//     })()
//   }, [retries, isServerOnline])
  
//   useEffect(() => {
//     if (!current?.currentGenre || !search) return;
//     let filtered: AudioSchema[]
//     if (search) {
//       filtered = audios?.featured?.filter((audio) => audio.title?.includes(search));
//     } else {
//       filtered = audios?.featured?.filter((audio) => audio.genre?.includes(current.currentGenre as Name));
//     }
//     setSearchedAudios(filtered);
//   }, [current.currentGenre, search])

//   return (
//     <section
//       ref={observerRef}
//       className='text-base flex flex-col md:p-6 md:m-auto gap-y-8 h[87vh] w-full items-center pb-10'
//       id='home'
//     >
//       <div className='text-xl font-medium flex flex-col gap-10 py-10 items-center w-full'>

//         <PageHeader prefix='Welcome To' />

//         <TypewriterEffect text="Enjoy your free audio books here." start="BEGIN" delay={0.4} />
//       </div>

//       <form onSubmit={handleSearch} className='mb-5 flex items-center mobile:flex-col gap-x-2 gap-y-3 w-full md:w-[55%]'>
//         <input
//           value={search}
//           placeholder='what are you looking for...'
//           onChange={e => setSearch(e.target.value)}
//           className='flex-auto focus:border-blue focus:outline-none placeholder:text-gray-400 px-4 text-sm py-2 maxMobile:h-12 rounded-sm text-black w-full'
//         />
//         <button
//           type="submit"
//           className='flex-none bg-[#ff0b0b] grid place-content-center text-2xl p-2 h-9 px-3 midMobile:px-5 maxMobile:w-20 maxMobile:h-12 rounded'>
//           <CiSearch />
//         </button>
//       </form>

//       {search ? <SearchResults searchedAudios={searchedAudios} /> : null}

//       <SectionedCards sectionTitle='Recent Audiobooks'
//         appState={appState}
//         audios={audios.recent}
//       />
//       <SectionedCards sectionTitle='Featured Audiobooks'
//       appState={appState}
//       audios={audios.featured}
//       />

//     </section>
//   )
// }
