const Chapter = {
  id: '',
  link: '',
  name: '',
  duration: '',
}

export const InitAudioBookState: AudioSchema = {
  id: '',
  thumbnail: '',
  author: '',
  about: '',
  createdAt: '',
  updatedAt: '', 
  genre: '',
  chapters: [Chapter],
  title: '',
  isPublic: false,
  dislikes: 0,
  downloads: 0,
  note: '',
  likes: 0,
  views: 0,
  reference: {
    siteName: '',
    link: '',
  },
}
