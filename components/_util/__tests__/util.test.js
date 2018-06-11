import throttleByAnimationFrame from '../throttleByAnimationFrame';
import getDataAttributes from '../getDataAttributes';

describe('Test utils function', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('throttle function should work', () => {
    const callback = jest.fn();
    const throttled = throttleByAnimationFrame(callback);
    expect(callback).not.toBeCalled();

    throttled();
    throttled();

    jest.runAllTimers();
    expect(callback).toBeCalled();
    expect(callback.mock.calls.length).toBe(1);
  });

  it('throttle function should be canceled', () => {
    const callback = jest.fn();
    const throttled = throttleByAnimationFrame(callback);

    throttled();
    throttled.cancel();

    jest.runAllTimers();
    expect(callback).not.toBeCalled();
  });

  describe('getDataAttributes', () => {
    it('returns all data-* properties from an object', () => {
      const props = {
        onClick: () => {},
        isOpen: true,
        'data-test': 'test-id',
        'data-id': 1234,
      };
      const results = getDataAttributes(props);
      expect(results).toEqual({
        'data-test': 'test-id',
        'data-id': 1234,
      });
    });
  });
});
