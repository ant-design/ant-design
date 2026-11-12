import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import ColorAlphaInput from '../components/ColorAlphaInput';
import ColorHexInput from '../components/ColorHexInput';
import ColorHsbInput from '../components/ColorHsbInput';
import ColorInput from '../components/ColorInput';
import ColorRgbInput from '../components/ColorRgbInput';

jest.mock('../../input/Input', () => {
  const MockInput = ({ className, onChange }: any) => (
    <button
      type="button"
      className={className}
      onClick={() => onChange?.({ target: { value: '123456' } })}
    />
  );

  return {
    __esModule: true,
    default: MockInput,
  };
});

jest.mock('../../select', () => {
  const MockSelect = ({ className, onChange }: any) => (
    <button type="button" className={className} onClick={() => onChange?.('rgb')} />
  );

  return {
    __esModule: true,
    default: MockSelect,
  };
});

jest.mock('../components/ColorSteppers', () => {
  const MockColorSteppers = ({ className, onChange }: any) => (
    <button type="button" className={className} onClick={() => onChange?.(50)} />
  );

  return {
    __esModule: true,
    default: MockColorSteppers,
  };
});

describe('ColorPicker disabled component logic', () => {
  it('should not trigger ColorHexInput change when disabled', () => {
    const onChange = jest.fn();
    const { container } = render(<ColorHexInput prefixCls="test" disabled onChange={onChange} />);

    fireEvent.click(container.querySelector('.test-hex-input')!);

    expect(onChange).not.toHaveBeenCalled();
  });

  it('should not trigger ColorAlphaInput change when disabled', () => {
    const onChange = jest.fn();
    const { container } = render(<ColorAlphaInput prefixCls="test" disabled onChange={onChange} />);

    fireEvent.click(container.querySelector('button.test-alpha-input')!);

    expect(onChange).not.toHaveBeenCalled();
  });

  it('should not trigger ColorHsbInput change when disabled', () => {
    const onChange = jest.fn();
    const { container } = render(<ColorHsbInput prefixCls="test" disabled onChange={onChange} />);

    fireEvent.click(container.querySelector('button.test-hsb-input')!);

    expect(onChange).not.toHaveBeenCalled();
  });

  it('should not trigger ColorRgbInput change when disabled', () => {
    const onChange = jest.fn();
    const { container } = render(<ColorRgbInput prefixCls="test" disabled onChange={onChange} />);

    fireEvent.click(container.querySelector('button.test-rgb-input')!);

    expect(onChange).not.toHaveBeenCalled();
  });

  it('should trigger ColorInput format change when enabled', () => {
    const onFormatChange = jest.fn();
    const { container } = render(<ColorInput prefixCls="test" onFormatChange={onFormatChange} />);

    fireEvent.click(container.querySelector('.test-format-select')!);

    expect(onFormatChange).toHaveBeenCalledWith('rgb');
  });

  it('should not trigger ColorInput format change when disabled', () => {
    const onFormatChange = jest.fn();
    const { container } = render(
      <ColorInput prefixCls="test" disabled onFormatChange={onFormatChange} />,
    );

    fireEvent.click(container.querySelector('.test-format-select')!);

    expect(onFormatChange).not.toHaveBeenCalled();
  });
});
