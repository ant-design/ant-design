import notification, { actDestroy, actWrapper } from '..';
import { act, fireEvent } from '../../../tests/utils';

describe('notification.config', () => {
  function triggerMotionEnd() {
    // Clean up all motion
    document.querySelectorAll('.ant-notification-notice').forEach(ele => {
      fireEvent.animationEnd(ele);
    });
  }

  beforeAll(() => {
    actWrapper(act);
  });

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllTimers();
  });

  afterEach(() => {
    actDestroy();

    act(() => {
      jest.runAllTimers();
    });

    // Clean up all motion
    triggerMotionEnd();

    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should be able to config maxCount', () => {
    notification.config({
      maxCount: 5,
      duration: 0.5,
    });

    for (let i = 0; i < 10; i += 1) {
      act(() => {
        notification.open({
          message: 'Notification message',
          key: i,
          duration: 999,
        });
      });

      act(() => {
        // One frame is 16ms
        jest.advanceTimersByTime(100);
      });
      triggerMotionEnd();

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
    triggerMotionEnd();

    expect(document.querySelectorAll('.ant-notification-notice')).toHaveLength(5);
    expect(document.querySelectorAll('.ant-notification-notice')[4].textContent).toBe(
      'Notification last',
    );

    act(() => {
      jest.runAllTimers();
    });

    triggerMotionEnd();

    expect(document.querySelectorAll('.ant-notification-notice')).toHaveLength(0);
  });
});
