import React from 'react';
import Icon from '..';
import { render } from '../../../tests/utils';

// v3 兼容性测试
describe('Icon', () => {
  it('should render Icon', () => {
    const { container } = render(<Icon />);
    expect(container.firstChild).toBe(null);
  });
});
