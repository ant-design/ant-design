import { UserOutlined } from '@ant-design/icons';
import React from 'react';
import { act } from 'react-dom/test-utils';
import notification, { getInstance } from '..';
import { sleep } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

describe('notification', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.runAllTimers();
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

    await sleep();

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
    expect((await getInstance('ant-notification-topRight')).component.state.notices).toHaveLength(
      1,
    );

    act(() => {
      notification.close('2');
      jest.runAllTimers();
    });

    await act(async () => {
      await Promise.resolve();
    });

    expect((await getInstance('ant-notification-topRight')).component.state.notices).toHaveLength(
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
    ConfigProvider.config({ prefixCls: 'ant', iconPrefixCls: null });
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

    const openNotificationWithIcon = async type => {
      act(() => {
        notification[type]({
          message: 'Notification Title',
          duration: 0,
          description: 'This is the content of the notification.',
        });
        jest.runAllTimers();
      });
    };

    const list = ['success', 'info', 'warning', 'error'];

    const promises = list.map(type => openNotificationWithIcon(type));

    await act(async () => {
      await Promise.all(promises);
    });

    list.forEach(type => {
      expect(document.querySelectorAll(`${iconPrefix}-${type}`).length).toBe(1);
    });
  });

  it('should be able to add parent class for different notification types', async () => {
    const openNotificationWithIcon = async type => {
      act(() => {
        notification[type]({
          message: 'Notification Title',
          duration: 0,
          description: 'This is the content of the notification.',
        });
        jest.runAllTimers();
      });
    };

    const list = ['success', 'info', 'warning', 'error'];
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
    const openNotificationWithCloseIcon = async type => {
      act(() => {
        notification.open({
          message: 'Notification Title',
          closeIcon: <span className={`test-customize-icon-${type}`} />,
        });
        jest.runAllTimers();
      });
    };

    const list = ['1', '2'];
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
});
