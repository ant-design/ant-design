import React from 'react';
import { spyElementPrototypes } from '@rc-component/util/lib/test/domHook';
import { act, fireEvent, render } from '@testing-library/react';

import { waitFakeTimer } from '../../../tests/utils';
import Masonry from '../index';

jest.mock('../../_util/throttleByAnimationFrame', () => (cb: any) => {
  const func = () => cb();
  (func as any).cancel = () => {};
  return func;
});

describe('Masonry Virtualization', () => {
  let originResizeObserver: any;

  beforeAll(() => {
    originResizeObserver = global.ResizeObserver;
    // Mock ResizeObserver since JSDOM doesn't support it
    global.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    };

    // This ensures throttleByAnimationFrame works with jest.runAllTimers()
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      return setTimeout(cb, 16) as unknown as number;
    });
    jest.spyOn(window, 'cancelAnimationFrame').mockImplementation((id) => {
      clearTimeout(id);
    });
  });

  afterAll(() => {
    global.ResizeObserver = originResizeObserver;
    jest.restoreAllMocks();
  });

  it('should render only visible items and update on scroll', async () => {
    jest.useFakeTimers();

    const domSpy = spyElementPrototypes(HTMLElement, {
      offsetHeight: { get: () => 500 },
      clientHeight: { get: () => 500 },
      scrollHeight: { get: () => 50000 * 100 },
      getBoundingClientRect: () => ({
        width: 100,
        height: 100,
        top: 0,
        left: 0,
        bottom: 100,
        right: 100,
        x: 0,
        y: 0,
        toJSON: () => {},
      }),
    });

    const originalGetComputedStyle = window.getComputedStyle;
    const getComputedStyleSpy = jest
      .spyOn(window, 'getComputedStyle')
      .mockImplementation((element) => {
        if (element instanceof HTMLElement && element.classList.contains('scroll-container')) {
          return {
            overflowY: 'auto',
            getPropertyValue: (prop: string) => (prop === 'overflow-y' ? 'auto' : ''),
          } as any;
        }
        return originalGetComputedStyle(element);
      });

    const items = Array.from({ length: 50000 }).map((_, i) => ({
      key: i,
      data: { label: `Item ${i}` },
    }));

    const { container, getByText, queryByText } = render(
      <div style={{ height: 500, overflow: 'auto' }} className="scroll-container">
        <Masonry items={items} columns={1} itemRender={(item) => <div>{item.data.label}</div>} />
      </div>,
    );

    const scrollContainer = container.querySelector('.scroll-container') as HTMLElement;

    await waitFakeTimer();

    expect(getByText('Item 0')).toBeInTheDocument();
    expect(queryByText('Item 49999')).not.toBeInTheDocument();

    const scrollTop = 10000;

    // Helper to trigger scroll
    act(() => {
      // This bypasses JSDOM's prototype limitations
      Object.defineProperty(scrollContainer, 'scrollTop', {
        value: scrollTop,
        writable: true,
        configurable: true,
      });

      fireEvent.scroll(scrollContainer);
    });

    await waitFakeTimer();

    // Manually trigger animation end for leaving items.
    // CSSMotion keeps items in the DOM until the animation event fires.
    // In JSDOM, this doesn't happen automatically.
    act(() => {
      const leavingItems = container.querySelectorAll('.ant-masonry-item-fade-leave');
      leavingItems.forEach((item) => {
        fireEvent.transitionEnd(item);
        fireEvent.animationEnd(item);
      });
    });

    await waitFakeTimer();

    expect(queryByText('Item 0')).not.toBeInTheDocument();
    expect(getByText('Item 100')).toBeInTheDocument();

    domSpy.mockRestore();
    getComputedStyleSpy.mockRestore();
    jest.useRealTimers();
  });
});
