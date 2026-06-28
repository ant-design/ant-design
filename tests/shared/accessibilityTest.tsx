import path from 'node:path';
import React from 'react';
import { render } from '@testing-library/react';
import { globSync } from 'glob';
import { axe } from 'jest-axe';
import type { Mock } from 'vitest';
import { vi } from 'vitest';

import { isFunction } from '../../components/_util/is';

class AxeQueueManager {
  private queue: Promise<any> = Promise.resolve();
  private isProcessing = false;

  async enqueue<T>(task: () => Promise<T>): Promise<T> {
    const currentQueue = this.queue;

    const newTask = async () => {
      try {
        await currentQueue;
        this.isProcessing = true;
        return await task();
      } finally {
        this.isProcessing = false;
      }
    };

    this.queue = this.queue.then(newTask, newTask);

    return this.queue;
  }

  isRunning(): boolean {
    return this.isProcessing;
  }
}

const axeQueueManager = new AxeQueueManager();

const runAxe = async (...args: Parameters<typeof axe>): Promise<ReturnType<typeof axe>> => {
  return axeQueueManager.enqueue(async () => {
    try {
      return await axe(...args);
    } catch (error) {
      console.error('Axe test failed:', error);
      throw error;
    }
  });
};

type Rules = {
  [key: string]: {
    enabled: boolean;
  };
};

const convertRulesToAxeFormat = (rules: string[]) => {
  return rules.reduce<Rules>((acc, rule) => ({ ...acc, [rule]: { enabled: false } }), {});
};

interface FakeTimerClock {
  clock?: unknown;
}

const isUsingFakeTimers = () => {
  const timeoutWithClock = setTimeout as typeof setTimeout & FakeTimerClock;

  return isFunction(vi.isFakeTimers)
    ? vi.isFakeTimers()
    : vi.isMockFunction(setTimeout) || !!timeoutWithClock.clock;
};

type AccessibilityComponent = React.ComponentType | Promise<React.ComponentType>;

// eslint-disable-next-line jest/no-export
export const accessibilityTest = (Component: AccessibilityComponent, disabledRules?: string[]) => {
  let originalResizeObserver: typeof global.ResizeObserver;
  let originalFetch: typeof global.fetch;
  let hadResizeObserver: boolean;
  let hadFetch: boolean;

  beforeAll(() => {
    hadResizeObserver = 'ResizeObserver' in global;
    hadFetch = 'fetch' in global;
    originalResizeObserver = global.ResizeObserver;
    originalFetch = global.fetch;

    // Fake ResizeObserver — Vitest constructs the mock implementation with `new`,
    // so this must stay a function expression instead of an arrow.
    // eslint-disable-next-line prefer-arrow-callback
    global.ResizeObserver = vi.fn().mockImplementation(function ResizeObserverMock() {
      return {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      };
    }) as unknown as typeof global.ResizeObserver;

    // fake fetch
    global.fetch = vi.fn(() => {
      return {
        then() {
          return this;
        },
        catch() {
          return this;
        },
        finally() {
          return this;
        },
      };
    }) as unknown as typeof global.fetch;
  });

  afterAll(() => {
    if (hadResizeObserver) {
      global.ResizeObserver = originalResizeObserver;
    } else {
      Reflect.deleteProperty(global, 'ResizeObserver');
    }

    if (hadFetch) {
      global.fetch = originalFetch;
    } else {
      Reflect.deleteProperty(global, 'fetch');
    }
  });

  beforeEach(() => {
    // Reset all mocks
    if (global.fetch) {
      (global.fetch as unknown as Mock).mockClear();
    }
  });

  afterEach(() => {
    // Clear all mocks
    vi.clearAllMocks();
  });
  describe(`accessibility`, () => {
    it(`component does not have any violations`, async () => {
      const restoreFakeTimers = isUsingFakeTimers();

      vi.useRealTimers();

      try {
        const ResolvedComponent = await Component;
        const { container } = render(<ResolvedComponent />);

        const rules = convertRulesToAxeFormat(disabledRules || []);

        const results = await runAxe(container, { rules });
        expect(results).toHaveNoViolations();
      } finally {
        if (restoreFakeTimers) {
          vi.useFakeTimers();
        }
      }
    }, 50000);
  });
};

type Options = {
  /**
   * skip test
   * @default false
   */
  skip?: boolean | string[];
  /**
   * Disable axe rule checks
   * @default []
   */
  disabledRules?: string[];
};

// eslint-disable-next-line jest/no-export
export default function accessibilityDemoTest(component: string, options: Options = {}) {
  // If skip is true, return immediately without executing any tests
  if (options.skip === true) {
    // eslint-disable-next-line jest/no-disabled-tests
    describe.skip(`${component} demo a11y`, () => {
      it('skipped', () => {});
    });
    return;
  }

  describe(`${component} demo a11y`, () => {
    const files = globSync(`./components/${component}/demo/*.tsx`).filter(
      (file) =>
        !file.includes('_semantic') && !file.includes('debug') && !file.includes('component-token'),
    );

    files.forEach((file) => {
      const shouldSkip = Array.isArray(options.skip) && options.skip.includes(path.basename(file));
      const testMethod = shouldSkip ? describe.skip : describe;

      testMethod(`Test ${file} accessibility`, () => {
        if (!shouldSkip) {
          const Demo = vi
            .importActual<{ default: React.ComponentType<any> }>(`../../${file}`)
            .then((mod) => mod.default);
          accessibilityTest(Demo, options.disabledRules);
        }
      });
    });
  });
}
