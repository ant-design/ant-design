import React from 'react';
import { render, fireEvent, pureRender } from '../../../tests/utils';
import notification from '..';
import ConfigProvider from '../../config-provider';

describe('notification.hooks', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    notification.destroy();
  });

  it('should work', () => {
    const Context = React.createContext('light');

    const Demo: React.FC = () => {
      const [api, holder] = notification.useNotification();

      return (
        <ConfigProvider prefixCls="my-test">
          <Context.Provider value="bamboo">
            <button
              type="button"
              onClick={() => {
                api.open({
                  message: null,
                  description: (
                    <Context.Consumer>
                      {name => <span className="hook-test-result">{name}</span>}
                    </Context.Consumer>
                  ),
                  duration: 0,
                });
              }}
            >
              test
            </button>
            {holder}
          </Context.Provider>
        </ConfigProvider>
      );
    };

    const { container } = render(<Demo />);
    fireEvent.click(container.querySelector('button')!);
    expect(document.querySelectorAll('.my-test-notification-notice').length).toBe(1);
    expect(document.querySelector('.hook-test-result')?.innerHTML).toEqual('bamboo');
  });

  it('should work with success', () => {
    const Context = React.createContext('light');

    const Demo: React.FC = () => {
      const [api, holder] = notification.useNotification();

      return (
        <ConfigProvider prefixCls="my-test">
          <Context.Provider value="bamboo">
            <button
              type="button"
              onClick={() => {
                api.success({
                  message: null,
                  description: (
                    <Context.Consumer>
                      {name => <span className="hook-test-result">{name}</span>}
                    </Context.Consumer>
                  ),
                  duration: 0,
                });
              }}
            >
              test
            </button>
            {holder}
          </Context.Provider>
        </ConfigProvider>
      );
    };

    const { container } = render(<Demo />);
    fireEvent.click(container.querySelector('button')!);
    expect(document.querySelectorAll('.my-test-notification-notice').length).toBe(1);
    expect(document.querySelectorAll('.anticon-check-circle').length).toBe(1);
    expect(document.querySelector('.hook-test-result')?.innerHTML).toEqual('bamboo');
  });

  it('should be same hook', () => {
    let count = 0;

    const Demo: React.FC = () => {
      const [, forceUpdate] = React.useState([]);
      const [api] = notification.useNotification();
      React.useEffect(() => {
        count += 1;
        expect(count).toEqual(1);
        forceUpdate([]);
      }, [api]);

      return null;
    };

    pureRender(<Demo />);
  });
});
