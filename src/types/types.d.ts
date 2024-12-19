/// <reference types="types.d.ts" />

type ScrollDirection = 'left' | 'right'

type Theme = 'light' | 'dark'
type AppContextProps = {
  appInfo: { name: string, email: string, workPlace: string };
  theme: Theme;
  toggleModal: boolean;
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
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

interface AudioSchema {
  id?: string;
  thumbnail: string;
  author: string;
  createdAt: string;
  updatedAt: string; 
  genre: string;
  audioLink: string;
  title: string;
  isPublic: boolean;
  dislikes?: number
  downloads?: number;
  note?: string;
  likes?: number;
  views?: number;
  reference?: {
    siteName: string;
    link: string;
  };
}
