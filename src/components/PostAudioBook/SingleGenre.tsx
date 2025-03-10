import { useState } from 'react';
import { MdOutlineCancelPresentation } from 'react-icons/md';

type GenreProp = {
  genr: string;
  handleSubmit: (type: ToggleGenreButton) => void;
  setAudioGenre: (value: React.SetStateAction<string[]>) => void;
  setNewGenre: React.Dispatch<React.SetStateAction<string>>
}

export const SingleGenre = ({ genr, setAudioGenre, handleSubmit, setNewGenre }: GenreProp) => {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div 
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
      className='relative'
    >
      <button 
        key={genr}
        onClick={() => setAudioGenre((prev) => ([...prev, genr]))}
        className="p-1.5 bg-blue-600 rounded-sm hover:text-cyan-400 active:text-cyan-200 transition-colors focus:outline-none focus:ring-none border-0"
        >
          {genr}
      </button>
      {
        showDelete ?
          <button
            type='button'
            className='absolute text-slate-800 bg-slate-900 rounded-sm p-0.5 top-0.5 -right-1 text-lg z-10'
          >
            <MdOutlineCancelPresentation
              title='Delete genre'
              onClick={() => {
                setNewGenre(genr);
                setTimeout(() => {
                  handleSubmit('delete');
                }, 800);
              }}
              className='text-blue-400 cursor-pointer active:scale-[1.03] size-4'
              />
          </button>
          : null
      }
    </div>
  );
}