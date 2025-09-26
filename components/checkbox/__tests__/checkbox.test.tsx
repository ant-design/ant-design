import React from 'react';

import Checkbox from '..';
import type { CheckboxProps } from '..';
import { resetWarned } from '../../_util/warning';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { act, fireEvent, render } from '../../../tests/utils';

describe('Checkbox', () => {
  focusTest(Checkbox, { refFocus: true });
  mountTest(Checkbox);
  rtlTest(Checkbox);

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('responses hover events', () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    const { container } = render(
      <Checkbox onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />,
    );

    fireEvent.mouseEnter(container.querySelector('label')!);
    expect(onMouseEnter).toHaveBeenCalled();

    fireEvent.mouseLeave(container.querySelector('label')!);
    expect(onMouseLeave).toHaveBeenCalled();
  });

  it('warning if set `value`', () => {
    resetWarned();

    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<Checkbox value />);
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Checkbox] `value` is not a valid prop, do you mean `checked`?',
    );
    errorSpy.mockRestore();
  });

  // https://github.com/ant-design/ant-design/issues/50768
  it('onFocus / onBlur', () => {
    const onBlur = jest.fn();
    const onFocus = jest.fn();

    const { container } = render(<Checkbox onBlur={onBlur} onFocus={onFocus} />);
    const inputEl = container.querySelector('input')!;

    fireEvent.focus(inputEl);
    fireEvent.blur(inputEl);

    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('should reflect indeterminate state correctly', () => {
    const { rerender, container } = render(<Checkbox indeterminate />);

    const checkboxInput = container.querySelector('input')!;
    expect(checkboxInput.indeterminate).toBe(true);

    rerender(<Checkbox indeterminate={false} />);

    expect(checkboxInput.indeterminate).toBe(false);
  });

  it('event bubble should not trigger twice', () => {
    const onClick = jest.fn();
    const onRootClick = jest.fn();

    const { container } = render(
      <div onClick={onRootClick}>
        <Checkbox onClick={onClick} />
      </div>,
    );

    // Click on label
    fireEvent.click(container.querySelector('label')!);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onRootClick).toHaveBeenCalledTimes(1);
    act(() => {
      jest.runAllTimers();
    });

    // Click on input
    fireEvent.click(container.querySelector('input')!);
    expect(onClick).toHaveBeenCalledTimes(2);
    expect(onRootClick).toHaveBeenCalledTimes(2);
    act(() => {
      jest.runAllTimers();
    });

    // Click on input again
    fireEvent.click(container.querySelector('input')!);
    expect(onClick).toHaveBeenCalledTimes(3);
    expect(onRootClick).toHaveBeenCalledTimes(3);
  });
  it('should support custom styles', () => {
    const customClassNames = {
      root: 'custom-root',
      icon: 'custom-icon',
      label: 'custom-label',
    };

    const customStyles = {
      root: { backgroundColor: 'red' },
      icon: { backgroundColor: 'black' },
      label: { backgroundColor: 'gray' },
    };
    const { container } = render(
      <Checkbox classNames={customClassNames} styles={customStyles}>
        Checkbox
      </Checkbox>,
    );

    const rootElement = container.querySelector('.ant-checkbox-wrapper') as HTMLElement;
    const iconElement = container.querySelector('.ant-checkbox') as HTMLElement;
    const labelElement = container.querySelector('.ant-checkbox-label') as HTMLElement;

    expect(rootElement.classList).toContain('custom-root');
    expect(iconElement.classList).toContain('custom-icon');
    expect(labelElement.classList).toContain('custom-label');

    expect(rootElement.style.backgroundColor).toBe('red');
    expect(iconElement.style.backgroundColor).toBe('black');
    expect(labelElement.style.backgroundColor).toBe('gray');
  });

  it('should support function-based classNames and styles', () => {
    const classNamesFn = ({ props }: { props: CheckboxProps }) => {
      if (props.disabled) {
        return { root: 'disabled-checkbox', icon: 'disabled-icon', label: 'disabled-label' };
      }
      return { root: 'enabled-checkbox', icon: 'enabled-icon', label: 'enabled-label' };
    };

    const stylesFn = ({ props }: { props: CheckboxProps }) => {
      if (props.disabled) {
        return {
          root: { backgroundColor: 'gray' },
          icon: { color: 'darkgray' },
          label: { color: 'lightgray' },
        };
      }
      return {
        root: { backgroundColor: 'lightblue' },
        icon: { color: 'blue' },
        label: { color: 'darkblue' },
      };
    };

    const { container } = render(
      <Checkbox disabled={false} classNames={classNamesFn} styles={stylesFn}>
        Function Checkbox
      </Checkbox>,
    );

    const rootElement = container.querySelector('.ant-checkbox-wrapper') as HTMLElement;
    const iconElement = container.querySelector('.ant-checkbox') as HTMLElement;
    const labelElement = container.querySelector('.ant-checkbox-label') as HTMLElement;

    expect(rootElement.classList).toContain('enabled-checkbox');
    expect(iconElement.classList).toContain('enabled-icon');
    expect(labelElement.classList).toContain('enabled-label');

    expect(rootElement.style.backgroundColor).toBe('lightblue');
    expect(iconElement.style.color).toBe('blue');
    expect(labelElement.style.color).toBe('darkblue');
  });
});
