import React from 'react';

import notification, { actDestroy, actWrapper } from '..';
import { act } from '../../../tests/utils';
import App from '../../app';
import ConfigProvider from '../../config-provider';
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
  it('should be able to config container', async () => {
    actDestroy();
    ConfigProvider.config({
      container: (children) => (
        <ConfigProvider iconPrefixCls="aaa" prefixCls="test">
          {children}
        </ConfigProvider>
      ),
    });

    notification.open({ message: 'Notification message' });
    await awaitPromise();
    expect(document.querySelectorAll('.ant-message')).toHaveLength(0);
    expect(document.querySelectorAll('.anticon-close')).toHaveLength(0);
    expect(document.querySelectorAll('.test-notification')).toHaveLength(1);
    expect(document.querySelectorAll('.aaa-close')).toHaveLength(1);
    ConfigProvider.config({ container: undefined });
  });
  it('should be able to config container use App', async () => {
    document.body.innerHTML = '';
    actDestroy();
    ConfigProvider.config({
      container: (children) => <App notification={{ maxCount: 1 }}>{children}</App>,
    });

    notification.open({ message: 'Notification message' });
    notification.open({ message: 'Notification message' });

    await awaitPromise();
    const noticeWithoutLeaving = Array.from(
      document.querySelectorAll('.ant-notification-notice-wrapper'),
    ).filter((ele) => !ele.classList.contains('ant-notification-fade-leave'));

    expect(noticeWithoutLeaving).toHaveLength(1);

    ConfigProvider.config({ container: undefined });
  });
});
