import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { AggregationColor } from '../color';
import PanelPicker from '../components/PanelPicker';
import GradientColorBar from '../components/PanelPicker/GradientColorBar';
import { PanelPickerContext } from '../context';
import type { PanelPickerContextProps } from '../context';
import { generateColor } from '../util';

jest.mock('@rc-component/color-picker', () => {
  const actual = jest.requireActual('@rc-component/color-picker');

  const MockRcColorPicker = ({ disabled, onChange, onChangeComplete }: any) => (
    <div data-disabled={disabled ? 'true' : 'false'}>
      <button
        type="button"
        className="mock-picker-change"
        onClick={() => onChange?.({}, { type: 'hue', value: 120 })}
      />
      <button
        type="button"
        className="mock-picker-complete"
        onClick={() => onChangeComplete?.({}, { type: 'alpha', value: 50 })}
      />
    </div>
  );

  return {
    __esModule: true,
    ...actual,
    default: MockRcColorPicker,
  };
});

jest.mock('../components/ColorInput', () => {
  const MockColorInput = ({ onChange }: any) => (
    <button type="button" className="mock-input-change" onClick={() => onChange?.({})} />
  );

  return {
    __esModule: true,
    default: MockColorInput,
  };
});

jest.mock('../components/ColorSlider', () => {
  const MockColorSlider = () => null;

  const MockGradientColorSlider = ({
    disabled,
    onChangeComplete,
    onDragChange,
    onDragStart,
    onKeyDelete,
  }: any) => (
    <div data-disabled={disabled ? 'true' : 'false'}>
      <button
        type="button"
        className="mock-gradient-start"
        onClick={() =>
          onDragStart?.({ rawValues: [0, 50, 100], draggingIndex: 1, draggingValue: 50 })
        }
      />
      <button
        type="button"
        className="mock-gradient-change"
        onClick={() => onDragChange?.({ deleteIndex: -1, draggingIndex: 1, draggingValue: 60 })}
      />
      <button type="button" className="mock-gradient-delete" onClick={() => onKeyDelete?.(1)} />
      <button
        type="button"
        className="mock-gradient-complete"
        onClick={() => onChangeComplete?.([0, 100])}
      />
    </div>
  );

  return {
    __esModule: true,
    default: MockColorSlider,
    GradientColorSlider: MockGradientColorSlider,
  };
});

const createPanelContext = (
  overrides: Partial<PanelPickerContextProps> = {},
): PanelPickerContextProps => ({
  prefixCls: 'ant-color-picker',
  allowClear: false,
  disabled: true,
  disabledAlpha: false,
  mode: 'single',
  onModeChange: jest.fn(),
  modeOptions: [
    { label: 'Single', value: 'single' },
    { label: 'Gradient', value: 'gradient' },
  ],
  value: generateColor('#1677ff'),
  onChange: jest.fn(),
  onChangeComplete: jest.fn(),
  format: 'hex',
  onFormatChange: jest.fn(),
  activeIndex: 0,
  onActive: jest.fn(),
  gradientDragging: false,
  onGradientDragging: jest.fn(),
  ...overrides,
});

const renderPanelPicker = (contextValue: PanelPickerContextProps) =>
  render(
    <PanelPickerContext.Provider value={contextValue}>
      <PanelPicker />
    </PanelPickerContext.Provider>,
  );

describe('ColorPicker panel disabled logic', () => {
  it('should ignore picker and input events when disabled', () => {
    const onChange = jest.fn();
    const onChangeComplete = jest.fn();
    const contextValue = createPanelContext({ onChange, onChangeComplete });
    const { container } = renderPanelPicker(contextValue);

    fireEvent.click(container.querySelector('.mock-picker-change')!);
    fireEvent.click(container.querySelector('.mock-picker-complete')!);
    fireEvent.click(container.querySelector('.mock-input-change')!);

    expect(onChange).not.toHaveBeenCalled();
    expect(onChangeComplete).not.toHaveBeenCalled();
  });

  it('should ignore gradient drag events when disabled', () => {
    const onChange = jest.fn();
    const onChangeComplete = jest.fn();
    const onActive = jest.fn();
    const onGradientDragging = jest.fn();
    const value = new AggregationColor([
      { percent: 0, color: '#ff0000' },
      { percent: 100, color: '#0000ff' },
    ]);

    const { container } = render(
      <GradientColorBar
        {...createPanelContext({
          mode: 'gradient',
          value,
          onChange,
          onChangeComplete,
          onActive,
          onGradientDragging,
          activeIndex: 1,
        })}
        colors={value.getColors()}
      />,
    );

    fireEvent.click(container.querySelector('.mock-gradient-start')!);
    fireEvent.click(container.querySelector('.mock-gradient-change')!);
    fireEvent.click(container.querySelector('.mock-gradient-delete')!);
    fireEvent.click(container.querySelector('.mock-gradient-complete')!);

    expect(onChange).not.toHaveBeenCalled();
    expect(onChangeComplete).not.toHaveBeenCalled();
    expect(onActive).not.toHaveBeenCalled();
    expect(onGradientDragging.mock.calls).toEqual([[false]]);
  });

  it('should reset gradient dragging when disabled during complete', () => {
    const onChange = jest.fn();
    const onChangeComplete = jest.fn();
    const onGradientDragging = jest.fn();
    const value = new AggregationColor([
      { percent: 0, color: '#ff0000' },
      { percent: 100, color: '#0000ff' },
    ]);

    const { container, rerender } = render(
      <GradientColorBar
        {...createPanelContext({
          disabled: false,
          mode: 'gradient',
          value,
          onChange,
          onChangeComplete,
          onGradientDragging,
        })}
        colors={value.getColors()}
      />,
    );

    fireEvent.click(container.querySelector('.mock-gradient-start')!);

    rerender(
      <GradientColorBar
        {...createPanelContext({
          disabled: true,
          mode: 'gradient',
          value,
          onChange,
          onChangeComplete,
          onGradientDragging,
        })}
        colors={value.getColors()}
      />,
    );

    fireEvent.click(container.querySelector('.mock-gradient-complete')!);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChangeComplete).not.toHaveBeenCalled();
    expect(onGradientDragging.mock.calls).toEqual([[true], [false]]);
  });
});
