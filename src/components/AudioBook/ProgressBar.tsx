import { useEffect, useState, ChangeEvent } from "react"

type ProgressBarProps = {
  audioRef: React.RefObject<HTMLAudioElement>
}
export default function ProgressBar({ audioRef }: ProgressBarProps) {
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [mediaProgress, setMediaProgress] = useState(0);

  useEffect(() => {
    const audio = document.getElementById('audioRef') as HTMLAudioElement;
    const handleTimeUpdate = () => {
      // audioRef.current?.addEventListener('load', () => {
      if (audioRef?.current) {
        const currentTimeInSeconds = audioRef.current.currentTime;
        const length = audioRef.current.duration;
        const progress = audioRef.current.duration ? (currentTimeInSeconds / audioRef.current.duration) * 100 : 0;
        setMediaProgress(progress);
        setCurrentTime(currentTimeInSeconds);
        setDuration(length);
      };
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    }
  }, [audioRef]);

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <div className="relative duration-300 transition-transform h-[8px] w-full bg-sky-200 rounded-md">
      <div
        style={{ width: `${mediaProgress}%` }}
        className={`absolute left-0 bg-sky-600 transition-all duration-100 h-full rounded-md`} />
      <input
        type="range"
        min={0}
        max={duration}
        value={currentTime}
        onChange={handleSeek}
        className="absolute hover:bg-sky-40 inset-0 w-full h-full opacity-0 cursor-pointer"
      />
    </div>
  )
}