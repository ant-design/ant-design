import React from 'react';
import { render } from '@testing-library/react';

import Rate from '..';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

describe('Rate', () => {
  focusTest(Rate, { refFocus: true });
  mountTest(Rate);
  rtlTest(Rate);

  describe('size', () => {
    it('size=small', () => {
      const { container } = render(<Rate count={3} value={1} size="small" />);
      expect(container.querySelector('.ant-rate-small')).toBeTruthy();
    });
    it('size=large', () => {
      const { container } = render(<Rate count={3} value={1} size="large" />);
      expect(container.querySelector('.ant-rate-large')).toBeTruthy();
    });
  });
});
