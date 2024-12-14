import React from 'react';
import classNames from 'classnames';

import mountTest from '../../../tests/shared/mountTest';
import { act, fireEvent, getByText, render, waitFakeTimer } from '../../../tests/utils';
import Checkbox from '../../checkbox';
import Wave from '../wave';
import { TARGET_CLS } from '../wave/interface';

(global as any).isVisible = true;

jest.mock('rc-util/lib/Dom/isVisible', () => {
  const mockFn = () => (global as any).isVisible;
  return mockFn;
});

describe('Wave component', () => {
  mountTest(Wave);

  let obCnt = 0;
  let disCnt = 0;

  beforeAll(() => {
    class FakeResizeObserver {
      observe = () => {
        obCnt += 1;
      };

      disconnect = () => {
        disCnt += 1;
      };
    }

    (window as any).ResizeObserver = FakeResizeObserver;
  });

  afterAll(() => {
    jest.useRealTimers();
    expect(obCnt).not.toBe(0);
    expect(disCnt).not.toBe(0);
  });

  beforeEach(() => {
    jest.useFakeTimers();
    (global as any).isVisible = true;
    document.body.innerHTML = '';
  });

  afterEach(async () => {
    await waitFakeTimer();

    jest.clearAllTimers();
    const styles = document.getElementsByTagName('style');
    for (let i = 0; i < styles.length; i += 1) {
      styles[i].remove();
    }
  });

  function getWaveStyle() {
    const styleObj: Record<string, string> = {};
    const { style } = document.querySelector<HTMLElement>('.ant-wave')!;
    style.cssText.split(';').forEach((kv) => {
      if (kv.trim()) {
        const cells = kv.split(':');
        styleObj[cells[0].trim()] = cells[1].trim();
      }
    });

    return styleObj;
  }

  function waitRaf() {
    act(() => {
      jest.advanceTimersByTime(100);
    });
    act(() => {
      jest.advanceTimersByTime(100);
    });
  }

  it('work', async () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
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

    expect(errorSpy).not.toHaveBeenCalled();

    unmount();
  });

  it('invisible in screen', () => {
    (global as any).isVisible = false;
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

  it('wave color is nonexistent', () => {
    const { container, unmount } = render(
      <Wave>
        <button type="button" style={{ border: '#fff', background: '#fff' }}>
          button
        </button>
      </Wave>,
    );

    fireEvent.click(container.querySelector('button')!);
    waitRaf();

    const style = getWaveStyle();
    expect(style['--wave-color']).toEqual(undefined);

    unmount();
  });

  it('wave color is not grey', () => {
    const { container, unmount } = render(
      <Wave>
        <button type="button" style={{ borderColor: 'red' }}>
          button
        </button>
      </Wave>,
    );

    fireEvent.click(container.querySelector('button')!);
    waitRaf();

    const style = getWaveStyle();
    expect(style['--wave-color']).toEqual('red');

    unmount();
  });

  it('read wave color from border-top-color', () => {
    const { container, unmount } = render(
      <Wave>
        <div style={{ borderTopColor: 'blue' }}>button</div>
      </Wave>,
    );

    fireEvent.click(getByText(container, 'button')!);
    waitRaf();

    const style = getWaveStyle();
    expect(style['--wave-color']).toEqual('blue');

    unmount();
  });

  it('read wave color from background color', () => {
    const { container, unmount } = render(
      <Wave>
        <div style={{ backgroundColor: 'green' }}>button</div>
      </Wave>,
    );

    fireEvent.click(getByText(container, 'button')!);
    waitRaf();

    const style = getWaveStyle();
    expect(style['--wave-color']).toEqual('green');

    unmount();
  });

  it('read wave color from border firstly', () => {
    const { container, unmount } = render(
      <Wave>
        <div style={{ borderColor: 'yellow', backgroundColor: 'green' }}>button</div>
      </Wave>,
    );

    fireEvent.click(getByText(container, 'button')!);
    waitRaf();

    const style = getWaveStyle();
    expect(style['--wave-color']).toEqual('yellow');

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
    (global as any).isVisible = false;

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
        <button type="button" style={{ borderColor: 'transparent', background: 'red' }}>
          button
        </button>
      </Wave>,
    );
    fireEvent.click(container.querySelector('button')!);
    waitRaf();

    const style = getWaveStyle();
    expect(style['--wave-color']).toEqual('red');

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

    const style = getWaveStyle();
    expect(style['--wave-color']).toEqual('red');

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

  it('Wave can match target', () => {
    const { container } = render(
      <Wave>
        <div>
          <div className={classNames('bamboo', TARGET_CLS)} style={{ borderColor: 'red' }} />
        </div>
      </Wave>,
    );

    // Click
    fireEvent.click(container.querySelector('.bamboo')!);
    waitRaf();

    expect(container.querySelector('.ant-wave')).toBeTruthy();
  });

  it('Checkbox with uncheck should not trigger wave', () => {
    const onChange = jest.fn();
    const { container } = render(<Checkbox defaultChecked onChange={onChange} />);

    // Click
    fireEvent.click(container.querySelector('input')!);
    waitRaf();

    expect(onChange).toHaveBeenCalled();
    expect(container.querySelector('.ant-wave')).toBeFalsy();
  });
});
