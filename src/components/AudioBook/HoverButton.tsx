import { IconType } from 'react-icons'

type HoverButtonProps = {
  type: ArrowDirection;
  Button: IconType;
  handleCLick: (type: ArrowDirection) => void;
}

export default function HoverButton(
  {
    type, Button, handleCLick,
  }: HoverButtonProps,
) {
  
  return (
    <div 
      className='relative w-10 h-6'>
        <div className='h-full w-full rounded bg-cyan-300'></div>
        <button
        className={`absolute h-full w-full shadow bg-slate-900 rounded ring-none top-0 transition-transform active:-translate-x-0 active:translate-y-0 -translate-x-[0.07rem] -translate-y-[0.07rem] focus:outline-none focus:border-none grid place-content-center text-3xl`}
        >
          <Button onClick={() => handleCLick(type)} />
        </button>
      </div>
  )
}