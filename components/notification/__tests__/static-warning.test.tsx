import React from 'react';
import notification, { actWrapper } from '..';
import { act, render, waitFakeTimer } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import { awaitPromise, triggerMotionEnd } from './util';

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
    await waitFakeTimer();

    expect(document.querySelector('.bamboo')).toBeTruthy();

    expect(errSpy).not.toHaveBeenCalled();
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
  });
});
