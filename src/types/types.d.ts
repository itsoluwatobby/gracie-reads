/// <reference types="types.d.ts" />

type ScrollDirection = 'left' | 'right'

type Theme = 'light' | 'dark'
type AppContextProps = {
  appInfo: { name: string, email: string, workPlace: string };
  theme: Theme;
  toggleModal: boolean;
  mediaPlayer: MediaPlayerProp;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  setMediaPlayer: React.Dispatch<React.SetStateAction<MediaPlayerProp>>;
  deactivatePlayer: () => void;
}

type InputType = 'text' | 'number' | 'checkbox' | 'numeric' | 'date'

type NavProps = {
  name: string;
  link: string;
}

type SocialProps = {
  id: number;
  Icon: IconType;
  link: string;
  name: string;
}

type IntersectingProp = {
  isIntersecting: boolean;
  node: Element;
}

type ImageReturnType = { status: string, url: string }

type MediaPlayerProp = {
  startPlayer: boolean,
  audioPaused: boolean,
  audioSource: string,
  // length: number;
}

type ArrowDirection = 'upward' | 'downward';
type ArrowButton = {
  direction: ArrowDirection;
  chapterId: string;
}

type Chapter = {
  _id: string;
  sessionId: string;
  audioId: string;
  chapters: Episode[],
  createdAt: string;
  updatedAt: string;
}

type Episode = {
  _id: string;
  episode: number;
  filename: string;
  duration: string;
}

type ResponseData<DATA> = {
  timestamp: string;
  message: string;
  statusCode: number;
  data: DATA
}

type ErrorResponse = {
  timestamp: string;
  error: {
    statusCode: number;
    success: boolean;
    message: string;
  }
}

interface AudioSchema {
  _id?: string;
  thumbnail: string;
  author: string;
  about?: string;
  createdAt: string;
  updatedAt: string; 
  genre: string;
  chapterId: string;
  title: string;
  isPublic: boolean;
  rating?: number
  downloads?: number;
  note?: string;
  likes?: number;
  views?: number;
  reference?: {
    siteName: string;
    link: string;
  };
}
