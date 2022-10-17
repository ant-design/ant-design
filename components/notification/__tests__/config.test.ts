import notification, { getInstance } from '..';
import { waitFakeTimer, act } from '../../../tests/utils';

describe('notification.config', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    notification.destroy();
  });

  it('should be able to config maxCount', async () => {
    notification.config({
      maxCount: 5,
      duration: 0.5,
    });

    for (let i = 0; i < 10; i += 1) {
      act(() => {
        notification.open({
          message: 'Notification message',
          key: i as unknown as string,
        });
      });
    }

    act(() => {
      notification.open({
        message: 'Notification last',
        key: '11',
      });
    });

    await waitFakeTimer();

    expect(document.querySelectorAll('.ant-notification-notice').length).toBe(5);
    expect(document.querySelectorAll('.ant-notification-notice')[4]?.textContent).toBe(
      'Notification last',
    );

    await waitFakeTimer();

    expect((await getInstance('ant-notification-topRight'))?.component.state.notices).toHaveLength(
      0,
    );

    jest.useRealTimers();
  });
});
