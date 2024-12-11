import * as React from 'react';
import { render, unmount } from 'rc-util/lib/React/render';

export type UnmountType = () => Promise<void>;
export type RenderType = (node: React.ReactElement, container: HTMLElement) => UnmountType;

const defaultReactRender: RenderType = (node, container) => {
  render(node, container);
  return () => {
    return unmount(container);
  };
};

let unstableRender: RenderType = defaultReactRender;

/**
 * @deprecated Set React render function for compatible usage.
 * This is internal usage only. And will be removed in next major version.
 */
export function unstableSetRender(render: RenderType) {
  unstableRender = render;
}

export function getReactRender() {
  return unstableRender;
}
