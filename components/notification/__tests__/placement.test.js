import notification from '..';

describe('Notification.placement', () => {
  afterEach(() => notification.destroy());

  function $$(className) {
    return document.body.querySelectorAll(className);
  }

  function getStyle(el, prop) {
    const style = window.getComputedStyle ? window.getComputedStyle(el) : el.currentStyle;
    // If a css property's value is `auto`, it will return an empty string.
    return prop ? style[prop] : style;
  }

  function open(args) {
    notification.open({
      message: 'Notification Title',
      description: 'This is the content of the notification.',
      ...args,
    });
  }

  function config(args) {
    notification.config({
      ...args,
    });
    open();
  }

  describe('placement', () => {
    it('can be configured per notification using the `open` method', () => {
      const defaultTop = '24px';
      const defaultBottom = '24px';
      let style;

      // topLeft
      open({
        placement: 'topLeft',
        top: 50,
      });
      style = getStyle($$('.ant-notification-topLeft')[0]);
      expect(style.top).toBe('50px');
      expect(style.left).toBe('0px');
      expect(style.bottom).toBe('');

      open({
        placement: 'topLeft',
      });
      expect($$('.ant-notification-topLeft').length).toBe(1);

      // topRight
      open({
        placement: 'topRight',
      });
      style = getStyle($$('.ant-notification-topRight')[0]);
      expect(style.top).toBe(defaultTop);
      expect(style.right).toBe('0px');
      expect(style.bottom).toBe('');

      open({
        placement: 'topRight',
      });
      expect($$('.ant-notification-topRight').length).toBe(1);

      // bottomRight
      open({
        placement: 'bottomRight',
        bottom: 100,
      });
      style = getStyle($$('.ant-notification-bottomRight')[0]);
      expect(style.top).toBe('');
      expect(style.right).toBe('0px');
      expect(style.bottom).toBe('100px');

      open({
        placement: 'bottomRight',
      });
      expect($$('.ant-notification-bottomRight').length).toBe(1);

      // bottomLeft
      open({
        placement: 'bottomLeft',
      });
      style = getStyle($$('.ant-notification-bottomLeft')[0]);
      expect(style.top).toBe('');
      expect(style.left).toBe('0px');
      expect(style.bottom).toBe(defaultBottom);

      open({
        placement: 'bottomLeft',
      });
      expect($$('.ant-notification-bottomLeft').length).toBe(1);
    });

    it('can be configured globally using the `config` method', () => {
      let style;

      // topLeft
      config({
        placement: 'topLeft',
        top: 50,
        bottom: 50,
      });
      style = getStyle($$('.ant-notification-topLeft')[0]);
      expect(style.top).toBe('50px');
      expect(style.left).toBe('0px');
      expect(style.bottom).toBe('');

      // topRight
      config({
        placement: 'topRight',
        top: 100,
        bottom: 50,
      });
      style = getStyle($$('.ant-notification-topRight')[0]);
      expect(style.top).toBe('100px');
      expect(style.right).toBe('0px');
      expect(style.bottom).toBe('');

      // bottomRight
      config({
        placement: 'bottomRight',
        top: 50,
        bottom: 100,
      });
      style = getStyle($$('.ant-notification-bottomRight')[0]);
      expect(style.top).toBe('');
      expect(style.right).toBe('0px');
      expect(style.bottom).toBe('100px');

      // bottomLeft
      config({
        placement: 'bottomLeft',
        top: 100,
        bottom: 50,
      });
      style = getStyle($$('.ant-notification-bottomLeft')[0]);
      expect(style.top).toBe('');
      expect(style.left).toBe('0px');
      expect(style.bottom).toBe('50px');
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

    it('can be configured per notification using the `open` method', () => {
      open({
        getContainer: () => $container,
      });
      expect($container.querySelector('.ant-notification')).not.toBe(null);

      notification.destroy();

      setTimeout(() => {
        // Upcoming notifications still use their default mountNode and not $container
        open();
        expect($container.querySelector('.ant-notification')).toBe(null);
      });
    });

    it('can be configured globally using the `config` method', () => {
      config({
        getContainer: () => $container,
      });
      expect($container.querySelector('.ant-notification')).not.toBe(null);

      notification.destroy();

      setTimeout(() => {
        // Upcoming notifications are mounted in $container
        open();
        expect($container.querySelector('.ant-notification')).not.toBe(null);
      });
    });
  });
});
