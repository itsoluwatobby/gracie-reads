/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useState, useEffect, useRef } from 'react';
import { appService } from '../../app/appService';
import { useLocalStorage } from '../../hooks/useLocalStorage';
// import { nanoid } from 'nanoid';
import { CacheKeys, helper } from '../../utils';
import { Colors } from '../../utils/colors';
import { MdOutlineMenuBook } from "react-icons/md";
import toast from 'react-hot-toast';
import Episodes from './Episodes';
import ModalConfirmation from '../ModalConfirmation';
import { useAppContext } from '../../hooks';

type ChapterUploaderProps = {
  currentSession: SESSION;
  cacheData: <T>(key: string, data: T) => string;
  setAudiobook: React.Dispatch<React.SetStateAction<AudioSchema>>;
}

export default function ChapterUploader({ cacheData, currentSession, setAudiobook }: ChapterUploaderProps) {
  // const dialogRef = useRef<HTMLDialogElement>();
  const { isServerOnline } = useAppContext();
  const { getCachedData } = useLocalStorage();
  const [file, setFile] = useState<File | null>(null);
  const [chapter, setChapter] = useState<Chapter>();
  const [loadingStates, setLoadingStates] = useState<LoadingStates>(
    {
      isLoading: false,
      fileLoading: false,
    },
  );
  // const [currentSession, setCurrentSession] = useState<SESSION>(getCachedData<SESSION>(CacheKeys.session));
  const [uploadProgress, setUploadProgress] = useState(0);
  const [audioInfo, setAudioInfo] = useState({ duration: '', filename: '', episode: '1' });

  const { duration, filename, episode } = audioInfo;
  const { isLoading, fileLoading } = loadingStates;

  useEffect(() => {
    if (!file) return;
    const audio = new Audio();
    audio.src = URL.createObjectURL(file);

    setLoadingStates(prev => ({ ...prev, fileLoading: true }));
    audio.addEventListener('canplaythrough', () => {
      const durationInSeconds = audio.duration;
      const seconds = Math.floor(durationInSeconds % 60);
      const minutes = Math.floor(durationInSeconds / 60);
      const hours = Math.floor(minutes / 60);
      const formattedDuration = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      setAudioInfo(prev => ({ ...prev, duration: formattedDuration, filename: file.name }));
      setLoadingStates(prev => ({ ...prev, fileLoading: false }));
    })
  }, [file])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile((e.target.files as FileList)[0]);
  };

  useEffect(() => {
    if (!isServerOnline) return;
    if (currentSession) {
      if (chapter?._id) return;
      async function fetchChapter() {
        try {
          const result = await appService.getAudioChapterBySession(currentSession.sessionId);
          setChapter(result.data);
          const data = {
            ...currentSession,
            data: { ...currentSession.data, chapterId: result.data._id }
          };
          cacheData(CacheKeys.session, data);
        } catch (err: unknown) {
          const error = err as any;
          if (error.response?.data?.error?.statusCode === 404) return;
          const message = error.response?.data?.error?.message || error?.message;
          toast.error(message);
        } finally {
          setLoadingStates(prev => ({ ...prev, isLoading: false }))
        }
      }
      fetchChapter();
    }
  }, [currentSession, chapter?._id, isServerOnline])

  const canUpload = [duration, episode, file].every(Boolean);

  const handleUpload = async () => {
    if (!file) return;
    if (!canUpload || isLoading) return;

    const formData = new FormData();
    formData.append('audio', file);

    try {
      setLoadingStates(prev => ({ ...prev, isLoading: true }));
      formData.append('sessionId', currentSession.sessionId);
      formData.append('chapter', helper.stringifyData({ duration }));
      formData.append('episode', episode);

      const result = await appService.uploadAudio(formData, setUploadProgress);
      setAudioInfo(prev => ({ duration: '', filename: '', episode: String(+episode + 1) }));
      setChapter(result.data);
      setAudiobook((prev) => ({ ...prev, chapterId: result.data._id }))
    } catch (err: unknown) {
      const error = err as any;
      const message = error.response?.data?.error?.message || error?.message;
      toast.error(message);
    } finally {
      setLoadingStates(prev => ({ ...prev, isLoading: false }))
    }
  };

  // const triggerModal = (action: boolean) => {
  //   if (!dialogRef?.current) return;
  //   if (action) dialogRef.current.showModal()
  //   else dialogRef.current.close();
  // }

  return (
    <div className='flex flex-col text-sm w-full gap-3 rounded shadow-inner'>

      {/* <ModalConfirmation 
      dialogRef={dialogRef}
      triggerModal={triggerModal}
      /> */}

      <div className='flex items-center text-green-400 text-xs gap-3 gap-y-5 flex-wrap'>
        {
          chapter?.chapters.map((episode) => (
            <Episodes
              key={episode._id}
              episode={episode}
              currentSession={currentSession}
              setChapter={setChapter}
            />
          ))
        }
      </div>

      <div className='flex items-center gap-4 -mt-1'>
        <input
          type="number"
          name="episode"
          value={episode}
          min={1}
          disabled={isLoading}
          placeholder='episode'
          className='px-2 py-1.5 text-black rounded-sm w-16 focus:outline-0 placeholder:text-xs border-0 focus:ring-0'
          onChange={(e) => setAudioInfo((prev) => ({ ...prev, episode: e.target.value }))} 
        />
        <input
          type="file"
          id='audio-file-upload'
          accept="audio/*"
          hidden
          disabled={isLoading}
          onChange={handleFileChange}
        />
        <label htmlFor="audio-file-upload"
          className={`border ${filename ? 'border-green-500' : ''} flex flex-nowrap items-center gap-1.5 max-w-36 rounded p-[0.36rem]`}
        >
          <MdOutlineMenuBook className='text-xl' />
          <span className={`text-gray-400 text-xs ${fileLoading ? 'animate-pulse' : 'animate-none'}`}>{filename ? (fileLoading ? 'loading...' : helper.reduceTextLength(filename, 11)) : 'audio book'}</span>
        </label>
      </div>

      <div className='flex items-center gap-x-2'>
        <button
          type='button'
          disabled={!canUpload || isLoading}
          className={`border border-cyan-300 shadow active:scale-[1.01] focus:outline-none self-start p-2 py-1 w-24 text-center rounded ${!canUpload ? Colors.lightestNavy : Colors.navy}`}
          onClick={handleUpload}
          >
            Upload{isLoading ? 'ing...' : ''}
        </button>

        {
          isLoading
            ? <p className={`text-[13px] flex flex-nowrap items-center gap-1`}>
              <span className='animate-pulse'>Progress: </span>
              <span className='text-cyan-200'>{uploadProgress}%</span>
            </p>
            : null
        }
      </div>
    </div>
  );
}
