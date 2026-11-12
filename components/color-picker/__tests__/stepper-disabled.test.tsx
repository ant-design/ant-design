import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import ColorSteppers from '../components/ColorSteppers';

jest.mock('../../input-number', () => {
  const MockInputNumber = ({ className, disabled, onChange }: any) => (
    <button
      type="button"
      aria-disabled={disabled ? 'true' : 'false'}
      className={className}
      onClick={() => onChange?.(50)}
    />
  );

  return {
    __esModule: true,
    default: MockInputNumber,
  };
});

describe('ColorPicker ColorSteppers disabled logic', () => {
  it('should ignore stepper changes when disabled', () => {
    const onChange = jest.fn();
    const { container } = render(<ColorSteppers prefixCls="test" disabled onChange={onChange} />);

    fireEvent.click(container.querySelector('.test-steppers')!);

    expect(onChange).not.toHaveBeenCalled();
  });
});
