import { AudioSpeeds } from '../../utils'

export default function MediaSpeed() {

  const playBackSpeed = (playbackRate: number) => {
    const audio = document.getElementById('audioRef') as HTMLAudioElement;
    audio.playbackRate = playbackRate;
  }

  return (
    <div className="flex items-center flex-wrap text-xs gap-3 p-2">
      {
        Object.entries(AudioSpeeds).map(([rate, value]) => (
          <div
            key={rate}
            onClick={() => playBackSpeed(value)}
            className='relative w-14 h-6'>
            <div className='h-full w-full rounded bg-cyan-300'></div>
            <button
              className="absolute h-full w-full shadow bg-slate-900 rounded ring-none top-0 -translate-x-[0.07rem] -translate-y-[0.07rem] transition-transform active:-translate-x-0 active:translate-y-0"
            >
              {rate}
            </button>
          </div>
        ))
      }
    </div>
  )
}