import { ModalTags } from '../utils'
import NavButtons from './Navs';
import ChannelButton from './Button';
import { Colors } from '../utils/colors';
import { LiaTimesSolid } from 'react-icons/lia';

type ModalProps = {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal(
  {
    toggle, setToggle,
  }: ModalProps
) {

  return (
    <aside
      className={`md:hidden z-10 w-full h-screen ${toggle ? 'slide-in fixed right-0 flex' : 'slide-out hidden'}`}
    >
      <div className={`${Colors.lightNavy} h-full blur-3xl flex-auto`}></div>
      <div className={`self-end w-72 flex items-center justify-center ${Colors.navy} h-full shadow-lg relative`}>

        <button
          className={`w-10 h-7 rounded-md absolute top-4 right-3 bg-cyan-500 ${Colors.lightNavy}`}
        ></button>
        <button
          onClick={() => setToggle(false)}
          className={`z-10 w-10 h-7 rounded-md absolute top-4 right-3 grid place-content-center -translate-x-0.5 -translate-y-0.5 transition-transform active:-translate-x-0 active:translate-y-0 ${Colors.navy} border border-cyan-300`}
        >
          <LiaTimesSolid
            className='cursor-pointer text-cyan-50 shadow w-full text-lg'
          />
        </button>

        <ul className='flex flex-col gap-y-5 list-none h-[63%]'>
          {
            ModalTags.map((link, bullet) => (
              <NavButtons
                key={link}
                link={link}
                bullet={bullet + 1}
                classNames='flex-col gap-1'
              />
            ))
          }
          <div className='mt-10 self-center'>
            <ChannelButton />
          </div>
        </ul>
      </div>
    </aside>
  )
}