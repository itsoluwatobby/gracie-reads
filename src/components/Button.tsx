import { useState } from 'react';
import { hoverEffects } from '../utils';
import { Colors } from '../utils/colors';
import { FaYoutube } from 'react-icons/fa6';

export default function Button() {
  const [hoverIndex, setHoverIndex] = useState(0);

  const modifyHoverCount = () => {
    const randomIndex = Math.floor(Math.random() * hoverEffects.length);
    setHoverIndex(randomIndex);
  }

  return (
    <div className='relative'>
      <div className='md:w-24 md:h-9 w-36 h-12 rounded-md bg-cyan-300'></div>
      <a
        href='https://youtube.com/@lovelygrl?si=pY_GvHKhCVCkn4Gp'
        target='_blank'
        download
        onMouseEnter={modifyHoverCount}
        className={`w-full h-12 md:w-24 md:h-9 rounded-md absolute top-0 transition-transform active:-translate-x-0 active:translate-y-0 font-mono text-cyan-300 cursor-pointer ${hoverEffects[hoverIndex]} ${Colors.lightNavy} border border-cyan-300 flex items-center justify-center gap-2`}
      >
        <FaYoutube className='text-red-600 text-2xl md:text-xl' />
        Channel
      </a>
    </div>
  )
}