/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosProgressEvent,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { HTTPMethods } from '../utils';
import toast from 'react-hot-toast';

export const BASE_URL = import.meta.env.VITE_BASE_URL as string;
export const STREAM_URI = `${BASE_URL}/api/v1/audio/stream`;

export const appRequest = async <T, K>(
  endpoint: string,
  data: T,
  method: AxiosRequestConfig['method'] = HTTPMethods.POST,
  responseType: 'json' | 'stream' = 'json',
  query: AxiosRequestConfig["params"] = {},
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
): Promise<AxiosResponse<K>> => {
  const URL = `${BASE_URL}/${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
  }

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

export async function asyncFunction<T>(callback: () => Promise<T>) {
  try {
    return callback();
  } catch (err: unknown) {
    console.log(err)
    // const error = err as ErrorResponse | { message: string };
    const message = 'er';
    // if (error?.response) message = error.response?.error?.message;
    // message = error?.message;
    toast.error(message);
    return;
  }
}
