import React from 'react';

import { render } from '../../../tests/utils';
import ContextIsolator from '../ContextIsolator';

describe('ContextIsolator component', () => {
  it('ContextIsolator should work when Children is empty', () => {
    [undefined, null, false, ''].forEach((item) => {
      expect(() => {
        render(<ContextIsolator>{item}</ContextIsolator>);
      }).not.toThrow();
    });
  });
});
