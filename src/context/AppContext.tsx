import { useState } from 'react';
import { AppContext } from './context';

export const AppContextDataProvider = (
  { children }: { children: React.ReactNode },
) => {
  const [appInfo] = useState(
    {
      name: 'Gracie Reads',
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
  // const [tabName, setTabName] = useState<SideTabs>(SideTabEnum.Transaction);

  const value = {
    theme, setTheme, appInfo,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
