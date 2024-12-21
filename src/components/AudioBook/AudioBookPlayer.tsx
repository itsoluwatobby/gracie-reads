import { chapters } from "../../utils";
import HoverButton from "./HoverButton";
import { useState } from "react";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import Chapters from "./Chapters";
import MediaPlayer from "./MediaPlayer";
import MediaSpeed from "./MediaSpeed";

export default function AudioBookPlayer() {
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const chapterIds = chapters.map((chapter) => chapter.id);
  
  const navigateChapters = (type: ArrowDirection) => {
    let index = currentIndex;
    const chapterLength = chapters.length - 1;
    if (type === 'downward' && currentIndex >= chapterLength) index = 0;
    else if (type === 'upward' && currentIndex <= 0) index = chapterLength;
    else {
      if (type === 'upward') index -= 1;
      else index += 1;
    }
    setCurrentIndex(index);
    const chapterId = chapterIds[index];
    const audio = chapters.find((chapter) => chapter.id === chapterId);
    setCurrentChapter(audio ?? null);
  }

  return (
    <div className="flex flex-col text-sm gap-8 h-auto rounded">

      <section className="self-center flex flex-col gap-5 rounded md:w-1/2">
        <span className="self-center">{currentChapter?.name ?? '----- -------'}</span>

        <MediaSpeed />

        {/* <MediaPlayer /> */}
        <MediaPlayer
          currentChapter={currentChapter as Chapter}
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
        chapters={chapters}
        chapterIds={chapterIds}
        currentChapter={currentChapter as Chapter}
        setCurrentChapter={setCurrentChapter}
        setCurrentIndex={setCurrentIndex}
      />

    </div>
  )
}