import React, { useCallback } from "react";
import { useAppContext } from "../../hooks";
import { STREAM_URI } from "../../app/app.config";

type ChaptersProps = {
  episodes: Episode[];
  chapterIds: number[];
  episode: Episode;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setEpisode: React.Dispatch<React.SetStateAction<Episode | null>>;
}

export default function Chapters(
  {
    episodes, episode, chapterIds,
    setEpisode, setCurrentIndex,
  }: ChaptersProps
) {
  const { setMediaPlayer } = useAppContext()

  const scrollIntoView = useCallback((node: HTMLElement) => {
    if (node && node.id === episode?._id)
      node.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [episode?._id]);
  
  const padNumber = (index: string) => index.padStart(2, '0');

  return (
    <div className="customScrollBar flex md:w-[80%] md:mx-auto flex-col gap-1 transition-colors h-[18rem] shadow-inner p-1 overflow-y-scroll">
      {
        episodes?.map((chapter, index) => (
          <article
          key={chapter._id}
          id={chapter._id}
          ref={scrollIntoView}
          onClick={() => {
            setEpisode(chapter)
            setCurrentIndex(chapterIds.indexOf(chapter.episode));
            setMediaPlayer((prev) => ({ ...prev, audioSource: `${STREAM_URI}/${chapter.filename}` }));
          }}
          className={`flex items-center justify-between text-sm ${chapter._id === episode?._id ? 'bg-blue-500' : 'hover:bg-slate-600'} cursor-pointer rounded px-1.5 py-3 last:border-b-0 border-b border-b-gray-700`}
          >
            <p className="flex items-center gap-6">
              <span className="self-start">{padNumber((index + 1).toString())}.</span>
              <span>{chapter.filename}</span>
            </p>
            <span className="text-[13px] text-gray-200">{chapter.duration}</span>
          </article>
        ))
      }
    </div>
  )
}