import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../hooks";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { CacheKeys } from "../utils";
import { appService } from "../app/appService";

export default function PostPageLayout() {
  const { appInfo } = useAppContext();
  const { clearCache, getCachedData } = useLocalStorage();
  const [loggedIn, setLoggedIn] = useState(appInfo?.isLoggedIn || Boolean(getCachedData<{ session: string }>(CacheKeys.login_session)?.session) || false);

  useEffect(() => {
    if (!loggedIn) {
      clearCache(CacheKeys.login_session);
      setLoggedIn(false);
      appService.logout();
    }
  }, [clearCache, loggedIn])

  return (
    <>
      {
        !loggedIn ? <Navigate to={'/unauthorised'} /> : <Outlet />
      }
    </>
  )
}