/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { act } from 'react-dom/test-utils';
import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';
import message from '..';
import { fireEvent, render } from '../../../tests/utils';
import ConfigProvider from '../../config-provider';
import { triggerMotionEnd } from './util';

describe('message.hooks', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should work', () => {
    const Context = React.createContext('light');

    const Demo: React.FC = () => {
      const [api, holder] = message.useMessage();

      return (
        <ConfigProvider prefixCls="my-test">
          <Context.Provider value="bamboo">
            <button
              type="button"
              onClick={() => {
                api.open({
                  duration: 0,
                  content: (
                    <Context.Consumer>
                      {(name) => <span className="hook-test-result">{name}</span>}
                    </Context.Consumer>
                  ),
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
    expect(document.querySelectorAll('.my-test-message-notice')).toHaveLength(1);
    expect(document.querySelector('.hook-test-result')!.textContent).toEqual('bamboo');
  });

  it('should work with success', () => {
    const Context = React.createContext('light');

    const Demo: React.FC = () => {
      const [api, holder] = message.useMessage();

      return (
        <ConfigProvider prefixCls="my-test">
          <Context.Provider value="bamboo">
            <button
              type="button"
              onClick={() => {
                api.success({
                  duration: 0,
                  content: (
                    <Context.Consumer>
                      {(name) => <span className="hook-test-result">{name}</span>}
                    </Context.Consumer>
                  ),
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
    expect(document.querySelectorAll('.my-test-message-notice')).toHaveLength(1);
    expect(document.querySelectorAll('.anticon-check-circle')).toHaveLength(1);
    expect(document.querySelector('.hook-test-result')!.textContent).toEqual('bamboo');
  });

  it('should work with onClose', (done) => {
    const Demo = () => {
      const [api, holder] = message.useMessage();
      return (
        <>
          <button
            type="button"
            onClick={() => {
              api.open({ content: 'amazing', duration: 1, onClose: done });
            }}
          >
            test
          </button>
          {holder}
        </>
      );
    };

    const { container } = render(<Demo />);
    fireEvent.click(container.querySelector('button')!);

    triggerMotionEnd();
  });

  it('should work with close promise', (done) => {
    const Demo = () => {
      const [api, holder] = message.useMessage();
      return (
        <>
          <button
            type="button"
            onClick={() => {
              api.open({ content: 'good', duration: 1 }).then(() => {
                done();
              });
            }}
          >
            test
          </button>
          {holder}
        </>
      );
    };

    const { container } = render(<Demo />);
    fireEvent.click(container.querySelector('button')!);

    triggerMotionEnd();
  });

  it('should work with hide', async () => {
    let hide: VoidFunction;
    const Demo = () => {
      const [api, holder] = message.useMessage();
      return (
        <ConfigProvider prefixCls="my-test">
          <button
            type="button"
            onClick={() => {
              hide = api.open({ content: 'nice', duration: 0 });
            }}
          >
            test
          </button>
          {holder}
        </ConfigProvider>
      );
    };

    const { container } = render(<Demo />);
    fireEvent.click(container.querySelector('button')!);

    expect(document.querySelectorAll('.my-test-message-notice')).toHaveLength(1);

    act(() => {
      hide!();
    });
    await triggerMotionEnd('.my-test-message-move-up-leave');

    expect(document.querySelectorAll('.my-test-message-notice')).toHaveLength(0);
  });

  it('should be same hook', () => {
    let cacheAPI: any;

    const Demo: React.FC = () => {
      const [, forceUpdate] = React.useState([]);
      const [api] = message.useMessage();
      React.useEffect(() => {
        if (!cacheAPI) {
          cacheAPI = api;
        } else {
          expect(cacheAPI).toBe(api);
        }

        forceUpdate([]);
      }, [api]);

      return null;
    };

    render(<Demo />);
  });

  it("should use ConfigProvider's getPopupContainer as message container", () => {
    const containerId = 'container';
    const div = document.createElement('div');
    div.id = containerId;
    document.body.appendChild(div);

    const getPopupContainer = () => div;

    const Demo = () => {
      const [api, holder] = message.useMessage();
      return (
        <ConfigProvider getPopupContainer={getPopupContainer} prefixCls="my-test">
          {holder}
          <button
            type="button"
            onClick={() => {
              api.success({
                duration: 0,
                content: <span className="hook-content">happy</span>,
              });
            }}
          >
            test
          </button>
        </ConfigProvider>
      );
    };

    const { container } = render(<Demo />);
    fireEvent.click(container.querySelector('button')!);

    expect(div.querySelectorAll('.my-test-message-notice')).toHaveLength(1);
    expect(div.querySelectorAll('.anticon-check-circle')).toHaveLength(1);
    expect(div.querySelector('.hook-content')!.textContent).toEqual('happy');
    expect(document.querySelectorAll(`#${containerId}`)).toHaveLength(1);
  });

  it('warning if user call update in render', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const Demo = () => {
      const [api, holder] = message.useMessage();
      const calledRef = React.useRef(false);

      if (!calledRef.current) {
        api.info({
          content: <div className="bamboo" />,
        });
        calledRef.current = true;
      }

      return holder;
    };

    render(<Demo />);

    expect(document.querySelector('.bamboo')).toBeFalsy();
    expect(errorSpy).toHaveBeenCalledWith(
      'Warning: [antd: Message] You are calling notice in render which will break in React 18 concurrent mode. Please trigger in effect instead.',
    );

    errorSpy.mockRestore();
  });

  it('not export style in SSR', () => {
    const cache = createCache();

    const Demo = () => {
      const [, holder] = message.useMessage();

      return <StyleProvider cache={cache}>{holder}</StyleProvider>;
    };

    render(<Demo />);

    const styleText = extractStyle(cache, true);
    expect(styleText).not.toContain('.ant-message');
  });

  it('component fontSize should work', () => {
    const Demo = () => {
      const [api, holder] = message.useMessage();

      useEffect(() => {
        api.info({
          content: <div />,
          className: 'fontSize',
        });
      }, []);

      return (
        <ConfigProvider theme={{ components: { Message: { fontSize: 20 } } }}>
          {holder}
        </ConfigProvider>
      );
    };

    render(<Demo />);

    const msg = document.querySelector('.fontSize');

    expect(msg).toBeTruthy();
    expect(msg).toHaveStyle({
      fontSize: '20px',
    });
  });
});
