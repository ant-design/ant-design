/* eslint-disable */
import * as React from 'react';
import { AntTreeNodeProps } from '../Tree';

describe('Tree TypeScript Test', async () => {
  it('AntTreeNodeProps', () => {
    const tree: AntTreeNodeProps = {
      children: [React.createElement('h1')],
    };

    expect(tree).toBeTruthy();
  });
});
