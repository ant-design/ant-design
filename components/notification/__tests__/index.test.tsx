import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import notification, { actWrapper } from '..';
import ConfigProvider from '../../config-provider';
import { act, fireEvent } from '../../../tests/utils';

describe('notification', () => {
  beforeAll(() => {
    actWrapper(act);
  });

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllTimers();
  });

  afterEach(() => {
    notification.destroy();
    notification.config({
      prefixCls: null,
      getContainer: null,
    });

    act(() => {
      jest.runAllTimers();
    });

    // Clean up all motion
    document.querySelectorAll('.ant-notification-notice').forEach(ele => {
      fireEvent.animationEnd(ele);
    });

    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('not duplicate create holder', () => {
    notification.config({
      prefixCls: 'additional-holder',
    });

    for (let i = 0; i < 5; i += 1) {
      notification.open({
        message: 'Notification Title',
        duration: 0,
      });
    }

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

    act(() => {
      jest.runAllTimers();
    });

    notification.open({
      message: 'Notification Title 2',
      duration: 0,
      key: '2',
    });

    act(() => {
      jest.runAllTimers();
    });
    expect(document.querySelectorAll('.ant-notification-notice')).toHaveLength(2);

    // Close 1
    notification.close('1');
    act(() => {
      jest.runAllTimers();
    });

    // Leave motion end
    fireEvent.animationEnd(document.querySelector('.ant-notification-notice')!);

    expect(document.querySelectorAll('.ant-notification-notice')).toHaveLength(1);

    // Close 2
    notification.close('2');
    act(() => {
      jest.runAllTimers();
    });

    // Leave motion end
    fireEvent.animationEnd(document.querySelector('.ant-notification-notice')!);

    expect(document.querySelectorAll('.ant-notification-notice')).toHaveLength(0);
  });

  it('should be able to destroy globally', () => {
    notification.open({
      message: 'Notification Title',
      duration: 0,
    });

    act(() => {
      jest.runAllTimers();
    });

    notification.open({
      message: 'Notification Title',
      duration: 0,
    });

    act(() => {
      jest.runAllTimers();
    });

    expect(document.querySelectorAll('.ant-notification')).toHaveLength(1);
    expect(document.querySelectorAll('.ant-notification-notice')).toHaveLength(2);

    notification.destroy();

    act(() => {
      jest.runAllTimers();
    });

    // Leave motion end
    document.querySelectorAll('.ant-notification-notice').forEach(ele => {
      fireEvent.animationEnd(ele);
    });

    expect(document.querySelectorAll('.ant-notification')).toHaveLength(0);
    expect(document.querySelectorAll('.ant-notification-notice')).toHaveLength(0);
  });

  it('should be able to destroy after config', () => {
    notification.config({
      bottom: 100,
    });

    notification.destroy();
  });

  it('should be able to config rtl', () => {
    notification.config({
      rtl: true,
    });

    notification.open({
      message: 'whatever',
    });

    expect(document.querySelectorAll('.ant-notification-rtl')).toHaveLength(1);
  });

  it('should be able to global config rootPrefixCls', () => {
    ConfigProvider.config({ prefixCls: 'prefix-test', iconPrefixCls: 'bamboo' });

    notification.success({ message: 'Notification Title', duration: 0 });

    expect(document.querySelectorAll('.ant-notification-notice')).toHaveLength(0);
    expect(document.querySelectorAll('.prefix-test-notification-notice')).toHaveLength(1);
    expect(document.querySelectorAll('.bamboo-check-circle')).toHaveLength(1);

    ConfigProvider.config({ prefixCls: 'ant', iconPrefixCls: null! });
  });

  // it('should be able to config prefixCls', () => {
  //   notification.config({
  //     prefixCls: 'prefix-test',
  //   });

  //   notification.open({
  //     message: 'Notification Title',
  //     duration: 0,
  //   });

  //   expect(document.querySelectorAll('.ant-notification-notice')).toHaveLength(0);
  //   expect(document.querySelectorAll('.prefix-test-notice')).toHaveLength(1);

  //   notification.config({
  //     prefixCls: null,
  //   });
  // });

  // it('should be able to open with icon', () => {
  //   const iconPrefix = '.ant-notification-notice-icon';

  //   const list = ['success', 'info', 'warning', 'error'] as const;

  //   list.forEach(type => {
  //     notification[type]({
  //       message: 'Notification Title',
  //       duration: 0,
  //       description: 'This is the content of the notification.',
  //     });

  //     act(() => {
  //       jest.runAllTimers();
  //     });
  //   });

  //   list.forEach(type => {
  //     expect(document.querySelectorAll(`${iconPrefix}-${type}`)).toHaveLength(1);
  //   });
  // });

  // it('should be able to add parent class for different notification types', () => {
  //   const list = ['success', 'info', 'warning', 'error'] as const;
  //   list.forEach(type => {
  //     notification[type]({
  //       message: 'Notification Title',
  //       duration: 0,
  //       description: 'This is the content of the notification.',
  //     });

  //     act(() => {
  //       jest.runAllTimers();
  //     });
  //   });

  //   list.forEach(type => {
  //     expect(document.querySelectorAll(`.ant-notification-notice-${type}`)).toHaveLength(1);
  //   });
  // });

  // it('trigger onClick', () => {
  //   const onClick = jest.fn();

  //   notification.open({
  //     message: 'Notification Title',
  //     duration: 0,
  //     onClick,
  //   });

  //   expect(document.querySelectorAll('.ant-notification')).toHaveLength(1);

  //   fireEvent.click(document.querySelector('.ant-notification-notice')!);
  //   expect(onClick).toHaveBeenCalled();
  // });

  // it('support closeIcon', () => {
  //   notification.open({
  //     message: 'Notification Title',
  //     duration: 0,
  //     closeIcon: <span className="test-customize-icon" />,
  //   });

  //   expect(document.querySelectorAll('.test-customize-icon')).toHaveLength(1);
  // });

  // it('support config closeIcon', () => {
  //   notification.config({
  //     closeIcon: <span className="test-customize-icon" />,
  //   });

  //   // Global Icon
  //   act(() => {
  //     notification.open({
  //       message: 'Notification Title',
  //       duration: 0,
  //     });
  //   });
  //   expect(document.querySelector('.test-customize-icon')).toBeTruthy();

  //   // Notice Icon
  //   act(() => {
  //     notification.open({
  //       message: 'Notification Title',
  //       duration: 0,
  //       closeIcon: <span className="replace-icon" />,
  //     });
  //   });

  //   expect(document.querySelector('.replace-icon')).toBeTruthy();

  //   notification.config({
  //     closeIcon: null,
  //   });
  // });

  // it('closeIcon should be update', async () => {
  //   const list = ['1', '2'];
  //   list.forEach(type => {
  //     notification.open({
  //       message: 'Notification Title',
  //       closeIcon: <span className={`test-customize-icon-${type}`} />,
  //       duration: 0,
  //     });

  //     act(() => {
  //       jest.runAllTimers();
  //     });
  //   });

  //   list.forEach(type => {
  //     expect(document.querySelector(`.test-customize-icon-${type}`)).toBeTruthy();
  //   });
  // });

  // it('support config duration', () => {
  //   notification.config({
  //     duration: 0,
  //   });

  //   notification.open({
  //     message: 'whatever',
  //   });

  //   expect(document.querySelector('.ant-notification')).toBeTruthy();
  // });

  // it('support icon', () => {
  //   notification.open({
  //     message: 'Notification Title',
  //     duration: 0,
  //     icon: <UserOutlined />,
  //   });

  //   expect(document.querySelector('.anticon-user')).toBeTruthy();
  // });
});
