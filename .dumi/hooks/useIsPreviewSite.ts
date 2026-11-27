import React from 'react';

const subscribe = (onStoreChange: () => void) => {
  if (typeof window === 'undefined') {
    return () => {};
  }
  window.addEventListener('popstate', onStoreChange);
  window.addEventListener('pageshow', onStoreChange);
  return () => {
    window.removeEventListener('popstate', onStoreChange);
    window.removeEventListener('pageshow', onStoreChange);
  };
};

// 客户端渲染时，使用 window.location.hostname 作为快照
const getSnapshot = () => {
  const { hostname } = window.location;
  return (
    /^(?:\d+-)?preview-\d+-ant-design\.surge\.sh$/.test(hostname) ||
    /\.ant-design\.pages\.dev$/.test(hostname)
  );
};

// 服务端渲染时，默认返回 true
const getServerSnapshot = () => true;

const useIsPreviewSite = () => {
  return React.useSyncExternalStore<boolean>(subscribe, getSnapshot, getServerSnapshot);
};

export default useIsPreviewSite;
