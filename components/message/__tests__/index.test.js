import message from '..';

const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

describe('message', () => {
  afterEach(() => {
    message.destroy();
  });

  it('should be able to config top', () => {
    message.config({
      top: 100,
    });
    message.info('whatever');
    expect(document.querySelectorAll('.ant-message')[0].style.top).toBe('100px');
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

  it('should be able to hide manually', async () => {
    const hide1 = message.info('whatever', 0);
    const hide2 = message.info('whatever', 0);
    expect(document.querySelectorAll('.ant-message-notice').length).toBe(2);
    hide1();
    await delay(100);
    expect(document.querySelectorAll('.ant-message-notice').length).toBe(1);
    hide2();
    await delay(100);
    expect(document.querySelectorAll('.ant-message-notice').length).toBe(0);
  });

  it('should be able to destroy globally', () => {
    message.info('whatever', 0);
    message.info('whatever', 0);
    expect(document.querySelectorAll('.ant-message').length).toBe(1);
    expect(document.querySelectorAll('.ant-message-notice').length).toBe(2);
    message.destroy();
    expect(document.querySelectorAll('.ant-message').length).toBe(0);
    expect(document.querySelectorAll('.ant-message-notice').length).toBe(0);
  });
});
