/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { AudioSpeeds, CacheKeys } from '../../utils'
import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function MediaSpeed() {
  const { cacheData, getCachedData } = useLocalStorage();
  const [activePlaybackRate, setActivePlaybackRate] = useState(+getCachedData<number>(CacheKeys.playbackRate) || AudioSpeeds.Normal);

  useEffect(() => {
    const audio = document.getElementById('audioRef') as HTMLAudioElement;
    audio.addEventListener('play', () => {
      audio.playbackRate = activePlaybackRate;
    })
  }, [])

  const playBackSpeed = (playbackRate = activePlaybackRate) => {
    setActivePlaybackRate(playbackRate);
    const audio = document.getElementById('audioRef') as HTMLAudioElement;
    audio.playbackRate = playbackRate;
    cacheData(CacheKeys.playbackRate, playbackRate);
  }

  return (
    <div className="flex items-center flex-wrap text-xs gap-3 p-2">
      {
        Object.entries(AudioSpeeds).map(([rate, value]) => (
          <div
            key={rate}
            onClick={() => playBackSpeed(value)}
            className='relative w-14 h-6'>
            <div className='h-full w-full rounded bg-sky-500'></div>
            <button
              className={`absolute h-full w-full shadow bg-sky-300 ${activePlaybackRate === value ? '-translate-x-[0rem] -translate-y-[0rem]' : '-translate-x-[0.1rem] -translate-y-[0.09rem]'} rounded-sm ring-none top-0 transition-transform active:-translate-x-0 active:translate-y-0`}
            >
              {rate}
            </button>
          </div>
        ))
      }
    </div>
  )
}