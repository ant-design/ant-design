import message, { actWrapper } from '..';
import { act } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import { awaitPromise, triggerMotionEnd } from './util';

describe('message.config', () => {
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

    jest.useRealTimers();

    await awaitPromise();
  });

  it('should be able to config top', async () => {
    message.config({
      top: 100,
    });

    message.info('whatever');
    await awaitPromise();

    expect(document.querySelector('.ant-message')).toHaveStyle({
      top: '100px',
    });
  });

  it('should be able to config rtl', async () => {
    message.config({
      rtl: true,
    });

    message.info('whatever');
    await awaitPromise();

    expect(document.querySelector('.ant-message-rtl')).toBeTruthy();
  });

  it('should be able to config getContainer', async () => {
    const div = document.createElement('div');
    div.className = 'custom-container';
    document.body.appendChild(div);

    message.config({
      getContainer: () => div,
    });

    message.info('whatever');
    await awaitPromise();

    expect(div.querySelector('.ant-message')).toBeTruthy();

    message.config({
      getContainer: undefined,
    });

    document.body.removeChild(div);
  });

  it('should be able to config maxCount', async () => {
    message.config({
      maxCount: 5,
    });
    for (let i = 0; i < 10; i += 1) {
      message.info('test');
    }

    message.info('last');
    await awaitPromise();

    const noticeWithoutLeaving = Array.from(
      document.querySelectorAll('.ant-message-notice-wrapper'),
    ).filter((ele) => !ele.classList.contains('ant-message-move-up-leave'));

    expect(noticeWithoutLeaving).toHaveLength(5);
    expect(noticeWithoutLeaving[4].textContent).toEqual('last');

    await triggerMotionEnd();
    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(0);

    message.config({
      maxCount: undefined,
    });
  });

  it('should be able to config duration', async () => {
    message.config({
      duration: 5,
    });

    message.info('last');
    await awaitPromise();

    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(1);

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(1);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    await triggerMotionEnd('.ant-message-notice-wrapper');

    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(0);

    message.config({
      duration: undefined,
    });
  });

  it('customize prefix should auto get transition prefixCls', async () => {
    message.config({
      prefixCls: 'light-message',
    });

    message.info('bamboo');
    await awaitPromise();

    expect(document.querySelector('.light-message-move-up')).toBeTruthy();

    message.config({
      prefixCls: undefined,
    });
  });

  it('should be able to global config rootPrefixCls', async () => {
    ConfigProvider.config({ prefixCls: 'prefix-test', iconPrefixCls: 'bamboo' });

    message.info('last');
    await awaitPromise();

    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(0);
    expect(document.querySelectorAll('.prefix-test-message-notice')).toHaveLength(1);
    expect(document.querySelectorAll('.bamboo-info-circle')).toHaveLength(1);
    ConfigProvider.config({ prefixCls: 'ant', iconPrefixCls: null! });
  });

  it('should be able to config prefixCls', async () => {
    message.config({
      prefixCls: 'prefix-test',
    });

    message.info('last');
    await awaitPromise();

    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(0);
    expect(document.querySelectorAll('.prefix-test-notice')).toHaveLength(1);
    message.config({
      prefixCls: '', // can be set to empty, ant default value is set in ConfigProvider
    });
  });

  it('should be able to config transitionName', async () => {
    message.config({
      transitionName: '',
    });

    message.info('last');
    await awaitPromise();

    expect(document.querySelector('.ant-message-notice')).toBeTruthy();
    expect(document.querySelectorAll('.ant-move-up-enter')).toHaveLength(0);
    message.config({
      transitionName: undefined,
    });
  });

  it('should be able to config getContainer, although messageInstance already exists', async () => {
    function createContainer(): [HTMLElement, VoidFunction] {
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

    message.info(messageText1);
    await awaitPromise();
    expect(container1.querySelector('.ant-message-notice')!.textContent).toEqual(messageText1);

    // Config will directly change container
    message.config({
      getContainer: () => container2,
    });
    const messageText2 = 'mounted in container2';

    message.info(messageText2);
    expect(container2.querySelectorAll('.ant-message-notice')[1]!.textContent).toEqual(
      messageText2,
    );

    removeContainer1();
    removeContainer2();
  });
});
