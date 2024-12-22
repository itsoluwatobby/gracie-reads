import { ChangeEvent } from "react";

type InputProps = {
  name: string;
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(
  {
    name, value, handleChange,
  }: InputProps
) {

  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name} className="capitalize text-sm">{name}</label>
        <input
          value={value}
          name={name}
          id={name}
          placeholder={name}
          onChange={handleChange}
          className='flex-auto focus:border-blue text-sm focus:outline-none placeholder:text-gray-400 px-4 py-1.5 rounded-sm text-black'
        />
    </div>
  )
}