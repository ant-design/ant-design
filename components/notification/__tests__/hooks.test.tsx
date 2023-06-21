import React from 'react';
import notification from '..';
import { fireEvent, pureRender, render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

describe('notification.hooks', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
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
                      {(name) => <span className="hook-test-result">{name}</span>}
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
    expect(document.querySelectorAll('.my-test-notification-notice')).toHaveLength(1);
    expect(document.querySelector('.hook-test-result')!.textContent).toEqual('bamboo');
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
                      {(name) => <span className="hook-test-result">{name}</span>}
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
    expect(document.querySelectorAll('.my-test-notification-notice')).toHaveLength(1);
    expect(document.querySelectorAll('.anticon-check-circle')).toHaveLength(1);
    expect(document.querySelector('.hook-test-result')!.textContent).toEqual('bamboo');
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

  describe('not break in effect', () => {
    it('basic', () => {
      const Demo = () => {
        const [api, holder] = notification.useNotification();

        React.useEffect(() => {
          api.info({
            message: null,
            description: <div className="bamboo" />,
          });
        }, []);

        return holder;
      };

      render(<Demo />);

      expect(document.querySelector('.bamboo')).toBeTruthy();
    });

    it('warning if user call update in render', () => {
      const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const Demo = () => {
        const [api, holder] = notification.useNotification();
        const calledRef = React.useRef(false);

        if (!calledRef.current) {
          api.info({
            message: null,
            description: <div className="bamboo" />,
          });
          calledRef.current = true;
        }

        return holder;
      };

      render(<Demo />);

      expect(document.querySelector('.bamboo')).toBeFalsy();
      expect(errorSpy).toHaveBeenCalledWith(
        'Warning: [antd: Notification] You are calling notice in render which will break in React 18 concurrent mode. Please trigger in effect instead.',
      );

      errorSpy.mockRestore();
    });
  });
});
