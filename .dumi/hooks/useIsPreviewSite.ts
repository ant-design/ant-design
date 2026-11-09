import React from 'react';

const subscribe = () => () => {};

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
