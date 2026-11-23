import React from 'react';
import { canUseDom } from '@rc-component/util';

const getMediaQuery = () => {
  return canUseDom() ? window.matchMedia?.('(prefers-reduced-motion: reduce)') : undefined;
};

const subscribe = (onStoreChange: () => void) => {
  const mediaQuery = getMediaQuery();
  mediaQuery?.addEventListener('change', onStoreChange);
  return () => {
    mediaQuery?.removeEventListener('change', onStoreChange);
  };
};

// 客户端快照，获取当前用户的 prefers-reduced-motion 设置
const getSnapshot = () => getMediaQuery()?.matches ?? false;

// 服务端快照，默认返回 false
const getServerSnapshot = () => false;

export const useReducedMotion = () => {
  return React.useSyncExternalStore<boolean>(subscribe, getSnapshot, getServerSnapshot);
};
