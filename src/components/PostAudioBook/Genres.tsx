import React from 'react'
import { LiaTimesSolid } from 'react-icons/lia';
import { useAppContext } from '../../hooks';

type GenresProps = {
  audioGenre: string[];
  setAudioGenre: React.Dispatch<React.SetStateAction<string[]>>;
}
export default function Genres({ audioGenre, setAudioGenre }: GenresProps) {
  const { appInfo } = useAppContext();

  return (
    <article className="flex flex-col">
      <div className="flex flex-col">
        <span className='text-sm'>Genre</span>
        <div className={`${!audioGenre?.length ? 'text-gray-400 px-4 py-1.5': 'text-black p-1.5'} text-sm bg-white w-full flex items-center flex-wrap gap-1.5 transition-transform min-h-9 rounded-sm`}>
          {
            !audioGenre?.length
            ? <span>genres</span>
            : audioGenre.map((gen) => (
                <div key={gen}
                className="relative shadow border px-1.5 rounded py-1"
                >
                    <LiaTimesSolid
                    onClick={() => setAudioGenre((prev) => {
                      return prev.filter((pv) => pv !== gen)
                    })}
                    className='cursor-pointer absolute -right-1.5 -top-1.5 bg-slate-900 rounded-full text-cyan-50 shadow size-4 p-[1px] active:scale-[1.03]'
                  />
                  {gen}
                </div>
              ))
          }
        </div>
      </div>

      <div className="text-xs flex items-center gap-2 flex-wrap">
        {
          appInfo.genres?.filter((gen) => !audioGenre?.includes(gen)).map((genr) => (
            <button 
            key={genr}
            onClick={() => setAudioGenre((prev) => ([...prev, genr]))}
            className="p-2 hover:text-cyan-400 active:text-cyan-200 transition-colors focus:outline-none focus:ring-none border-0"
            >
              {genr}
            </button>
          ))
        }
      </div>

    </article>
  )
}