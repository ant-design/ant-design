import * as React from 'react';

export type LoadingType = boolean | { delay?: number };

export function useLoading(value?: LoadingType) {
  const [loading, setLoading] = React.useState(value);
  let delayTimeout: number;

  React.useEffect(() => {
    if (value && typeof value !== 'boolean') {
      clearTimeout(delayTimeout);
    }
    if (value && typeof value !== 'boolean' && value.delay) {
      delayTimeout = window.setTimeout(() => {
        setLoading(value);
      }, value.delay);
    } else if (value !== loading) {
      setLoading(value);
    }
  }, [value]);

  return loading;
}
