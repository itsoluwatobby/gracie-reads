/* eslint-disable @typescript-eslint/no-explicit-any */
import TypewriterEffect from "../TypewriterEffect";
import { CiSearch } from 'react-icons/ci';
import { FormEvent, useEffect, useState } from 'react';
import SectionedCards from "./SectionedCards";
import { appService } from "../../app/appService";
import toast from "react-hot-toast";
import PageHeader from "../PageHeader";

type HeroProps = {
  observerRef: React.LegacyRef<HTMLDivElement>
}

export default function Hero({ observerRef }: HeroProps) {
  const [search, setSearch] = useState('');

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!search) return;
  }

  useEffect(() => {
    const fetch = async () => {
      try {
        const audios = await appService.fetchAudios();
        console.log(audios);
      } catch (err: any) {
        console.log(err.message);
        toast.error('Error fetching audio books');
      }
    }
    fetch();
  }, [])

  return (
    <section
      ref={observerRef}
      className='text-base flex flex-col md:p-6 md:m-auto gap-y-8 h[87vh] w-full items-center pb-10'
      id='home'
    >
      <div className='text-xl font-medium flex flex-col gap-10 py-10 items-center w-full'>

        <PageHeader />

        <TypewriterEffect text="Enjoy your free audio books here." start="BEGIN" delay={0.4} />
      </div>

      <form onSubmit={handleSearch} className='mb-5 flex items-center mobile:flex-col gap-x-2 gap-y-3 w-full md:w-[55%]'>
        <input
          value={search}
          placeholder='what are you looking for...'
          onChange={e => setSearch(e.target.value)}
          className='flex-auto focus:border-blue focus:outline-none placeholder:text-gray-400 px-4 py-2 maxMobile:h-12 rounded-sm text-black'
        />
        <button
          type="submit"
          className='flex-none bg-[#ff0b0b] grid place-content-center text-2xl p-2 px-3 midMobile:px-5 maxMobile:w-20 maxMobile:h-12 rounded'>
          <CiSearch />
        </button>
      </form>

      <SectionedCards sectionTitle='Recent Audiobooks' />
      <SectionedCards sectionTitle='Featured Audiobooks' />

    </section>
  )
}