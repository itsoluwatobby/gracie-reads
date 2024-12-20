import React from 'react'
import { ModalTags,  } from '../utils';
import NavButtons from './Navs';
import ResumeButton from './Button';
import Logo from './Logo';
import { Link } from 'react-router-dom';

type HeaderProps = {
  appName: string;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}
// 50,10 75,25 75,55 50,68 25,55 25,25
export default function Header({ appName, setToggle }: HeaderProps) {

  return (
    <header className={`sticky top-0 w-full pl-1 pt-4 pr-3 bg-[#751225] flex items-center justify-between h-16 z-10 shadow-md transition-transform lg:px-10`}>

      <Link to='/'>
        <Logo appName={appName} />
      </Link>

      <ul className='hidden md:flex items-center gap-x-6 list-none'>
        {
          ModalTags.map((link, bullet) => (
            <NavButtons
              key={link}
              link={link}
              bullet={bullet + 1}
              classNames='gap-x-1 text-sm'
            />
          ))
        }
        <ResumeButton />
      </ul>

      <button
        onClick={() => setToggle(prev => !prev)}
        className='mt-3 h-10 w-10 cursor-pointer md:hidden flex gap-1 p-1'>
        <span className={`flex justify-end transition-transform relative h-[1.5px] w-[1.6rem] bg-cyan-200 before:absolute before:-top-2 before:content-[""] before:h-[1.5px] before:w-9 before:bg-cyan-200 after:absolute after:-bottom-2 after:content-[""] after:h-[1.5px] after:w-[1.5rem] after:bg-cyan-200`}></span>
      </button>
    </header>
  )
}