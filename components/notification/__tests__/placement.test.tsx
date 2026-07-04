import { vi } from 'vitest';

import notification, { actWrapper } from '..';
import { act, fireEvent } from '../../../tests/utils';
import type { ArgsProps, GlobalConfigProps } from '../interface';
import { awaitPromise, triggerMotionEnd } from './util';

// TODO: Remove this. Mock for React 19
vi.mock('react-dom', async () => {
  const realReactDOM = await vi.importActual<typeof import('react-dom')>('react-dom');

  if (realReactDOM.version.startsWith('19')) {
    const realReactDOMClient =
      await vi.importActual<typeof import('react-dom/client')>('react-dom/client');
    (
      realReactDOM as typeof realReactDOM & { createRoot: typeof realReactDOMClient.createRoot }
    ).createRoot = realReactDOMClient.createRoot;
  }

  return realReactDOM;
});

describe('Notification.placement', () => {
  const getPlacementInset = (placement: 'top' | 'bottom') =>
    `calc(var(--notification-${placement}, var(--notification-margin-edge, 0px)) - var(--notification-margin-edge, 0px))`;

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
    vi.useFakeTimers();
  });

  afterEach(async () => {
    // Clean up
    notification.destroy();
    await triggerMotionEnd();

    notification.config({
      prefixCls: undefined,
      getContainer: undefined,
    });

    vi.useRealTimers();

    await awaitPromise();
  });

  describe('placement', () => {
    it('can be configured globally using the `config` method', async () => {
      // topLeft
      config({
        placement: 'topLeft',
        top: 50,
        bottom: 50,
      });
      await awaitPromise();

      expect(document.querySelector('.ant-notification-topLeft')).toHaveStyle({
        top: getPlacementInset('top'),
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
        top: getPlacementInset('top'),
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
        bottom: getPlacementInset('bottom'),
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
        bottom: getPlacementInset('bottom'),
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
        top: getPlacementInset('top'),
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
        bottom: getPlacementInset('bottom'),
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
        vi.runAllTimers();
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
