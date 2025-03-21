/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../hooks";
import { CgPlayButton, CgPlayPause } from "react-icons/cg";
import { IoReload } from "react-icons/io5";
// import { STREAM_URI } from "../../app/app.config";
import toast from "react-hot-toast";
import ProgressBar from "./ProgressBar";

type MediaPlayerProps = {
  episode: Episode;
}

export default function MediaPlayer({ episode }: MediaPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [countUpTime, setCountUpTime] = useState('00:00');
  const [mediaLength, setMediaLength] = useState('00:00');
  const { mediaPlayer, setMediaPlayer, deactivatePlayer } = useAppContext() as AppContextProps
  const { startPlayer, audioSource } = mediaPlayer;

  const handleTimeUpdate = () => {
    if (audioRef.current && audioSource && startPlayer) {
      const currentTimeInSeconds = audioRef.current.currentTime;
      const minutes = Math.floor(currentTimeInSeconds / 60);
      const seconds = Math.floor(currentTimeInSeconds % 60);
      setCountUpTime(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
    }
  };

  useEffect(() => {
    if (audioRef.current?.src?.includes('stream')) {
      audioRef.current?.addEventListener('error', (e) => {
        // console.log(e)
        toast.error(`Error loading chapter: ${e.message}`);
      });
    }

    const canPlay = () => {
      audioRef.current?.play();
      setMediaPlayer((prev) => (
        { ...prev, audioPaused: false, startPlayer: true }
      ));
    }
    audioRef.current?.addEventListener('canplay', canPlay);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', deactivatePlayer);
        audioRef.current.removeEventListener('canplay', canPlay);
        audioRef.current?.removeEventListener('error', () => {
          // console.log(e.error)
          toast.error('Error loading chapter');
        });
      }
    };
  }, []);

  const restartAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }

  useEffect(() => {
    if (!startPlayer || !audioSource || !audioRef.current) return;
    const handleMetadataLoaded = () => {
      if (audioRef?.current) {
        const durationInSeconds = audioRef.current.duration;
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = Math.floor(durationInSeconds % 60);
        const formattedDuration = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        setMediaLength(formattedDuration ?? '00:00');
      }
    };
    audioRef.current.addEventListener('canplaythrough', handleMetadataLoaded);
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('loadedmetadata', handleMetadataLoaded);
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, [audioSource, startPlayer, audioRef, setMediaPlayer]);

  const audioTrigger = (play: boolean) => {
    if (!audioRef.current || !audioSource || !episode.filename) return;
    if (play && episode.filename && !audioSource) {
      const link = episode.link;
      audioRef.current.src = link;
      setMediaPlayer(prev => ({ ...prev, audioSource: link }))
    }
    if (!play) {
      audioRef.current.pause();
      setMediaPlayer((prev) => (
        { ...prev, audioPaused: true, startPlayer: false }
      ));
    }
    else {
      if (episode?.filename) {
        audioRef.current.play();
        setMediaPlayer((prev) => (
          { ...prev, audioPaused: false, startPlayer: true }
        ));
      }
    }
  }

  return (
    <div className='flex flex-col items-center gap-3 rounded p-3 text-2xl shadow bg-gradient-to-r from-sky-100 to-white'>

      {/* media stream */}
      <ProgressBar audioRef={audioRef} />

      <div className="px-2 flex items-center justify-between w-full">

        <div className="flex items-center gap-3">
          <IoReload
            title="Restart"
            onClick={restartAudio}
            className="text-xl text-black cursor-pointer active:rotate-[180deg] transition-transform"
          />
          <div
            className='relative w-8 h-5'>
            <div className='h-full w-full rounded bg-sky-500'></div>
            <button
              className={`absolute h-full w-full shadow bg-sky-300 rounded ring-none top-0 transition-transform ${startPlayer ? 'active:-translate-x-0 active:translate-y-0' : '-translate-x-[0.1rem] -translate-y-[0.09rem]'} focus:outline-none focus:border-none grid place-content-center text-3xl`}
            >
              {
                !startPlayer
                  ?
                  <CgPlayButton onClick={() => audioTrigger(true)} />
                  : <CgPlayPause onClick={() => audioTrigger(false)} />
              }
            </button>
          </div>
          <audio
            ref={audioRef}
            hidden
            id='audioRef'
            src={audioSource}
            className='transition-transform rounded-3xl w-full h-full'
          />
        </div>

        <span className="text-black text-[11px] font-medium">
          {countUpTime} / {mediaLength}
        </span>
      </div>
    </div>
  )
}