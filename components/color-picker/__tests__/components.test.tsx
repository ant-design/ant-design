import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import ColorAlphaInput from '../components/ColorAlphaInput';
import ColorHexInput from '../components/ColorHexInput';
import ColorHsbInput from '../components/ColorHsbInput';
import ColorRgbInput from '../components/ColorRgbInput';
import ColorSteppers from '../components/ColorSteppers';

describe('ColorPicker Components test', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('Should ColorSteppers work correct', () => {
    const handleAlphaChange = jest.fn();
    const { container } = render(<ColorSteppers prefixCls="test" onChange={handleAlphaChange} />);
    expect(container.querySelector('.test-steppers')).toBeTruthy();
    fireEvent.change(container.querySelector('.test-steppers input')!, {
      target: { value: 1 },
    });
    expect(container.querySelector('.test-steppers input')?.getAttribute('value')).toEqual('1');
    expect(handleAlphaChange).toHaveBeenCalledTimes(1);
  });

  it('Should ColorAlphaInput work correct', () => {
    const handleAlphaChange = jest.fn();
    const { container } = render(<ColorAlphaInput prefixCls="test" onChange={handleAlphaChange} />);
    expect(container.querySelector('.test-alpha-input')).toBeTruthy();
    fireEvent.change(container.querySelector('.test-alpha-input input')!, {
      target: { value: 1 },
    });
    expect(container.querySelector('.test-alpha-input input')?.getAttribute('value')).toEqual('1%');
    expect(handleAlphaChange).toHaveBeenCalledTimes(1);
  });

  it('Should ColorHexInput work correct', () => {
    const handleAlphaChange = jest.fn();
    const { container } = render(<ColorHexInput prefixCls="test" onChange={handleAlphaChange} />);
    expect(container.querySelector('.test-hex-input')).toBeTruthy();
    fireEvent.change(container.querySelector('.test-hex-input input')!, {
      target: { value: 631515 },
    });
    expect(container.querySelector('.test-hex-input input')?.getAttribute('value')).toEqual(
      '631515',
    );
    expect(handleAlphaChange).toHaveBeenCalledTimes(1);
  });

  it('Should ColorHsbInput work correct', () => {
    const handleAlphaChange = jest.fn();
    const { container } = render(<ColorHsbInput prefixCls="test" onChange={handleAlphaChange} />);
    expect(container.querySelector('.test-hsb-input')).toBeTruthy();
    const hsbInputEls = container.querySelectorAll('.test-hsb-input input');
    fireEvent.change(hsbInputEls[0], {
      target: { value: 139 },
    });
    expect(hsbInputEls[0]?.getAttribute('value')).toEqual('139');

    fireEvent.change(hsbInputEls[1], {
      target: { value: 78 },
    });
    expect(hsbInputEls[1]?.getAttribute('value')).toEqual('78%');

    fireEvent.change(hsbInputEls[2], {
      target: { value: 39 },
    });
    expect(hsbInputEls[2]?.getAttribute('value')).toEqual('39%');
    expect(handleAlphaChange).toHaveBeenCalledTimes(3);
  });

  it('Should ColorRgbInput work correct', () => {
    const handleAlphaChange = jest.fn();
    const { container } = render(<ColorRgbInput prefixCls="test" onChange={handleAlphaChange} />);
    expect(container.querySelector('.test-rgb-input')).toBeTruthy();
    const rgbInputEls = container.querySelectorAll('.test-rgb-input input');
    fireEvent.change(rgbInputEls[0], {
      target: { value: 99 },
    });
    expect(rgbInputEls[0]?.getAttribute('value')).toEqual('99');

    fireEvent.change(rgbInputEls[1], {
      target: { value: 21 },
    });
    expect(rgbInputEls[1]?.getAttribute('value')).toEqual('21');

    fireEvent.change(rgbInputEls[2], {
      target: { value: 21 },
    });
    expect(rgbInputEls[2]?.getAttribute('value')).toEqual('21');
    expect(handleAlphaChange).toHaveBeenCalledTimes(3);
  });
});
