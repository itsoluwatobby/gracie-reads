import { ChangeEvent } from "react";
import { MdSend } from "react-icons/md";

type InputProps = {
  name: string;
  value: string;
  disabled?: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  ignoreLabel?: boolean;
  classnames?: string;
  handelSubmit?: (type: ToggleGenreButton) => void;
}

export default function Input(
  {
    name, value, ignoreLabel = false, handelSubmit,
    handleChange, disabled = false, classnames,
  }: InputProps
) {

  return (
    <div className={`flex flex-col ${ignoreLabel ? 'w-fit' : 'w-full'} relative`}>
      {!ignoreLabel ? <label htmlFor={name} className="capitalize text-black text-sm">{name}</label> : null}
        <input
          value={value}
          name={name}
          id={name}
          disabled={disabled}
          placeholder={name}
          onChange={handleChange}
          className={`flex-auto border border-gray-600 focus:border-blue-500 text-sm focus:outline-none placeholder:text-gray-500 px-4 py-1.5 rounded-md text-black ${classnames}`}
        />
        
        {
          ignoreLabel ?
          <MdSend 
          onClick={() => (handelSubmit!)('add')}
          className={`${disabled ? 'hidden' : ''} text-blue-600 text-2xl absolute top-2 right-1 border-gray-400 border p-0.5 rounded-md`}
          /> : null
        }
    </div>
  )
}