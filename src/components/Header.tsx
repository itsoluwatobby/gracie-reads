import { appService } from '../app/appService';
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import { BookOpen, Lock } from 'lucide-react';
import { CacheKeys } from "../utils";
import { useEffect, useState } from 'react';

type HeaderProps = {
  appName: string;
  setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Header({ appName, setIsLoginModalOpen }: HeaderProps) {
  const { pathname } = useLocation();
  const { appInfo } = useAppContext();
  const { getCachedData } = useLocalStorage();
  
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(
      appInfo?.isLoggedIn
      || Boolean(getCachedData<{ session: string }>(CacheKeys.login_session)?.session)
      || false
    )
  }, [getCachedData, appInfo?.isLoggedIn])

  const handleClick = async() => {
    if (loggedIn) {
      const allowedRoute = '/post-audio-book';
      if (pathname !== allowedRoute) navigate(allowedRoute);
      else {
        await appService.logout();
        setLoggedIn(false);
      }
    } else {
      setIsLoginModalOpen(true);
    }
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <BookOpen className="text-sky-600 mr-2" size={24} />
            <span className="text-xl font-bold text-sky-900">{appName}</span>
          </Link>
          <div className="flex items-center space-x-4">
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