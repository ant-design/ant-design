import React from 'react';
import { vi } from 'vitest';

import notification, { actWrapper } from '..';
import { act, render, waitFakeTimer, waitFakeTimer19 } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import { awaitPromise, triggerMotionEnd } from './util';

// TODO: Remove this. Mock for React 19
vi.mock('react-dom', async () => {
  const realReactDOM = await vi.importActual<typeof import('react-dom')>('react-dom');

  if (realReactDOM.version.startsWith('19')) {
    const realReactDOMClient =
      await vi.importActual<typeof import('react-dom/client')>('react-dom/client');
    (
      realReactDOM as typeof realReactDOM & { createRoot: typeof realReactDOMClient.createRoot }
    ).createRoot = realReactDOMClient.createRoot;
  }

  return realReactDOM;
});

describe('notification static warning', () => {
  beforeAll(() => {
    actWrapper(act);
  });

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(async () => {
    // Clean up
    notification.destroy();
    await triggerMotionEnd();

    vi.useRealTimers();

    await awaitPromise();
  });

  // Follow test need keep order
  it('no warning', async () => {
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    notification.open({
      title: <div className="bamboo" />,
      duration: 0,
    });
    await waitFakeTimer19();

    expect(document.querySelector('.bamboo')).toBeTruthy();

    expect(errSpy).not.toHaveBeenCalled();
    errSpy.mockRestore();
  });

  it('warning if use theme', async () => {
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<ConfigProvider theme={{}} />);

    notification.open({
      title: <div className="light" />,
      duration: 0,
    });
    await waitFakeTimer();

    expect(document.querySelector('.light')).toBeTruthy();

    expect(errSpy).toHaveBeenCalledWith(
      "Warning: [antd: notification] Static function can not consume context like dynamic theme. Please use 'App' component instead.",
    );
    errSpy.mockRestore();
  });
});
