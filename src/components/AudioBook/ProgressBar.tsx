// import { useEffect, useState } from "react"

type ProgressBarProps = {
  mediaProgress: string;
}
export default function ProgressBar({ mediaProgress }: ProgressBarProps) {
  // const [progress, setProgress] = useState('w-[0%]');

  // useEffect(() => {
  //   const audio = document.getElementById('audioRef') as HTMLAudioElement;
  //   const handleTimeUpdate = () => {
  //     const currentTimeInSeconds = audio.currentTime;
  //     const progress = ((currentTimeInSeconds / audio.duration) * 100).toFixed(0);
  //     setProgress(`w-[${progress}%]`);
  //   };

  //   audio.addEventListener('timeupdate', handleTimeUpdate);

  //   return () => {
  //     audio.removeEventListener('timeupdate', handleTimeUpdate);
  //   }
  // }, [])

  return (
    <div className="relativ transition-transform h-[6px] w-full bg-slate-500 rounded-md">
      <div className={`absolut h-[6px] ${mediaProgress} bg-slate-800 rounded-md`}></div>
    </div>
  )
}