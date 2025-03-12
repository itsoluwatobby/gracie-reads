import { appService } from '../app/appService';
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { BookOpen, Lock } from 'lucide-react';
import { CacheKeys, PageRoutes } from "../utils";
import { useEffect, useState } from 'react';

type HeaderProps = {
  appName: string;
  setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ appName, setIsLoginModalOpen }: HeaderProps) {
  const { pathname } = useLocation();
  const { appInfo } = useAppContext();
  const { getCachedData, clearCache } = useLocalStorage();
  
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(
      appInfo?.isLoggedIn
      || Boolean(getCachedData<{ session: string }>(CacheKeys.login_session)?.session)
      || false
    );
  }, [getCachedData, appInfo?.isLoggedIn])

  const handleClick = async() => {
    if (loggedIn) {
      if (pathname !== PageRoutes.postAudio) navigate(PageRoutes.postAudio);
      else {
        clearCache(CacheKeys.login_session);
        appService.logout();
        setLoggedIn(false);
        navigate(PageRoutes.home);
      }
    } else {
      setIsLoginModalOpen(true);
    }
  }

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to={PageRoutes.home} className="flex items-center">
            <BookOpen className="text-sky-600 mr-2" size={24} />
            <span className="text-xl font-bold text-sky-900">{appName}</span>
          </Link>
          <div className="flex items-center space-x-5">
            {
              loggedIn
              ? <Link to={PageRoutes.dashboard} className='underline underline-offset-2 text-black self-end'>Dashboard</Link>
              : null
            }
            <button
              onClick={handleClick}
              className="flex items-center px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition-colors"
            >
              <Lock size={16} className="mr-2" />
              {loggedIn ? 'Logout' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}