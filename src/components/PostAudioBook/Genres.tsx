/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { LiaTimesSolid } from 'react-icons/lia';
import { useAppContext } from '../../hooks';
import { SingleGenre } from './SingleGenre';
import Input from './Input';
import toast from 'react-hot-toast';
import { appService } from '../../app/appService';

type GenresProps = {
  audioGenre: string[];
  setAudioGenre: React.Dispatch<React.SetStateAction<string[]>>;
}
export default function Genres({ audioGenre, setAudioGenre }: GenresProps) {
  const { appInfo, setAppInfo } = useAppContext();
  const [newGenre, setNewGenre] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [addGenre, setAddGenre] = useState(false);

  const addOrRemoveGenre = async (type: ToggleGenreButton) => {
    if (isLoading || !newGenre) return;

    const copy = appInfo.genres!;
    try {
      setIsLoading(true);
      let genres = appInfo.genres!;

      if (type === 'add') {
        const duplicateGenre = appInfo?.genres?.find((gen) => gen.toLowerCase() === newGenre?.toLowerCase());
        if (!duplicateGenre) {
          genres.push(newGenre);
        }
      } else {
        genres = (appInfo.genres!).filter((gen) => gen.toLowerCase() !== newGenre?.toLowerCase());
      }

      await appService.updateAppConfig({ genres });
      setNewGenre('');
      setAppInfo((prev) => ({ ...prev, genres }));
      toast.success(`Genre ${type === 'add' ? 'added' : 'removed'}!`);
    } catch (err: unknown) {
      const error = err as any;
      setAppInfo((prev) => ({ ...prev, genres: copy }));
      const message = error.response?.data?.error?.message || error?.message;
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article className="flex flex-col">
      <div className="flex flex-col">
        <span className='text-sm text-black'>Genre</span>
        <div className={`relative border border-gray-600 rounded-md ${!audioGenre?.length ? 'text-gray-500 px-4 py-1.5' : 'text-black p-1.5 border-blue-500'} text-sm bg-white w-full flex items-center flex-wrap gap-1.5 transition-transform min-h-9 pr-4`}>
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

          <button
            title={!addGenre ? 'Add New Genre' : 'Close'}
            type='button'
            onClick={() => setAddGenre(prev => !prev)}
            className='absolute top-[1px] right-0.5 p-1.5 text-white bg-blue-500 rounded-sm hover:text-cyan-400 active:text-cyan-200 transition-colors focus:outline-none focus:ring-none border-0'
          >
            {!addGenre ? '+' : 'x'}
          </button>
        </div>
      </div>
      {
        addGenre ?
          <Input
            name='genre'
            value={newGenre}
            disabled={isLoading}
            handleChange={(e) => setNewGenre(e.target.value)}
            handelSubmit={addOrRemoveGenre}
            ignoreLabel={true}
            classnames='mt-0.5 text-[11px] p-1 px-2 w-56'
          /> : null
      }

      <div className="text-xs flex items-center mt-1 gap-2 flex-wrap">
        {
          appInfo.genres?.filter((gen) => !audioGenre?.includes(gen)).map((genr) => (
            <SingleGenre
              key={genr}
              handleSubmit={addOrRemoveGenre}
              setNewGenre={setNewGenre}
              genr={genr} setAudioGenre={setAudioGenre}
            />
          ))
        }
      </div>

    </article>
  )
}
