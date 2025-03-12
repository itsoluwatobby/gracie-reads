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
  getAudioRecommendations: {
    endpoint: `${AudioBasePath}/recommendations`,
    method: HTTPMethods.GET,
  },
  delete: {
    endpoint: `${AudioBasePath}/delete`,
    method: HTTPMethods.DELETE,
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
