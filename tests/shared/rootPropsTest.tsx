/* eslint-disable global-require, import/no-dynamic-require, jest/no-export */
import React from 'react';
import { render } from '../utils';

export default function rootPropsTest(component: string) {
  const Component = require(`./components/${component}`).default as any;

  console.log(Component);

  describe('RootProps', () => {
    it('rootClassName', () => {
      const { container } = render(<Component />);
      console.log('>>>', container.innerHTML);
    });
  });
}
