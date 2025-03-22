/// <reference types="types.d.ts" />

type ScrollDirection = 'left' | 'right'

type Name = 'categories' | 'latest'
type CurrentModal = {
  nav: Name | null,
  currentGenre: string | null;
}

type Theme = 'light' | 'dark'
type AppContextProps = {
  appInfo: Partial<AppConfig>;
  // theme: Theme;
  mediaPlayer: MediaPlayerProp;
  toggleModal: boolean;
  // currentUser: string;
  isServerOnline: boolean;
  current: CurrentModal;
  // setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  setAppInfo: React.Dispatch<React.SetStateAction<Partial<AppConfig>>>;
  setCurrent: React.Dispatch<React.SetStateAction<CurrentModal>>;
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  setMediaPlayer: React.Dispatch<React.SetStateAction<MediaPlayerProp>>;
  deactivatePlayer: () => void;
}

type InputType = 'text' | 'number' | 'checkbox' | 'numeric' | 'date'

type NavProps = {
  name: string;
  link: string;
}

type AppState = {
  loading: boolean,
  error: boolean,
  errMsg: string
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
  link: string;
  assetId?: string;
  duration: string;
}

type ResponseData<DATA> = {
  timestamp: string;
  message: string;
  statusCode: number;
  data: DATA
}

type ErrorResponse = {
  response: {
    data: {
      timestamp: string;
      error: {
        statusCode: number;
        success: boolean;
        message: string;
      }
    }
  }
}

type Rating = { audioId: string, rating: number }
interface AudioSchema {
  _id?: string;
  thumbnail: string;
  author: string;
  about?: string;
  createdAt: string;
  updatedAt: string; 
  genre: string[];
  chapterId: string;
  title: string;
  isPublic: boolean;
  rating?: Rating[];
  comments?: string[];
  downloads?: number;
  note?: string;
  likes?: string[];
  views?: string[];
  reference?: {
    siteName: string;
    link: string;
  };
}

type AppConfig = {
  _id: string,
  name: string,
  appId: string,
  email: string,
  channel: string,
  genres: string[],
  createdAt: string,
  updatedAt: string,
  isLoggedIn: boolean;
  sessionId?: string;
}

type SESSION = {
  sessionId: string,
  timestamp: string,
  data: AudioSchema,
}
type LoadingStates = {
  isLoading: boolean;
  fileLoading: boolean;
}

type CredentialProp = {
  email:  string;
  password: string;
}

type ToggleGenreButton = 'add' | 'delete'

type PaginatedQueryResponseType = {
  page: number;
  limit: number;
  totalDocs: number;
  totalPages: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number;
  nextPage: number;
}

type PaginatedQueryType = {
  page: number;
  limit: number;
  isPublic: boolean;
}

type AudioTypes = {
  recent: AudioSchema[];
  featured: AudioSchema[];
}
