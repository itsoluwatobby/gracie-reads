import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { HTTPMethods } from '../utils';

export const appRequest = async <T, K>(
  endpoint: string,
  data: T,
  method: AxiosRequestConfig['method'] = HTTPMethods.POST,
  responseType: 'json' | 'stream' = 'json',
  query: AxiosRequestConfig["params"] = {},
): Promise<AxiosResponse<K>> => {
  const URL = `${import.meta.env.VITE_BASE_URL}/${endpoint}`;
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
  };

  return axios(config);
};
