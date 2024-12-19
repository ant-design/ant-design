import React from 'react';

import notification, { actDestroy, actWrapper } from '..';
import { act } from '../../../tests/utils';
import App from '../../app';
import ConfigProvider from '../../config-provider';
import { awaitPromise, triggerMotionEnd } from './util';

// TODO: Remove this. Mock for React 19
jest.mock('react-dom', () => {
  const realReactDOM = jest.requireActual('react-dom');

  if (realReactDOM.version.startsWith('19')) {
    const realReactDOMClient = jest.requireActual('react-dom/client');
    realReactDOM.createRoot = realReactDOMClient.createRoot;
  }

  return realReactDOM;
});

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

      await awaitPromise();

      act(() => {
        // One frame is 16ms
        jest.advanceTimersByTime(100);
      });

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
  it('should be able to config holderRender', async () => {
    document.body.innerHTML = '';
    actDestroy();
    ConfigProvider.config({
      holderRender: (children) => (
        <ConfigProvider prefixCls="test" iconPrefixCls="icon">
          {children}
        </ConfigProvider>
      ),
    });

    notification.open({ message: 'Notification message' });
    await awaitPromise();
    expect(document.querySelectorAll('.ant-message')).toHaveLength(0);
    expect(document.querySelectorAll('.anticon-close')).toHaveLength(0);
    expect(document.querySelectorAll('.test-notification')).toHaveLength(1);
    expect(document.querySelectorAll('.icon-close')).toHaveLength(1);
    ConfigProvider.config({ holderRender: undefined });
  });
  it('should be able to config holderRender config rtl', async () => {
    document.body.innerHTML = '';
    actDestroy();
    ConfigProvider.config({
      holderRender: (children) => <ConfigProvider direction="rtl">{children}</ConfigProvider>,
    });
    notification.open({ message: 'Notification message' });
    await awaitPromise();
    expect(document.querySelector('.ant-notification-rtl')).toBeTruthy();

    document.body.innerHTML = '';
    actDestroy();
    notification.config({ rtl: true });
    notification.open({ message: 'Notification message' });
    await awaitPromise();
    expect(document.querySelector('.ant-notification-rtl')).toBeTruthy();

    document.body.innerHTML = '';
    actDestroy();
    notification.config({ rtl: false });
    notification.open({ message: 'Notification message' });
    await awaitPromise();
    expect(document.querySelector('.ant-notification-rtl')).toBeFalsy();

    notification.config({ rtl: undefined });
    ConfigProvider.config({ holderRender: undefined });
  });
  it('should be able to config holderRender and static config', async () => {
    // level 1
    document.body.innerHTML = '';
    actDestroy();
    ConfigProvider.config({ prefixCls: 'prefix-1' });
    notification.open({ message: 'Notification message' });
    await awaitPromise();
    expect(document.querySelectorAll('.prefix-1-notification')).toHaveLength(1);

    // level 2
    document.body.innerHTML = '';
    actDestroy();
    ConfigProvider.config({
      prefixCls: 'prefix-1',
      holderRender: (children) => <ConfigProvider prefixCls="prefix-2">{children}</ConfigProvider>,
    });
    notification.open({ message: 'Notification message' });
    await awaitPromise();
    expect(document.querySelectorAll('.prefix-2-notification')).toHaveLength(1);

    // level 3
    document.body.innerHTML = '';
    actDestroy();
    notification.config({ prefixCls: 'prefix-3-notification' });
    notification.open({ message: 'Notification message' });
    await awaitPromise();
    expect(document.querySelectorAll('.prefix-3-notification')).toHaveLength(1);

    // clear config
    notification.config({ prefixCls: '' });
    ConfigProvider.config({ prefixCls: '', iconPrefixCls: '', holderRender: undefined });
  });

  it('should be able to config holderRender use App', async () => {
    document.body.innerHTML = '';
    actDestroy();
    ConfigProvider.config({
      holderRender: (children) => <App notification={{ maxCount: 1 }}>{children}</App>,
    });

    notification.open({ message: 'Notification message' });
    notification.open({ message: 'Notification message' });

    await awaitPromise();
    const noticeWithoutLeaving = Array.from(
      document.querySelectorAll('.ant-notification-notice-wrapper'),
    ).filter((ele) => !ele.classList.contains('ant-notification-fade-leave'));

    expect(noticeWithoutLeaving).toHaveLength(1);

    ConfigProvider.config({ holderRender: undefined });
  });
});
