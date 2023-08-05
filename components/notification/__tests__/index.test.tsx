import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import notification, { getInstance, type NotificationInstance } from '..';
import { waitFakeTimer, act } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

Object.defineProperty(globalThis, 'IS_REACT_ACT_ENVIRONMENT', {
  writable: true,
  value: true,
});

type NotificationWithIconType = keyof Omit<NotificationInstance, 'open'>;

describe('notification', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runAllTimers();
    });
    jest.useRealTimers();

    act(() => {
      notification.destroy();
    });
  });

  it('not duplicate create holder', async () => {
    for (let i = 0; i < 5; i += 1) {
      act(() => {
        notification.open({
          message: 'Notification Title',
          duration: 0,
          prefixCls: 'additional-holder',
        });
      });
    }

    await waitFakeTimer();

    const count = document.querySelectorAll('.additional-holder').length;
    expect(count).toEqual(1);
  });

  it('should be able to hide manually', async () => {
    act(() => {
      notification.open({
        message: 'Notification Title 1',
        duration: 0,
        key: '1',
      });
      jest.runAllTimers();
    });

    act(() => {
      jest.runAllTimers();
    });

    act(() => {
      notification.open({
        message: 'Notification Title 2',
        duration: 0,
        key: '2',
      });
      jest.runAllTimers();
    });

    act(() => {
      jest.runAllTimers();
    });

    await act(async () => {
      await Promise.resolve();
    });
    expect(document.querySelectorAll('.ant-notification-notice').length).toBe(2);

    act(() => {
      notification.close('1');
      jest.runAllTimers();
    });

    await act(async () => {
      await Promise.resolve();
    });
    expect((await getInstance('ant-notification-topRight'))!.component.state.notices).toHaveLength(
      1,
    );

    act(() => {
      notification.close('2');
      jest.runAllTimers();
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect((await getInstance('ant-notification-topRight'))!.component.state.notices).toHaveLength(
      0,
    );
  });

  it('should be able to destroy globally', async () => {
    act(() => {
      notification.open({
        message: 'Notification Title',
        duration: 0,
      });
    });

    act(() => {
      notification.open({
        message: 'Notification Title',
        duration: 0,
      });
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(document.querySelectorAll('.ant-notification').length).toBe(1);
    expect(document.querySelectorAll('.ant-notification-notice').length).toBe(2);

    act(() => {
      notification.destroy();
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect(document.querySelectorAll('.ant-notification').length).toBe(0);
    expect(document.querySelectorAll('.ant-notification-notice').length).toBe(0);
  });

  it('should be able to destroy after config', () => {
    act(() => {
      notification.config({
        bottom: 100,
      });
    });

    act(() => {
      notification.destroy();
    });
  });

  it('should be able to config rtl', () => {
    act(() => {
      notification.config({
        rtl: true,
      });
    });

    act(() => {
      notification.open({
        message: 'whatever',
      });
    });

    expect(document.querySelectorAll('.ant-notification-rtl').length).toBe(1);
  });

  it('should be able to global config rootPrefixCls', () => {
    ConfigProvider.config({ prefixCls: 'prefix-test', iconPrefixCls: 'bamboo' });

    act(() => {
      notification.success({ message: 'Notification Title', duration: 0 });
    });

    expect(document.querySelectorAll('.ant-notification-notice')).toHaveLength(0);
    expect(document.querySelectorAll('.prefix-test-notification-notice')).toHaveLength(1);
    expect(document.querySelectorAll('.bamboo-check-circle')).toHaveLength(1);
    ConfigProvider.config({ prefixCls: 'ant', iconPrefixCls: '' });
  });

  it('should be able to config prefixCls', () => {
    notification.config({
      prefixCls: 'prefix-test',
    });

    act(() => {
      notification.open({
        message: 'Notification Title',
        duration: 0,
      });
    });

    expect(document.querySelectorAll('.ant-notification-notice')).toHaveLength(0);
    expect(document.querySelectorAll('.prefix-test-notice')).toHaveLength(1);

    notification.config({
      prefixCls: '',
    });
  });

  it('should be able to open with icon', async () => {
    const iconPrefix = '.ant-notification-notice-icon';

    const openNotificationWithIcon = async (type: NotificationWithIconType) => {
      act(() => {
        notification[type]({
          message: 'Notification Title',
          duration: 0,
          description: 'This is the content of the notification.',
        });
        jest.runAllTimers();
      });
    };

    const list: Array<NotificationWithIconType> = ['success', 'info', 'warning', 'error'];

    const promises = list.map(type => openNotificationWithIcon(type));

    await act(async () => {
      await Promise.all(promises);
    });

    list.forEach(type => {
      expect(document.querySelectorAll(`${iconPrefix}-${type}`).length).toBe(1);
    });
  });

  it('should be able to add parent class for different notification types', async () => {
    const openNotificationWithIcon = async (type: NotificationWithIconType) => {
      act(() => {
        notification[type]({
          message: 'Notification Title',
          duration: 0,
          description: 'This is the content of the notification.',
        });
        jest.runAllTimers();
      });
    };

    const list: Array<NotificationWithIconType> = ['success', 'info', 'warning', 'error'];
    const promises = list.map(type => openNotificationWithIcon(type));

    await act(async () => {
      await Promise.all(promises);
    });

    list.forEach(type => {
      expect(document.querySelectorAll(`.ant-notification-notice-${type}`).length).toBe(1);
    });
  });

  it('trigger onClick', () => {
    act(() => {
      notification.open({
        message: 'Notification Title',
        duration: 0,
      });
    });

    expect(document.querySelectorAll('.ant-notification').length).toBe(1);
  });

  it('support closeIcon', () => {
    act(() => {
      notification.open({
        message: 'Notification Title',
        duration: 0,
        closeIcon: <span className="test-customize-icon" />,
      });
    });

    expect(document.querySelectorAll('.test-customize-icon').length).toBe(1);
  });

  it('support closeIcon to be null', () => {
    act(() => {
      notification.open({
        message: 'Notification Title',
        duration: 0,
        closeIcon: null,
      });
    });

    expect(document.querySelectorAll('.test-customize-icon').length).toBe(0);
  });

  it('support closeIcon to be false', () => {
    act(() => {
      notification.open({
        message: 'Notification Title',
        duration: 0,
        closeIcon: false,
      });
    });

    expect(document.querySelectorAll('.test-customize-icon').length).toBe(0);
  });

  it('support config closeIcon', () => {
    notification.config({
      closeIcon: <span className="test-customize-icon" />,
    });

    act(() => {
      notification.open({
        message: 'Notification Title',
        duration: 0,
        closeIcon: <span className="test-customize-icon" />,
      });
    });

    expect(document.querySelectorAll('.test-customize-icon').length).toBe(1);
  });

  it('closeIcon should be update', async () => {
    const openNotificationWithCloseIcon = async (type: '1' | '2') => {
      act(() => {
        notification.open({
          message: 'Notification Title',
          closeIcon: <span className={`test-customize-icon-${type}`} />,
        });
        jest.runAllTimers();
      });
    };

    const list: Array<'1' | '2'> = ['1', '2'];
    const promises = list.map(type => openNotificationWithCloseIcon(type));

    await act(async () => {
      await Promise.all(promises);
    });

    list.forEach(type => {
      expect(document.querySelectorAll(`.test-customize-icon-${type}`).length).toBe(1);
    });
  });

  it('support config duration', () => {
    notification.config({
      duration: 0,
    });

    act(() => {
      notification.open({
        message: 'whatever',
      });
    });

    expect(document.querySelectorAll('.ant-notification').length).toBe(1);
  });

  it('support icon', () => {
    act(() => {
      notification.open({
        message: 'Notification Title',
        duration: 0,
        icon: <UserOutlined />,
      });
    });

    expect(document.querySelectorAll('.anticon-user').length).toBe(1);
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
});
