import { useCallback } from "react";
import { useAppContext } from "../../hooks";

type ChaptersProps = {
  chapters: Chapter[];
  chapterIds: string[];
  currentChapter: Chapter;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  setCurrentChapter: React.Dispatch<React.SetStateAction<Chapter | null>>;
}

export default function Chapters(
  {
    chapters, currentChapter, chapterIds,
    setCurrentChapter, setCurrentIndex,
  }: ChaptersProps
) {
  const { setMediaPlayer } = useAppContext()

  const scrollIntoView = useCallback((node: HTMLElement) => {
    if (node && node.id === currentChapter?.id)
      node.scrollIntoView({ behavior: 'smooth' });
  }, [currentChapter?.id]);
  
  const padNumber = (index: string) => index.padStart(2, '0');

  return (
    <div className="customScrollBar flex md:w-[80%] md:mx-auto flex-col gap-1 transition-colors h-[18rem] shadow-inner p-1 overflow-y-scroll">
      {
        chapters.map((chapter, index) => (
          <article
          key={chapter.id}
          id={chapter.id}
          ref={scrollIntoView}
          onClick={() => {
            setCurrentChapter(chapter)
            setCurrentIndex(chapterIds.indexOf(chapter.id));
            setMediaPlayer((prev) => ({ ...prev, audioSource: chapter.link }));
          }}
          className={`flex items-center justify-between text-sm ${chapter.id === currentChapter?.id ? 'bg-blue-500' : 'hover:bg-slate-600'} cursor-pointer rounded px-1.5 py-3`}
          >
            <p className="flex items-center gap-6">
              <span className="self-start">{padNumber((index + 1).toString())}.</span>
              <span>{chapter.name}</span>
            </p>
            <span>{chapter.duration}</span>
          </article>
        ))
      }
    </div>
  )
}