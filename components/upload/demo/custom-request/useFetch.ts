/* eslint-disable no-await-in-loop */
import { useState, useEffect } from 'react';

type RetryOptions = {
  count: number;
  delay: number;
};

export type FetchWithRetryOptions = {
  retry?: number | RetryOptions;
} & RequestInit;

export const fetchWithRetry = async (
  url: string,
  options?: FetchWithRetryOptions,
): Promise<any> => {
  const { retry, ...fetchOptions } = options || {};

  const retries = typeof retry === 'number' ? retry : retry?.count || 3;
  const retryDelay = (typeof retry === 'object' && retry.delay) || 3000;

  let error = null;

  for (let i = 0; i <= retries; i++) {
    try {
      // eslint-disable-next-line compat/compat
      const response = await fetch(url, fetchOptions);
      const data = await response.json();
      return { data, response };
    } catch (e) {
      error = e;
    }

    if (i < retries) {
      await new Promise((resolve) => {
        setTimeout(resolve, retryDelay);
      });
    }
  }

  throw error;
};

const useFetchWithRetry = (url: string, options?: Omit<FetchWithRetryOptions, 'signal'>) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetchWithRetry(url, {
          ...options,
          signal: controller.signal,
        });
        setData(result);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }

      return () => controller.abort();
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useFetchWithRetry;
