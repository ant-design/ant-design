/* eslint-disable import/prefer-default-export */
import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { createRoot, Root } from 'react-dom/client';

const MARK = '__antd_react_root__';

export function reactRender(node: React.ReactElement, container: Element | DocumentFragment) {
  if (createRoot !== undefined) {
    const root: Root = (container as any)[MARK] || createRoot(container);
    root.render(node);

    (container as any)[MARK] = root;
    return;
  }

  render(node, container);
}

export function reactUnmount(container: Element | DocumentFragment) {
  if (createRoot !== undefined) {
    // Delay to unmount to avoid React 18 sync warning
    Promise.resolve().then(() => {
      (container as any)[MARK]?.unmount();
    });

    return;
  }

  unmountComponentAtNode(container);
}
