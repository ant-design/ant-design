import React from 'react';
import fetch from 'cross-fetch';

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
  return React.use<T>(cache.promise<T>(key, request));
};

export default useFetch;
