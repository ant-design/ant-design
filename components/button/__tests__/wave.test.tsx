import userEvent from '@testing-library/user-event';
import React from 'react';
import Button from '..';
import { act, fireEvent, render } from '../../../tests/utils';

jest.mock('rc-util/lib/Dom/isVisible', () => {
  const mockFn = () => true;
  return mockFn;
});

describe('click wave effect', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    document.body.innerHTML = '';
  });

  async function clickButton(container: HTMLElement) {
    const element = container.firstChild;
    // https://github.com/testing-library/user-event/issues/833
    await userEvent.setup({ advanceTimers: jest.advanceTimersByTime }).click(element as Element);

    act(() => {
      jest.advanceTimersByTime(100);
    });

    // Second time will render wave element
    act(() => {
      jest.advanceTimersByTime(100);
    });

    fireEvent(element!, new Event('transitionstart'));
    fireEvent(element!, new Event('animationend'));
  }

  it('should have click wave effect for primary button', async () => {
    const { container } = render(<Button type="primary">button</Button>);
    await clickButton(container);
    expect(document.querySelector('.ant-wave')).toBeTruthy();
  });

  it('should have click wave effect for default button', async () => {
    const { container } = render(<Button>button</Button>);
    await clickButton(container);
    expect(document.querySelector('.ant-wave')).toBeTruthy();
  });

  it('should not have click wave effect for link type button', async () => {
    const { container } = render(<Button type="link">button</Button>);
    await clickButton(container);
    expect(document.querySelector('.ant-wave')).toBeFalsy();
  });

  it('should not have click wave effect for text type button', async () => {
    const { container } = render(<Button type="text">button</Button>);
    await clickButton(container);
    expect(document.querySelector('.ant-wave')).toBeFalsy();
  });
});
