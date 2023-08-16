import message, { actDestroy, actWrapper } from '..';
import { act } from '../../../tests/utils';
import { awaitPromise, triggerMotionEnd } from './util';

describe('call close immediately', () => {
  beforeAll(() => {
    actWrapper(act);
  });

  beforeEach(() => {
    actDestroy();
    vi.useFakeTimers();
  });

  afterEach(async () => {
    // Clean up
    message.destroy();
    await triggerMotionEnd();

    act(() => {
      vi.runAllTimers();
    });

    vi.useRealTimers();

    await awaitPromise();
  });

  it('open', async () => {
    const closeFn = message.open({
      content: '',
    });
    closeFn();

    await awaitPromise();

    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(0);

    // Created close
    const closeFn2 = message.open({
      content: 'showed',
    });
    await awaitPromise();
    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(1);

    closeFn2();
    await triggerMotionEnd();
    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(0);
  });

  it('info', async () => {
    const closeFn = message.info('Message1', 0);
    closeFn();

    await awaitPromise();

    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(0);
  });
});
