import React, { useCallback } from "react";
import { useAppContext } from "../../hooks";
import { helper } from "../../utils";
import ChapterLoading from "../ChapterLoading";
// import { STREAM_URI } from "../../app/app.config";

type ChaptersProps = {
  episodes: Episode[];
  chapterIds: number[];
  episode: Episode;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setEpisode: React.Dispatch<React.SetStateAction<Episode | null>>;
  loading: boolean;
}

export default function Chapters(
  {
    episodes, episode, chapterIds,
    setEpisode, setCurrentIndex, loading,
  }: ChaptersProps
) {
  const { setMediaPlayer } = useAppContext() as AppContextProps

  const scrollIntoView = useCallback((node: HTMLElement) => {
    if (node && node.id === episode?._id)
      node.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [episode?._id]);
  
  const padNumber = (index: string) => index.padStart(2, '0');

  return (
    <div className="customScrollBar flex md:w-[80%] md:mx-auto flex-col gap-1 transition-colors rounded max-h-[18rem] shadow-inner p-1 overflow-y-scroll">
     {
      loading ? 
        <ChapterLoading />
      :
      <>
        {
          episodes?.length ?
          episodes?.map((chapter, index) => (
            <article
            key={chapter._id}
            id={chapter._id}
            ref={scrollIntoView}
            onClick={() => {
              setEpisode(chapter)
              setCurrentIndex(chapterIds.indexOf(chapter.episode));
              setMediaPlayer((prev) => ({ ...prev, audioSource: chapter.link }));
              // setMediaPlayer((prev) => ({ ...prev, audioSource: `${STREAM_URI}/${chapter.link}` }));
            }}
            className={`flex items-center justify-between text-sm ${chapter._id === episode?._id ? 'bg-sky-100' : 'hover:bg-sky-200'} cursor-pointer rounded-sm px-1.5 py-3 last:border-b-0 border-b border-b-gray-300`}
            >
              <p className="flex items-center gap-6">
                <span className="self-start">{padNumber((index + 1).toString())}.</span>
                <span>{helper.reduceTextLength(chapter.filename, 20)}</span>
              </p>
              <span className="text-[13px] text-gray-700 hidden">{chapter.duration}</span>
            </article>
          ))
          : <span className="whitespace-nowrap text-xl text-center text-red-500 mt-4">No chapters found</span>
        }
      </>
      }
    </div>
  )
}