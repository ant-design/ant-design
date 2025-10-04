import React from 'react';
import { SmileOutlined, UserOutlined } from '@ant-design/icons';

import notification, { actWrapper } from '..';
import { act, fireEvent, render } from '../../../tests/utils';
import ConfigProvider, { defaultPrefixCls } from '../../config-provider';
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
        title: 'Notification Title',
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
      title: 'Notification Title 1',
      duration: 0,
      key: '1',
    });
    await awaitPromise();

    notification.open({
      title: 'Notification Title 2',
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
      title: 'Notification Title 1',
      duration: 0,
    });
    await awaitPromise();

    notification.open({
      title: 'Notification Title 2',
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
      title: 'whatever',
    });
    await awaitPromise();

    expect(document.querySelectorAll('.ant-notification-rtl')).toHaveLength(1);
  });

  it('should be able to global config rootPrefixCls', async () => {
    ConfigProvider.config({ prefixCls: 'prefix-test', iconPrefixCls: 'bamboo' });

    notification.success({ title: 'Notification Title', duration: 0 });
    await awaitPromise();

    expect(document.querySelectorAll('.ant-notification-notice')).toHaveLength(0);
    expect(document.querySelectorAll('.prefix-test-notification-notice')).toHaveLength(1);
    expect(document.querySelectorAll('.bamboo-check-circle')).toHaveLength(1);

    ConfigProvider.config({ prefixCls: defaultPrefixCls, iconPrefixCls: null! });
  });

  it('should be able to config prefixCls', async () => {
    notification.config({
      prefixCls: 'prefix-test',
    });

    notification.open({
      title: 'Notification Title',
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
        title: 'Notification Title',
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
        title: 'Notification Title',
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
      title: 'Notification Title',
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
      title: 'Notification Title',
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
      title: 'Notification Title',
      duration: 0,
    });
    await awaitPromise();

    expect(document.querySelector('.test-customize-icon')).toBeTruthy();

    // Notice Icon
    notification.open({
      title: 'Notification Title',
      duration: 0,
      closeIcon: <span className="replace-icon" />,
    });

    expect(document.querySelector('.replace-icon')).toBeTruthy();

    notification.config({
      closeIcon: null,
    });
  });

  it('support config closable', async () => {
    notification.config({
      closable: {
        closeIcon: <span className="test-customize-icon" />,
        'aria-label': 'CloseBtn',
      },
    });

    // Global Icon
    notification.open({
      title: 'Notification Title',
      duration: 0,
    });
    await awaitPromise();

    expect(document.querySelector('.test-customize-icon')).toBeTruthy();
    expect(document.querySelector('*[aria-label="CloseBtn"]')).toBeTruthy();

    // Notice Icon
    notification.open({
      title: 'Notification Title',
      duration: 0,
      closable: {
        closeIcon: <span className="replace-icon" />,
        'aria-label': 'CloseBtn2',
      },
    });

    expect(document.querySelector('.replace-icon')).toBeTruthy();
    expect(document.querySelector('*[aria-label="CloseBtn2"]')).toBeTruthy();

    notification.config({
      closable: undefined,
    });
  });

  it('should call both closable.onClose and onClose when close button clicked', async () => {
    const handleClose = jest.fn();
    const handleClosableClose = jest.fn();
    notification.open({
      title: 'Test Notification',
      duration: 0,
      closable: {
        onClose: handleClosableClose,
      },
      onClose: handleClose,
    });

    await awaitPromise();
    const closeBtn = document.body.querySelector('.ant-notification-notice-close');
    fireEvent.click(closeBtn!);

    expect(handleClose).toHaveBeenCalledTimes(1);
    expect(handleClosableClose).toHaveBeenCalledTimes(1);
  });

  it('closeIcon should be update', async () => {
    const list = ['1', '2'];
    list.forEach((type) => {
      notification.open({
        title: 'Notification Title',
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
      title: 'whatever',
    });
    await awaitPromise();

    expect(document.querySelector('.ant-notification')).toBeTruthy();
  });

  it('support icon', async () => {
    notification.open({
      title: 'Notification Title',
      duration: 0,
      icon: <UserOutlined />,
    });
    await awaitPromise();

    expect(document.querySelector('.anticon-user')).toBeTruthy();
  });

  it('support props', () => {
    act(() => {
      notification.open({
        title: 'Notification Title',
        duration: 0,
        props: { 'data-testid': 'test-notification' },
      });
    });

    expect(document.querySelectorAll("[data-testid='test-notification']").length).toBe(1);
  });

  it('support role', async () => {
    act(() => {
      notification.open({
        title: 'Notification Title',
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
        title: 'Notification Title',
        duration: 0,
        className: 'normal',
      });
      notification.open({
        title: 'Notification Title',
        duration: 0,
        className: 'custom',
        closeIcon: <span className="custom-close-icon">Close</span>,
      });
      notification.open({
        title: 'Notification Title',
        duration: 0,
        closeIcon: null,
        className: 'with-null',
      });
      notification.open({
        title: 'Notification Title',
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

  it('style.width could be override', async () => {
    act(() => {
      notification.open({
        title: 'Notification Title',
        duration: 0,
        style: {
          width: 600,
        },
        className: 'with-style',
      });
    });
    await awaitPromise();
    expect(document.querySelector('.with-style')).toHaveStyle({ width: '600px' });
  });
  it('support classnames', async () => {
    const TestComponent: React.FC = () => {
      const [api, contextHolder] = notification.useNotification();

      const openNotification = () => {
        api.open({
          title: 'Notification Title',
          description: 'Description of the notification.',
          duration: 0,
          icon: <SmileOutlined />,
          actions: <button type="button">My Button</button>,
          styles: {
            root: { color: 'rgb(255, 0, 0)' },
            title: { fontSize: 23 },
            description: { fontWeight: 'bold' },
            actions: { background: 'rgb(0, 255, 0)' },
            icon: { color: 'rgb(0, 0, 255)' },
          },
          classNames: {
            root: 'root-class',
            title: 'title-class',
            description: 'description-class',
            actions: 'actions-class',
            icon: 'icon-class',
          },
        });
      };

      return (
        <>
          {contextHolder}
          <button type="button" onClick={openNotification}>
            open
          </button>
        </>
      );
    };
    const { getByText } = render(<TestComponent />);

    act(() => {
      getByText('open').click();
    });

    await awaitPromise();
    expect(document.querySelector('.root-class')).toHaveStyle({ color: 'rgb(255, 0, 0)' });
    expect(document.querySelector('.title-class')).toHaveStyle({ fontSize: '23px' });
    expect(document.querySelector('.description-class')).toHaveStyle({ fontWeight: 'bold' });
    expect(document.querySelector('.actions-class')).toHaveStyle({ background: 'rgb(0, 255, 0)' });
    expect(document.querySelector('.icon-class')).toHaveStyle({ color: 'rgb(0, 0, 255)' });
  });

  it('message API compatibility test', async () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    act(() => {
      // @ts-ignore
      notification.warning({
        message: 'Warning Message',
        duration: 0,
        className: 'warning-message',
      });
    });
    await awaitPromise();
    expect(document.querySelector('.warning-message')).toHaveTextContent('Warning Message');
    expect(errSpy).toHaveBeenCalledWith(
      'Warning: [antd: Notification] `message` is deprecated. Please use `title` instead.',
    );
    errSpy.mockRestore();
  });

  it('dom should be correct when description is null', () => {
    act(() => {
      notification.open({
        title: 'Notification title',
        message: 'Notification message',
      });
    });
    expect(document.querySelectorAll('.ant-notification-description').length).toBe(0);
  });
  describe('When closeIcon is null, there is no close button', () => {
    it('Notification method', async () => {
      act(() => {
        notification.open({
          title: 'Notification title',
          closeIcon: null,
        });
      });
      await awaitPromise();
      expect(document.querySelector('.ant-notification')).toBeTruthy();
      expect(document.querySelector('.ant-notification-notice-close')).toBeFalsy();
    });

    it('PurePanel', () => {
      const Holder = notification._InternalPanelDoNotUseOrYouWillBeFired;
      render(<Holder closeIcon={null} title="Notification title" />);
      expect(document.querySelector('.ant-notification-notice-pure-panel')).toBeTruthy();
      expect(document.querySelector('.ant-notification-notice-close')).toBeFalsy();
    });
  });
});
