import notification, { actWrapper } from '..';
import { act } from '../../../tests/utils';
import { awaitPromise, triggerMotionEnd } from './util';

describe('notification.config', () => {
  beforeAll(() => {
    actWrapper(act);
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(async () => {
    // Clean up
    notification.destroy();
    await triggerMotionEnd();

    notification.config({
      prefixCls: undefined,
      getContainer: undefined,
    });

    jest.useRealTimers();

    await awaitPromise();
  });

  it('should be able to config maxCount', async () => {
    notification.config({
      maxCount: 5,
      duration: 0.5,
    });

    for (let i = 0; i < 10; i += 1) {
      notification.open({
        message: 'Notification message',
        key: i,
        duration: 999,
      });

      // eslint-disable-next-line no-await-in-loop
      await awaitPromise();

      act(() => {
        // One frame is 16ms
        jest.advanceTimersByTime(100);
      });

      // eslint-disable-next-line no-await-in-loop
      await triggerMotionEnd(false);

      const count = document.querySelectorAll('.ant-notification-notice').length;
      expect(count).toBeLessThanOrEqual(5);
    }

    act(() => {
      notification.open({
        message: 'Notification last',
        key: '11',
        duration: 999,
      });
    });

    act(() => {
      // One frame is 16ms
      jest.advanceTimersByTime(100);
    });
    await triggerMotionEnd(false);

    expect(document.querySelectorAll('.ant-notification-notice')).toHaveLength(5);
    expect(document.querySelectorAll('.ant-notification-notice')[4].textContent).toBe(
      'Notification last',
    );

    act(() => {
      jest.runAllTimers();
    });
    act(() => {
      jest.runAllTimers();
    });

    await triggerMotionEnd(false);

    expect(document.querySelectorAll('.ant-notification-notice')).toHaveLength(0);
  });
});
