import React from 'react';
import classNames from 'classnames';

import mountTest from '../../../tests/shared/mountTest';
import { act, fireEvent, getByText, render, waitFakeTimer } from '../../../tests/utils';
import Checkbox from '../../checkbox';
import Wave from '../wave';
import { TARGET_CLS } from '../wave/interface';

(global as any).isVisible = true;

// TODO: Remove this. Mock for React 19
jest.mock('react-dom', () => {
  const realReactDOM = jest.requireActual('react-dom');

  if (realReactDOM.version.startsWith('19')) {
    const realReactDOMClient = jest.requireActual('react-dom/client');
    realReactDOM.createRoot = realReactDOMClient.createRoot;
  }

  return realReactDOM;
});

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
    errorSpy.mockRestore();

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

    const waveElement = document.querySelector<HTMLElement>('.ant-wave');
    expect(waveElement).toHaveStyle({ '--wave-color': '' });

    unmount();
  });

  it('wave color is not grey', () => {
    const { container, unmount } = render(
      <Wave>
        <button type="button" style={{ borderColor: 'rgb(238, 238, 238)' }}>
          button
        </button>
      </Wave>,
    );

    fireEvent.click(container.querySelector('button')!);
    waitRaf();

    const waveElement = document.querySelector<HTMLElement>('.ant-wave');
    expect(waveElement).toHaveStyle({ '--wave-color': 'rgb(238, 238, 238)' });

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

    const waveElement = document.querySelector<HTMLElement>('.ant-wave');
    expect(waveElement).toHaveStyle({ '--wave-color': 'rgb(0, 0, 255)' });

    unmount();
  });

  it('read wave color from background color', () => {
    const { container, unmount } = render(
      <Wave>
        <div style={{ backgroundColor: 'rgb(34, 34, 34)' }}>button</div>
      </Wave>,
    );

    fireEvent.click(getByText(container, 'button')!);
    waitRaf();

    const waveElement = document.querySelector<HTMLElement>('.ant-wave');
    expect(waveElement).toHaveStyle({ '--wave-color': 'rgb(34, 34, 34)' });

    unmount();
  });

  it('read wave color from border firstly', () => {
    const { container, unmount } = render(
      <Wave>
        <div style={{ borderColor: 'rgb(102, 102, 102)', backgroundColor: '#999' }}>button</div>
      </Wave>,
    );

    fireEvent.click(getByText(container, 'button')!);
    waitRaf();

    const waveElement = document.querySelector<HTMLElement>('.ant-wave');
    expect(waveElement).toHaveStyle({ '--wave-color': 'rgb(102, 102, 102)' });

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
        <button
          type="button"
          style={{ borderColor: 'transparent', backgroundColor: 'rgb(51, 51, 51)' }}
        >
          button
        </button>
      </Wave>,
    );
    fireEvent.click(container.querySelector('button')!);
    waitRaf();

    const waveElement = document.querySelector<HTMLElement>('.ant-wave');
    expect(waveElement).toHaveStyle({ '--wave-color': 'rgb(51, 51, 51)' });

    unmount();
  });

  it('wave color should inferred if borderTopColor is transparent and borderColor is not', () => {
    const { container, unmount } = render(
      <Wave>
        <button
          type="button"
          style={{ borderColor: 'rgb(153, 153, 153)', borderTopColor: 'transparent' }}
        >
          button
        </button>
      </Wave>,
    );

    fireEvent.click(container.querySelector('button')!);
    waitRaf();

    const waveElement = document.querySelector<HTMLElement>('.ant-wave');
    expect(waveElement).toHaveStyle({ '--wave-color': 'rgb(153, 153, 153)' });

    unmount();
  });

  it('Wave style should append to validate element', () => {
    const { container } = render(
      <Wave>
        <div className="bamboo" style={{ borderColor: '#ccc' }} />
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
          <div className={classNames('bamboo', TARGET_CLS)} style={{ borderColor: '#ccc' }} />
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
