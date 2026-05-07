import React from 'react';

import message, { actWrapper } from '..';
import { act, render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import { awaitPromise, triggerMotionEnd } from './util';

jest.mock('react-dom', () => {
  const realReactDOM = jest.requireActual('react-dom');

  if (realReactDOM.version.startsWith('19')) {
    const realReactDOMClient = jest.requireActual('react-dom/client');
    realReactDOM.createRoot = realReactDOMClient.createRoot;
  }

  return realReactDOM;
});

describe('Message.semantic', () => {
  beforeAll(() => {
    actWrapper(act);
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(async () => {
    // Clean up
    message.destroy();
    await triggerMotionEnd();

    message.config({
      prefixCls: undefined,
      getContainer: undefined,
    });

    jest.useRealTimers();
    await awaitPromise();
  });
  it('should support classNames and styles', () => {
    const Demo = () => {
      const [api, holder] = message.useMessage();

      React.useEffect(() => {
        api.success({
          content: 'Success message with object classNames',
          classNames: {
            wrapper: 'custom-wrapper',
            title: 'custom-title',
            icon: 'custom-icon',
            root: 'custom-root',
          },
          styles: {
            wrapper: { backgroundColor: 'rgb(255, 0, 0)', padding: '10px' },
            title: { color: 'rgb(255, 255, 255)', fontWeight: 'bold' },
            icon: { color: 'rgb(0, 0, 255)', fontSize: '24px' },
            root: { border: '2px solid rgb(0, 255, 0)' },
          },
        });

        // Test classNames function
        api.info({
          content: 'Info message with function classNames',
          classNames: ({ props: { type } }) => ({
            root: `${type}-function-root`,
            wrapper: `${type}-function-wrapper`,
            title: `${type}-function-title`,
            icon: `${type}-function-icon`,
          }),
          styles: ({ props: { type } }) => ({
            root: {
              background: type === 'info' ? 'blue' : 'red',
              color: type === 'info' ? 'blue' : 'red',
            },
          }),
        });

        // Test with different message types
        api.warning({
          content: 'Warning message',
          classNames: { title: 'warning-title' },
          styles: { title: { color: 'orange' } },
        });

        api.error({
          content: 'Error message',
          classNames: { title: 'error-title' },
          styles: { title: { color: 'red' } },
        });

        api.loading({
          content: 'Loading message',
          classNames: { title: 'loading-title' },
          styles: { title: { fontStyle: 'italic' } },
        });
      }, []);

      return <div>{holder}</div>;
    };

    render(<Demo />);

    // Test success message with object classNames and styles
    const successWrapper = document.querySelector('.custom-wrapper');
    const successTitle = document.querySelector('.custom-title');
    const successIcon = document.querySelector('.custom-icon');
    const successRoot = document.querySelector('.custom-root');

    expect(successWrapper).toBeTruthy();
    expect(successTitle).toBeTruthy();
    expect(successIcon).toBeTruthy();
    expect(successRoot).toBeTruthy();
    expect(successWrapper).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)', padding: '10px' });
    expect(successTitle).toHaveStyle({ color: 'rgb(255, 255, 255)', fontWeight: 'bold' });
    expect(successIcon).toHaveStyle({ color: 'rgb(0, 0, 255)', fontSize: '24px' });
    expect(successRoot).toHaveStyle({ border: '2px solid rgb(0, 255, 0)' });

    // Test info message with function classNames and styles
    const infoRoot = document.querySelector('.info-function-root');
    const infoWrapper = document.querySelector('.info-function-wrapper');
    const infoTitle = document.querySelector('.info-function-title');
    const infoIcon = document.querySelector('.info-function-icon');

    expect(infoRoot).toBeTruthy();
    expect(infoWrapper).toBeTruthy();
    expect(infoTitle).toBeTruthy();
    expect(infoIcon).toBeTruthy();
    expect(infoRoot).toHaveStyle({ background: 'rgb(0, 0, 255)', color: 'rgb(0, 0, 255)' });

    // Test other message types
    expect(document.querySelector('.warning-title')).toBeTruthy();
    expect(document.querySelector('.warning-title')).toHaveStyle({ color: 'rgb(255, 165, 0)' });

    expect(document.querySelector('.error-title')).toBeTruthy();
    expect(document.querySelector('.error-title')).toHaveStyle({ color: 'rgb(255, 0, 0)' });

    expect(document.querySelector('.loading-title')).toBeTruthy();
    expect(document.querySelector('.loading-title')).toHaveStyle({ fontStyle: 'italic' });

    // Clean up
    message.destroy();
  });

  it('should support useMessage config with classNames and styles', () => {
    const Demo = () => {
      const [api, holder] = message.useMessage({
        classNames: {
          list: 'config-list',
          listContent: 'config-list-content',
          root: 'config-root',
          wrapper: 'config-wrapper',
          title: 'config-title',
          icon: 'config-icon',
        },
        styles: {
          list: { backgroundColor: 'rgb(1, 2, 3)' },
          listContent: { paddingTop: 4 },
          root: { marginTop: '20px', borderRadius: '8px' },
          wrapper: { backgroundColor: 'rgb(4, 5, 6)' },
          title: { fontSize: '16px', lineHeight: '1.5' },
          icon: { marginInlineEnd: '12px' },
        },
      });

      React.useEffect(() => {
        // Test config classNames and styles
        api.info({
          content: 'Message with config classNames and styles',
        });

        // Test override config with individual message classNames and styles
        api.success({
          content: 'Message with override styles',
          classNames: {
            title: 'override-title',
          },
          styles: {
            title: { color: 'purple', fontWeight: 'bold' },
          },
        });

        // Test function form in config
        api.warning({
          content: 'Message with function config',
          classNames: ({ props: { type } }) => ({
            title: `${type || ''}-function-override`,
          }),
          styles: ({ props: { type } }) => ({
            title: {
              background: type === 'warning' ? 'red' : 'orange',
              color: type === 'warning' ? 'red' : 'orange',
            },
          }),
        });
      }, []);

      return <div>{holder}</div>;
    };

    render(<Demo />);

    expect(document.querySelector('.config-root')).toBeTruthy();
    expect(document.querySelector('.config-list')).toBeTruthy();
    expect(document.querySelector('.config-list-content')).toBeTruthy();
    expect(document.querySelector('.config-wrapper')).toBeTruthy();
    expect(document.querySelector('.config-title')).toBeTruthy();
    expect(document.querySelector('.config-icon')).toBeTruthy();

    const configList = document.querySelector('.config-list');
    const configListContent = document.querySelector('.config-list-content');
    const configRoot = document.querySelector('.config-root');
    const configWrapper = document.querySelector('.config-wrapper');
    const configTitle = document.querySelector('.config-title');
    const configIcon = document.querySelector('.config-icon');

    expect(configList).toHaveStyle({ backgroundColor: 'rgb(1, 2, 3)' });
    expect(configListContent).toHaveStyle({ paddingTop: '4px' });
    expect(configRoot).toHaveStyle({ marginTop: '20px', borderRadius: '8px' });
    expect(configWrapper).toHaveStyle({ backgroundColor: 'rgb(4, 5, 6)' });
    expect(configTitle).toHaveStyle({ fontSize: '16px', lineHeight: '1.5' });
    expect(configIcon).toHaveStyle({ marginInlineEnd: '12px' });

    expect(document.querySelector('.override-title')).toBeTruthy();
    expect(document.querySelector('.override-title')).toHaveStyle({
      color: 'rgb(128, 0, 128)',
      fontWeight: 'bold',
    });

    expect(document.querySelector('.warning-function-override')).toBeTruthy();
    expect(document.querySelector('.warning-function-override')).toHaveStyle({
      background: 'rgb(255, 0, 0)',
      color: 'rgb(255, 0, 0)',
    });

    message.destroy();
  });

  it('should let useMessage config override ConfigProvider semantic styles', () => {
    const Demo = () => {
      const [api, holder] = message.useMessage({
        classNames: {
          title: 'hook-title',
        },
        styles: {
          title: {
            color: 'rgb(1, 2, 3)',
          },
        },
      });

      React.useEffect(() => {
        api.info({
          content: 'Message with merged semantic config',
        });
      }, []);

      return <div>{holder}</div>;
    };

    render(
      <ConfigProvider
        message={{
          classNames: {
            title: 'provider-title',
          },
          styles: {
            title: {
              color: 'rgb(4, 5, 6)',
              fontWeight: 'bold',
            },
          },
        }}
      >
        <Demo />
      </ConfigProvider>,
    );

    const title = document.querySelector('.hook-title');

    expect(title).toHaveClass('provider-title');
    expect(title).toHaveStyle({
      color: 'rgb(1, 2, 3)',
      fontWeight: 'bold',
    });

    message.destroy();
  });

  it('should handle empty classNames and styles gracefully', () => {
    const Demo = () => {
      const [api, holder] = message.useMessage();

      React.useEffect(() => {
        api.success({
          content: 'Empty styles test',
          classNames: {},
          styles: {},
        });
      }, []);

      return <div>{holder}</div>;
    };

    render(<Demo />);

    // Should render with default styles
    const messageEl = document.querySelector('.ant-message-notice');
    expect(messageEl).toBeTruthy();
    expect(messageEl).toHaveClass('ant-message-notice');
  });
});
