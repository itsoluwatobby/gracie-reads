import TypewriterEffect from "../TypewriterEffect";
import { CiSearch } from 'react-icons/ci';
import { useState } from 'react';
import AudioBooks from "./Audiobooks";

type HeroProps = {
  appName: string;
  observerRef: React.LegacyRef<HTMLDivElement>
}

export default function Hero(
  {
    appName, observerRef,
  }: HeroProps
) {
  const [search, setSearch] = useState('');

  return (
    <section
      ref={observerRef}
      className='text-base flex flex-col md:p-6 md:m-auto gap-y-8 h-[87vh] w-full items-center'
      id='home'
    >
      <div className='text-xl font-medium flex flex-col gap-6 py-10 items-center'>
        <p className="fluid-text transition-transform text-blue-50 tracking-wide font-bold mobile:text-3xl">{appName}.</p>

        <TypewriterEffect text="Enjoy your free audio books here." start="BEGIN" delay={0.4} />
      </div>

      <div className='flex items-center midMobile:flex-col gap-x-2 gap-y-3 w-full'>
        <input
          value={search}
          placeholder='what are you looking for...'
          onChange={e => setSearch(e.target.value)}
          className='flex-auto focus:border-blue focus:outline-none placeholder:text-gray-400 px-4 py-2 rounded-sm text-black'
        />
        <button className='flex-none bg-[#ff0b0b] grid place-content-center text-2xl p-2 px-3 rounded'>
          <CiSearch />
        </button>
      </div>

      <AudioBooks />

    </section>
  )
}