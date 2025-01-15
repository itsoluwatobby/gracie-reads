/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, FormEvent, useState } from "react";
import { Genres, Input, PageHeader } from "../components";
import { InitAudioBookState } from "../utils/initStates";
// import { nanoid } from "nanoid";
import { AiOutlinePicture } from "react-icons/ai";
import { Colors } from "../utils/colors";
import { CacheKeys } from "../utils/constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { appService } from "../app/appService";
import { useLocalStorage } from '../hooks/useLocalStorage';
import ChapterUploader from "../components/PostAudioBook/ChapterUploader";
import { helper } from "../utils";

export default function PostAudioBook() {
  const [file, setFile] = useState<File | null>(null);
  const [audiobook, setAudiobook] = useState<AudioSchema>(InitAudioBookState);
  // const [uploadChapters, setUploadChapters] = useState(false);
  const [audioGenre, setAudioGenre] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { clearCache } = useLocalStorage()
  
  // create session whenever page is visited

  const {
    author, title, note,
    // reference, chapters,
  } = audiobook;

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const [name, value] = [e.target.name, e.target.value];
    setAudiobook((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile((e.target.files as FileList)[0]);
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('chapterId', audiobook.chapterId);
    formData.append('title', title);
    formData.append('author', audiobook.author);
    formData.append('about', audiobook.about ?? '');
    formData.append('genre', helper.stringifyData(audioGenre));
    formData.append('author', author);
    formData.append('note', note ?? '');
    formData.append('thumbnail', file!);
    formData.append('reference', helper.stringifyData(audiobook?.reference ?? {}));

    (async () => {
      try {
        if (isLoading) return;
    
        setIsLoading(true);
        const audio = await appService.createAudio(formData);
        console.log(audio);
        
        setAudiobook(InitAudioBookState);
        clearCache(CacheKeys.session);
        setAudioGenre([]);
        toast.success('Audio book uploaded');
        navigate('/');
      } catch (err: unknown) {
        const error = err as any;
        const message = error.response?.data?.error?.message || error?.message;
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    })()
  };

  return (
    <div className="h-auto w-full md:mx-auto md:w-1/2 flex flex-col px-10 maxMobile:px-5 py-8 gap-8">
      <PageHeader />

      <form onSubmit={submitForm} className="flex flex-col w-full h-full gap-4">

        <input
          type="file"
          name='thumbnail'
          id='thumbnail-file-upload'
          accept="image/*"
          hidden
          disabled={isLoading}
          onChange={handleFileChange}
        />

        <label htmlFor="thumbnail-file-upload"
        className='bg-gray-700 grid place-content-center text-3xl rounded-md w-28 h-28'>
          {
            file ?
              <img src={URL.createObjectURL(file)} alt="thumbnail" loading="eager"
                className='w-32 rounded-md h-32 object-cover'
              />
              : <AiOutlinePicture />
          }
        </label>

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

        <ChapterUploader setAudiobook={setAudiobook} />

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
            type='button'
            disabled={![].length || isLoading}
            className={`z-10 w-full h-full rounded-md absolute top-0 grid place-content-center -translate-x-0.5 -translate-y-0.5 transition-transform active:-translate-x-0 active:translate-y-0 ${Colors.navy} border border-cyan-300`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
