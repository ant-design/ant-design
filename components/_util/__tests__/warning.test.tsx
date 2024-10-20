import React from 'react';
import { render } from '@testing-library/react';

import { devUseWarning as useWarning } from '../warning';

describe('Test warning', () => {
  let spy: jest.SpyInstance;

  beforeAll(() => {
    spy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    spy.mockRestore();
  });

  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    spy.mockReset();
  });

  it('Test noop', async () => {
    const { noop } = await import('../warning');
    const value = noop();

    expect(value).toBe(undefined);
    expect(spy).not.toHaveBeenCalled();
    expect(noop).not.toThrow();
  });

  describe('process.env.NODE_ENV !== "production"', () => {
    it('If `false`, exec `console.error`', async () => {
      const warning = (await import('../warning')).default;
      warning(false, 'error');

      expect(spy).toHaveBeenCalled();
    });

    it('If `true`, do not exec `console.error`', async () => {
      const warning = (await import('../warning')).default;
      warning(true, 'error message');

      expect(spy).not.toHaveBeenCalled();
    });
    it('should show warning when using devUseWarning', async () => {
      const App = () => {
        // Don't use dynamic import to fixed issue: TypeError: Cannot read properties of null (reading 'useContext')
        const warning = useWarning('Test');
        warning(false, 'usage', 'test message');
        warning.deprecated(false, 'old prop', 'new prop');
        return null;
      };
      render(<App />);

      expect(spy).toHaveBeenCalledWith('Warning: [antd: Test] test message');
      expect(spy).toHaveBeenCalledWith(
        'Warning: [antd: Test] `old prop` is deprecated. Please use `new prop` instead.',
      );
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });

  describe('process.env.NODE_ENV === "production"', () => {
    let prevEnv: string | undefined;
    const mockNodeEnv = () => {
      prevEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';
    };
    const restoreNodeEnv = () => {
      process.env.NODE_ENV = prevEnv;
    };
    beforeEach(() => {
      mockNodeEnv();
    });
    afterEach(() => {
      restoreNodeEnv();
    });
    it('Whether `true` or `false`, do not exec `console.error`', async () => {
      const { default: warning, noop } = await import('../warning');

      expect(warning).toEqual(noop);

      warning(false, 'error message');
      expect(spy).not.toHaveBeenCalled();

      warning(true, 'error message');
      expect(spy).not.toHaveBeenCalled();
    });

    it('should not show warning when using devUseWarning', async () => {
      const { devUseWarning } = await import('../warning');
      const App = () => {
        const warning = devUseWarning('Test');
        warning(false, 'usage', 'test message');
        warning.deprecated(false, 'old prop', 'new prop');
        return null;
      };
      render(<App />);

      expect(spy).toHaveBeenCalledTimes(0);
    });
  });
});
