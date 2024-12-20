import message, { actWrapper } from '..';
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

describe('message.typescript', () => {
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

  it('promise without arguments', async () => {
    message.success('yes!!!', 0);
    await Promise.resolve();
  });

  it('promise with one arguments', async () => {
    const filled = jest.fn();

    message.success('yes!!!').then(filled);

    await triggerMotionEnd();

    expect(filled).toHaveBeenCalledWith(true);
  });

  it('promise two arguments', async () => {
    const filled = jest.fn();
    const rejected = jest.fn();

    message.success('yes!!!').then(filled, rejected);

    await triggerMotionEnd();

    expect(filled).toHaveBeenCalledWith(true);
    expect(rejected).not.toHaveBeenCalled();
  });

  it('hide', async () => {
    const hide = message.loading('doing...');
    await Promise.resolve();
    hide();
  });
});
