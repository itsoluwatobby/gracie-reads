/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { AppContext } from './context';
import { appService } from '../app/appService';
import toast from 'react-hot-toast';

const initAudioState = {
  audioPaused: false,
  audioSource: '',
  startPlayer: false,
  // length: 0,
};

export const AppContextDataProvider = (
  { children }: { children: React.ReactNode },
) => {
  const [isServerOnline, setIsServerOnline] = useState(true);
  const [appInfo, setAppInfo] = useState<Partial<AppConfig>>(
    {
      name: 'Lovely Audios',
      email: 'crazywandyte@gmail.com',
    },
  );
  const [theme, setTheme] = useState<Theme>(
    window.matchMedia
      && window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches ? 'dark' : 'light'
  );
  const [toggleModal, setToggleModal] = useState(false);
  const [retries, setRetries] = useState(0);
  const [mediaPlayer, setMediaPlayer] = useState<MediaPlayerProp>(initAudioState);
  const [current, setCurrent] = useState<CurrentModal>(
    { nav: null, currentGenre: null }
  );

  const deactivatePlayer = () => {
    setMediaPlayer(initAudioState);
  };

  useEffect(() => {
    // if (!bookId) return;
    if (!isServerOnline) return;
    (async () => {
      if (retries >= 5) return;
      try {
        const appConfig = await appService.getAppConfig();
        setAppInfo(appConfig.data);
        setRetries(0);
        setIsServerOnline(true);
      } catch (err: unknown) {
        const error = err as any;
        setRetries((prev) => prev + 1);
        const message = error.response?.data?.error?.message || error?.message;
        if (message === 'Network Error') setIsServerOnline(false);
        toast.error(message);
      }
    })();
  }, [retries, isServerOnline])
  
  const value = {
    theme, setTheme, deactivatePlayer,
    appInfo, toggleModal, setToggleModal,
    mediaPlayer, setMediaPlayer, isServerOnline,
    current, setCurrent,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
