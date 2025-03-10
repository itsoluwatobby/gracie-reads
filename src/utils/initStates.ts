// const Chapter = {
//   id: '',
//   link: '',
//   name: '',
//   duration: '',
// }

export const InitAudioBookState: AudioSchema = {
  _id: '',
  thumbnail: '',
  author: '',
  about: '',
  createdAt: '',
  updatedAt: '', 
  genre: [],
  chapterId: '',
  title: '',
  isPublic: false,
  rating: [],
  downloads: 0,
  note: '',
  likes: [],
  views: [],
  reference: {
    siteName: '',
    link: '',
  },
}

export const initAppState = {
  loading: false,
  error: false,
  errMsg: ''
};
