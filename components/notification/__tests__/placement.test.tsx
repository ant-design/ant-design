import notification, { actWrapper } from '..';
import { act, fireEvent } from '../../../tests/utils';
import type { ArgsProps, GlobalConfigProps } from '../interface';
import { awaitPromise, triggerMotionEnd } from './util';

describe('Notification.placement', () => {
  function open(args?: Partial<ArgsProps>) {
    notification.open({
      message: 'Notification Title',
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
    it('can be configured globally using the `config` method', async () => {
      // topLeft
      config({
        placement: 'topLeft',
        top: 50,
        bottom: 50,
      });
      await awaitPromise();

      expect(document.querySelector('.ant-notification-topLeft')).toHaveStyle({
        top: '50px',
        left: '0px',
        bottom: '',
      });

      // topRight
      config({
        placement: 'topRight',
        top: 100,
        bottom: 50,
      });

      expect(document.querySelector('.ant-notification-topRight')).toHaveStyle({
        top: '100px',
        right: '0px',
        bottom: '',
      });

      // bottomRight
      config({
        placement: 'bottomRight',
        top: 50,
        bottom: 100,
      });

      expect(document.querySelector('.ant-notification-bottomRight')).toHaveStyle({
        top: '',
        right: '0px',
        bottom: '100px',
      });

      // bottomLeft
      config({
        placement: 'bottomLeft',
        top: 100,
        bottom: 50,
      });

      expect(document.querySelector('.ant-notification-bottomLeft')).toHaveStyle({
        top: '',
        left: '0px',
        bottom: '50px',
      });

      // top
      config({
        placement: 'top',
        top: 50,
        bottom: 60,
      });
      await awaitPromise();

      expect(document.querySelector('.ant-notification-top')).toHaveStyle({
        top: '50px',
        left: '50%',
        bottom: '',
      });

      // bottom
      config({
        placement: 'bottom',
        top: 50,
        bottom: 60,
      });
      await awaitPromise();

      expect(document.querySelector('.ant-notification-bottom')).toHaveStyle({
        top: '',
        left: '50%',
        bottom: '60px',
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
      document.querySelectorAll('.ant-notification-notice-wrapper').forEach((ele) => {
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
