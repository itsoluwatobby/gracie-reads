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

export const PaginatedQuery = {
  page: 1,
  limit: 10,
  isPublic: true,
};

export const PaginatedQueryResponse = {
  page: 0,
  limit: 0,
  totalDocs: 0,
  totalPages: 0,
  pagingCounter: 1,
  hasPrevPage: false,
  hasNextPage: false,
  prevPage: 0,
  nextPage: 0
};
