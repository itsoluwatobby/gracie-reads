import { Route, Routes } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import { useAppContext } from './hooks/useAppContext';
import { Toaster } from 'react-hot-toast';
import {
  Header,
  Modal,
  Footer,
} from './components';
import { useState } from 'react';
import {
  BookPage,
  Dashboard,
  PageNotFound,
  PostAudioBook,
} from './pages';

function App() {
  const { theme, appInfo } = useAppContext();
  const [toggle, setToggle] = useState(false);

  return (
    <main className={`customScrollBar page-fade-in max-w-[1440px] mx-auto ${theme === 'light' ? 'bg-white' : `bg-gradient-to-b from-[#163d78] via-[#4a4e55] to-[#010b1b] text-white`} w-full h-screen flex flex-col justify-between transition-colors overflow-y-scroll`}>
      <Header appName={appInfo.name} setToggle={setToggle} />
      <Modal toggle={toggle} setToggle={setToggle} />

      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path=':bookId' element={<BookPage />} />
          <Route path='post-audio-book' element={<PostAudioBook />} />
        </Route>
        
        <Route path='*' element={<PageNotFound />} />

      </Routes>

      <Footer />

      <Toaster
        toastOptions={{
          style: {
            borderRadius: '8px',
            color: '#222',
            padding: '16px',
            fontSize: '14px',
          },
        }}
      />

    </main>
  );
}
export default App
