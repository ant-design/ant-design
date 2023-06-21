import React from 'react';
import { render } from '../../../tests/utils';

import Base from '../Base';

describe('Typography keep prefixCls', () => {
  describe('Base', () => {
    it('should support className when has prefix', () => {
      const { container: wrapper } = render(
        <Base component="p" prefixCls="custom-prefixCls" className="custom-class">
          test prefixCls
        </Base>,
      );
      expect(
        (wrapper.firstChild as HTMLElement)?.className.includes('custom-prefixCls'),
      ).toBeTruthy();
      expect((wrapper.firstChild as HTMLElement)?.className.includes('custom-class')).toBeTruthy();
    });
  });
});
