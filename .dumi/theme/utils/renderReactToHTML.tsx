import type React from 'react';
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';

// 这个方法是将 React 组件转换为 HTML 字符串，作用和 renderToString API 一样
// 根据 React 官方文档的解释，不建议在客户端使用 renderToString API，所以这里使用 createRoot + innerHTML 的方式来实现
// https://zh-hans.react.dev/reference/react-dom/server/renderToString
export const renderReactToHTMLString = (node: React.ReactNode) => {
  const div = document.createElement('div');
  const root = createRoot(div);
  // eslint-disable-next-line react-dom/no-flush-sync
  flushSync(() => {
    root.render(node);
  });
  const html = div.innerHTML;
  root.unmount();
  return html;
};
