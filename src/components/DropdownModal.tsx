import { useState } from 'react';

type DropdownModalProps = {
  appInfo: Partial<AppConfig>;
  current: CurrentModal;
  setCurrent: React.Dispatch<React.SetStateAction<CurrentModal>>;
}
export default function DropdownModal({ appInfo, current, setCurrent }: DropdownModalProps) {

  const ModalType = {
    categories: 'left-20',
    latest: 'left-44'
  };

  return (
    <section className={`${current?.nav ? 'absolute' : 'hidden'} top-7 ${ModalType[current?.nav]} rounded flex flex-col text-black p-3 capitalize gap-2 text-[13px] bg-white max-h-40 w-32 transition-transform`}>
      {
        appInfo?.genres?.map((genre) => (
          <span
            key={genre}
            onClick={() => setCurrent((prev) => ({ ...prev, currentGenre: genre }))}
            className={`cursor-pointer hover:underline underline-offset-2 hover:text-gray-800 transition-transform ${current?.currentGenre === genre ? 'font-semibold' : ''}`}
          >
            {genre}
          </span>
        ))
      }
    </section>
  )
}