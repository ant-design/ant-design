/* eslint-disable import/prefer-default-export */
import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { createRoot, Root } from 'react-dom/client';

const MARK = '__antd_react_root__';

type ContainerType = (Element | DocumentFragment) & {
  [MARK]?: Root;
};

export function reactRender(node: React.ReactElement, container: ContainerType) {
  if (createRoot !== undefined) {
    const root = container[MARK] || createRoot(container);
    root.render(node);

    container[MARK] = root;
    return;
  }

  render(node, container);
}

export function reactUnmount(container: ContainerType) {
  if (createRoot !== undefined) {
    // Delay to unmount to avoid React 18 sync warning
    Promise.resolve().then(() => {
      container[MARK]?.unmount();

      delete container[MARK];
    });

    return;
  }

  unmountComponentAtNode(container);
}
