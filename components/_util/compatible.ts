/* eslint-disable import/prefer-default-export */
import * as React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import type { Root } from 'react-dom/client';
// import * as reactDomClient from 'react-dom/client';

let createRoot: (container: ContainerType) => Root;
try {
  // eslint-disable-next-line global-require, import/no-unresolved
  createRoot = require('react-dom/client').createRoot;
} catch (e) {
  // Do nothing;
}

const MARK = '__antd_react_root__';

type ContainerType = (Element | DocumentFragment) & {
  [MARK]?: Root;
};

export function reactRender(node: React.ReactElement, container: ContainerType) {
  // React 17 test will not reach here
  /* istanbul ignore next */
  if (createRoot !== undefined) {
    const root = container[MARK] || createRoot(container);
    root.render(node);

    container[MARK] = root;
    return;
  }

  render(node, container);
}

export function reactUnmount(container: ContainerType) {
  // React 17 test will not reach here
  /* istanbul ignore next */
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
