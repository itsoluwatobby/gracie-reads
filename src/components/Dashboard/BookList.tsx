/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { helper } from '../../utils';
import { Edit, Trash2 } from 'lucide-react';
import { initAppState } from '../../utils/initStates';
import { appService } from '../../app/appService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type BookListProps = {
  audioBooks: AudioSchema[];
  setReload: React.Dispatch<React.SetStateAction<number>>;
}

export default function BookList({ audioBooks, setReload }: BookListProps) {
  const [appStateDelete, setAppStateDelete] = useState(initAppState);
  const [appStateStatus, setAppStateStatus] = useState(initAppState);
  const navigate = useNavigate();

  const handleDelete = async (bookId: string) => {
    if (appStateDelete.loading) return;

    try {
      setAppStateDelete((prev) => ({ ...prev, loading: true }));
      await appService.deleteAudio(bookId);
      setReload((prev) => prev + 1);
      toast.success('Audiobook deleted');
    } catch (err: unknown) {
      const error = err as any;
      const message = error.response?.data?.error?.message || error?.message;
      setAppStateDelete((prev) => ({ ...prev, error: true, errMsg: message }));
      toast.error(message);
    } finally {
      setAppStateDelete((prev) => ({ ...prev, loading: false }));
    }
  };
  
  const handleBookStatus = async (bookId: string) => {
    if (appStateStatus.loading) return;
  
    try {
      // console.log(status)
      setAppStateStatus((prev) => ({ ...prev, loading: true }));
      await appService.deleteAudio(bookId); // MAKE PUBLIC | PRIVATE
      setReload((prev) => prev + 1);
      toast.success('Audiobook deleted');
    } catch (err: unknown) {
      const error = err as any;
      const message = error.response?.data?.error?.message || error?.message;
      setAppStateStatus((prev) => ({ ...prev, error: true, errMsg: message }));
      toast.error(message);
    } finally {
      setAppStateStatus((prev) => ({ ...prev, loading: false }));
    }
  };

  const listClassNames = "px-3 py-3 whitespace-nowrap text-gray-600 text-center";

  return (
    <tbody className="divide-y divide-gray-200 text-sm">
      {audioBooks.map((book) => (
        <tr key={book._id}
        className={`${book.isPublic ? '' : 'opacity-75'} cursor-pointer hover:scale-[1.005] transition-transform`}
        >
          <td 
          title={book.title}
          onClick={() => navigate(`/${book._id!}`)}
          className="px-3 py-3 whitespace-nowrap text-gray-800">{helper.reduceTextLength(book.title, 20)}</td>
          <td className={listClassNames}>{helper.checkCount(book.views)}</td>
          <td className={listClassNames}>{helper.checkCount(book.likes)}</td>
          <td className={listClassNames}>{helper.getRating(book.rating!)}</td>
          <td className={listClassNames}>{helper.checkCount(book?.comments || [])}</td>
          <td 
          title={book.isPublic ? 'Make Private' : 'Make Public'}
          onClick={() => handleBookStatus(book._id!)}
          className="px-1 text-[12px] py-3 whitespace-nowrap text-gray-600">
            <span className={`p-0.5 rounded-lg px-2 ${book.isPublic ? 'bg-green-200' : 'bg-red-200'} cursor-pointer`}>
              {book.isPublic ? 'public' : 'private'}
            </span>
          </td>
          <td className="px-3 grid place-content-center py-3 whitespace-nowrap">
            <div className="flex space-x-3">
              <button
                onClick={() => navigate(`/edit/${book._id!}`)}
                className="text-sky-600 hover:text-sky-800"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => handleDelete(book._id!)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  )
}