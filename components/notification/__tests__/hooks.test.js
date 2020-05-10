/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { mount } from 'enzyme';
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

    const Demo = () => {
      const [api, holder] = notification.useNotification();

      return (
        <ConfigProvider prefixCls="my-test">
          <Context.Provider value="bamboo">
            <button
              type="button"
              onClick={() => {
                api.open({
                  description: (
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
    expect(document.querySelectorAll('.my-test-notification-notice').length).toBe(1);
    expect(document.querySelector('.hook-test-result').innerHTML).toEqual('bamboo');
  });
});
