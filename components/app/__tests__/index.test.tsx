import React, { useEffect } from 'react';
import App from '..';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { render, waitFakeTimer } from '../../../tests/utils';
import type { AppConfig, InternalUseAppProps } from '..';

describe('App', () => {
  mountTest(App);
  rtlTest(App);

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
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

  it('should work as message config configured in app', async () => {
    let consumerConfig: AppConfig | undefined;
    const Consumer = () => {
      const { message, notification, __INTERNAL__ } = App.useApp<InternalUseAppProps>();
      consumerConfig = __INTERNAL__;

      useEffect(() => {
        message.success('Message 1');
        message.success('Message 2');
        notification.success({ message: 'Notification 1' });
        notification.success({ message: 'Notification 2' });
        notification.success({ message: 'Notification 3' });
      }, [message, notification]);

      return <div />;
    };
    const Wrapper = () => (
      <App messageConfig={{ maxCount: 1 }} notificationConfig={{ maxCount: 2 }}>
        <Consumer />
      </App>
    );

    render(<Wrapper />);

    await waitFakeTimer();

    expect(consumerConfig?.messageConfig).toStrictEqual({ maxCount: 1 });
    expect(consumerConfig?.notificationConfig).toStrictEqual({ maxCount: 2 });

    expect(document.querySelectorAll('.ant-message-notice')).toHaveLength(1);
    expect(document.querySelectorAll('.ant-notification-notice')).toHaveLength(2);
  });

  it('should be a merged config configured in nested app', async () => {
    let offsetConsumerConfig: AppConfig | undefined;
    let maxCountConsumerConfig: AppConfig | undefined;
    const OffsetConsumer = () => {
      const { __INTERNAL__ } = App.useApp<InternalUseAppProps>();
      offsetConsumerConfig = __INTERNAL__;
      return <div />;
    };
    const MaxCountConsumer = () => {
      const { __INTERNAL__ } = App.useApp<InternalUseAppProps>();
      maxCountConsumerConfig = __INTERNAL__;
      return <div />;
    };
    const Wrapper = () => (
      <App messageConfig={{ maxCount: 1 }} notificationConfig={{ maxCount: 2 }}>
        <App messageConfig={{ top: 32 }} notificationConfig={{ top: 96 }}>
          <OffsetConsumer />
        </App>
        <MaxCountConsumer />
      </App>
    );

    render(<Wrapper />);

    await waitFakeTimer();

    expect(offsetConsumerConfig?.messageConfig).toStrictEqual({ maxCount: 1, top: 32 });
    expect(offsetConsumerConfig?.notificationConfig).toStrictEqual({ maxCount: 2, top: 96 });
    expect(maxCountConsumerConfig?.messageConfig).toStrictEqual({ maxCount: 1 });
    expect(maxCountConsumerConfig?.notificationConfig).toStrictEqual({ maxCount: 2 });
  });
});
