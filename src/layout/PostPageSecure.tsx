import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../hooks";

export default function PostPageLayout() {
  const { appInfo } = useAppContext();

  return (
    <>
      {
        !appInfo.isLoggedIn
          ? <Navigate to={'/unauthorised'} />
          : <Outlet />
      }
    </>
  )
}