import { HTTPMethods } from "../utils";

const AudioBasePath = 'api/v1/audio';

export const Paths = {
  create: {
    endpoint: `${AudioBasePath}/create`,
    method: HTTPMethods.POST,
  },
  upload: {
    endpoint: `${AudioBasePath}/upload`,
    method: HTTPMethods.POST,
  },
  getAudio: {
    endpoint: `${AudioBasePath}/file`,
    method: HTTPMethods.GET,
  },
  getAllAudios: {
    endpoint: `${AudioBasePath}/`,
    method: HTTPMethods.GET,
  },
  getRecentAudiobooks: {
    endpoint: `${AudioBasePath}/recents`,
    method: HTTPMethods.GET,
  },
  getAudioRecommendations: {
    endpoint: `${AudioBasePath}/recommendations`,
    method: HTTPMethods.GET,
  },
  likeAudio: {
    endpoint: `${AudioBasePath}/like`,
    method: HTTPMethods.PATCH,
  },
  rateAudio: {
    endpoint: `${AudioBasePath}/rate`,
    method: HTTPMethods.PUT,
  },
  getUser: {
    endpoint: `${AudioBasePath}/user`,
    method: HTTPMethods.GET,
  },
};

const ChapterBasePath = 'api/v1/chapter';
export const ChapterPaths = {
  getChapterBySession: {
    endpoint: `${ChapterBasePath}/stream`,
    method: HTTPMethods.GET,
  },
  getChapterById: {
    endpoint: `${ChapterBasePath}`,
    method: HTTPMethods.GET,
  },
  removeChapter: {
    endpoint: `${ChapterBasePath}/remove`,
    method: HTTPMethods.POST,
  },
};

const AdminBasePath = 'api/v1/admin';
export const AdminPaths = {
  getAppDashboard: {
    endpoint: `${AdminBasePath}`,
    method: HTTPMethods.GET,
  },
  toggleBookStatus: {
    endpoint: `${AdminBasePath}/make-private`,
    method: HTTPMethods.PATCH,
  },
  delete: {
    endpoint: `${AdminBasePath}/delete`,
    method: HTTPMethods.DELETE,
  },
  contactRepliedTo: {
    endpoint: `${AdminBasePath}/contact-repliedTo`,
    method: HTTPMethods.PATCH,
  },
  getContact: {
    endpoint: `${AdminBasePath}/contact`,
    method: HTTPMethods.GET,
  },
  getContacts: {
    endpoint: `${AdminBasePath}/contacts`,
    method: HTTPMethods.GET,
  },
  deleteContact: {
    endpoint: `${AdminBasePath}/contact`,
    method: HTTPMethods.DELETE,
  },
};

const AppConfigBasePath = 'api/v1/config';
export const AppConfigPaths = {
  getAppConfig: {
    endpoint: `${AppConfigBasePath}/`,
    method: HTTPMethods.GET,
  },
  updateAppConfig: {
    endpoint: `${AppConfigBasePath}/`,
    method: HTTPMethods.PUT,
  },
  setup: {
    endpoint: `${AppConfigBasePath}/setup`,
    method: HTTPMethods.POST,
  },
  login: {
    endpoint: `${AppConfigBasePath}/login`,
    method: HTTPMethods.POST,
  },
  logout: {
    endpoint: `${AppConfigBasePath}/logout`,
    method: HTTPMethods.POST,
  },
};

const CommentBasePath = 'api/v1/comments';
export const CommentPaths = {
  create: {
    endpoint: CommentBasePath,
    method: HTTPMethods.POST,
  },
  getComment: {
    endpoint: `${CommentBasePath}/get`,
    method: HTTPMethods.GET,
  },
  getComments: {
    endpoint: `${CommentBasePath}/all`,
    method: HTTPMethods.GET,
  },
  like: {
    endpoint: `${CommentBasePath}/like`,
    method: HTTPMethods.PATCH,
  },
  delete: {
    endpoint: `${CommentBasePath}/delete`,
    method: HTTPMethods.DELETE,
  },
};

const ContactUsBasePath = 'api/v1/contactUs';
export const ContactUsPaths = {
  create: {
    endpoint: ContactUsBasePath,
    method: HTTPMethods.POST,
  },
};
