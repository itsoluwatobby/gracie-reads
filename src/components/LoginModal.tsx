import { ChangeEvent, useState } from "react";
import { Lock, EyeIcon, EyeOffIcon } from 'lucide-react';

type LoginModalProp = {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProp) {
  const [password, setPassword] = useState('');
  const [revealPassword, setRevealPassword] = useState(false);

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login submitted with password:', password);
    setPassword('');
    onClose();
  };

  const eyeIconClass = 'absolute right-2 top-3 text-black opacity-70 cursor-pointer';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
        <div className="flex items-center justify-center mb-6">
          <Lock className="text-sky-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-800">Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 relative">
            <input
              type={revealPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            type="submit"
            className="w-full bg-sky-600 text-white py-3 rounded-lg font-semibold hover:bg-sky-700 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}