import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppContextDataProvider } from './context/AppContext.tsx';

if(process.env.NODE_ENV === 'production') disableReactDevTools();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppContextDataProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </BrowserRouter>
    </AppContextDataProvider>
  </StrictMode>,
)
