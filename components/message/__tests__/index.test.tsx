import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
import message, { actWrapper, actDestroy } from '..';
import { act, fireEvent, render, sleep } from '../../../tests/utils';

describe('message', () => {
  function triggerMotionEnd(selector: string = '.ant-message-move-up-leave') {
    // Flush css motion state update
    for (let i = 0; i < 5; i += 1) {
      act(() => {
        jest.runAllTimers();
      });
    }

    document.querySelectorAll(selector).forEach(ele => {
      fireEvent.animationEnd(ele);
    });
  }

  beforeAll(() => {
    actWrapper(act);
  });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    message.destroy();
    actDestroy();

    jest.useRealTimers();
  });

  it('should be able to hide manually', async () => {
    const hide1 = message.info('whatever', 0);
    const hide2 = message.info('whatever', 0);

    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(2);

    hide1();
    triggerMotionEnd();
    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(1);

    hide2();
    triggerMotionEnd();
    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(0);
  });

  it('should be able to remove manually with a unique key', () => {
    const key1 = 'key1';
    const key2 = 'key2';

    message.info({ content: 'Message1', key: 'key1', duration: 0 });
    message.info({ content: 'Message2', key: 'key2', duration: 0 });

    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(2);

    message.destroy(key1);
    triggerMotionEnd();
    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(1);

    message.destroy(key2);
    triggerMotionEnd();
    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(0);
  });

  it('should be able to destroy globally', () => {
    message.info('whatever', 0);
    message.info('whatever', 0);

    expect(document.querySelectorAll('.ant-message')).toHaveLength(1);
    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(2);

    message.destroy();
    triggerMotionEnd();

    expect(document.querySelectorAll('.ant-message')).toHaveLength(0);
    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(0);
  });

  it('should not need to use duration argument when using the onClose arguments', () => {
    const onClose = jest.fn();
    const close = message.info('whatever', onClose);

    close();
    triggerMotionEnd();

    expect(onClose).toHaveBeenCalled();
  });

  it('should have the default duration when using the onClose arguments', () => {
    const onClose = jest.fn();

    message.info('whatever', onClose);
    act(() => {
      jest.advanceTimersByTime(2500);
    });

    expect(document.querySelector('.ant-message-move-up-leave')).toBeFalsy();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(document.querySelector('.ant-message-move-up-leave')).toBeTruthy();
  });

  it('trigger onClick method', () => {
    const onClick = jest.fn();
    class Test extends React.Component {
      componentDidMount() {
        message.info({
          onClick,
          duration: 0,
          content: 'message info',
        });
      }

      render() {
        return <div>test message onClick method</div>;
      }
    }
    render(<Test />);

    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(1);
    fireEvent.click(document.querySelector('.ant-message-notice')!);
    expect(onClick).toHaveBeenCalled();
  });

  it('should be called like promise', async () => {
    const onClose = jest.fn();
    message.info('whatever').then(onClose);

    act(() => {
      jest.advanceTimersByTime(2500);
    });
    expect(onClose).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    await sleep(); // Wait to let event loop run
    expect(onClose).toHaveBeenCalled();
  });

  // https://github.com/ant-design/ant-design/issues/8201
  it('should hide message correctly', () => {
    let hide: VoidFunction;
    class Test extends React.Component {
      componentDidMount() {
        act(() => {
          hide = message.loading('Action in progress..', 0);
        });
      }

      render() {
        return <div>test</div>;
      }
    }

    render(<Test />);

    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(1);

    hide!();
    triggerMotionEnd();
    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(0);
  });

  it('should allow custom icon', () => {
    message.open({ content: 'Message', icon: <SmileOutlined /> });
    expect(document.querySelector('.anticon-smile')).toBeTruthy();
  });

  it('should have no icon', () => {
    message.open({ content: 'Message', icon: <span /> });
    expect(document.querySelector('.ant-message-notice .anticon')).toBeFalsy();
  });

  it('should have no icon when not pass icon props', () => {
    message.open({ content: 'Message' });
    expect(document.querySelector('.ant-message-notice .anticon')).toBeFalsy();
  });

  // https://github.com/ant-design/ant-design/issues/8201
  it('should destroy messages correctly', () => {
    class Test extends React.Component {
      componentDidMount() {
        message.loading('Action in progress1..', 0);
        message.loading('Action in progress2..', 0);
        setTimeout(() => message.destroy(), 1000);
      }

      render() {
        return <div>test</div>;
      }
    }
    render(<Test />);

    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(2);

    triggerMotionEnd();
    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(0);
  });

  it('should support update message content with a unique key', () => {
    const key = 'updatable';
    class Test extends React.Component {
      componentDidMount() {
        message.loading({ content: 'Loading...', key });
        // Testing that content of the message should be updated.
        setTimeout(() => message.success({ content: 'Loaded', key }), 1000);
        setTimeout(() => message.destroy(), 3000);
      }

      render() {
        return <div>test</div>;
      }
    }

    render(<Test />);

    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(1);
    act(() => {
      jest.advanceTimersByTime(1500);
    });

    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(1);
    expect(document.querySelector('.ant-message-move-up-leave')).toBeFalsy();

    triggerMotionEnd();
    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(0);
  });

  it('update message content with a unique key and cancel manually', () => {
    const key = 'updatable';
    class Test extends React.Component {
      componentDidMount() {
        let hideLoading: VoidFunction;
        act(() => {
          hideLoading = message.loading({ content: 'Loading...', key, duration: 0 });
        });
        // Testing that content of the message should be cancel manually.
        setTimeout(() => {
          act(() => {
            hideLoading();
          });
        }, 1000);
      }

      render() {
        return <div>test</div>;
      }
    }

    render(<Test />);
    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(1);

    act(() => {
      jest.advanceTimersByTime(1500);
    });
    expect(document.querySelectorAll('.ant-message-move-up-leave')).toHaveLength(1);
  });

  it('should not throw error when pass null', () => {
    message.error(null);
  });
});
