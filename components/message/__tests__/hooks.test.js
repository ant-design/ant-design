/* eslint-disable jsx-a11y/control-has-associated-label */
import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import message, { getInstance } from '..';
import ConfigProvider from '../../config-provider';

describe('message.hooks', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    message.destroy();
  });

  it('should work', () => {
    const Context = React.createContext('light');

    const Demo = () => {
      const [api, holder] = message.useMessage();

      return (
        <ConfigProvider prefixCls="my-test">
          <Context.Provider value="bamboo">
            <button
              type="button"
              onClick={() => {
                api.open({
                  content: (
                    <Context.Consumer>
                      {name => <span className="hook-test-result">{name}</span>}
                    </Context.Consumer>
                  ),
                  duration: 0,
                });
              }}
            />
            {holder}
          </Context.Provider>
        </ConfigProvider>
      );
    };

    const wrapper = mount(<Demo />);
    wrapper.find('button').simulate('click');
    expect(document.querySelectorAll('.my-test-message-notice').length).toBe(1);
    expect(document.querySelector('.hook-test-result').innerHTML).toEqual('bamboo');
  });

  it('should work with success', () => {
    const Context = React.createContext('light');

    const Demo = () => {
      const [api, holder] = message.useMessage();

      return (
        <ConfigProvider prefixCls="my-test">
          <Context.Provider value="bamboo">
            <button
              type="button"
              onClick={() => {
                api.success({
                  content: (
                    <Context.Consumer>
                      {name => <span className="hook-test-result">{name}</span>}
                    </Context.Consumer>
                  ),
                  duration: 0,
                });
              }}
            />
            {holder}
          </Context.Provider>
        </ConfigProvider>
      );
    };

    const wrapper = mount(<Demo />);
    wrapper.find('button').simulate('click');
    expect(document.querySelectorAll('.my-test-message-notice').length).toBe(1);
    expect(document.querySelectorAll('.anticon-check-circle').length).toBe(1);
    expect(document.querySelector('.hook-test-result').innerHTML).toEqual('bamboo');
  });

  it('should work with onClose', done => {
    // if not use real timer, done won't be called
    jest.useRealTimers();
    const Demo = () => {
      const [api, holder] = message.useMessage();
      return (
        <>
          <button
            type="button"
            onClick={() => {
              api.open({
                content: 'amazing',
                duration: 1,
                onClose() {
                  done();
                },
              });
            }}
          />
          {holder}
        </>
      );
    };

    const wrapper = mount(<Demo />);
    wrapper.find('button').simulate('click');
    jest.useFakeTimers();
  });

  it('should work with close promise', done => {
    // if not use real timer, done won't be called
    jest.useRealTimers();
    const Demo = () => {
      const [api, holder] = message.useMessage();
      return (
        <>
          <button
            type="button"
            onClick={() => {
              api
                .open({
                  content: 'good',
                  duration: 1,
                })
                .then(() => {
                  done();
                });
            }}
          />
          {holder}
        </>
      );
    };

    const wrapper = mount(<Demo />);
    wrapper.find('button').simulate('click');
    jest.useFakeTimers();
  });

  it('should work with hide', () => {
    let hide;
    const Demo = () => {
      const [api, holder] = message.useMessage();
      return (
        <ConfigProvider prefixCls="my-test">
          <button
            type="button"
            onClick={() => {
              hide = api.open({
                content: 'nice',
                duration: 0,
              });
            }}
          />
          {holder}
        </ConfigProvider>
      );
    };

    const wrapper = mount(<Demo />);
    wrapper.find('button').simulate('click');

    act(() => {
      jest.runAllTimers();
    });
    expect(document.querySelectorAll('.my-test-message-notice').length).toBe(1);

    act(() => {
      hide();
      jest.runAllTimers();
    });
    expect(getInstance().component.state.notices).toHaveLength(0);
  });

  it('should be same hook', () => {
    let count = 0;

    const Demo = () => {
      const [, forceUpdate] = React.useState({});
      const [api] = message.useMessage();

      React.useEffect(() => {
        count += 1;
        expect(count).toEqual(1);
        forceUpdate();
      }, [api]);

      return null;
    };

    mount(<Demo />);
  });

  it("should use ConfigProvider's getPopupContainer as message container", () => {
    const containerId = 'container';
    const getPopupContainer = () => {
      const div = document.createElement('div');
      div.id = containerId;
      document.body.appendChild(div);
      return div;
    };
    const Demo = () => {
      const [api, holder] = message.useMessage();
      return (
        <ConfigProvider getPopupContainer={getPopupContainer} prefixCls="my-test">
          {holder}
          <button
            type="button"
            onClick={() => {
              api.success({
                content: <span className="hook-content">happy</span>,
                duration: 0,
              });
            }}
          />
        </ConfigProvider>
      );
    };

    const wrapper = mount(<Demo />);

    wrapper.find('button').simulate('click');
    expect(document.querySelectorAll('.my-test-message-notice').length).toBe(1);
    expect(document.querySelectorAll('.anticon-check-circle').length).toBe(1);
    expect(document.querySelector('.hook-content').innerHTML).toEqual('happy');
    expect(document.querySelectorAll(`#${containerId}`).length).toBe(1);
    expect(wrapper.find(`#${containerId}`).children.length).toBe(1);
  });
});
