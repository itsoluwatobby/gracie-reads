/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useState, useEffect } from 'react';
import { appService } from '../../app/appService';
import toast from "react-hot-toast";
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { nanoid } from 'nanoid';
import { helper } from '../../utils';

export default function AudioUploader() {
  const sessionName = 'lovely-audios-session';
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { cacheData, getCachedData } = useLocalStorage();
  const [audioInfo, setAudioInfo] = useState({ filename: '', duration: '' });

  useEffect(() => {
    if (!file) return;
    const audio = new Audio();
    audio.srcObject = file;

    audio.addEventListener('canplaythrough', () => {
      const durationInSeconds = audio.duration;
      const seconds = Math.floor(durationInSeconds % 60);
      const minutes = Math.floor(durationInSeconds / 60);
      const hours = Math.floor(minutes / 60);
      const formattedDuration = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      setAudioInfo({ duration: formattedDuration, filename: file.name })
    })
  }, [file]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile((e.target.files as FileList)[0]);
  };

  useEffect(() => {
    if (getCachedData(sessionName)) return;
    const sessionId = nanoid();
    cacheData(
      sessionName,
      {
        sessionId,
        timestamp: new Date().toUTCString(),
      },
    );
  }, [getCachedData, cacheData])

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('audio', file);
    try {
      const session = getCachedData<{ sessionId: string, timestamp: string }>(sessionName);
      formData.append('sessionId', session.sessionId);
      formData.append('chapter', helper.stringifyData(audioInfo));

      const result = await appService.uploadAudio(formData, setUploadProgress);
      console.log(result);
    } catch (err: any) {
      console.log(err.message);
      toast.error('Error uploading audio book');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="audio/*" />
      <button onClick={handleUpload}>Upload</button>
      <p>Upload Progress: {uploadProgress}%</p>
    </div>
  );
}
