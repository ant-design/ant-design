import fetch from 'cross-fetch';

import use from '../use';
import FetchCache from './cache';

const cache = new FetchCache();

const useFetch = <T>(options: string | { request: () => PromiseLike<T>; key: string }) => {
  let request;
  let key;
  if (typeof options === 'string') {
    request = () => fetch(options).then((res) => res.json());
    key = options;
  } else {
    request = options.request;
    key = options.key;
  }
  return use(cache.promise<T>(key, request));
};

export default useFetch;
