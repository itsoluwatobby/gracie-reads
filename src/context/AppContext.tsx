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

const initValues = {
  name: 'Lovely Audios',
  email: '',
  isLoggedIn: false,
  appId: '',
  channel: '',
  genres: [],
  createdAt: '',
  updatedAt: '',
  sessionId: '',
};

export const AppContextDataProvider = (
  { children }: { children: React.ReactNode },
) => {
  const [isServerOnline, setIsServerOnline] = useState(true);
  const [appInfo, setAppInfo] = useState<Partial<AppConfig>>(initValues);
  // const [theme, setTheme] = useState<Theme>(
  //   window.matchMedia
  //     && window.matchMedia(
  //       '(prefers-color-scheme: dark)'
  //     ).matches ? 'dark' : 'light'
  // );
  const [toggleModal, setToggleModal] = useState(false);
  const [retries, setRetries] = useState(0);
  // const [currentUser, setCurrentUser] = useState('');
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
        // const user = await appService.getUser() as any;
        // setCurrentUser(user.data.ipAddress);

        setAppInfo(appConfig?.data || initValues);
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

  // theme, setTheme,
  const value = {
    deactivatePlayer,
    appInfo, toggleModal, setToggleModal,
    mediaPlayer, setMediaPlayer, isServerOnline,
    current, setCurrent, setAppInfo,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
