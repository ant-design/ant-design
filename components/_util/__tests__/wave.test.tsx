import React from 'react';
import mountTest from '../../../tests/shared/mountTest';
import { render, waitFakeTimer, fireEvent, act } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import Wave from '../wave';

describe('Wave component', () => {
  mountTest(Wave);

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    const styles = document.getElementsByTagName('style');
    for (let i = 0; i < styles.length; i += 1) {
      styles[i].remove();
    }
  });

  it('isHidden works', () => {
    const TEST_NODE_ENV = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';
    const { container, unmount } = render(
      <Wave>
        <button type="button">button</button>
      </Wave>,
    );
    expect(container.querySelector('button')?.className).toBe('');

    container.querySelector('button')?.click();

    expect(
      container.querySelector('button')?.hasAttribute('ant-click-animating-without-extra-node'),
    ).toBeFalsy();
    unmount();
    process.env.NODE_ENV = TEST_NODE_ENV;
  });

  it('isHidden is mocked', () => {
    const { container, unmount } = render(
      <Wave>
        <button type="button">button</button>
      </Wave>,
    );
    expect(container.querySelector('button')?.className).toBe('');
    container.querySelector('button')?.click();
    expect(
      container.querySelector('button')?.getAttribute('ant-click-animating-without-extra-node'),
    ).toBe('false');
    unmount();
  });

  it('wave color is grey', async () => {
    const { container, unmount } = render(
      <Wave>
        <button type="button" style={{ borderColor: 'rgb(0, 0, 0)' }}>
          button
        </button>
      </Wave>,
    );
    container.querySelector('button')?.click();
    await waitFakeTimer();
    const styles = (
      container.querySelector('button')?.getRootNode() as HTMLButtonElement
    ).getElementsByTagName('style');
    expect(styles.length).toBe(0);
    unmount();
  });

  it('wave color is not grey', async () => {
    const { container, unmount } = render(
      <Wave>
        <button type="button" style={{ borderColor: 'red' }}>
          button
        </button>
      </Wave>,
    );
    container.querySelector('button')?.click();
    await waitFakeTimer();
    const styles = (
      container.querySelector('button')?.getRootNode() as HTMLButtonElement
    ).getElementsByTagName('style');
    expect(styles.length).toBe(1);
    expect(styles[0].innerHTML).toContain('--antd-wave-shadow-color: red;');
    unmount();
  });

  it('read wave color from border-top-color', async () => {
    const { container, unmount } = render(
      <Wave>
        <div style={{ borderTopColor: 'blue' }}>button</div>
      </Wave>,
    );
    container.querySelector('div')?.click();
    await waitFakeTimer();
    const styles = (
      container.querySelector('div')?.getRootNode() as HTMLDivElement
    ).getElementsByTagName('style');
    expect(styles.length).toBe(1);
    expect(styles[0].innerHTML).toContain('--antd-wave-shadow-color: blue;');
    unmount();
  });

  it('read wave color from background color', async () => {
    const { container, unmount } = render(
      <Wave>
        <div style={{ backgroundColor: 'green' }}>button</div>
      </Wave>,
    );
    container.querySelector('div')?.click();
    await waitFakeTimer();
    const styles = (
      container.querySelector('div')?.getRootNode() as HTMLDivElement
    ).getElementsByTagName('style');
    expect(styles.length).toBe(1);
    expect(styles[0].innerHTML).toContain('--antd-wave-shadow-color: green;');
    unmount();
  });

  it('read wave color from border firstly', async () => {
    const { container, unmount } = render(
      <Wave>
        <div style={{ borderColor: 'yellow', backgroundColor: 'green' }}>button</div>
      </Wave>,
    );
    container.querySelector('div')?.click();
    await waitFakeTimer();
    const styles = (
      container.querySelector('div')?.getRootNode() as HTMLDivElement
    ).getElementsByTagName('style');
    expect(styles.length).toBe(1);
    expect(styles[0].innerHTML).toContain('--antd-wave-shadow-color: yellow;');
    unmount();
  });

  it('hidden element with -leave className', async () => {
    const { container, unmount } = render(
      <Wave>
        <button type="button" className="xx-leave">
          button
        </button>
      </Wave>,
    );
    container.querySelector('button')?.click();
    await waitFakeTimer();
    const styles = (
      container.querySelector('button')?.getRootNode() as HTMLButtonElement
    ).getElementsByTagName('style');
    expect(styles.length).toBe(0);
    unmount();
  });

  it('ConfigProvider csp', async () => {
    const { container, unmount } = render(
      <ConfigProvider csp={{ nonce: 'YourNonceCode' }}>
        <Wave>
          <button type="button">button</button>
        </Wave>
      </ConfigProvider>,
    );
    container.querySelector('button')?.click();
    await waitFakeTimer();
    const styles = (
      container.querySelector('button')?.getRootNode() as HTMLButtonElement
    ).getElementsByTagName('style');
    expect(styles[0].getAttribute('nonce')).toBe('YourNonceCode');
    unmount();
  });

  it('bindAnimationEvent should return when node is null', () => {
    const ref = React.createRef<Wave>();
    render(
      <Wave ref={ref}>
        <button type="button" disabled>
          button
        </button>
      </Wave>,
    );
    expect(ref.current?.bindAnimationEvent()).toBe(undefined);
  });

  it('bindAnimationEvent.onClick should return when children is hidden', () => {
    const ref = React.createRef<Wave>();
    render(
      <Wave ref={ref}>
        <button type="button" style={{ display: 'none' }}>
          button
        </button>
      </Wave>,
    );
    expect(ref.current?.bindAnimationEvent()).toBe(undefined);
  });

  it('bindAnimationEvent.onClick should return when children is input', () => {
    const ref = React.createRef<Wave>();
    render(
      <Wave ref={ref}>
        <input />
      </Wave>,
    );
    expect(ref.current?.bindAnimationEvent()).toBe(undefined);
  });

  it('should not throw when click it', () => {
    expect(() => {
      const { container } = render(
        <Wave>
          <div />
        </Wave>,
      );
      fireEvent.click(container);
    }).not.toThrow();
  });

  it('should not throw when no children', () => {
    expect(() => render(<Wave />)).not.toThrow();
  });

  it('Wave style should append to validate element', () => {
    jest.useFakeTimers();
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

    const elem = container.querySelector('.bamboo');

    if (elem) {
      elem.getRootNode = () => fakeDoc;

      // Click should not throw
      fireEvent.click(elem);
      act(() => {
        jest.runAllTimers();
      });

      expect(fakeDoc.querySelector('style')).toBeTruthy();
    }

    jest.useRealTimers();
  });
});
