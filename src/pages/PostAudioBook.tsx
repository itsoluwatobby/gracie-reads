/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, FormEvent, useState } from "react";
import { Genres, Input, PageHeader } from "../components";
import { InitAudioBookState } from "../utils/initStates";
import { nanoid } from "nanoid";
import { Colors } from "../utils/colors";
import toast from "react-hot-toast";

export default function PostAudioBook() {
  const [audiobook, setAudiobook] = useState<AudioSchema>(InitAudioBookState);
  const [audioGenre, setAudioGenre] = useState<string[]>([]);

  const {
    author, thumbnail, title, note,
    // reference, chapters,
  } = audiobook;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const [name, value] = [e.target.name, e.target.value];
    setAudiobook((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const genres = audioGenre.join(',');
      const newAudio = {
        ...audiobook,
        id: nanoid(),
        genre: genres,
        views: 0,
        likes: 0,
        disLikes: 0,
        downloads: 0,
        isPublic: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      console.log(newAudio)

      setAudiobook(InitAudioBookState);
      setAudioGenre([]);
      toast.success('Audio book uploaded');
    } catch (err: any) {
      console.log(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="h-auto w-full md:mx-auto md:w-1/2 flex flex-col px-10 maxMobile:px-5 py-8 gap-12">
      <PageHeader />

      <form onSubmit={submitForm} className="flex flex-col w-full h-full gap-5">

        <div className="flex items-center gap-4 maxMobile:flex-col w-full">
          <Input
            name='title'
            value={title}
            handleChange={handleChange}
          />
          <Input
            name='author'
            value={author}
            handleChange={handleChange}
          />
        </div>

        <Genres audioGenre={audioGenre} setAudioGenre={setAudioGenre} />

        <Input
          name='thumbnail'
          value={thumbnail}
          handleChange={handleChange}
        />

        <textarea
          name="note"
          value={note}
          placeholder="preface"
          rows={4}
          onChange={handleChange}
          className="resize-none px-3 py-1 rounded text-black focus:border-none focus:outline-none focus:ring-0"
        />

        <div className={`mt-5 self-center w-32 flex items-center bg-cyan-500 rounded h-10 relative`}>
          <button
            className={`z-10 w-full h-full rounded-md absolute top-0 grid place-content-center -translate-x-0.5 -translate-y-0.5 transition-transform active:-translate-x-0 active:translate-y-0 ${Colors.navy} border border-cyan-300`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
