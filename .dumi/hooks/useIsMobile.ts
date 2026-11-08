import React from 'react';

const breakPoint = 768;

const useIsMobile = () => {
  const mediaQuery = React.useMemo(() => {
    return typeof window === 'undefined'
      ? null
      : window.matchMedia(`not all and (min-width: ${breakPoint}px)`);
  }, []);

  const subscribe = React.useCallback(
    (onChange: () => void) => {
      mediaQuery?.addEventListener('change', onChange);
      return () => {
        mediaQuery?.removeEventListener('change', onChange);
      };
    },
    [mediaQuery],
  );

  // 客户端渲染时，使用媒体查询的匹配状态作为快照
  const getSnapshot = React.useCallback(() => mediaQuery?.matches ?? false, [mediaQuery]);

  // 服务端渲染时，返回默认值 false
  const getServerSnapshot = React.useCallback(() => false, []);

  return React.useSyncExternalStore<boolean>(subscribe, getSnapshot, getServerSnapshot);
};

export default useIsMobile;
