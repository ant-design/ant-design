import React from 'react';

import notification, { actWrapper } from '..';
import { act, render, waitFakeTimer, waitFakeTimer19 } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
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

describe('notification static warning', () => {
  beforeAll(() => {
    actWrapper(act);
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(async () => {
    // Clean up
    notification.destroy();
    await triggerMotionEnd();

    jest.useRealTimers();

    await awaitPromise();
  });

  // Follow test need keep order
  it('no warning', async () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    notification.open({
      message: <div className="bamboo" />,
      duration: 0,
    });
    await waitFakeTimer19();

    expect(document.querySelector('.bamboo')).toBeTruthy();

    expect(errSpy).not.toHaveBeenCalled();
    errSpy.mockRestore();
  });

  it('warning if use theme', async () => {
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(<ConfigProvider theme={{}} />);

    notification.open({
      message: <div className="light" />,
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
