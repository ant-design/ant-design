/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { mount } from 'enzyme';
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
    jest.runAllTimers();
    expect(document.querySelectorAll('.my-test-message-notice').length).toBe(1);
    hide();
    jest.runAllTimers();
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
});
