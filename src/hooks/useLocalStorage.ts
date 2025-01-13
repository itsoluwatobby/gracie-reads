/* eslint-disable @typescript-eslint/no-explicit-any */
import { helper } from '../utils/helpers';

export const useLocalStorage= () => {

  function getCachedData<T>(key: string){
    const val = localStorage.getItem(key);
    return helper.jsonParseValue<T>(val!);
  }

  function cacheData<T>(key: string, data: T){
    try {
      // const dup = getCachedData(key);
      // if (dup) return;
      return localStorage.setItem(key, helper.stringifyData(data));
    } catch(error: any) {
      return error.message;
    }
  }
  
  function clearCache(key: string){
    localStorage.removeItem(key);
  }

  return { cacheData, getCachedData, clearCache };
}
