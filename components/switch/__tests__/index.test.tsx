import React from 'react';
import { vi } from 'vitest';

import Switch from '..';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { act, fireEvent, render } from '../../../tests/utils';

vi.mock('@rc-component/util', async () => {
  const util = await vi.importActual<typeof import('@rc-component/util')>('@rc-component/util');
  return {
    ...util,
    isVisible: () => true,
  };
});

// TODO: Remove this. Mock for React 19
vi.mock('react-dom', async () => {
  const realReactDOM = await vi.importActual<typeof import('react-dom')>('react-dom');

  if (realReactDOM.version.startsWith('19')) {
    const realReactDOMClient =
      await vi.importActual<typeof import('react-dom/client')>('react-dom/client');
    (
      realReactDOM as typeof realReactDOM & { createRoot: typeof realReactDOMClient.createRoot }
    ).createRoot = realReactDOMClient.createRoot;
  }

  return realReactDOM;
});

describe('Switch', () => {
  focusTest(Switch, { refFocus: true });
  mountTest(Switch);
  rtlTest(Switch);

  it('should has click wave effect', () => {
    vi.useFakeTimers();
    const { container } = render(<Switch />);
    fireEvent.click(container.querySelector('.ant-switch')!);
    act(() => {
      vi.advanceTimersByTime(100);
    });

    // Second time for raf to render wave effect
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(document.querySelector('.ant-wave')).toBeTruthy();
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  it('should be controlled by value', () => {
    const mockChangeHandler = vi.fn();

    const { getByRole } = render(<Switch value onChange={mockChangeHandler} />);

    const switchNode = getByRole('switch');
    expect(switchNode).toBeTruthy();
    expect(getByRole('switch')).toBeChecked();

    fireEvent.click(switchNode);

    expect(mockChangeHandler).toHaveBeenCalledWith(false, expect.anything());
    // controlled component, so still true after click
    expect(getByRole('switch')).toBeChecked();
  });

  it('should be uncontrolled by defaultValue', () => {
    const mockChangeHandler = vi.fn();

    const { getByRole } = render(<Switch defaultValue onChange={mockChangeHandler} />);

    const switchNode = getByRole('switch');
    expect(switchNode).toBeTruthy();
    expect(getByRole('switch')).toBeChecked();

    fireEvent.click(switchNode);

    expect(mockChangeHandler).toHaveBeenCalledWith(false, expect.anything());
    // uncontrolled component, so false after click
    expect(getByRole('switch')).not.toBeChecked();
  });

  it('have static property for type detecting', () => {
    expect(Switch.__ANT_SWITCH).toBeTruthy();
  });

  it('inner element have min-height', () => {
    const { container, rerender } = render(<Switch unCheckedChildren="0" size="small" />);
    expect(container.querySelector('.ant-switch-inner-unchecked')).toHaveStyle(
      'min-height: var(--ant-switch-track-height-sm)',
    );

    rerender(<Switch unCheckedChildren="0" />);
    expect(container.querySelector('.ant-switch-inner-unchecked')).toHaveStyle(
      'min-height: var(--ant-switch-track-height)',
    );
  });
  it('support styles and classNames', () => {
    const customClassNames = {
      root: 'custom-root',
      content: 'custom-content',
    };
    const customStyles = {
      root: { color: 'rgb(255, 0, 0)' },
      content: { color: 'rgb(0, 0, 255)' },
    };
    const { container } = render(
      <Switch
        checkedChildren="on"
        unCheckedChildren="off"
        defaultChecked
        styles={customStyles}
        classNames={customClassNames}
      />,
    );
    const root = container.querySelector<HTMLElement>('.ant-switch');
    const content = container.querySelector<HTMLElement>('.ant-switch-inner-checked');
    expect(root).toHaveClass('custom-root');
    expect(content).toHaveClass('custom-content');

    expect(root).toHaveStyle('color: rgb(255, 0, 0)');
    expect(content).toHaveStyle('color: rgb(0, 0, 255)');
  });
});
