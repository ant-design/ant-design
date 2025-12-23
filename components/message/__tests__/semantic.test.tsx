import React from 'react';

import message, { actWrapper } from '..';
import { act, render } from '../../../tests/utils';
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
            content: 'custom-content',
            icon: 'custom-icon',
            root: 'custom-root',
          },
          styles: {
            content: { backgroundColor: 'rgb(255, 0, 0)', padding: '10px' },
            icon: { color: 'rgb(0, 0, 255)', fontSize: '24px' },
            root: { border: '2px solid rgb(0, 255, 0)' },
          },
        });

        // Test classNames function
        api.info({
          content: 'Info message with function classNames',
          classNames: ({ props: { type } }) => ({
            root: `${type}-function-root`,
            content: `${type}-function-content`,
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
          classNames: { content: 'warning-content' },
          styles: { content: { color: 'orange' } },
        });

        api.error({
          content: 'Error message',
          classNames: { content: 'error-content' },
          styles: { content: { color: 'red' } },
        });

        api.loading({
          content: 'Loading message',
          classNames: { content: 'loading-content' },
          styles: { content: { fontStyle: 'italic' } },
        });
      }, []);

      return <div>{holder}</div>;
    };

    render(<Demo />);

    // Test success message with object classNames and styles
    const successContent = document.querySelector('.custom-content');
    const successIcon = document.querySelector('.custom-icon');
    const successRoot = document.querySelector('.custom-root');

    expect(successContent).toBeTruthy();
    expect(successIcon).toBeTruthy();
    expect(successRoot).toBeTruthy();
    expect(successContent).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)', padding: '10px' });
    expect(successIcon).toHaveStyle({ color: 'rgb(0, 0, 255)', fontSize: '24px' });
    expect(successRoot).toHaveStyle({ border: '2px solid rgb(0, 255, 0)' });

    // Test info message with function classNames and styles
    const infoRoot = document.querySelector('.info-function-root');
    const infoContent = document.querySelector('.info-function-content');
    const infoIcon = document.querySelector('.info-function-icon');

    expect(infoRoot).toBeTruthy();
    expect(infoContent).toBeTruthy();
    expect(infoIcon).toBeTruthy();
    expect(infoRoot).toHaveStyle({ background: 'rgb(0, 0, 255)', color: 'rgb(0, 0, 255)' });

    // Test other message types
    expect(document.querySelector('.warning-content')).toBeTruthy();
    expect(document.querySelector('.warning-content')).toHaveStyle({ color: 'rgb(255, 165, 0)' });

    expect(document.querySelector('.error-content')).toBeTruthy();
    expect(document.querySelector('.error-content')).toHaveStyle({ color: 'rgb(255, 0, 0)' });

    expect(document.querySelector('.loading-content')).toBeTruthy();
    expect(document.querySelector('.loading-content')).toHaveStyle({ fontStyle: 'italic' });

    // Clean up
    message.destroy();
  });

  it('should support useMessage config with classNames and styles', () => {
    const Demo = () => {
      const [api, holder] = message.useMessage({
        classNames: {
          root: 'config-root',
          content: 'config-content',
          icon: 'config-icon',
        },
        styles: {
          root: { marginTop: '20px', borderRadius: '8px' },
          content: { fontSize: '16px', lineHeight: '1.5' },
          icon: { marginRight: '12px' },
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
            content: 'override-content',
          },
          styles: {
            content: { color: 'purple', fontWeight: 'bold' },
          },
        });

        // Test function form in config
        api.warning({
          content: 'Message with function config',
          classNames: ({ props: { type } }) => ({
            content: `${type || ''}-function-override`,
          }),
          styles: ({ props: { type } }) => ({
            content: {
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
    expect(document.querySelector('.config-content')).toBeTruthy();
    expect(document.querySelector('.config-icon')).toBeTruthy();

    const configRoot = document.querySelector('.config-root');
    const configContent = document.querySelector('.config-content');
    const configIcon = document.querySelector('.config-icon');

    expect(configRoot).toHaveStyle({ marginTop: '20px', borderRadius: '8px' });
    expect(configContent).toHaveStyle({ fontSize: '16px', lineHeight: '1.5' });
    expect(configIcon).toHaveStyle({ marginRight: '12px' });

    expect(document.querySelector('.override-content')).toBeTruthy();
    expect(document.querySelector('.override-content')).toHaveStyle({
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
