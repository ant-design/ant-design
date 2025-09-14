import React from 'react';
import { render as testLibRender } from '@testing-library/react';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';

import notification from '..';
import { act, fireEvent, pureRender, render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';

describe('notification.hooks', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
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

  it('not export style in SSR', () => {
    const cache = createCache();

    const Demo = () => {
      const [, holder] = notification.useNotification();

      return <StyleProvider cache={cache}>{holder}</StyleProvider>;
    };

    render(<Demo />);

    const styleText = extractStyle(cache, true);
    expect(styleText).not.toContain('.ant-notification');
  });

  it('disable stack', () => {
    const Demo = () => {
      const [api, holder] = notification.useNotification({ stack: false });

      React.useEffect(() => {
        api.info({
          message: null,
          description: 'test',
        });
      }, []);

      return holder;
    };

    render(<Demo />);

    expect(document.querySelector('.ant-notification-stack')).toBeFalsy();
  });

  it('support duration', () => {
    const Demo = () => {
      const [api, holder] = notification.useNotification({ duration: 1.5 });

      return (
        <>
          <a
            onClick={() => {
              api.info({
                message: null,
                description: 'test',
              });
            }}
          >
            Show
          </a>
          {holder}
        </>
      );
    };

    const { container } = render(<Demo />);
    fireEvent.click(container.querySelector('a')!);

    function getNoticeCount() {
      return Array.from(document.querySelectorAll('.ant-notification-notice-wrapper')).filter(
        (node) => !node.classList.contains('ant-notification-fade-leave'),
      ).length;
    }

    // Pass 1s
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(getNoticeCount()).toBe(1);

    // Pass 2s
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(getNoticeCount()).toBe(0);
  });

  it('should hide close btn when closeIcon setting to null or false', () => {
    const Demo = () => {
      const Holder = (className: string, closeIcon?: React.ReactNode) => {
        const [api, holder] = notification.useNotification({ closeIcon });

        React.useEffect(() => {
          api.info({
            className,
            message: 'Notification Title',
            duration: 0,
          });
        }, []);

        return holder;
      };

      return (
        <>
          {Holder('normal')}
          {Holder('custom', <span className="custom-close-icon">Close</span>)}
          {Holder('with-null', null)}
          {Holder('with-false', false)}
        </>
      );
    };

    // We use origin testing lib here since StrictMode will render multiple times
    testLibRender(<Demo />);

    expect(document.querySelectorAll('.normal .ant-notification-notice-close').length).toBe(1);
    expect(document.querySelectorAll('.custom .custom-close-icon').length).toBe(1);
    expect(document.querySelectorAll('.with-null .ant-notification-notice-close').length).toBe(0);
    expect(document.querySelectorAll('.with-false .ant-notification-notice-close').length).toBe(0);
  });
});
