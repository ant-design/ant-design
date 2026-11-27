import React from 'react';
import { canUseDom } from '@rc-component/util';

export type Theme = 'light' | 'dark';

export type ThemePreference = Theme | 'auto';

const getMediaQuery = () => {
  return canUseDom() ? window.matchMedia?.('(prefers-color-scheme: dark)') : undefined;
};

const subscribe = (onChange: () => void) => {
  const mediaQuery = getMediaQuery();
  mediaQuery?.addEventListener('change', onChange);
  return () => {
    mediaQuery?.removeEventListener('change', onChange);
  };
};

// 客户端渲染时，根据系统偏好获取主题
const getSnapshot = (): Theme => (getMediaQuery()?.matches ? 'dark' : 'light');

// 服务端渲染时，默认使用 light 主题
const getServerSnapshot = (): Theme => 'light';

const useTheme = (preference: ThemePreference = 'auto'): Theme => {
  const systemTheme = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return preference === 'auto' ? systemTheme : preference;
};

export default useTheme;
