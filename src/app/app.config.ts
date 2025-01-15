/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosProgressEvent,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { HTTPMethods } from '../utils';

export const BASE_URL = import.meta.env.VITE_BASE_URL as string;
export const STREAM_URI = `${BASE_URL}/api/v1/audio/stream`;

const header = {
  'Content-Type': 'application/json',
};

export const appRequest = async <T, K>(
  endpoint: string,
  data: T,
  method: AxiosRequestConfig['method'] = HTTPMethods.POST,
  responseType: 'json' | 'stream' = 'json',
  query: AxiosRequestConfig["params"] = {},
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
  headers: AxiosRequestConfig['headers'] = header,
): Promise<AxiosResponse<K>> => {
  const URL = `${BASE_URL}/${endpoint}`;

  const config: AxiosRequestConfig = {
    url: URL,
    method,
    data,
    headers,
    params: query,
    responseType,
    onUploadProgress,
  };

  return axios(config);
};
