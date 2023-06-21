import { useLocation as useDumiLocation } from 'dumi';
import * as React from 'react';
import useLocale from './useLocale';

function clearPath(path: string) {
  return path.replace('-cn', '').replace(/\/$/, '');
}

export default function useLocation() {
  const location = useDumiLocation();
  const { search } = location;
  const [, localeType] = useLocale();

  const getLink = React.useCallback(
    (path: string, hash?: string | { cn: string; en: string }) => {
      let pathname = clearPath(path);

      if (localeType === 'cn') {
        pathname = `${pathname}-cn`;
      }

      if (search) {
        pathname = `${pathname}${search}`;
      }

      if (hash) {
        let hashStr: string;
        if (typeof hash === 'object') {
          hashStr = hash[localeType];
        } else {
          hashStr = hash;
        }

        pathname = `${pathname}#${hashStr}`;
      }

      return pathname;
    },
    [localeType, search],
  );

  return {
    ...location,
    pathname: clearPath(location.pathname),
    getLink,
  };
}
