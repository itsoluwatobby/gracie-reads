/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useState } from "react";
import { Lock, EyeIcon, EyeOffIcon } from 'lucide-react';
import toast from "react-hot-toast";
import { appService } from "../app/appService";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../hooks";

type LoginModalProp = {
  isOpen: boolean;
  onClose: () => void;
}

const initCredential = { email: '', password: '' };
export default function LoginModal({ isOpen, onClose }: LoginModalProp) {
  const [credentials, setCredentials] = useState<CredentialProp>(initCredential);
  const { setAppInfo } = useAppContext();
  const [revealPassword, setRevealPassword] = useState(false);
  const [setupLogin, setSetupLogin] = useState(false);
  const [appState, setappState] = useState<AppState>(
    {
      loading: false, error: false, errMsg: ''
    }
  );

  const navigate = useNavigate();

  const { email, password } = credentials;

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      let result;
      if (setupLogin) {
        result = await appService.setup(credentials);
        toast.success('Config setup credential completed. Please log in');
        setSetupLogin(false);
      } else {
        result = await appService.login(credentials);
        toast.success('Log in successful');
        setCredentials(initCredential);
        navigate('/post-audio-book');
        setAppInfo(result.data);
        onClose();
      }
      setappState({ error: false, errMsg: '', loading: false });
    } catch (err: unknown) {
      const error = err as any;
      const message = error.response?.data?.error?.message || error?.message;
      setappState({ error: true, loading: false, errMsg: message });
      toast.error(message);
    }
  };
  
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const [name, value] = [e.target.name, e.target.value];
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const eyeIconClass = 'absolute right-2 top-[4.65rem] text-black opacity-70 cursor-pointer';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-3xl text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
        <div className="flex items-center justify-center mb-6">
          <Lock className="text-sky-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">{!setupLogin ? 'Login' : 'Setup Login'}</h2>
        </div>
        <form onSubmit={handleSubmit}
        className="flex flex-col"
        >
          <div className="mb-6 relative flex flex-col gap-3">
            <input
              type="email"
              value={email}
              onChange={handleInput}
              placeholder="johndoe@gmail.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none text-black"
              required
            />
            <input
              type={revealPassword ? "text" : "password"}
              value={password}
              onChange={handleInput}
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none text-black"
              required
            />
            {
              revealPassword ? 
                <EyeOffIcon 
                  className={eyeIconClass}
                  onClick={() => setRevealPassword(false)}
                />
                : <EyeIcon 
                  className={eyeIconClass}
                  onClick={() => setRevealPassword(true)}
                />
            }
          </div>

          <button 
          type='button'
          disabled={appState.loading}
          onClick={() => setSetupLogin((prev) => !prev)}
          className={`text-blue-600 focus:border-0 focus:outline-none focus:ring-0 hover:text-blue-700 ${setupLogin ? 'text-blue-900' : 'text-blue-600'} transition-colors underline underline-offset-2 self-end -mt-6 text-sm mb-3`}>setup login</button>

          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-3 rounded-lg font-semibold hover:bg-sky-700 transition-colors"
          >
            Submit{appState.loading ? 'ing...' : ''}
          </button>
        </form>
      </div>
    </div>
  );
}