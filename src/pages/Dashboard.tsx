import {
  Hero,
  // Experience,
} from "../components/dashboard";
import { useAppContext } from "../hooks";
import { IoMdArrowUp } from "react-icons/io";
import { useIntersectionObserver } from "../hooks";

export default function Dashboard() {
  const { appInfo } = useAppContext();
  const { intersecting, observerRef } = useIntersectionObserver(
    { screenPosition: '0px', threshold: 0.9 },
  );

  return (
    <div className='h-auto w-full flex flex-col px-10 mobile:px-4'>

      <Hero 
        appName={appInfo.name}
        observerRef={observerRef  as React.LegacyRef<HTMLDivElement>}
      />
  
      <a href="#home"
        className={`${!intersecting.isIntersecting ? 'fixed' : 'hidden'} bottom-10 right-5 shadow-md border-gray-600 focus:outline-none border-2 animate-pulse rounded-full w-8 h-8 grid place-content-center hover:bg-black hover:text-white transition-colors`}>
        <IoMdArrowUp className='' />
      </a>
    </div>
  )
}