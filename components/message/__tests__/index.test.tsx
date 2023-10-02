import { SmileOutlined } from '@ant-design/icons';
import React from 'react';
import message, { actWrapper } from '..';
import { act, fireEvent, waitFakeTimer } from '../../../tests/utils';
import { awaitPromise, triggerMotionEnd } from './util';

describe('message', () => {
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

    act(() => {
      jest.runAllTimers();
    });

    jest.useRealTimers();

    await awaitPromise();
  });

  it('should be able to hide manually', async () => {
    const hide1 = message.info('whatever', 0);
    const hide2 = message.info('whatever', 0);

    await awaitPromise();

    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(2);

    hide1();
    await triggerMotionEnd();
    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(1);

    hide2();
    await triggerMotionEnd();
    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(0);
  });

  it('should be able to remove manually with a unique key', async () => {
    const key1 = 'key1';
    const key2 = 'key2';

    message.info({ content: 'Message1', key: 'key1', duration: 0 });
    message.info({ content: 'Message2', key: 'key2', duration: 0 });

    await awaitPromise();

    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(2);

    message.destroy(key1);
    await triggerMotionEnd();
    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(1);

    message.destroy(key2);
    await triggerMotionEnd();
    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(0);
  });

  it('should be able to destroy globally', async () => {
    message.info('whatever', 0);
    message.info('whatever', 0);

    await awaitPromise();

    expect(document.querySelectorAll('.ant-message')).toHaveLength(1);
    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(2);

    message.destroy();
    await triggerMotionEnd();

    expect(document.querySelectorAll('.ant-message')).toHaveLength(0);
    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(0);
  });

  it('should not need to use duration argument when using the onClose arguments', async () => {
    const onClose = jest.fn();
    const close = message.info('whatever', onClose);

    await awaitPromise();

    close();
    await triggerMotionEnd();

    expect(onClose).toHaveBeenCalled();
  });

  it('should have the default duration when using the onClose arguments', async () => {
    const onClose = jest.fn();

    message.info('whatever', onClose);
    await awaitPromise();

    act(() => {
      jest.advanceTimersByTime(2500);
    });

    expect(document.querySelector('.ant-message-move-up-leave')).toBeFalsy();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(document.querySelector('.ant-message-move-up-leave')).toBeTruthy();
  });

  it('trigger onClick method', async () => {
    const onClick = jest.fn();
    message.info({
      onClick,
      duration: 0,
      content: 'message info',
    });

    await awaitPromise();

    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(1);
    fireEvent.click(document.querySelector('.ant-message-notice')!);

    expect(onClick).toHaveBeenCalled();
  });

  it('should be called like promise', async () => {
    const onClose = jest.fn();
    message.info('whatever').then(onClose);
    await awaitPromise();

    act(() => {
      jest.advanceTimersByTime(2500);
    });
    expect(onClose).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    await waitFakeTimer(); // Wait to let event loop run
    expect(onClose).toHaveBeenCalled();
  });

  // https://github.com/ant-design/ant-design/issues/8201
  it('should hide message correctly', async () => {
    const hide = message.loading('Action in progress..', 0);
    await awaitPromise();

    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(1);

    hide!();
    await triggerMotionEnd();
    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(0);
  });

  it('should allow custom icon', async () => {
    message.open({ content: 'Message', icon: <SmileOutlined /> });

    await awaitPromise();
    expect(document.querySelector('.anticon-smile')).toBeTruthy();
  });

  it('should have no icon', async () => {
    message.open({ content: 'Message', icon: <span /> });

    await awaitPromise();
    expect(document.querySelector('.ant-message-notice .anticon')).toBeFalsy();
  });

  it('should have no icon when not pass icon props', async () => {
    message.open({ content: 'Message' });

    await awaitPromise();
    expect(document.querySelector('.ant-message-notice .anticon')).toBeFalsy();
  });

  // https://github.com/ant-design/ant-design/issues/8201
  it('should destroy messages correctly', async () => {
    message.loading('Action in progress1..', 0);
    message.loading('Action in progress2..', 0);
    setTimeout(() => message.destroy(), 1000);
    await awaitPromise();

    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(2);

    await triggerMotionEnd();
    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(0);
  });

  it('should support update message content with a unique key', async () => {
    const key = 'updatable';

    message.loading({ content: 'Loading...', key });
    // Testing that content of the message should be updated.
    setTimeout(() => message.success({ content: 'Loaded', key }), 1000);
    setTimeout(() => message.destroy(), 3000);
    await awaitPromise();

    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(1);
    act(() => {
      jest.advanceTimersByTime(1500);
    });

    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(1);
    expect(document.querySelector('.ant-message-move-up-leave')).toBeFalsy();

    await triggerMotionEnd();
    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(0);
  });

  it('update message content with a unique key and cancel manually', async () => {
    const key = 'updatable';

    const hideLoading = message.loading({ content: 'Loading...', key, duration: 0 });
    await awaitPromise();

    setTimeout(() => {
      act(() => {
        hideLoading();
      });
    }, 1000);

    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(1);

    act(() => {
      jest.advanceTimersByTime(1500);
    });
    expect(document.querySelectorAll('.ant-message-move-up-leave')).toHaveLength(1);
  });

  it('should not throw error when pass null', async () => {
    message.error(null);
    await awaitPromise();
  });
});
