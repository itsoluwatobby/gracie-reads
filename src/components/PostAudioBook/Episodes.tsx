/* eslint-disable @typescript-eslint/no-explicit-any */
import { MdCancel } from "react-icons/md";
import { appService } from "../../app/appService";
import toast from "react-hot-toast";
import { useState } from 'react';

type EpisodesProps = {
  currentSession: SESSION;
  episode: Episode;
  setChapter: React.Dispatch<React.SetStateAction<Chapter | undefined>>
}

export default function Episodes(
  {
    episode, currentSession, setChapter,
  }: EpisodesProps) {
  const [isLoading, setIsLoading] = useState(false);

  const deleteEpisode = async (episodeId: string) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const result = await appService.removeEpisode(currentSession.sessionId, episodeId);
      setChapter(result.data);
    } catch (err: unknown) {
      const error = err as any;
      const message = error.response?.data?.error?.message || error?.message;
      toast.error(message);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div 
    key={episode._id}
    className='relative underline underline-offset-2'>
      <MdCancel
      title='delete episode'
      onClick={() => deleteEpisode(episode._id)}
      // onClick={() => triggerModal(true)}
      className='absolute cursor-pointer active:scale-[1.03] -top-4 -right-2 text-lg'
      />
      <span className={`${isLoading ? 'animate-pulse' : 'animate-none'}`}>episode {episode.episode}</span>
    </div>
  )
}