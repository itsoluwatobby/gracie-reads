import { useLayoutEffect, useState } from "react"

export default function ProgressBar() {
  const [progress, setProgress] = useState('w-[10%]');
  console.log(progress)

  // useEffect(() => {
  //   setProgress(mediaProgress)
  // }, [mediaProgress])

  useLayoutEffect(() => {
    const audio = document.getElementById('audioRef') as HTMLAudioElement;
    const handleTimeUpdate = () => {
      const currentTimeInSeconds = audio.currentTime;
      const progress = ((currentTimeInSeconds / audio.duration) * 100).toFixed(4);
      setProgress(`w-[${progress}%]`);
    };

    // audio.addEventListener('canplay', () => {
      audio.addEventListener('timeupdate', handleTimeUpdate);
    // })

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    }
  }, [])


  return (
    <div className="relative duration-300 transition-transform h-[6px] w-full bg-slate-500 rounded-md">
      <div className={`absolute h-[6px] ${progress} bg-slate-800 rounded-md`}></div>
    </div>
  )
}