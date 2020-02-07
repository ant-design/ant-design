/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { mount } from 'enzyme';
import notification from '..';

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
      );
    };

    const wrapper = mount(<Demo />);
    wrapper.find('button').simulate('click');
    expect(document.querySelectorAll('.ant-notification-notice').length).toBe(1);
    expect(document.querySelector('.hook-test-result').innerHTML).toEqual('bamboo');
  });
});
