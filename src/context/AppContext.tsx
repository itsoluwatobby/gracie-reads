import { useState } from 'react';
import { AppContext } from './context';

const initAudioState = {
  audioPaused: false,
  audioSource: '',
  startPlayer: false,
  // length: 0,
};

export const AppContextDataProvider = (
  { children }: { children: React.ReactNode },
) => {
  const [appInfo] = useState(
    {
      name: 'Lovely Audios',
      email: 'crazywandyte@gmail.com',
      workPlace: '',
    },
  );
  const [theme, setTheme] = useState<Theme>(
    window.matchMedia
      && window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches ? 'dark' : 'light'
  );
  const [toggleModal, setToggleModal] = useState(false);
  const [mediaPlayer, setMediaPlayer] = useState<MediaPlayerProp>(initAudioState);

  const deactivatePlayer = () => {
    setMediaPlayer(initAudioState);
  };

  const value = {
    theme, setTheme, deactivatePlayer,
    appInfo, toggleModal, setToggleModal,
    mediaPlayer, setMediaPlayer,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
