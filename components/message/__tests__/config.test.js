import { sleep } from '../../../tests/utils';
import message from '..';

describe('message.config', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    message.destroy();
    jest.useRealTimers();
  });

  it('should be able to config top', () => {
    message.config({
      top: 100,
    });
    message.info('whatever');
    expect(document.querySelectorAll('.ant-message')[0].style.top).toBe('100px');
  });

  it('should be able to config rtl', () => {
    message.config({
      rtl: true,
    });
    message.info('whatever');
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
    message.info('whatever');
    expect(document.querySelectorAll('.custom-container').length).toBe(1);
  });

  it('should be able to config maxCount', () => {
    message.config({
      maxCount: 5,
    });
    for (let i = 0; i < 10; i += 1) {
      message.info('test');
    }
    message.info('last');
    expect(document.querySelectorAll('.ant-message-notice').length).toBe(5);
    expect(document.querySelectorAll('.ant-message-notice')[4].textContent).toBe('last');
    jest.runAllTimers();
    expect(document.querySelectorAll('.ant-message-notice').length).toBe(0);
  });

  it('should be able to config duration', async () => {
    jest.useRealTimers();
    message.config({
      duration: 0.5,
    });
    message.info('last');
    await sleep(600);
    expect(document.querySelectorAll('.ant-message-notice').length).toBe(0);
    message.config({
      duration: 3,
    });
  });

  it('should be able to config prefixCls', () => {
    message.config({
      prefixCls: 'prefix-test',
    });
    message.info('last');
    expect(document.querySelectorAll('.ant-message-notice').length).toBe(0);
    expect(document.querySelectorAll('.prefix-test-notice').length).toBe(1);
    message.config({
      prefixCls: 'ant-message',
    });
  });

  it('should be able to config transitionName', () => {
    message.config({
      transitionName: '',
    });
    message.info('last');
    expect(document.querySelectorAll('.move-up-enter').length).toBe(0);
    message.config({
      transitionName: 'move-up',
    });
  });
});
