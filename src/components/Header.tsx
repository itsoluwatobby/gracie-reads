// import { useState } from 'react'
// import { ModalTags,  } from '../utils';
// import NavButtons from './Navs';
// import DropdownModal from './DropdownModal';
// import ChannelButton from './Button';
// import Logo from './Logo';
import { Link } from 'react-router-dom';
// import { useAppContext } from '../hooks/useAppContext'
import { BookOpen, Lock } from 'lucide-react';

type HeaderProps = {
  appName: string;
  // setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
// 50,10 75,25 75,55 50,68 25,55 25,25
export default function Header({ appName, setIsLoginModalOpen }: HeaderProps) {
  // const { pathname } = useLocation();
  // const [name, setName] = useState('')
  // const { appInfo, current, setCurrent } = useAppContext();

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <BookOpen className="text-sky-600 mr-2" size={24} />
            <span className="text-xl font-bold text-sky-900">{appName}</span>
          </Link>
          <div className="flex items-center space-x-4">
            {/* <Link
              to="/post"
              className="flex items-center px-4 py-2 rounded-lg text-sky-600 hover:bg-sky-50"
            >
              <Upload size={16} className="mr-2" />
              Post Audiobook
            </Link> */}
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="flex items-center px-4 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition-colors"
            >
              <Lock size={16} className="mr-2" />
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
    // <header className={`sticky top-0 w-full pl-1 pt-4 pr-3 bg-[#751225] flex items-center justify-between h-16 z-10 shadow-md transition-transform lg:px-10`}>

    //   <Link to='/'>
    //     <Logo appName={appName} />
    //   </Link>

    //   <ul className='hidden relative md:flex items-center gap-x-6 list-none'>
    //     {
    //       pathname.includes('audio-book')
    //       ? null
    //       :
    //       ModalTags.map((link, bullet) => (
    //         <div 
    //         key={link}
    //         onClick={() => {
    //           if (!['categories', 'latest'].includes(link))
    //             setCurrent({ currentGenre: null, nav: null });
    //           else setCurrent((prev) => ({ ...prev, nav: link as Name }));
    //         }}
    //         >
    //           <NavButtons
    //             key={link}
    //             link={link}
    //             bullet={bullet + 1}
    //             classNames='gap-x-1 text-sm'
    //           />
    //         </div>
    //       ))
    //     }
    //     <ChannelButton />
    //     <DropdownModal 
    //       current={current}
    //       appInfo={appInfo}
    //       setCurrent={setCurrent}
    //     />
    //   </ul>


    //   <button
    //     onClick={() => setToggle(prev => !prev)}
    //     className='mt-3 h-10 w-10 cursor-pointer md:hidden flex gap-1 p-1'>
    //     <span className={`flex justify-end transition-transform relative h-[1.5px] w-[1.6rem] bg-cyan-200 before:absolute before:-top-2 before:content-[""] before:h-[1.5px] before:w-9 before:bg-cyan-200 after:absolute after:-bottom-2 after:content-[""] after:h-[1.5px] after:w-[1.5rem] after:bg-cyan-200`}></span>
    //   </button>
    // </header>
  )
}