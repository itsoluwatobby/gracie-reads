// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "lovely-audios.firebaseapp.com",
  projectId: "lovely-audios",
  storageBucket: "lovely-audios.firebasestorage.app",
  messagingSenderId: "793454761748",
  appId: "1:793454761748:web:052c983908d891628a1401",
  measurementId: "G-CD1RVD38XL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const fileStorage = getStorage();
