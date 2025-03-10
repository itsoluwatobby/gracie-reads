/* eslint-disable @typescript-eslint/no-explicit-any */
import { helper } from '../utils/helpers';
import { CacheKeys } from "../utils";

export type CachedKeyTypes = typeof CacheKeys[keyof typeof CacheKeys];

export const useLocalStorage= () => {

  function getCachedData<T>(key: CachedKeyTypes){
    const val = localStorage.getItem(key);
    return helper.jsonParseValue<T>(val!);
  }

  function cacheData<T>(key: CachedKeyTypes, data: T){
    try {
      // const dup = getCachedData(key);
      // if (dup) return;
      return localStorage.setItem(key, helper.stringifyData(data));
    } catch(error: any) {
      return error.message;
    }
  }
  
  function clearCache(key: CachedKeyTypes){
    localStorage.removeItem(key);
  }

  return { cacheData, getCachedData, clearCache };
}
