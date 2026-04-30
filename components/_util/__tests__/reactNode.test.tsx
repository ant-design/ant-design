import React from 'react';

import { cloneElement, isFragment, isValidReactNode, replaceElement } from '../reactNode';

describe('reactNode test', () => {
  it('isFragment', () => {
    expect(isFragment(<p>test</p>)).toBe(false);
    expect(isFragment(<>test</>)).toBe(true);
  });
  it('isValidReactNode', () => {
    expect(isValidReactNode(null)).toBe(false);
    expect(isValidReactNode(undefined)).toBe(false);
    expect(isValidReactNode(false)).toBe(false);
    expect(isValidReactNode(true)).toBe(false);
    expect(isValidReactNode('')).toBe(false);
    expect(isValidReactNode(0)).toBe(true);
    expect(isValidReactNode('test')).toBe(true);
    expect(isValidReactNode(<p>test</p>)).toBe(true);
  });
  it('replaceElement', () => {
    const node = <p>test</p>;
    expect(replaceElement(null, node)).toBe(node);
    expect(replaceElement(node, node)).toStrictEqual(node);
  });
  it('cloneElement', () => {
    const node = <p>test</p>;
    expect(cloneElement(null)).toBe(null);
    expect(cloneElement(node)).toStrictEqual(node);
  });
});
