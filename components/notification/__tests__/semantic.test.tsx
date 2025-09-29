import React from 'react';
import { SmileOutlined } from '@ant-design/icons';

import notification, { actWrapper } from '..';
import { act, fireEvent, render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import { awaitPromise, triggerMotionEnd } from './util';
import type { NotificationArgsProps } from '../interface';

// TODO: Remove this. Mock for React 19
jest.mock('react-dom', () => {
  const realReactDOM = jest.requireActual('react-dom');

  if (realReactDOM.version.startsWith('19')) {
    const realReactDOMClient = jest.requireActual('react-dom/client');
    realReactDOM.createRoot = realReactDOMClient.createRoot;
  }

  return realReactDOM;
});

describe('notification semantic styles and classNames', () => {
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

  it('should support custom classNames and styles', () => {
    const TestComponent: React.FC = () => {
      const [api, contextHolder] = notification.useNotification();

      const openNotification = () => {
        api.open({
          title: 'Notification Title',
          description: 'Description of notification.',
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
    const { container } = render(<TestComponent />);

    fireEvent.click(container.querySelector('button')!);

    expect(document.querySelector('.root-class')).toHaveStyle({ color: 'rgb(255, 0, 0)' });
    expect(document.querySelector('.title-class')).toHaveStyle({ fontSize: '23px' });
    expect(document.querySelector('.description-class')).toHaveStyle({ fontWeight: 'bold' });
    expect(document.querySelector('.actions-class')).toHaveStyle({ background: 'rgb(0, 255, 0)' });
    expect(document.querySelector('.icon-class')).toHaveStyle({ color: 'rgb(0, 0, 255)' });
  });

  it('should apply dynamic classNames and styles from function', () => {
    const TestComponent: React.FC = () => {
      const [api, contextHolder] = notification.useNotification();
      const [type, setType] = React.useState<'success' | 'error'>('success');

      const openNotification = () => {
        api.open({
          title: 'Notification Title',
          duration: 0,
          type,
          // Dynamic style function
          classNames: (info: { props: NotificationArgsProps }) => ({
            root: `dynamic-${info.props.type}`,
            icon: info.props.type === 'success' ? 'success-icon' : 'error-icon',
          }),
          styles: (info: { props: NotificationArgsProps }) => ({
            root: {
              background: info.props.type === 'success' ? 'rgb(0, 128, 0)' : 'rgb(255, 0, 0)',
              color: info.props.type === 'success' ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)',
            },
          }),
        });
      };

      return (
        <>
          {contextHolder}
          <button type="button" onClick={openNotification}>
            open
          </button>
          <button type="button" onClick={() => setType(type === 'success' ? 'error' : 'success')}>
            Toggle Type
          </button>
        </>
      );
    };

    const { container } = render(<TestComponent />);

    // Test success type
    fireEvent.click(container.querySelectorAll('button')[0]!);

    expect(document.querySelector('.dynamic-success')).toHaveStyle({
      background: 'rgb(0, 128, 0)',
      color: 'rgb(255, 255, 255)',
    });
    expect(document.querySelector('.success-icon')).toBeTruthy();

    // Close and test error type
    notification.destroy();

    fireEvent.click(container.querySelectorAll('button')[1]!);
    fireEvent.click(container.querySelectorAll('button')[0]!);

    const errorElement = document.querySelector('.dynamic-error');
    expect(errorElement).toHaveStyle({
      background: 'rgb(255, 0, 0)',
      color: 'rgb(0, 0, 0)',
    });
    expect(document.querySelector('.error-icon')).toBeTruthy();
  });

  it('should respect ConfigProvider notification config', () => {
    const TestComponent: React.FC = () => {
      const [api, contextHolder] = notification.useNotification();

      const openNotification = () => {
        api.open({
          title: 'Notification Title',
          duration: 0,
        });
      };

      return (
        <ConfigProvider
          notification={{
            classNames: {
              root: 'config-root-class',
              title: 'config-title-class',
            },
            styles: {
              root: { backgroundColor: 'rgb(128 0 128)' },
              title: { color: 'rgb(255 165 0)' },
            },
          }}
        >
          {contextHolder}
          <button type="button" onClick={openNotification}>
            open
          </button>
        </ConfigProvider>
      );
    };

    const { container } = render(<TestComponent />);

    fireEvent.click(container.querySelector('button')!);

    const noticeEl = document.querySelector('.ant-notification-notice');
    expect(noticeEl).toBeTruthy();
    expect(noticeEl).toHaveClass('config-root-class');
    expect(noticeEl).toHaveStyle({
      backgroundColor: 'rgb(128 0 128)',
    });

    const titleEl = noticeEl?.querySelector('.ant-notification-notice-title');
    expect(titleEl).toBeTruthy();
    expect(titleEl).toHaveClass('config-title-class');
    expect(titleEl).toHaveStyle({
      color: 'rgb(255 165 0)',
    });
  });

  it('should merge classNames and styles with correct priority', () => {
    const TestComponent: React.FC = () => {
      const [api, contextHolder] = notification.useNotification();

      const openNotification = () => {
        api.open({
          title: 'Notification Title',
          duration: 0,
          // Component level styles
          classNames: {
            root: 'component-level',
            title: 'component-title',
          },
          styles: {
            root: { color: 'rgb(0, 0, 255)' },
            title: { fontSize: 16 },
          },
        });
      };

      return (
        <ConfigProvider
          notification={{
            classNames: {
              root: 'config-level',
              title: 'config-title',
            },
            styles: {
              root: { backgroundColor: 'rgb(0, 255, 0)' },
              title: { fontWeight: 'bold' },
            },
          }}
        >
          {contextHolder}
          <button type="button" onClick={openNotification}>
            open
          </button>
        </ConfigProvider>
      );
    };

    const { container } = render(<TestComponent />);

    fireEvent.click(container.querySelector('button')!);

    const notificationEl = document.querySelector('.ant-notification-notice');

    // Verify classNames merge: config + component
    expect(notificationEl).toHaveClass('config-level');
    expect(notificationEl).toHaveClass('component-level');

    // Verify styles merge: config + component
    expect(notificationEl).toHaveStyle({
      backgroundColor: 'rgb(0, 255, 0)', // config level
      color: 'rgb(0, 0, 255)', // component level
    });

    const titleEl = document.querySelector('.ant-notification-notice-title');
    expect(titleEl).toHaveClass('config-title');
    expect(titleEl).toHaveClass('component-title');
    expect(titleEl).toHaveStyle({
      fontWeight: 'bold', // config level
      fontSize: '16px', // component level
    });
  });

  it('should handle empty classNames and styles gracefully', () => {
    const TestComponent: React.FC = () => {
      const [api, contextHolder] = notification.useNotification();

      const openNotification = () => {
        api.open({
          title: 'Notification Title',
          duration: 0,
          // Empty styles and classNames
          classNames: {},
          styles: {},
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

    const { container } = render(<TestComponent />);

    fireEvent.click(container.querySelector('button')!);

    // Should render without errors and apply default styles
    const notificationEl = document.querySelector('.ant-notification-notice');
    expect(notificationEl).toBeTruthy();
    expect(notificationEl).toHaveClass('ant-notification-notice');
  });

  it('should merge multiple style sources correctly', () => {
    const TestComponent: React.FC = () => {
      const [api, contextHolder] = notification.useNotification();

      const openNotification = () => {
        api.open({
          title: 'Notification Title',
          description: 'Test description',
          duration: 0,
          // Multiple style sources
          styles: {
            root: { color: 'rgb(255, 0, 0)' },
            title: { fontSize: '14px' },
            description: { margin: '10px' },
          },
          // Override some styles
          classNames: {
            title: 'override-title',
          },
        });
      };

      return (
        <ConfigProvider
          notification={{
            styles: {
              root: { backgroundColor: 'rgb(0, 0, 255)' },
              title: { fontWeight: 'bold' },
              description: { color: 'rgb(128, 128, 128)' },
            },
            classNames: {
              root: 'config-root',
              title: 'config-title',
            },
          }}
        >
          {contextHolder}
          <button type="button" onClick={openNotification}>
            open
          </button>
        </ConfigProvider>
      );
    };

    const { container } = render(<TestComponent />);

    fireEvent.click(container.querySelector('button')!);

    const notificationEl = document.querySelector('.ant-notification-notice');
    const titleEl = document.querySelector('.ant-notification-notice-title');
    const descriptionEl = document.querySelector('.ant-notification-notice-description');

    // Root should have merged styles
    expect(notificationEl).toHaveClass('config-root');
    expect(notificationEl).toHaveStyle({
      backgroundColor: 'rgb(0, 0, 255)', // from config
      color: 'rgb(255, 0, 0)', // from props
    });

    // Title should have merged classes and styles
    expect(titleEl).toHaveClass('config-title');
    expect(titleEl).toHaveClass('override-title');
    expect(titleEl).toHaveStyle({
      fontWeight: 'bold', // from config
      fontSize: '14px', // from props
    });

    // Description should have merged styles
    expect(descriptionEl).toHaveStyle({
      color: 'rgb(128, 128, 128)', // from config
      margin: '10px', // from props
    });
  });
});
