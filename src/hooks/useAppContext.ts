import { useContext, Context } from 'react';
import { AppContext } from '../context/context';

export const useAppContext = () => {
  return useContext<AppContextProps>(AppContext as Context<AppContextProps>);
}
