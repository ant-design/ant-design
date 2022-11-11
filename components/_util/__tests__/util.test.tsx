/* eslint-disable class-methods-use-this */
import KeyCode from 'rc-util/lib/KeyCode';
import raf from 'rc-util/lib/raf';
import React from 'react';
import { waitFakeTimer, render, fireEvent } from '../../../tests/utils';
import getDataOrAriaProps from '../getDataOrAriaProps';
import delayRaf from '../raf';
import { isStyleSupport } from '../styleChecker';
import {
  throttleByAnimationFrame,
  throttleByAnimationFrameDecorator,
} from '../throttleByAnimationFrame';
import TransButton from '../transButton';

describe('Test utils function', () => {
  describe('throttle', () => {
    beforeAll(() => {
      jest.useFakeTimers();
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    afterEach(() => {
      jest.clearAllTimers();
    });

    it('throttle function should work', async () => {
      const callback = jest.fn();
      const throttled = throttleByAnimationFrame(callback);
      expect(callback).not.toHaveBeenCalled();

      throttled();
      throttled();
      await waitFakeTimer();

      expect(callback).toHaveBeenCalled();
      expect(callback.mock.calls.length).toBe(1);
    });

    it('throttle function should be canceled', async () => {
      const callback = jest.fn();
      const throttled = throttleByAnimationFrame(callback);

      throttled();
      throttled.cancel();
      await waitFakeTimer();

      expect(callback).not.toHaveBeenCalled();
    });

    it('throttleByAnimationFrameDecorator should works', async () => {
      const callbackFn = jest.fn();
      class Test {
        @throttleByAnimationFrameDecorator()
        callback() {
          callbackFn();
        }
      }
      const test = new Test();
      test.callback();
      test.callback();
      test.callback();
      await waitFakeTimer();
      expect(callbackFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('getDataOrAriaProps', () => {
    it('returns all data-* properties from an object', () => {
      const props = {
        onClick: () => {},
        isOpen: true,
        'data-test': 'test-id',
        'data-id': 1234,
      };
      const results = getDataOrAriaProps(props);
      expect(results).toEqual({
        'data-test': 'test-id',
        'data-id': 1234,
      });
    });

    it('does not return data-__ properties from an object', () => {
      const props = {
        onClick: () => {},
        isOpen: true,
        'data-__test': 'test-id',
        'data-__id': 1234,
      };
      const results = getDataOrAriaProps(props);
      expect(results).toEqual({});
    });

    it('returns all aria-* properties from an object', () => {
      const props = {
        onClick: () => {},
        isOpen: true,
        'aria-labelledby': 'label-id',
        'aria-label': 'some-label',
      };
      const results = getDataOrAriaProps(props);
      expect(results).toEqual({
        'aria-labelledby': 'label-id',
        'aria-label': 'some-label',
      });
    });

    it('returns role property from an object', () => {
      const props = {
        onClick: () => {},
        isOpen: true,
        role: 'search',
      };
      const results = getDataOrAriaProps(props);
      expect(results).toEqual({ role: 'search' });
    });
  });

  it('delayRaf', done => {
    jest.useRealTimers();

    let bamboo = false;
    delayRaf(() => {
      bamboo = true;
    }, 3);

    // Do nothing, but insert in the frame
    // https://github.com/ant-design/ant-design/issues/16290
    delayRaf(() => {}, 3);

    // Variable bamboo should be false in frame 2 but true in frame 4
    raf(() => {
      expect(bamboo).toBe(false);

      // Frame 2
      raf(() => {
        expect(bamboo).toBe(false);

        // Frame 3
        raf(() => {
          // Frame 4
          raf(() => {
            expect(bamboo).toBe(true);
            done();
          });
        });
      });
    });
  });

  describe('TransButton', () => {
    it('can be focus/blur', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<TransButton ref={ref}>TransButton</TransButton>);
      expect(typeof ref.current?.focus).toBe('function');
      expect(typeof ref.current?.blur).toBe('function');
    });

    it('should trigger onClick when press enter', () => {
      const onClick = jest.fn();

      const { container } = render(<TransButton onClick={onClick}>TransButton</TransButton>);

      // callback should trigger
      fireEvent.keyUp(container.querySelector('div')!, { keyCode: KeyCode.ENTER });
      expect(onClick).toHaveBeenCalledTimes(1);

      // callback should not trigger
      fireEvent.keyDown(container.querySelector('div')!, { keyCode: KeyCode.ENTER });
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('style', () => {
    it('isStyleSupport', () => {
      expect(isStyleSupport('color')).toBe(true);
      expect(isStyleSupport('not-existed')).toBe(false);
    });

    it('isStyleSupport return false in service side', () => {
      const spy = jest
        .spyOn(window.document, 'documentElement', 'get')
        .mockImplementation(() => undefined as unknown as HTMLElement);
      expect(isStyleSupport('color')).toBe(false);
      expect(isStyleSupport('not-existed')).toBe(false);
      spy.mockRestore();
    });
  });
});
