import message, { actDestroy, actWrapper } from '..';
import { act } from '../../../tests/utils';
import { awaitPromise, triggerMotionEnd } from './util';

// TODO: Remove this. Mock for React 19
jest.mock('react-dom', () => {
  const realReactDOM = jest.requireActual('react-dom');

  if (realReactDOM.version.startsWith('19')) {
    const realReactDOMClient = jest.requireActual('react-dom/client');
    realReactDOM.createRoot = realReactDOMClient.createRoot;
  }

  return realReactDOM;
});

describe('call close immediately', () => {
  beforeAll(() => {
    actWrapper(act);
  });

  beforeEach(() => {
    actDestroy();
    jest.useFakeTimers();
  });

  afterEach(async () => {
    // Clean up
    message.destroy();
    await triggerMotionEnd();

    act(() => {
      jest.runAllTimers();
    });

    jest.useRealTimers();

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
