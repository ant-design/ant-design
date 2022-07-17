import { act } from 'react-dom/test-utils';
import message, { getInstance } from '..';
import { sleep } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

describe('message.config', () => {
  // Mock for rc-util raf
  window.requestAnimationFrame = callback => window.setTimeout(callback, 16);
  window.cancelAnimationFrame = id => {
    window.clearTimeout(id);
  };

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllTimers();
  });

  afterEach(() => {
    jest.useRealTimers();

    act(() => {
      message.destroy();
    });
  });

  it('should be able to config top', () => {
    message.config({
      top: 100,
    });

    act(() => {
      message.info('whatever');
    });

    expect(document.querySelectorAll('.ant-message')[0].style.top).toBe('100px');
  });

  it('should be able to config rtl', () => {
    message.config({
      rtl: true,
    });

    act(() => {
      message.info('whatever');
    });

    expect(document.querySelectorAll('.ant-message-rtl').length).toBe(1);
  });

  it('should be able to config getContainer', () => {
    message.config({
      getContainer: () => {
        const div = document.createElement('div');
        div.className = 'custom-container';
        document.body.appendChild(div);
        return div;
      },
    });

    act(() => {
      message.info('whatever');
    });
    expect(document.querySelectorAll('.custom-container').length).toBe(1);
  });

  it('should be able to config maxCount', () => {
    message.config({
      maxCount: 5,
    });
    for (let i = 0; i < 10; i += 1) {
      act(() => {
        message.info('test');
      });
    }

    act(() => {
      message.info('last');
    });

    expect(document.querySelectorAll('.ant-message-notice').length).toBe(5);
    expect(document.querySelectorAll('.ant-message-notice')[4].textContent).toBe('last');

    act(() => {
      jest.runAllTimers();
    });
    expect(getInstance().component.state.notices).toHaveLength(0);
  });

  it('should be able to config duration', async () => {
    jest.useRealTimers();
    message.config({
      duration: 0.5,
    });

    act(() => {
      message.info('last');
    });
    expect(getInstance().component.state.notices).toHaveLength(1);

    await sleep(1000);
    expect(getInstance().component.state.notices).toHaveLength(0);
    message.config({
      duration: 3,
    });
  });

  it('customize prefix should auto get transition prefixCls', () => {
    message.config({
      prefixCls: 'light-message',
    });

    act(() => {
      message.info('bamboo');
    });

    expect(getInstance().config).toEqual(
      expect.objectContaining({
        transitionName: 'light-move-up',
      }),
    );

    message.config({
      prefixCls: '',
    });
  });

  it('should be able to global config rootPrefixCls', () => {
    ConfigProvider.config({ prefixCls: 'prefix-test', iconPrefixCls: 'bamboo' });

    act(() => {
      message.info('last');
    });

    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(0);
    expect(document.querySelectorAll('.prefix-test-message-notice')).toHaveLength(1);
    expect(document.querySelectorAll('.bamboo-info-circle')).toHaveLength(1);
    ConfigProvider.config({ prefixCls: 'ant', iconPrefixCls: null });
  });
  it('should be able to config prefixCls', () => {
    message.config({
      prefixCls: 'prefix-test',
    });

    act(() => {
      message.info('last');
    });

    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(0);
    expect(document.querySelectorAll('.prefix-test-notice')).toHaveLength(1);
    message.config({
      prefixCls: '', // can be set to empty, ant default value is set in ConfigProvider
    });
  });

  it('should be able to config transitionName', () => {
    message.config({
      transitionName: '',
    });

    act(() => {
      message.info('last');
    });

    expect(document.querySelectorAll('.ant-move-up-enter')).toHaveLength(0);
    message.config({
      transitionName: 'ant-move-up',
    });
  });

  it('should be able to config getContainer, although messageInstance already exists', () => {
    function createContainer() {
      const container = document.createElement('div');
      document.body.appendChild(container);
      return [
        container,
        () => {
          document.body.removeChild(container);
        },
      ];
    }
    const [container1, removeContainer1] = createContainer();
    const [container2, removeContainer2] = createContainer();
    expect(container1.querySelector('.ant-message-notice')).toBeFalsy();
    expect(container2.querySelector('.ant-message-notice')).toBeFalsy();
    message.config({
      getContainer: () => container1,
    });
    const messageText1 = 'mounted in container1';

    act(() => {
      message.info(messageText1);
    });

    expect(container1.querySelector('.ant-message-notice').textContent).toEqual(messageText1);
    message.config({
      getContainer: () => container2,
    });
    const messageText2 = 'mounted in container2';

    act(() => {
      message.info(messageText2);
    });
    expect(container2.querySelector('.ant-message-notice').textContent).toEqual(messageText2);
    removeContainer1();
    removeContainer2();
  });
});
