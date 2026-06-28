import { vi } from 'vitest';

import message, { actWrapper } from '..';
import { act } from '../../../tests/utils';
import { awaitPromise, triggerMotionEnd } from './util';

// TODO: Remove this. Mock for React 19
vi.mock('react-dom', async () => {
  const realReactDOM = await vi.importActual<typeof import('react-dom')>('react-dom');

  if (realReactDOM.version.startsWith('19')) {
    const realReactDOMClient =
      await vi.importActual<typeof import('react-dom/client')>('react-dom/client');
    return {
      ...realReactDOM,
      createRoot: realReactDOMClient.createRoot,
    };
  }

  return realReactDOM;
});

describe('message.typescript', () => {
  beforeAll(() => {
    actWrapper(act);
  });

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(async () => {
    // Clean up
    message.destroy();
    await triggerMotionEnd();

    vi.useRealTimers();

    await awaitPromise();
  });

  it('promise without arguments', async () => {
    message.success('yes!!!', 0);
    await Promise.resolve();
  });

  it('promise with one arguments', async () => {
    const filled = vi.fn();

    message.success('yes!!!').then(filled);

    await triggerMotionEnd();

    expect(filled).toHaveBeenCalledWith(true);
  });

  it('promise two arguments', async () => {
    const filled = vi.fn();
    const rejected = vi.fn();

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
