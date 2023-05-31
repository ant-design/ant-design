import React from 'react';
import mountTest from '../../../tests/shared/mountTest';
import { act, fireEvent, getByText, render, waitFakeTimer } from '../../../tests/utils';
import Wave from '../wave';

let isVisible = vi.hoisted(() => true);

vi.mock('rc-util/es/Dom/isVisible', () => {
  const mockFn = () => isVisible;
  return {
    default: mockFn,
  };
});

describe('Wave component', () => {
  mountTest(Wave);

  let obCnt = 0;
  let disCnt = 0;

  beforeAll(() => {
    /* eslint-disable class-methods-use-this */
    class FakeResizeObserver {
      observe = () => {
        obCnt += 1;
      };

      disconnect = () => {
        disCnt += 1;
      };
    }

    (window as any).ResizeObserver = FakeResizeObserver;
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
    expect(obCnt).not.toBe(0);
    expect(disCnt).not.toBe(0);
  });

  beforeEach(() => {
    isVisible = true;
    document.body.innerHTML = '';
  });

  afterEach(async () => {
    await vi.runAllTimersAsync();
    vi.clearAllTimers();
    const styles = document.getElementsByTagName('style');
    for (let i = 0; i < styles.length; i += 1) {
      styles[i].remove();
    }
  });

  function getWaveColor() {
    const { style } = document.querySelector<HTMLElement>('.ant-wave')!;
    return style.getPropertyValue('--wave-color');
  }

  function waitRaf() {
    act(() => {
      vi.advanceTimersByTime(100);
    });
  }

  it('work', async () => {
    const { container, unmount } = render(
      <Wave>
        <button type="button">button</button>
      </Wave>,
    );

    fireEvent.click(container.querySelector('button')!);
    waitRaf();
    expect(document.querySelector('.ant-wave')).toBeTruthy();

    // Match deadline
    await waitFakeTimer();

    expect(document.querySelector('.ant-wave')).toBeFalsy();

    unmount();
  });

  it('invisible in screen', () => {
    isVisible = false;
    const { container, unmount } = render(
      <Wave>
        <button type="button">button</button>
      </Wave>,
    );

    fireEvent.click(container.querySelector('button')!);
    waitRaf();
    expect(document.querySelector('.ant-wave')).toBeFalsy();

    unmount();
  });

  it('wave color is grey', () => {
    const { container, unmount } = render(
      <Wave>
        <button
          type="button"
          style={{ borderColor: 'rgb(0, 0, 0)', backgroundColor: 'transparent' }}
        >
          button
        </button>
      </Wave>,
    );

    fireEvent.click(container.querySelector('button')!);
    waitRaf();

    expect(getWaveColor()).toBeFalsy();

    unmount();
  });

  it('wave color is not grey', () => {
    const { container, unmount } = render(
      <Wave>
        <button type="button" style={{ borderColor: 'rgb(255, 0, 0)' }}>
          button
        </button>
      </Wave>,
    );

    fireEvent.click(container.querySelector('button')!);
    waitRaf();

    expect(getWaveColor()).toEqual('rgb(255, 0, 0)');

    unmount();
  });

  it('read wave color from border-top-color', () => {
    const { container, unmount } = render(
      <Wave>
        <div style={{ borderTopColor: 'rgb(0, 0, 255)' }}>button</div>
      </Wave>,
    );

    fireEvent.click(getByText(container, 'button')!);
    waitRaf();

    expect(getWaveColor()).toEqual('rgb(0, 0, 255)');

    unmount();
  });

  it('read wave color from background color', () => {
    const { container, unmount } = render(
      <Wave>
        <div style={{ backgroundColor: 'rgb(0, 128, 0)' }}>button</div>
      </Wave>,
    );

    fireEvent.click(getByText(container, 'button')!);
    waitRaf();

    expect(getWaveColor()).toEqual('rgb(0, 128, 0)');

    unmount();
  });

  it('read wave color from border firstly', () => {
    const { container, unmount } = render(
      <Wave>
        <div style={{ borderColor: 'rgb(255, 0, 0)', backgroundColor: 'green' }}>button</div>
      </Wave>,
    );

    fireEvent.click(getByText(container, 'button')!);
    waitRaf();

    expect(getWaveColor()).toEqual('rgb(255, 0, 0)');

    unmount();
  });

  it('hidden element with -leave className', () => {
    const { container, unmount } = render(
      <Wave>
        <button type="button" className="xx-leave">
          button
        </button>
      </Wave>,
    );

    fireEvent.click(container.querySelector('button')!);
    waitRaf();
    expect(document.querySelector('.ant-wave')).toBeFalsy();

    unmount();
  });

  it('not show when disabled', () => {
    const { container } = render(
      <Wave>
        <button type="button" disabled>
          button
        </button>
      </Wave>,
    );

    fireEvent.click(container.querySelector('button')!);
    expect(document.querySelector('.ant-wave')).toBeFalsy();
  });

  it('not show when hidden', () => {
    isVisible = false;

    const { container } = render(
      <Wave>
        <button type="button" style={{ display: 'none' }}>
          button
        </button>
      </Wave>,
    );

    fireEvent.click(container.querySelector('button')!);
    waitRaf();
    expect(document.querySelector('.ant-wave')).toBeFalsy();
  });

  it('not show when is input', () => {
    const { container } = render(
      <Wave>
        <input />
      </Wave>,
    );

    fireEvent.click(container.querySelector('input')!);
    waitRaf();
    expect(document.querySelector('.ant-wave')).toBeFalsy();
  });

  it('should not throw when click it', () => {
    expect(() => {
      const { container } = render(
        <Wave>
          <div />
        </Wave>,
      );
      fireEvent.click(container);
      waitRaf();
    }).not.toThrow();
  });

  it('should not throw when no children', () => {
    expect(() => {
      render(<Wave />);
      waitRaf();
    }).not.toThrow();
  });

  it('wave color should inferred if border is transparent and background is not', () => {
    const { container, unmount } = render(
      <Wave>
        <button type="button" style={{ borderColor: 'transparent', background: 'rgb(255, 0, 0)' }}>
          button
        </button>
      </Wave>,
    );
    fireEvent.click(container.querySelector('button')!);
    waitRaf();

    expect(getWaveColor()).toEqual('rgb(255, 0, 0)');

    unmount();
  });

  it('wave color should inferred if borderTopColor is transparent and borderColor is not', () => {
    const { container, unmount } = render(
      <Wave>
        <button type="button" style={{ borderColor: 'red', borderTopColor: 'transparent' }}>
          button
        </button>
      </Wave>,
    );

    fireEvent.click(container.querySelector('button')!);
    waitRaf();

    expect(getWaveColor()).toEqual('red');

    unmount();
  });

  it('Wave style should append to validate element', () => {
    const { container } = render(
      <Wave>
        <div className="bamboo" style={{ borderColor: 'red' }} />
      </Wave>,
    );

    // Mock shadow container
    const fakeDoc = document.createElement('div');
    fakeDoc.append('text');
    fakeDoc.appendChild(document.createElement('span'));
    expect(fakeDoc.childNodes).toHaveLength(2);

    const elem = container.querySelector('.bamboo')!;
    elem.getRootNode = () => fakeDoc;

    // Click should not throw
    fireEvent.click(elem);
    waitRaf();

    expect(container.querySelector('.ant-wave')).toBeTruthy();
  });
});
