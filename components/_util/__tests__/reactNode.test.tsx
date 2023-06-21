import React from 'react';
import { isValidElement, cloneElement, isFragment, replaceElement } from '../reactNode';

describe('reactNode test', () => {
  it('isValidElement', () => {
    expect(isValidElement(null)).toBe(false);
    expect(isValidElement(<p>test</p>)).toBe(true);
  });
  it('isFragment', () => {
    expect(isFragment(<p>test</p>)).toBe(false);
    expect(isFragment(<>test</>)).toBe(true);
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
