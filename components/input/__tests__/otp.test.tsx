import React from 'react';

import Input from '..';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { createEvent, fireEvent, render, waitFakeTimer } from '../../../tests/utils';

const { OTP } = Input;

describe('Input.OTP', () => {
  focusTest(Input.OTP, { refFocus: true });
  mountTest(Input.OTP);
  rtlTest(Input.OTP);

  const getText = (container: HTMLElement) => {
    const inputList = container.querySelectorAll<HTMLInputElement>('input');
    return Array.from(inputList)
      .map((input) => input.value || ' ')
      .join('')
      .replace(/\s*$/, '');
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('paste to fill all', async () => {
    const onChange = jest.fn();
    const { container } = render(<OTP onChange={onChange} />);

    fireEvent.input(container.querySelector('input')!, { target: { value: '123456' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('123456');
  });

  it('fill step by step', () => {
    const CODE = 'BAMBOO';
    const onChange = jest.fn();
    render(<OTP onChange={onChange} autoFocus />);

    for (let i = 0; i < CODE.length; i += 1) {
      expect(onChange).not.toHaveBeenCalled();
      fireEvent.input(document.activeElement!, { target: { value: CODE[i] } });
    }

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(CODE);
  });

  it('backspace to delete', async () => {
    const CODE = 'LITTLE';

    const onChange = jest.fn();
    const { container } = render(<OTP defaultValue={CODE} onChange={onChange} />);
    expect(getText(container)).toBe(CODE);

    // Focus on the last cell
    const inputList = container.querySelectorAll('input');
    inputList[inputList.length - 1].focus();

    for (let i = 0; i < CODE.length; i += 1) {
      fireEvent.keyDown(document.activeElement!, { key: 'Backspace' });
      fireEvent.input(document.activeElement!, { target: { value: '' } });
      fireEvent.keyUp(document.activeElement!, { key: 'Backspace' });
    }

    expect(getText(container)).toBe('');

    // We do not trigger change if empty. It's safe to modify this logic if needed.
    expect(onChange).not.toHaveBeenCalled();
  });

  it('controlled', () => {
    const { container, rerender } = render(<OTP value="BAMBOO" />);
    expect(getText(container)).toBe('BAMBOO');

    rerender(<OTP value="LITTLE" />);
    expect(getText(container)).toBe('LITTLE');

    rerender(<OTP value="" />);
    expect(getText(container)).toBe('');

    rerender(<OTP value="EXCEED-RANGE" />);
    expect(getText(container)).toBe('EXCEED');

    rerender(<OTP value={null!} />);
    expect(getText(container)).toBe('');
  });

  it('focus to selection', async () => {
    const { container } = render(<OTP defaultValue="BAMBOO" />);

    const firstInput = container.querySelector('input')!;
    const selectSpy = jest.spyOn(firstInput, 'select');
    expect(selectSpy).not.toHaveBeenCalled();

    // Trigger focus
    firstInput.focus();
    await waitFakeTimer();

    expect(selectSpy).toHaveBeenCalled();
  });

  it('arrow key to switch', () => {
    const { container } = render(<OTP autoFocus />);

    const inputList = Array.from(container.querySelectorAll('input'));
    expect(document.activeElement).toEqual(inputList[0]);

    fireEvent.keyDown(document.activeElement!, { key: 'ArrowRight' });
    expect(document.activeElement).toEqual(inputList[1]);

    fireEvent.keyDown(document.activeElement!, { key: 'ArrowLeft' });
    expect(document.activeElement).toEqual(inputList[0]);
  });

  it('fill last cell', () => {
    const { container } = render(<OTP />);
    fireEvent.input(container.querySelectorAll('input')[5], { target: { value: '1' } });

    expect(getText(container)).toBe('     1');
  });

  it('formatter', () => {
    const { container } = render(
      <OTP defaultValue="bamboo" formatter={(val) => val.toUpperCase()} />,
    );
    expect(getText(container)).toBe('BAMBOO');

    // Type to trigger formatter
    fireEvent.input(container.querySelector('input')!, { target: { value: 'little' } });
    expect(getText(container)).toBe('LITTLE');
  });

  it('support mask prop', () => {
    // default
    const { container, rerender } = render(<OTP defaultValue="bamboo" />);
    expect(getText(container)).toBe('bamboo');

    // support string
    rerender(<OTP defaultValue="bamboo" mask="*" />);
    expect(getText(container)).toBe('******');

    // support emoji
    rerender(<OTP defaultValue="bamboo" mask="🔒" />);
    expect(getText(container)).toBe('🔒🔒🔒🔒🔒🔒');
  });

  it('should throw Error when mask.length > 1', () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<OTP mask="abc" />);
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: Input.OTP] `mask` prop should be a single character.',
    );
    errSpy.mockRestore();
  });

  it('should not throw Error when mask.length <= 1', () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<OTP mask="x" />);
    expect(errSpy).not.toHaveBeenCalled();
    errSpy.mockRestore();
  });

  it('support type', () => {
    const { container } = render(<OTP type="number" />);
    expect(container.querySelector('input')).toHaveAttribute('type', 'number');
  });

  it('should call onInput with a string array when input changes', () => {
    const onInput = jest.fn();
    const { container } = render(<OTP length={4} onInput={onInput} />);

    const inputs = Array.from(container.querySelectorAll('input'));

    fireEvent.input(inputs[0], { target: { value: '1' } });
    expect(onInput).toHaveBeenCalledWith(['1']);

    fireEvent.input(inputs[2], { target: { value: '3' } });
    expect(onInput).toHaveBeenCalledWith(['1', '', '3']);

    fireEvent.input(inputs[1], { target: { value: '2' } });
    expect(onInput).toHaveBeenCalledWith(['1', '2', '3']);

    fireEvent.input(inputs[3], { target: { value: '4' } });
    expect(onInput).toHaveBeenCalledWith(['1', '2', '3', '4']);
  });

  it('disabled ctrl + z', () => {
    const { container } = render(<OTP length={4} defaultValue="1234" />);
    const inputEle = container.querySelector('input')!;
    const event = createEvent.keyDown(inputEle, { key: 'z', ctrlKey: true });
    fireEvent(inputEle, event);

    expect(event.defaultPrevented).toBeTruthy();
  });

  it('renders separator between input fields', () => {
    const { container } = render(
      <OTP
        length={4}
        separator={(index) => (
          <span key={index} className="custom-separator">
            |
          </span>
        )}
      />,
    );
    const separators = container.querySelectorAll('.custom-separator');
    expect(separators.length).toBe(3);
    separators.forEach((separator) => {
      expect(separator.textContent).toBe('|');
    });
  });

  it('renders separator when separator is a string', () => {
    const { container } = render(<OTP length={4} separator="-" />);
    const separators = container.querySelectorAll(`.ant-otp-separator`);
    expect(separators.length).toBe(3);
    separators.forEach((separator) => {
      expect(separator.textContent).toBe('-');
    });
  });

  it('renders separator when separator is a element', () => {
    const customSeparator = <div data-testid="custom-separator">X</div>;
    const { getAllByTestId } = render(<OTP length={4} separator={customSeparator} />);
    const separators = getAllByTestId('custom-separator');
    expect(separators.length).toBe(3);
    separators.forEach((separator) => {
      expect(separator.textContent).toBe('X');
    });
  });
});
