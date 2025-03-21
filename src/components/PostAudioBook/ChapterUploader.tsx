/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useState, useEffect } from 'react';
import { appService } from '../../app/appService';
import { CacheKeys, helper } from '../../utils';
import { Colors } from '../../utils/colors';
import { MdOutlineMenuBook } from "react-icons/md";
import toast from 'react-hot-toast';
import Episodes from './Episodes';
// import ModalConfirmation from '../ModalConfirmation';
import { useAppContext } from '../../hooks';
import { CachedKeyTypes } from '../../hooks/useLocalStorage';

type ChapterUploaderProps = {
  currentSession: SESSION;
  cacheData: <T>(key: CachedKeyTypes, data: T) => string;
  setAudiobook: React.Dispatch<React.SetStateAction<AudioSchema>>;
}

let queried = false;
export default function ChapterUploader({ cacheData, currentSession, setAudiobook }: ChapterUploaderProps) {
  // const dialogRef = useRef<HTMLDialogElement>();
  const { isServerOnline } = useAppContext() as AppContextProps
  // const { getCachedData } = useLocalStorage();
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
    if (!isServerOnline || queried) return;
    if (currentSession) {

      if (chapter?._id) return;
      
      async function fetchChapter() {
        queried = true;
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
  }, [currentSession, chapter?._id, isServerOnline, cacheData])

  const canUpload = [duration, episode, file].every(Boolean);

  const handleUpload = async () => {
    if (!file) return;
    if (!canUpload || isLoading) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'gracie-audio-preset');
    formData.append('resource_type', 'audio');

    try {
      setLoadingStates(prev => ({ ...prev, isLoading: true }));

      const result = await appService.uploadAudioToCloudinary(formData, setUploadProgress);

      const response = await appService.uploadAudio(
        {
          chapter: {
            episode,
            duration,
            filename: result.filename,
            publicId: result.publicId,
            link: result.playbackUrl,
          },
          sessionId: currentSession.sessionId,
        },
      );
      setAudioInfo({ duration: '', filename: '', episode: String(+episode + 1) });
      setChapter(response.data);

      setAudiobook((prev) => ({ ...prev, chapterId: response.data._id }))
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
    <div className='flex flex-col text-sm w-full mt-1 gap-3 rounded shadow-inner'>

      {/* <ModalConfirmation 
      dialogRef={dialogRef}
      triggerModal={triggerModal}
      /> */}

      <div className='flex items-center text-black text-xs gap-3 gap-y-5 flex-wrap'>
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
          className='px-2 py-1.5 border border-gray-600 text-black rounded-md focus:border-blue-500 w-16 focus:outline-0 placeholder:text-xs focus:ring-0'
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
          className={`border border-gray-600 ${filename ? 'border-blue-500' : ''} flex flex-nowrap items-center gap-1.5 max-w-36 rounded p-[0.36rem]`}
        >
          <MdOutlineMenuBook className='text-xl text-blue-700' />
          <span className={`text-gray-600 text-xs ${fileLoading ? 'animate-pulse' : 'animate-none'}`}>{filename ? (fileLoading ? 'loading...' : helper.reduceTextLength(filename, 11)) : 'audio book'}</span>
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
              <span className='animate-pulse text-blue-700'>Progress: </span>
              <span className='text-cyan-800'>{uploadProgress}%</span>
            </p>
            : null
        }
      </div>
    </div>
  );
}

/**
 * {
    "public_id": "05e13e2623dee46b1f764024770c2973",
    "secure_url": "https://res.cloudinary.com/du9tz6jhy/video/upload/v1741512217/vhgbxvvfi7dnhcp57fca.mp3",
    "playback_url": "https://res.cloudinary.com/du9tz6jhy/video/upload/sp_auto/v1741512217/vhgbxvvfi7dnhcp57fca.m3u8",
    "asset_folder": "audios",
    "duration": 210.285714,
    "original_filename": "Wizkid_-_Ololufe_feat_Wande_Coal__Vistanaij.com.ng"
}{
    "asset_id": "0edfdeb5bc668cbbe2ef6d16d712a1eb",
    "public_id": "ibuiziwqeey3fzxa7zos",
    "version": 1741511925,
    "version_id": "a2072aa4b2fd1511aaa53775237f4ae8",
    "signature": "c27e71b63a3bec5c657404c5ecc00872a1c5900e",
    "width": 1080,
    "height": 1080,
    "format": "mp3",
    "resource_type": "video",
    "created_at": "2025-03-09T09:18:45Z",
    "tags": [],
    "pages": 0,
    "bytes": 4119804,
    "type": "upload",
    "etag": "aad19fd20d4195f9f1997a6b483ad773",
    "placeholder": false,
    "url": "http://res.cloudinary.com/du9tz6jhy/video/upload/v1741511925/ibuiziwqeey3fzxa7zos.mp3",
    "secure_url": "https://res.cloudinary.com/du9tz6jhy/video/upload/v1741511925/ibuiziwqeey3fzxa7zos.mp3",
    "playback_url": "https://res.cloudinary.com/du9tz6jhy/video/upload/sp_auto/v1741511925/ibuiziwqeey3fzxa7zos.m3u8",
    "asset_folder": "audios",
    "display_name": "Wizkid_-_Ololufe_feat_Wande_Coal__Vistanaij.com.ng",
    "audio": {
        "codec": "mp3",
        "bit_rate": "128000",
        "frequency": 44100,
        "channels": 2,
        "channel_layout": "stereo"
    },
    "video": {
        "pix_format": "yuvj420p",
        "codec": "mjpeg",
        "level": -99,
        "profile": "Progressive",
        "dar": "1:1",
        "time_base": "1/90000"
    },
    "is_audio": false,
    "frame_rate": 90000,
    "bit_rate": 156731,
    "duration": 210.285714,
    "rotation": 0,
    "original_filename": "Wizkid_-_Ololufe_feat_Wande_Coal__Vistanaij.com.ng"
}
 */