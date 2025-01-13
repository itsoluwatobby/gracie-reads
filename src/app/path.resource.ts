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
  stream: {
    endpoint: `${AudioBasePath}/stream`,
    method: HTTPMethods.POST,
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
