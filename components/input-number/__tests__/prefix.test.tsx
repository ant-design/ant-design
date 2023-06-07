import React, { forwardRef } from 'react';
import InputNumber from '..';
import focusTest from '../../../tests/shared/focusTest';
import { fireEvent, render } from '../../../tests/utils';

describe('prefix', () => {
  focusTest(
    forwardRef((props, ref) => <InputNumber {...props} prefix="A" ref={ref} />),
    { refFocus: true },
  );
  it('should support className when has prefix', () => {
    const { container } = render(<InputNumber prefix="suffix" className="my-class-name" />);
    expect((container.firstChild as HTMLElement)?.className.includes('my-class-name')).toBe(true);
    expect(container.querySelector('input')?.className.includes('my-class-name')).toBe(false);
  });

  it('should trigger focus when prefix is clicked', () => {
    const { container } = render(<InputNumber prefix={<i>123</i>} />);

    const mockFocus = jest.spyOn(container.querySelector('input')!, 'focus');
    fireEvent.mouseUp(container.querySelector('i')!);
    expect(mockFocus).toHaveBeenCalled();
  });
});
