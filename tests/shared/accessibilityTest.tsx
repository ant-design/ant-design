import path from 'node:path';
import React from 'react';
import { render } from '@testing-library/react';
import { globSync } from 'glob';
import { axe } from 'jest-axe';

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

interface JestFakeTimerState {
  isFakeTimers?: () => boolean;
}

interface FakeTimerClock {
  clock?: unknown;
}

const jestWithFakeTimerState = jest as typeof jest & JestFakeTimerState;

const isUsingFakeTimers = () => {
  const { isFakeTimers } = jestWithFakeTimerState;
  const timeoutWithClock = setTimeout as typeof setTimeout & FakeTimerClock;

  return isFunction(isFakeTimers)
    ? isFakeTimers()
    : jest.isMockFunction(setTimeout) || !!timeoutWithClock.clock;
};

// eslint-disable-next-line jest/no-export
export const accessibilityTest = (Component: React.ComponentType, disabledRules?: string[]) => {
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
    global.ResizeObserver = jest.fn().mockImplementation(function ResizeObserverMock() {
      return {
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      };
    }) as jest.Mock;

    // fake fetch
    global.fetch = jest.fn(() => {
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
    }) as jest.Mock;
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
      (global.fetch as jest.Mock).mockClear();
    }
  });

  afterEach(() => {
    // Clear all mocks
    jest.clearAllMocks();
  });
  describe(`accessibility`, () => {
    it(`component does not have any violations`, async () => {
      const restoreFakeTimers = isUsingFakeTimers();

      jest.useRealTimers();

      try {
        const { container } = render(<Component />);

        const rules = convertRulesToAxeFormat(disabledRules || []);

        const results = await runAxe(container, { rules });
        expect(results).toHaveNoViolations();
      } finally {
        if (restoreFakeTimers) {
          jest.useFakeTimers();
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
          const Demo: React.ComponentType<any> = jest.requireActual(`../../${file}`).default;
          accessibilityTest(Demo, options.disabledRules);
        }
      });
    });
  });
}
