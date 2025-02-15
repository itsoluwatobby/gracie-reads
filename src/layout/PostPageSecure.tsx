import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../hooks";
import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { CacheKeys } from "../utils";

export default function PostPageLayout() {
  const { appInfo } = useAppContext();
  const { clearCache } = useLocalStorage();

  useEffect(() => {
    if (!appInfo.isLoggedIn && !appInfo.sessionId) {
      clearCache(CacheKeys.login_session);
    }
  }, [appInfo.isLoggedIn, clearCache, appInfo.sessionId])

  return (
    <>
      {
        (!appInfo.isLoggedIn && !appInfo.sessionId)
          ? <Navigate to={'/unauthorised'} />
          : <Outlet />
      }
    </>
  )
}