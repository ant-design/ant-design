import * as React from 'react';

/**
 * We will remove light way shake like:
 * errors -> none -> errors (in 100 ms)
 * to
 * errors (in 100 ms)
 */
function useDebounce<T>(content: T[], delay: number = 10): T[] {
  const [cache, setCache] = React.useState(content);

  // React hooks still have bug with unmount setState
  // https://github.com/facebook/react/issues/15057
  React.useEffect(() => {
    if (content.length) {
      setCache(content);
    } else {
      const timeout = setTimeout(() => {
        setCache(content);
      }, delay);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [content]);

  return cache;
}

/**
 * Cache latest errors and trigger change event if visible change
 */
export function useCacheErrors(
  errors: React.ReactNode[],
  changeTrigger: (visible: boolean) => void,
) {
  const debounceErrors = useDebounce(errors);
  const [cacheErrors, setCacheErrors] = React.useState(debounceErrors);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const newVisible = !!debounceErrors.length;
    if (debounceErrors.length) {
      setCacheErrors(debounceErrors);
    }
    if (newVisible !== visible) {
      changeTrigger(newVisible);
    }
    setVisible(newVisible);
  }, [debounceErrors]);

  return [visible, cacheErrors];
}

export function toArray<T>(candidate?: T | T[] | false): T[] {
  if (candidate === undefined || candidate === false) return [];

  return Array.isArray(candidate) ? candidate : [candidate];
}
