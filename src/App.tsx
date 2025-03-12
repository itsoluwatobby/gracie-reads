import { Route, Routes } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import { useAppContext } from './hooks/useAppContext';
import { Toaster } from 'react-hot-toast';
import {
  Header,
  Modal,
  Footer,
  LoginModal,
} from './components';
import { useState } from 'react';
import {
  BookPage,
  Dashboard,
  HomePage,
  PageNotFound,
  PostAudioBook,
  UnauthorisedPage,
} from './pages';
import PostPageLayout from './layout/PostPageSecure';

function App() {
  const { theme, appInfo } = useAppContext();
  const [toggle, setToggle] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <main className={`customScrollBar page-fade-in max-w-[1440px] mx-auto ${theme === 'light' ? 'bg-gradient-to-b from-sky-50 to-white' : `bg-gradient-to-b from-sky-50 to-white text-white`} w-full h-screen flex flex-col justify-between transition-colors overflow-y-scroll`}>

      <Header appName={appInfo.name!} setIsLoginModalOpen={setIsLoginModalOpen} />
      <Modal toggle={toggle} setToggle={setToggle} />

      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path=':bookId' element={<BookPage />} />

          <Route path='auth/' element={<PostPageLayout />}>
            <Route path='post-audio-book' element={<PostAudioBook />} />
            <Route path='dashboard' element={<Dashboard />} />
          </Route>

          <Route path='unauthorised' element={<UnauthorisedPage />} />
        </Route>

        <Route path='*' element={<PageNotFound />} />

      </Routes>

      <Footer />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      <Toaster
        toastOptions={{
          style: {
            borderRadius: '8px',
            color: '#222',
            padding: '10px',
            fontSize: '12px',
          },
        }}
      />

    </main>
  );
}
export default App
