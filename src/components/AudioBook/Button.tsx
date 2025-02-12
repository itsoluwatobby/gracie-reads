import { IconType } from "react-icons";

type ButtonProps = {
  Name: string | IconType;
  handleClick: () => void;
}

export default function Button({ Name, handleClick }: ButtonProps) {

  return (
    <button
      className="rounded-full text-2xl size-9 text-white grid place-content-center bg-sky-600 shadow-md focus:outline-none border-0 focus:ring-0"
      onClick={handleClick}
    >
      {typeof Name === 'string' ? Name : <Name />}
    </button>
  )
}