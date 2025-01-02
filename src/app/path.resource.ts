import { HTTPMethods } from "../utils";

const BasePath = 'api/v1';
export const Paths = {
  create: {
    endpoint: `${BasePath}/create`,
    method: HTTPMethods.POST,
  },
  upload: {
    endpoint: `${BasePath}/upload`,
    method: HTTPMethods.POST,
  },
  getAudio: {
    endpoint: `${BasePath}/file`,
    method: HTTPMethods.GET,
  },
  getAllAudios: {
    endpoint: `${BasePath}/`,
    method: HTTPMethods.GET,
  },
  stream: {
    endpoint: `${BasePath}/stream`,
    method: HTTPMethods.POST,
  },
};
