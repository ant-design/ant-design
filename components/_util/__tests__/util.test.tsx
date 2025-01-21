import { waitFakeTimer } from '../../../tests/utils';
import { isStyleSupport } from '../styleChecker';
import throttleByAnimationFrame from '../throttleByAnimationFrame';

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
