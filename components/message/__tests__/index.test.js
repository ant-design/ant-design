import React from 'react';
import { mount } from 'enzyme';
import { SmileOutlined } from '@ant-design/icons';
import message from '..';

describe('message', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    message.destroy();
    jest.useRealTimers();
  });

  it('should be able to hide manually', () => {
    const hide1 = message.info('whatever', 0);
    const hide2 = message.info('whatever', 0);
    expect(document.querySelectorAll('.ant-message-notice').length).toBe(2);
    hide1();
    jest.runAllTimers();
    expect(document.querySelectorAll('.ant-message-notice').length).toBe(1);
    hide2();
    jest.runAllTimers();
    expect(document.querySelectorAll('.ant-message-notice').length).toBe(0);
  });

  it('should be able to remove manually with a unique key', () => {
    const key1 = 'key1';
    const key2 = 'key2';
    message.info({ content: 'Message1', key: 'key1', duration: 0 });
    message.info({ content: 'Message2', key: 'key2', duration: 0 });
    expect(document.querySelectorAll('.ant-message-notice').length).toBe(2);
    message.destroy(key1);
    jest.runAllTimers();
    expect(document.querySelectorAll('.ant-message-notice').length).toBe(1);
    message.destroy(key2);
    jest.runAllTimers();
    expect(document.querySelectorAll('.ant-message-notice').length).toBe(0);
  });

  it('should be able to destroy globally', () => {
    message.info('whatever', 0);
    message.info('whatever', 0);
    expect(document.querySelectorAll('.ant-message').length).toBe(1);
    expect(document.querySelectorAll('.ant-message-notice').length).toBe(2);
    message.destroy();
    expect(document.querySelectorAll('.ant-message').length).toBe(0);
    expect(document.querySelectorAll('.ant-message-notice').length).toBe(0);
  });

  it('should not need to use duration argument when using the onClose arguments', () => {
    message.info('whatever', () => {});
  });

  it('should have the default duration when using the onClose arguments', done => {
    jest.useRealTimers();
    const defaultDuration = 3;
    const now = Date.now();
    message.info('whatever', () => {
      // calculate the approximately duration value
      const aboutDuration = parseInt((Date.now() - now) / 1000, 10);
      expect(aboutDuration).toBe(defaultDuration);
      done();
    });
  });

  it('should be called like promise', done => {
    jest.useRealTimers();
    const defaultDuration = 3;
    const now = Date.now();
    message.info('whatever').then(() => {
      // calculate the approximately duration value
      const aboutDuration = parseInt((Date.now() - now) / 1000, 10);
      expect(aboutDuration).toBe(defaultDuration);
      done();
    });
  });

  // https://github.com/ant-design/ant-design/issues/8201
  it('should hide message correctly', () => {
    let hide;
    class Test extends React.Component {
      componentDidMount() {
        hide = message.loading('Action in progress..', 0);
      }

      render() {
        return <div>test</div>;
      }
    }
    mount(<Test />);
    expect(document.querySelectorAll('.ant-message-notice').length).toBe(1);
    hide();
    jest.runAllTimers();
    expect(document.querySelectorAll('.ant-message-notice').length).toBe(0);
  });

  it('should allow custom icon', () => {
    message.open({ content: 'Message', icon: <SmileOutlined /> });
    expect(document.querySelectorAll('.anticon-smile').length).toBe(1);
  });

  it('should have no icon', () => {
    message.open({ content: 'Message', icon: <span /> });
    expect(document.querySelectorAll('.ant-message-notice .anticon').length).toBe(0);
  });
  it('should have no icon when not pass icon props', () => {
    message.open({ content: 'Message' });
    expect(document.querySelectorAll('.ant-message-notice .anticon').length).toBe(0);
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
    mount(<Test />);
    expect(document.querySelectorAll('.ant-message-notice').length).toBe(2);
    jest.runAllTimers();
    expect(document.querySelectorAll('.ant-message-notice').length).toBe(0);
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

    mount(<Test />);
    expect(document.querySelectorAll('.ant-message-notice').length).toBe(1);
    jest.advanceTimersByTime(1500);
    expect(document.querySelectorAll('.ant-message-notice').length).toBe(1);
    jest.runAllTimers();
    expect(document.querySelectorAll('.ant-message-notice').length).toBe(0);
  });

  it('update message content with a unique key and cancel manually', () => {
    const key = 'updatable';
    class Test extends React.Component {
      componentDidMount() {
        const hideLoading = message.loading({ content: 'Loading...', key, duration: 0 });
        // Testing that content of the message should be cancel manually.
        setTimeout(hideLoading, 1000);
      }

      render() {
        return <div>test</div>;
      }
    }

    mount(<Test />);
    expect(document.querySelectorAll('.ant-message-notice').length).toBe(1);
    jest.advanceTimersByTime(1500);
    expect(document.querySelectorAll('.ant-message-notice').length).toBe(0);
  });

  it('should not throw error when pass null', () => {
    message.error(null);
  });
});
