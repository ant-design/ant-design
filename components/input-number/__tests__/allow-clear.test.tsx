import React from 'react';
import { CloseCircleFilled } from '@ant-design/icons';

import InputNumber from '..';
import { fireEvent, render } from '../../../tests/utils';

describe('InputNumber.AllowClear', () => {
  it('should support allowClear', () => {
    const onChange = jest.fn();
    const { container } = render(<InputNumber allowClear defaultValue={1} onChange={onChange} />);

    // Should have clear icon
    expect(container.querySelector('.ant-input-number-clear-icon')).toBeTruthy();

    // Click clear icon
    fireEvent.click(container.querySelector('.ant-input-number-clear-icon')!);

    // Should call onChange with null
    expect(onChange).toHaveBeenCalledWith(null);

    // Should focus input after clear
    expect(document.activeElement).toBe(container.querySelector('input'));
  });

  it('should not show clear icon when value is null', () => {
    const { container } = render(<InputNumber allowClear value={null} />);

    // Should not have clear icon
    expect(container.querySelector('.ant-input-number-clear-icon')).toBeFalsy();
  });

  it('should not show clear icon when value is undefined', () => {
    const { container } = render(<InputNumber allowClear value={undefined} />);

    // Should not have clear icon
    expect(container.querySelector('.ant-input-number-clear-icon')).toBeFalsy();
  });

  it('should support custom clearIcon', () => {
    const { container } = render(
      <InputNumber allowClear={{ clearIcon: <CloseCircleFilled /> }} defaultValue={1} />,
    );

    // Should have custom clear icon
    expect(container.querySelector('.anticon-close-circle')).toBeTruthy();
  });

  it('should not show clear icon when disabled', () => {
    const { container } = render(<InputNumber allowClear defaultValue={1} disabled />);

    // Should not have clear icon
    expect(container.querySelector('.ant-input-number-clear-icon')).toBeFalsy();
  });

  it('should not show clear icon when readOnly', () => {
    const { container } = render(<InputNumber allowClear defaultValue={1} readOnly />);

    // Should not have clear icon
    expect(container.querySelector('.ant-input-number-clear-icon')).toBeFalsy();
  });
});
