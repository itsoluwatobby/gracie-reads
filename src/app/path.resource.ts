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
  delete: {
    endpoint: `${AudioBasePath}/delete`,
    method: HTTPMethods.DELETE,
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
};
