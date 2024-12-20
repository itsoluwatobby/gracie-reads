import React, { useState } from 'react'
import { hoverEffects } from '../utils';
import { Link } from 'react-router-dom';

type BookCardProps = {
  thumbnail: string;
  title: string;
  author: string;
  bookId: string;
}

export default function BookCard(
  {
    thumbnail, title, author, bookId,
  }: BookCardProps
) {
  const [hoverIndex, setHoverIndex] = useState(0);

  const modifyHoverCount = () => {
    const randomIndex = Math.floor(Math.random() * hoverEffects.length);
    setHoverIndex(randomIndex);
  }

  return (
    <Link
    to={`${bookId}`} 
    title={author}
    onMouseEnter={modifyHoverCount}
    className={`flex flex-col rounded-md gap-1 h-56 w-40 mobile:w-36 mobile:h-52 text-sm cursor-pointer transition-transform ${hoverEffects[hoverIndex]}`}>
      <figure className='bg-gray-700 rounded-md w-full h-[80%]'>
        {
          thumbnail ?
          <img src={thumbnail} alt={title} 
          className='w-full rounded-md h-full object-cover'
          />
          : null
        }
      </figure>
      <span className='text-center capitalize font-medium'>{title}</span>
      <p className='flex items-center gap-1 overflow-hidden whitespace-nowrap text-[13px]'>
        <span>author:</span>
        <span className='capitalize font-medium'>{author}</span>
      </p>
    </Link>
  )
}