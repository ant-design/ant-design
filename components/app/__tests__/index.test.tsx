import React from 'react';
import App from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render, waitFakeTimer } from '../../../tests/utils';

describe('App', () => {
  mountTest(App);
  rtlTest(App);

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('single', () => {
    // Sub page
    const MyPage = () => {
      const { message } = App.useApp();
      React.useEffect(() => {
        message.success('Good!');
      }, [message]);

      return <div>Hello World</div>;
    };

    // Entry component
    const MyApp = () => (
      <App>
        <MyPage />
      </App>
    );

    const { getByText, container } = render(<MyApp />);
    expect(getByText('Hello World')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should work as preset message config expected in app', async () => {
    const Consumer = () => {
      const { message } = App.useApp();
      React.useEffect(() => {
        message.success('Good!');
        message.success('Good!');
      }, [message]);

      return <div />;
    };
    const Wrapper = () => (
      <App messageConfig={{ maxCount: 1 }}>
        <Consumer />
      </App>
    );

    render(<Wrapper />);

    await waitFakeTimer();

    expect(document.querySelectorAll('.ant-message')).toHaveLength(1);
  });

  it('should work as preset notification config expected in app', async () => {
    const Consumer = () => {
      const { notification } = App.useApp();
      React.useEffect(() => {
        notification.success({ message: 'Good!' });
        notification.success({ message: 'Good!' });
      }, [notification]);

      return <div />;
    };
    const Wrapper = () => (
      <App notificationConfig={{ maxCount: 1 }}>
        <Consumer />
      </App>
    );

    render(<Wrapper />);

    await waitFakeTimer();

    expect(document.querySelectorAll('.ant-notification')).toHaveLength(1);
  });
});
