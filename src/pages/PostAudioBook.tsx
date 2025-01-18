/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { Genres, Input, PageHeader } from "../components";
import { InitAudioBookState } from "../utils/initStates";
import { nanoid } from "nanoid";
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
  const { clearCache, cacheData, getCachedData } = useLocalStorage()
  const [file, setFile] = useState<File | null>(null);
  const [currentSession, setCurrentSession] = useState<SESSION>(getCachedData<SESSION>(CacheKeys.session));
  const [audiobook, setAudiobook] = useState<AudioSchema>(InitAudioBookState);
  const [audioGenre, setAudioGenre] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  
  // create session whenever page is visited
  const { author, title, about } = audiobook;
  // reference,

  useEffect(() => {
    if (!currentSession?.sessionId) {
      const sessionId = nanoid();
      const data = {
        sessionId,
        timestamp: new Date().toUTCString(),
        data: {} as AudioSchema,
      };
      cacheData(CacheKeys.session, data);
      setCurrentSession(data);
    } else {
      const data = currentSession.data as AudioSchema;
      setAudioGenre(data?.genre ?? []);
      setAudiobook({ ...data });
    }
  }, [])


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const [name, value] = [e.target.name, e.target.value];
    setAudiobook((prev) => ({ ...prev, [name]: value }));
    const data = {
      ...currentSession,
      data: { ...audiobook, [name]: value },
    };
    cacheData(CacheKeys.session, data);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile((e.target.files as FileList)[0]);
  };

  useEffect(() => {
    if (!audioGenre?.length) return;
    const data = {
      ...currentSession,
      data: {
        ...currentSession?.data,
        genre: audioGenre,
      },
    };
    cacheData(CacheKeys.session, data);
  }, [audioGenre])

  // const canSubmit = [title, author, note, audiobook.thumbnail].every(Boolean);

  // const submitForm = async (e: FormEvent<HTMLFormElement>) => {
  const submitForm = async () => {
    // e.preventDefault();
    if (isLoading) return;

    const formData = new FormData();
    formData.append('chapterId', audiobook.chapterId);
    formData.append('title', title);
    formData.append('author', author);
    formData.append('about', about ?? '');
    formData.append('genre', helper.stringifyData(audioGenre));
    // formData.append('note', audiobook?.note ?? null);
    formData.append('thumbnail', file!);
    // formData.append('reference', helper.stringifyData(audiobook?.reference ?? {}));

    try {
      if (isLoading) return;
  
      setIsLoading(true);
      const audio = await appService.createAudio(formData);
      
      setAudiobook(InitAudioBookState);
      clearCache(CacheKeys.session);
      setAudioGenre([]);
      navigate(`/${audio.data?._id}`);
      toast.success('Audio book uploaded');
    } catch (err: unknown) {
      const error = err as any;
      const message = error.response?.data?.error?.message || error?.message;
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-auto w-full md:mx-auto md:w-[60%] lg:w-1/2 flex flex-col px-10 maxMobile:px-5 py-8 gap-8">
      <PageHeader />

      <form className="flex flex-col w-full h-full gap-4">

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
            disabled={isLoading}
            handleChange={handleChange}
            />
          <Input
            name='author'
            value={author}
            disabled={isLoading}
            handleChange={handleChange}
            />
        </div>

        <Genres audioGenre={audioGenre} setAudioGenre={setAudioGenre} />

        <ChapterUploader 
          cacheData={cacheData}
          currentSession={currentSession}
          setAudiobook={setAudiobook}
        />

        <textarea
          name="about"
          value={about}
          placeholder="preface"
          rows={4}
          disabled={isLoading}
          onChange={handleChange}
          className="resize-none px-3 py-1 rounded text-black focus:border-none focus:outline-none focus:ring-0 w-full"
        />

        <div className={`mt-5 self-center w-32 flex items-center bg-cyan-500 rounded h-10 relative`}>
          <button
            type='button'
            onClick={submitForm}
            // disabled={!canSubmit || isLoading}
            className={`z-10 w-full h-full rounded-md absolute top-0 grid place-content-center -translate-x-0.5 -translate-y-0.5 transition-transform active:-translate-x-0 active:translate-y-0 ${Colors.navy} border border-cyan-300`}
          >
            Submit{isLoading ? 'ing...' : ''}
          </button>
        </div>
      </form>
    </div>
  )
}
