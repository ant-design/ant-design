import React from 'react';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';

import notification, { actWrapper } from '..';
import { act, fireEvent, render } from '../../../tests/utils';
import type { ArgsProps, GlobalConfigProps } from '../interface';
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

describe('Notification.placement', () => {
  function open(args?: Partial<ArgsProps>) {
    notification.open({
      title: 'Notification Title',
      description: 'This is the content of the notification.',
      ...args,
    });
  }

  function config(args: Partial<GlobalConfigProps>) {
    notification.config({
      ...args,
    });

    act(() => {
      open();
    });
  }

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

  describe('placement', () => {
    it('uses vertical motion for top and bottom placement', async () => {
      const cache = createCache();

      const Demo = () => {
        const [api, holder] = notification.useNotification({ stack: false });

        React.useEffect(() => {
          api.open({
            title: 'Top',
            description: 'This is the content of the notification.',
            placement: 'top',
            duration: false,
          });
          api.open({
            title: 'Bottom',
            description: 'This is the content of the notification.',
            placement: 'bottom',
            duration: false,
          });
        }, [api]);

        return <StyleProvider cache={cache}>{holder}</StyleProvider>;
      };

      render(<Demo />);
      await awaitPromise();

      const styleText = extractStyle(cache, true);
      expect(styleText).toMatch(
        /ant-notification-top[\s\S]*ant-notification-fade-enter-start[\s\S]*translate3d\(-50%,\s*-var\(--ant-margin-xs\),\s*0\)/,
      );
      expect(styleText).toMatch(
        /ant-notification-top[\s\S]*ant-notification-fade-leave-active[\s\S]*translate3d\(-50%,\s*-var\(--ant-margin-xs\),\s*0\)/,
      );
      expect(styleText).toMatch(
        /ant-notification-bottom[\s\S]*ant-notification-fade-enter-start[\s\S]*translate3d\(-50%,\s*var\(--ant-margin-xs\),\s*0\)/,
      );
      expect(styleText).toMatch(
        /ant-notification-bottom[\s\S]*ant-notification-fade-leave-active[\s\S]*translate3d\(-50%,\s*var\(--ant-margin-xs\),\s*0\)/,
      );
    });

    it('can be configured globally using the `config` method', async () => {
      // topLeft
      config({
        placement: 'topLeft',
        top: 50,
        bottom: 50,
      });
      await awaitPromise();

      expect(document.querySelector('.ant-notification-topLeft')).toHaveStyle({
        top: 'var(--notification-top, 0)',
        left: '0px',
        bottom: 'auto',
        '--notification-top': '50px',
        '--notification-bottom': '50px',
      });

      // topRight
      config({
        placement: 'topRight',
        top: 100,
        bottom: 50,
      });

      expect(document.querySelector('.ant-notification-topRight')).toHaveStyle({
        top: 'var(--notification-top, 0)',
        right: '0px',
        bottom: 'auto',
        '--notification-top': '100px',
        '--notification-bottom': '50px',
      });

      // bottomRight
      config({
        placement: 'bottomRight',
        top: 50,
        bottom: 100,
      });

      expect(document.querySelector('.ant-notification-bottomRight')).toHaveStyle({
        top: 'auto',
        right: '0px',
        bottom: 'var(--notification-bottom, 0)',
        '--notification-top': '50px',
        '--notification-bottom': '100px',
      });

      // bottomLeft
      config({
        placement: 'bottomLeft',
        top: 100,
        bottom: 50,
      });

      expect(document.querySelector('.ant-notification-bottomLeft')).toHaveStyle({
        top: 'auto',
        left: '0px',
        bottom: 'var(--notification-bottom, 0)',
        '--notification-top': '100px',
        '--notification-bottom': '50px',
      });

      // top
      config({
        placement: 'top',
        top: 50,
        bottom: 60,
      });
      await awaitPromise();

      expect(document.querySelector('.ant-notification-top')).toHaveStyle({
        top: 'var(--notification-top, 0)',
        left: '50%',
        bottom: 'auto',
        '--notification-top': '50px',
        '--notification-bottom': '60px',
      });

      // bottom
      config({
        placement: 'bottom',
        top: 50,
        bottom: 60,
      });
      await awaitPromise();

      expect(document.querySelector('.ant-notification-bottom')).toHaveStyle({
        top: 'auto',
        left: '50%',
        bottom: 'var(--notification-bottom, 0)',
        '--notification-top': '50px',
        '--notification-bottom': '60px',
      });
    });
  });

  describe('mountNode', () => {
    const $container = document.createElement('div');
    beforeEach(() => {
      document.body.appendChild($container);
    });
    afterEach(() => {
      $container.remove();
    });

    it('can be configured globally using the `config` method', async () => {
      config({
        getContainer: () => $container,
      });
      await awaitPromise();

      expect($container.querySelector('.ant-notification')).toBeTruthy();
      notification.destroy();

      // Leave motion
      act(() => {
        jest.runAllTimers();
      });
      document.querySelectorAll('.ant-notification-notice').forEach((ele) => {
        fireEvent.animationEnd(ele);
      });
      expect($container.querySelector('.ant-notification')).toBeFalsy();

      // Upcoming notifications are mounted in $container
      act(() => {
        open();
      });
      expect($container.querySelector('.ant-notification')).toBeTruthy();
    });
  });
});
