import React from 'react';

import { useVirtualInfiniteScroll } from '../hooks/useVirtualInfiniteScroll';

let renderHook: any;
let act: any;

try {
  // Try @testing-library/react-hooks (React 16/17 + TL 12)
  // @ts-ignore
  const hooks = require('@testing-library/react-hooks');
  if (typeof hooks.renderHook === 'function') {
    renderHook = hooks.renderHook;
    act = hooks.act;
  }
} catch {}
if (!renderHook) {
  try {
    // Try @testing-library/react (React 18/19 + TL 16+)
    // @ts-ignore
    const rtl = require('@testing-library/react');
    if (typeof rtl.renderHook === 'function') {
      renderHook = rtl.renderHook;
      act = rtl.act;
    }
  } catch {}
}

// Fallback: minimal renderHook for React 16/17 + TL 12
if (!renderHook) {
  // @ts-ignore
  const ReactTestUtils = require('react-dom/test-utils');
  const ReactDOM = require('react-dom');
  act = ReactTestUtils.act;

  renderHook = (callback: () => any) => {
    const result: { current?: any } = {};
    const container = document.createElement('div');

    function TestComponent() {
      result.current = callback();
      return null;
    }

    let root: any;
    act(() => {
      if ((ReactDOM as any).createRoot) {
        root = (ReactDOM as any).createRoot(container);
        root.render(React.createElement(TestComponent));
      } else {
        // eslint-disable-next-line react-dom/no-render
        ReactDOM.render(React.createElement(TestComponent), container);
      }
    });

    return {
      result,
      unmount: () => {
        act(() => {
          if (root) {
            root.unmount();
          } else {
            ReactDOM.unmountComponentAtNode(container);
          }
        });
      },
    };
  };
}

// Jest fake timers compatibility
const useFakeTimersCompat = () => {
  try {
    // @ts-ignore
    jest.useFakeTimers('modern');
  } catch {
    jest.useFakeTimers();
  }
};

describe('useVirtualInfiniteScroll', () => {
  let container: HTMLDivElement;
  let thumb: HTMLDivElement;
  let mutationCallback: MutationCallback;
  const originalConsole = global.console;
  const originalMutationObserver = (global as any).MutationObserver;

  const triggerMutation = () => {
    act(() => {
      mutationCallback([{ type: 'attributes' } as any], {} as any);
      jest.runAllTimers();
    });
  };

  const mockScrollProps = (
    el: HTMLElement,
    { clientHeight, scrollHeight, scrollTop }: Partial<HTMLElement> = {},
  ) => {
    if (clientHeight !== undefined)
      Object.defineProperty(el, 'clientHeight', { value: clientHeight, configurable: true });
    if (scrollHeight !== undefined)
      Object.defineProperty(el, 'scrollHeight', { value: scrollHeight, configurable: true });
    if (scrollTop !== undefined)
      Object.defineProperty(el, 'scrollTop', { value: scrollTop, configurable: true });
  };

  beforeEach(() => {
    useFakeTimersCompat();

    container = document.createElement('div');
    container.style.height = '100px';

    thumb = document.createElement('div');
    container.appendChild(thumb);
    document.body.appendChild(container);

    // Silence console except in debug tests
    global.console = { ...originalConsole, log: jest.fn() };

    mutationCallback = jest.fn();

    (global as any).MutationObserver = class {
      constructor(cb: MutationCallback) {
        mutationCallback = cb;
      }
      observe() {}
      disconnect() {}
    };
  });

  afterEach(() => {
    container?.remove();
    jest.clearAllTimers();
    jest.useRealTimers();
    global.console = originalConsole;
    (global as any).MutationObserver = originalMutationObserver;
  });

  it('logs disabled when not enabled and debug is true', () => {
    renderHook(() =>
      useVirtualInfiniteScroll({
        onLoadMore: jest.fn(),
        hasMore: true,
        loading: false,
        enabled: false,
        debug: true,
        scrollbarRef: { current: container },
      }),
    );
    expect(console.log).toHaveBeenCalledWith('[InfiniteScroll] disabled ❌');
  });

  it('returns early if no scrollbar or thumb', () => {
    // Case 1: no scrollbarRef or selector
    const { result } = renderHook(() =>
      useVirtualInfiniteScroll({
        onLoadMore: jest.fn(),
        hasMore: true,
        loading: false,
        enabled: true,
      }),
    );
    expect(result.current).toBeUndefined();

    // Case 2: scrollbarRef but no thumb
    const emptyContainer = document.createElement('div');
    const { result: noThumb } = renderHook(() =>
      useVirtualInfiniteScroll({
        onLoadMore: jest.fn(),
        hasMore: true,
        loading: false,
        enabled: true,
        scrollbarRef: { current: emptyContainer },
      }),
    );
    expect(noThumb.current).toBeUndefined();
  });

  it('does not call onLoadMore if loading=true or hasMore=false', () => {
    const onLoadMore = jest.fn();
    thumb.style.top = '90px';
    thumb.style.height = '20px';

    renderHook(() =>
      useVirtualInfiniteScroll({
        onLoadMore,
        hasMore: false,
        loading: true,
        enabled: true,
        scrollbarRef: { current: container },
      }),
    );

    triggerMutation();
    expect(onLoadMore).not.toHaveBeenCalled();
  });

  it('calls onLoadMore when threshold reached', () => {
    const onLoadMore = jest.fn();
    thumb.style.top = '90px';
    thumb.style.height = '20px'; // 90 + 20 >= 100

    renderHook(() =>
      useVirtualInfiniteScroll({
        onLoadMore,
        hasMore: true,
        loading: false,
        enabled: true,
        scrollbarRef: { current: container },
      }),
    );

    triggerMutation();
    expect(onLoadMore).toHaveBeenCalled();
  });

  it('does not call onLoadMore when below threshold', () => {
    const onLoadMore = jest.fn();
    mockScrollProps(container, { clientHeight: 200 });
    Object.defineProperty(thumb, 'style', {
      value: { top: '0', height: '50' },
      configurable: true,
    });

    renderHook(() =>
      useVirtualInfiniteScroll({
        onLoadMore,
        hasMore: true,
        loading: false,
        enabled: true,
        scrollbarRef: { current: container },
      }),
    );

    triggerMutation();
    expect(onLoadMore).not.toHaveBeenCalled();
  });

  it('uses MutationObserver throttling', () => {
    const onLoadMore = jest.fn();
    thumb.style.top = '90px';
    thumb.style.height = '20px';

    renderHook(() =>
      useVirtualInfiniteScroll({
        onLoadMore,
        hasMore: true,
        loading: false,
        enabled: true,
        scrollbarRef: { current: container },
        throttleDelay: 200,
      }),
    );

    act(() => {
      mutationCallback([{ type: 'attributes' } as any], {} as any);
      mutationCallback([{ type: 'attributes' } as any], {} as any);
      mutationCallback([{ type: 'attributes' } as any], {} as any);
      jest.advanceTimersByTime(200);
    });

    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it('cleans up observer and timer on unmount', () => {
    const disconnectMock = jest.fn();
    (global as any).MutationObserver = class {
      constructor(cb: MutationCallback) {
        mutationCallback = cb;
      }
      observe() {}
      disconnect = disconnectMock;
    };

    const clearSpy = jest.spyOn(global, 'clearTimeout');
    const { unmount } = renderHook(() =>
      useVirtualInfiniteScroll({
        onLoadMore: jest.fn(),
        hasMore: true,
        loading: false,
        enabled: true,
        scrollbarRef: { current: container },
        throttleDelay: 200,
      }),
    );

    act(() => {
      mutationCallback([{ type: 'attributes' } as any], {} as any);
    });

    unmount();
    expect(disconnectMock).toHaveBeenCalled();
    expect(clearSpy).toHaveBeenCalled();
    clearSpy.mockRestore();
  });

  it('falls back to scrollbarSelector when ref not provided', () => {
    container.setAttribute('data-test-scroll', 'yes');
    const querySpy = jest.spyOn(document, 'querySelector');

    renderHook(() =>
      useVirtualInfiniteScroll({
        onLoadMore: jest.fn(),
        hasMore: true,
        loading: false,
        enabled: true,
        scrollbarSelector: '[data-test-scroll="yes"]',
      }),
    );

    expect(querySpy).toHaveBeenCalledWith('[data-test-scroll="yes"]');
    querySpy.mockRestore();
  });

  it('mocked scroll metrics allow checkPosition without triggering onLoadMore', () => {
    const onLoadMore = jest.fn();
    mockScrollProps(container, { clientHeight: 100, scrollHeight: 1000, scrollTop: 0 });

    renderHook(() =>
      useVirtualInfiniteScroll({
        onLoadMore,
        hasMore: true,
        loading: false,
        enabled: true,
        scrollbarRef: { current: container },
      }),
    );

    triggerMutation();
    expect(onLoadMore).not.toHaveBeenCalled();
  });

  it('defaults enabled=false when not passed', () => {
    const { result } = renderHook(() =>
      useVirtualInfiniteScroll({
        onLoadMore: jest.fn(),
        hasMore: true,
        loading: false,
      }),
    );
    expect(result.current).toBeUndefined();
  });
});
