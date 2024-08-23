import React from 'react';

import InputNumber from '..';
import { fireEvent, render } from '../../../tests/utils';

describe('suffix', () => {
  it('should support suffix prop', () => {
    const { container } = render(<InputNumber suffix={<i>hello</i>} />);
    expect(container.querySelector('.ant-input-number-suffix')).toBeInTheDocument();
  });

  it('should trigger focus when suffix is clicked', () => {
    const { container } = render(<InputNumber suffix={<i>antd</i>} />);

    const mockFocus = jest.spyOn(container.querySelector('input')!, 'focus');
    fireEvent.click(container.querySelector('i')!);
    expect(mockFocus).toHaveBeenCalled();
  });

  it('should has classname when without controls', () => {
    const { container } = render(<InputNumber suffix={<i>antd</i>} controls={false} />);

    expect(
      container.querySelector('.ant-input-number-affix-wrapper-without-controls'),
    ).toBeTruthy();
  });
});
