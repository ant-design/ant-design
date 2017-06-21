import notification from '..';

const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

describe('notification', () => {
  afterEach(() => {
    notification.destroy();
  });

  it('should be able to hide manually', async () => {
    notification.open({
      message: 'Notification Title',
      duration: 0,
      key: '1',
    });
    notification.open({
      message: 'Notification Title',
      duration: 0,
      key: '2',
    });
    expect(document.querySelectorAll('.ant-notification-notice').length).toBe(2);
    notification.close('1');
    await delay(100);
    expect(document.querySelectorAll('.ant-notification-notice').length).toBe(1);
    notification.close('2');
    await delay(100);
    expect(document.querySelectorAll('.ant-notification-notice').length).toBe(0);
  });

  it('should be able to destroy globally', () => {
    notification.open({
      message: 'Notification Title',
      duration: 0,
    });
    notification.open({
      message: 'Notification Title',
      duration: 0,
    });
    expect(document.querySelectorAll('.ant-notification').length).toBe(1);
    expect(document.querySelectorAll('.ant-notification-notice').length).toBe(2);
    notification.destroy();
    expect(document.querySelectorAll('.ant-notification').length).toBe(0);
    expect(document.querySelectorAll('.ant-notification-notice').length).toBe(0);
  });

  it('should be able to destroy after config', () => {
    notification.config({
      bottom: 100,
    });
    notification.destroy();
  });

  it('should be able to open with icon', () => {
    const openNotificationWithIcon = (type) => {
      const iconPrefix = '.ant-notification-notice-icon';
      notification[type]({
        message: 'Notification Title',
        duration: 0,
        description: 'This is the content of the notification.',
      });
      expect(document.querySelectorAll(`${iconPrefix}-${type}`).length).toBe(1);
    };
    ['success', 'info', 'warning', 'error'].forEach((type) => {
      openNotificationWithIcon(type);
    });
  });
});
