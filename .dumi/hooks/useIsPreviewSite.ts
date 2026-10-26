import * as React from 'react';

const subscribe = () => () => {};

const getSnapshot = () => {
  const { hostname } = window.location;
  return (
    /^(?:\d+-)?preview-\d+-ant-design\.surge\.sh$/.test(hostname) ||
    /\.ant-design\.pages\.dev$/.test(hostname)
  );
};

const getServerSnapshot = () => true;

export default function useIsPreviewSite() {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
