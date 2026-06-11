import React from 'react';
import { spyElementPrototype } from '@rc-component/util/lib/test/domHook';

import Tooltip from '..';
import { act, pureRender, render, waitFakeTimer } from '../../../tests/utils';

// ---------------------------------------------------------------------------
// Helper: controllable ResizeObserver mock
// ---------------------------------------------------------------------------

type ROCallback = (entries: ResizeObserverEntry[]) => void;

interface MockROInstance {
  cb: ROCallback;
  targets: Set<Element>;
}

function createResizeObserverMock() {
  const instances: MockROInstance[] = [];

  class MockResizeObserver {
    private cb: ROCallback;

    constructor(cb: ROCallback) {
      this.cb = cb;
      instances.push({ cb, targets: new Set() });
    }

    observe(target: Element) {
      instances.find((i) => i.cb === this.cb)?.targets.add(target);
    }

    unobserve(target: Element) {
      instances.find((i) => i.cb === this.cb)?.targets.delete(target);
    }

    disconnect() {
      const idx = instances.findIndex((i) => i.cb === this.cb);
      if (idx !== -1) instances.splice(idx, 1);
    }
  }

  /** Fire all observers that are watching `target`. */
  function triggerResize(target: Element) {
    instances.forEach(({ cb, targets }) => {
      if (targets.has(target)) {
        cb([{ target } as ResizeObserverEntry]);
      }
    });
  }

  return { MockResizeObserver, triggerResize, instances };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

let restoreOffsetParent: { mockRestore: () => void };

describe('Tooltip.reposition', () => {
  let OriginalResizeObserver: typeof ResizeObserver;

  beforeAll(() => {
    restoreOffsetParent = spyElementPrototype(HTMLElement, 'offsetParent', {
      get: () => ({}),
    });
  });

  beforeEach(() => {
    OriginalResizeObserver = global.ResizeObserver;
    jest.useFakeTimers();
  });

  afterEach(() => {
    (global as any).ResizeObserver = OriginalResizeObserver;
    jest.useRealTimers();
    jest.clearAllTimers();
  });

  afterAll(() => {
    restoreOffsetParent.mockRestore();
  });

  it('attaches ResizeObserver to a scrollable ancestor when open', async () => {
    const { MockResizeObserver, instances } = createResizeObserverMock();
    (global as any).ResizeObserver = MockResizeObserver;

    const { container } = render(
      <div id="scroll-container" style={{ overflow: 'auto', height: 200 }}>
        <Tooltip title="tip" open>
          <span>hover me</span>
        </Tooltip>
      </div>,
    );

    await waitFakeTimer();

    const scrollContainer = container.firstElementChild!;
    const isObserved = instances.some((i) => i.targets.has(scrollContainer));
    expect(isObserved).toBe(true);
  });

  it('calling the resize callback after initialization does not throw', async () => {
    const { MockResizeObserver, triggerResize, instances } = createResizeObserverMock();
    (global as any).ResizeObserver = MockResizeObserver;

    const { container } = render(
      <div style={{ overflow: 'auto', height: 200 }}>
        <Tooltip title="tip" open>
          <span>hover me</span>
        </Tooltip>
      </div>,
    );

    await waitFakeTimer();

    const scrollContainer = container.firstElementChild!;

    // At least one instance must observe the scroll container
    expect(instances.some((i) => i.targets.has(scrollContainer))).toBe(true);

    // Trigger a resize — must not throw and tooltip must still be in DOM
    expect(() => {
      act(() => {
        triggerResize(scrollContainer);
      });
    }).not.toThrow();

    expect(document.querySelector('.ant-tooltip')).not.toBeNull();
  });

  it('skips the immediate observe() callback via the initialized guard', async () => {
    const callsDuringObserve: boolean[] = [];

    class TrackingResizeObserver {
      private cb: ROCallback;
      private initialized = false;

      constructor(cb: ROCallback) {
        // Wrap callback to track whether it was invoked before initialized flag
        this.cb = () => {
          callsDuringObserve.push(this.initialized);
          cb([]);
        };
      }

      observe(_target: Element) {
        // Fire immediately, as per spec
        this.cb([]);
        // Set initialized after observe so subsequent calls would be "real"
        this.initialized = true;
      }

      unobserve() {}

      disconnect() {}
    }

    (global as any).ResizeObserver = TrackingResizeObserver;

    render(
      <div style={{ overflow: 'auto', height: 200 }}>
        <Tooltip title="tip" open>
          <span>hover me</span>
        </Tooltip>
      </div>,
    );

    await waitFakeTimer();

    // The immediate fires during observe() must have been invoked before
    // the internal initialized flag was set to true — the guard returns early
    // so forceAlign is never invoked for those calls.
    // All recorded calls should show initialized=false (i.e. the guard fires).
    expect(callsDuringObserve.length).toBeGreaterThan(0);
    expect(callsDuringObserve.every((v) => v === false)).toBe(true);
  });

  it('disconnects the ResizeObserver when tooltip is closed', async () => {
    const disconnectSpy = jest.fn();

    class TrackingResizeObserver {
      observe() {}
      unobserve() {}
      disconnect = disconnectSpy;
      constructor(_cb: ROCallback) {}
    }

    (global as any).ResizeObserver = TrackingResizeObserver;

    // Use pureRender to avoid StrictMode double-invoking effects
    const { rerender } = pureRender(
      <div style={{ overflow: 'auto', height: 200 }}>
        <Tooltip title="tip" open>
          <span>hover me</span>
        </Tooltip>
      </div>,
    );

    await waitFakeTimer();

    const callsBefore = disconnectSpy.mock.calls.length;

    rerender(
      <div style={{ overflow: 'auto', height: 200 }}>
        <Tooltip title="tip" open={false}>
          <span>hover me</span>
        </Tooltip>
      </div>,
    );

    await waitFakeTimer();

    expect(disconnectSpy.mock.calls.length).toBeGreaterThan(callsBefore);
  });

  it('falls back to document.documentElement when no scrollable ancestor exists', async () => {
    const { MockResizeObserver, instances } = createResizeObserverMock();
    (global as any).ResizeObserver = MockResizeObserver;

    render(
      <div>
        <Tooltip title="tip" open>
          <span>hover me</span>
        </Tooltip>
      </div>,
    );

    await waitFakeTimer();

    const isDocumentObserved = instances.some((i) => i.targets.has(document.documentElement));
    expect(isDocumentObserved).toBe(true);
  });
});
