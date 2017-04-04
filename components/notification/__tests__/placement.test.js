import notification from '..';

describe('Notification.placement', () => {
  function $$(className) {
    return document.body.querySelectorAll(className);
  }

  function getStyle(el, prop, getComputedStyle, style) {
    getComputedStyle = window.getComputedStyle;
    style = getComputedStyle ? getComputedStyle(el) : el.currentStyle;

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

  it('change notification placement by `open` method', () => {
    const defaultTop = '24px';
    const defaultBottom = '24px';
    let style;

    // topLeft
    open({
      placement: 'topLeft',
    });
    style = getStyle($$('.ant-notification-topLeft')[0]);
    expect(style.top).toBe(defaultTop);
    expect(style.left).toBe('0px');
    expect(style.bottom).toBe('');


    // topRight
    open({
      placement: 'topRight',
    });
    style = getStyle($$('.ant-notification-topRight')[0]);
    expect(style.top).toBe(defaultTop);
    expect(style.right).toBe('0px');
    expect(style.bottom).toBe('');

    // bottomRight
    open({
      placement: 'bottomRight',
    });
    style = getStyle($$('.ant-notification-bottomRight')[0]);
    expect(style.top).toBe('');
    expect(style.right).toBe('0px');
    expect(style.bottom).toBe(defaultBottom);

    // bottomLeft
    open({
      placement: 'bottomLeft',
    });
    style = getStyle($$('.ant-notification-bottomLeft')[0]);
    expect(style.top).toBe('');
    expect(style.left).toBe('0px');
    expect(style.bottom).toBe(defaultBottom);
  });

  it('change notification placement by `config` method', () => {
    let style;

    // topLeft
    config({
      placement: 'topLeft',
      top: 50,
      bottom: 50,
    });
    style = getStyle($$('.ant-notification-topLeft')[1]);
    expect(style.top).toBe('50px');
    expect(style.left).toBe('0px');
    expect(style.bottom).toBe('');

    // topRight
    config({
      placement: 'topRight',
      top: 100,
      bottom: 50,
    });
    style = getStyle($$('.ant-notification-topRight')[1]);
    expect(style.top).toBe('100px');
    expect(style.right).toBe('0px');
    expect(style.bottom).toBe('');

    // bottomRight
    config({
      placement: 'bottomRight',
      top: 50,
      bottom: 100,
    });
    style = getStyle($$('.ant-notification-bottomRight')[1]);
    expect(style.top).toBe('');
    expect(style.right).toBe('0px');
    expect(style.bottom).toBe('100px');

    // bottomLeft
    config({
      placement: 'bottomLeft',
      top: 100,
      bottom: 50,
    });
    style = getStyle($$('.ant-notification-bottomLeft')[1]);
    expect(style.top).toBe('');
    expect(style.left).toBe('0px');
    expect(style.bottom).toBe('50px');
  });
});
