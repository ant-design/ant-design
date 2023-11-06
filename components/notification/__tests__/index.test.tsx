import { UserOutlined } from '@ant-design/icons';
import React from 'react';
import notification, { actWrapper } from '..';
import { act, fireEvent } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import { awaitPromise, triggerMotionEnd } from './util';

describe('notification', () => {
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

  it('not duplicate create holder', async () => {
    notification.config({
      prefixCls: 'additional-holder',
    });

    for (let i = 0; i < 5; i += 1) {
      notification.open({
        message: 'Notification Title',
        duration: 0,
      });
    }

    await awaitPromise();

    act(() => {
      jest.runAllTimers();
    });

    expect(document.querySelectorAll('.additional-holder')).toHaveLength(1);
  });

  it('should be able to hide manually', async () => {
    notification.open({
      message: 'Notification Title 1',
      duration: 0,
      key: '1',
    });
    await awaitPromise();

    notification.open({
      message: 'Notification Title 2',
      duration: 0,
      key: '2',
    });

    expect(document.querySelectorAll('.ant-notification-notice')).toHaveLength(2);

    // Close 1
    notification.destroy('1');

    await triggerMotionEnd();

    expect(document.querySelectorAll('.ant-notification-notice')).toHaveLength(1);

    // Close 2
    notification.destroy('2');

    await triggerMotionEnd();

    expect(document.querySelectorAll('.ant-notification-notice')).toHaveLength(0);
  });

  it('should be able to destroy globally', async () => {
    notification.open({
      message: 'Notification Title 1',
      duration: 0,
    });
    await awaitPromise();

    notification.open({
      message: 'Notification Title 2',
      duration: 0,
    });

    expect(document.querySelectorAll('.ant-notification')).toHaveLength(1);
    expect(document.querySelectorAll('.ant-notification-notice')).toHaveLength(2);

    notification.destroy();

    await triggerMotionEnd();

    expect(document.querySelectorAll('.ant-notification')).toHaveLength(0);
    expect(document.querySelectorAll('.ant-notification-notice')).toHaveLength(0);
  });

  it('should be able to destroy after config', () => {
    notification.config({
      bottom: 100,
    });

    notification.destroy();
  });

  it('should be able to config rtl', async () => {
    notification.config({
      rtl: true,
    });

    notification.open({
      message: 'whatever',
    });
    await awaitPromise();

    expect(document.querySelectorAll('.ant-notification-rtl')).toHaveLength(1);
  });

  it('should be able to global config rootPrefixCls', async () => {
    ConfigProvider.config({ prefixCls: 'prefix-test', iconPrefixCls: 'bamboo' });

    notification.success({ message: 'Notification Title', duration: 0 });
    await awaitPromise();

    expect(document.querySelectorAll('.ant-notification-notice')).toHaveLength(0);
    expect(document.querySelectorAll('.prefix-test-notification-notice')).toHaveLength(1);
    expect(document.querySelectorAll('.bamboo-check-circle')).toHaveLength(1);

    ConfigProvider.config({ prefixCls: 'ant', iconPrefixCls: null! });
  });

  it('should be able to config prefixCls', async () => {
    notification.config({
      prefixCls: 'prefix-test',
    });

    notification.open({
      message: 'Notification Title',
      duration: 0,
    });
    await awaitPromise();

    expect(document.querySelectorAll('.ant-notification-notice')).toHaveLength(0);
    expect(document.querySelectorAll('.prefix-test-notice')).toHaveLength(1);

    notification.config({
      prefixCls: undefined,
    });
  });

  it('should be able to open with icon', async () => {
    const iconPrefix = '.ant-notification-notice-icon';

    const list = ['success', 'info', 'warning', 'error'] as const;

    list.forEach((type) => {
      notification[type]({
        message: 'Notification Title',
        duration: 0,
        description: 'This is the content of the notification.',
      });
    });

    await awaitPromise();

    list.forEach((type) => {
      expect(document.querySelectorAll(`${iconPrefix}-${type}`)).toHaveLength(1);
    });
  });

  it('should be able to add parent class for different notification types', async () => {
    const list = ['success', 'info', 'warning', 'error'] as const;
    list.forEach((type) => {
      notification[type]({
        message: 'Notification Title',
        duration: 0,
        description: 'This is the content of the notification.',
      });
    });

    await awaitPromise();

    list.forEach((type) => {
      expect(document.querySelectorAll(`.ant-notification-notice-${type}`)).toHaveLength(1);
    });
  });

  it('trigger onClick', async () => {
    const onClick = jest.fn();

    notification.open({
      message: 'Notification Title',
      duration: 0,
      onClick,
    });
    await awaitPromise();

    expect(document.querySelectorAll('.ant-notification')).toHaveLength(1);

    fireEvent.click(document.querySelector('.ant-notification-notice')!);
    expect(onClick).toHaveBeenCalled();
  });

  it('support closeIcon', async () => {
    notification.open({
      message: 'Notification Title',
      duration: 0,
      closeIcon: <span className="test-customize-icon" />,
    });
    await awaitPromise();

    expect(document.querySelectorAll('.test-customize-icon')).toHaveLength(1);
  });

  it('support config closeIcon', async () => {
    notification.config({
      closeIcon: <span className="test-customize-icon" />,
    });

    // Global Icon
    notification.open({
      message: 'Notification Title',
      duration: 0,
    });
    await awaitPromise();

    expect(document.querySelector('.test-customize-icon')).toBeTruthy();

    // Notice Icon
    notification.open({
      message: 'Notification Title',
      duration: 0,
      closeIcon: <span className="replace-icon" />,
    });

    expect(document.querySelector('.replace-icon')).toBeTruthy();

    notification.config({
      closeIcon: null,
    });
  });

  it('closeIcon should be update', async () => {
    const list = ['1', '2'];
    list.forEach((type) => {
      notification.open({
        message: 'Notification Title',
        closeIcon: <span className={`test-customize-icon-${type}`} />,
        duration: 0,
      });
    });

    await awaitPromise();

    list.forEach((type) => {
      expect(document.querySelector(`.test-customize-icon-${type}`)).toBeTruthy();
    });
  });

  it('support config duration', async () => {
    notification.config({
      duration: 0,
    });

    notification.open({
      message: 'whatever',
    });
    await awaitPromise();

    expect(document.querySelector('.ant-notification')).toBeTruthy();
  });

  it('support icon', async () => {
    notification.open({
      message: 'Notification Title',
      duration: 0,
      icon: <UserOutlined />,
    });
    await awaitPromise();

    expect(document.querySelector('.anticon-user')).toBeTruthy();
  });

  it('support props', () => {
    act(() => {
      notification.open({
        message: 'Notification Title',
        duration: 0,
        props: { 'data-testid': 'test-notification' },
      });
    });

    expect(document.querySelectorAll("[data-testid='test-notification']").length).toBe(1);
  });

  it('support role', async () => {
    act(() => {
      notification.open({
        message: 'Notification Title',
        duration: 0,
        role: 'status',
      });
    });

    expect(document.querySelectorAll('[role="status"]').length).toBe(1);
  });

  it('should hide close btn when closeIcon setting to null or false', async () => {
    notification.config({
      closeIcon: undefined,
    });
    act(() => {
      notification.open({
        message: 'Notification Title',
        duration: 0,
        className: 'normal',
      });
      notification.open({
        message: 'Notification Title',
        duration: 0,
        className: 'custom',
        closeIcon: <span className="custom-close-icon">Close</span>,
      });
      notification.open({
        message: 'Notification Title',
        duration: 0,
        closeIcon: null,
        className: 'with-null',
      });
      notification.open({
        message: 'Notification Title',
        duration: 0,
        closeIcon: false,
        className: 'with-false',
      });
    });
    await awaitPromise();
    expect(document.querySelectorAll('.normal .ant-notification-notice-close').length).toBe(1);
    expect(document.querySelectorAll('.custom .custom-close-icon').length).toBe(1);
    expect(document.querySelectorAll('.with-null .ant-notification-notice-close').length).toBe(0);
    expect(document.querySelectorAll('.with-false .ant-notification-notice-close').length).toBe(0);
  });

  it('style.width could be overrided', async () => {
    act(() => {
      notification.open({
        message: 'Notification Title',
        duration: 0,
        style: {
          width: 600,
        },
        className: 'with-style',
      });
    });
    await awaitPromise();
    expect(document.querySelector('.with-style')).toHaveStyle({ width: '600px' });
    expect(
      document.querySelector('.ant-notification-notice-wrapper:has(.width-style)'),
    ).toHaveStyle({ width: '' });
  });
});
