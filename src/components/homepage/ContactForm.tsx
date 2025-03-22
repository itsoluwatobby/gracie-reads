/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { initAppState } from '../../utils/initStates';
import toast from 'react-hot-toast';
import { appService } from '../../app/appService';

export default function ContactForm() {
  const [appState, setAppState] = useState(initAppState);
  const [formData, setFormData] = useState(
    {
      name: '',
      email: '',
      message: ''
    },
  );

  const canSubmit = [...Object.values(formData)].every(Boolean);
   
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || appState.loading) return;

    try {
      setAppState((prev) => ({ ...prev, loading: true }));
      await appService.getAudioChapterById('');

      console.log('Form submitted:', formData);
      // Reset form
      setFormData({ name: '', email: '', message: '' });
    } catch(err: any) {
      const error = err as any;
      const message = error.response?.data?.error?.message || error?.message;
      setAppState((prev) => ({ ...prev, error: true, errMsg: message }));
      toast.error(message);
    } finally {
      setAppState((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <section className="absolute right-6 bottom-10 shadow-lg rounded-md pb-6 pt-3 bg-white w-[24rem] max-w-[25rem]">
      <div className="container text-sm mx-auto px-4">
        <div className="mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Contact Us</h2>
          <p className="text-gray-600 mb-6">Have questions or requests? We'd love to hear from you.</p>
          
          <form onSubmit={handleSubmit} className="bg-white text-black rounded-xl px-3 text-[13px]">
            <div className="space-y-3">
              <div>
                <label htmlFor="name" className="block font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  required
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full p-2 rounded-lg border border-gray-300 resize-none focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-sky-600 text-white py-3 rounded-lg font-semibold hover:bg-sky-700 transition-colors flex items-center justify-center"
              >
                <Send size={18} className="mr-2" />
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}