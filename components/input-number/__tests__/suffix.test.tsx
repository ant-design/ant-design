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
    fireEvent.mouseDown(container.querySelector('i')!);
    expect(mockFocus).toHaveBeenCalled();
  });

  it.each([
    ['controls=false', { controls: false }],
    // https://github.com/ant-design/ant-design/issues/53181
    ['disabled', { disabled: true }],
    // https://github.com/ant-design/ant-design/discussions/54583
    ['readOnly', { readOnly: true }],
  ])('should not show the control buttons when inputNumber is %s', (_, props) => {
    const { container } = render(<InputNumber suffix="RMB" style={{ width: '100%' }} {...props} />);
    expect(container.querySelector('.ant-input-number-without-controls')).toBeTruthy();
  });
});
