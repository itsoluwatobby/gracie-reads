import { useState } from 'react';
import { AppContext } from './context';

export const AppContextDataProvider = (
  { children }: { children: React.ReactNode },
) => {
  const [appInfo] = useState(
    {
      name: 'Lovely Audios',
      email: '',
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

  const value = {
    theme, setTheme,
    appInfo, toggleModal, setToggleModal,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
