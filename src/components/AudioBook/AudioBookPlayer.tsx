import HoverButton from "./HoverButton";
import { useEffect, useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import Chapters from "./Chapters";
import MediaPlayer from "./MediaPlayer";
import MediaSpeed from "./MediaSpeed";
import { useAppContext } from "../../hooks";
import { appService } from "../../app/appService";
import { asyncFunction, STREAM_URI } from "../../app/app.config";
import toast from "react-hot-toast";

type AudioBookPlayerProps = {
  chapterId: string;
}
export default function AudioBookPlayer({ chapterId }: AudioBookPlayerProps) {
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { deactivatePlayer, setMediaPlayer } = useAppContext()
  const [chapter, setChapter] = useState<Chapter>();
  const [episodeLength, setEpisodeLength] = useState<number>();

  useEffect(() => {
    if (!chapterId) return;
    asyncFunction(async () => {
      const chapter = await appService.getAudioChapterById(chapterId);
      setChapter(chapter.data);
      setEpisodeLength(chapter.data.chapters.length);
    });
  }, [chapterId])

  const chapterIds = chapter?.chapters.map((chapter) => chapter.episode);
  
  useEffect(() => {
    const audio = document.getElementById('audioRef') as HTMLAudioElement;
    async function playNextChapter() {
      const length = chapterIds!.length;
      const nextIndex = (chapterIds as number[]).indexOf((episode!).episode) + 1;
      if (length === nextIndex) {
        toast.success(
          'End of chapter. Thank you for listening✌️',
          { duration: 10000 },
        );
        deactivatePlayer();
      } else {
        const nextEpisode = chapter!.chapters[nextIndex]
        toast.success(`Up Next Episode ${nextEpisode.episode}`, { duration: 5000 });
        setCurrentIndex(nextIndex);
        setEpisode(nextEpisode)
        setMediaPlayer((prev) => ({ ...prev, audioSource: `${STREAM_URI}/${nextEpisode.filename}` }));
      }
    }

    audio?.addEventListener('ended', playNextChapter);

    return () => {
      audio?.removeEventListener('ended', playNextChapter);
    }
  }, [chapterIds, episode, chapter, deactivatePlayer, setMediaPlayer])
      

  const navigateChapters = (type: ArrowDirection) => {
    let index = currentIndex;
    const chapterLength = episodeLength! - 1;
    if (type === 'downward' && currentIndex >= chapterLength) index = 0;
    else if (type === 'upward' && currentIndex <= 0) index = chapterLength;
    else {
      if (type === 'upward') index -= 1;
      else index += 1;
    }
    setCurrentIndex(index);
    const chapterId = (chapterIds!)[index];
    const audio = chapter?.chapters?.find((chapter) => chapter.episode === chapterId);
    setEpisode(audio!);
  }

  return (
    <div className="flex flex-col text-sm gap-8 h-auto rounded">

      <section className="self-center flex flex-col gap-5 rounded md:w-1/2">
        <span className="self-center">{episode?.filename ?? '----- -------'}</span>

        <MediaSpeed />

        {/* <MediaPlayer /> */}
        <MediaPlayer
          episode={episode!}
        />

        <div className="self-center flex items-center gap-6">
          <HoverButton
            Button={MdOutlineKeyboardArrowLeft}
            handleCLick={navigateChapters}
            type='upward'
          />
          <HoverButton
            Button={MdOutlineKeyboardArrowRight}
            handleCLick={navigateChapters}
            type='downward'
          />
        </div>
      </section>


      <Chapters
        // slideRef={slideRef as React.LegacyRef<HTMLDivElement>}
        episodes={chapter?.chapters as Episode[]}
        chapterIds={chapterIds!}
        episode={episode!}
        setEpisode={setEpisode}
        setCurrentIndex={setCurrentIndex}
      />

    </div>
  )
}