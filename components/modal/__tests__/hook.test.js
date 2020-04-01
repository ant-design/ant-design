import React from 'react';
import { mount } from 'enzyme';
import Modal from '..';
import Button from '../../button';

jest.mock('rc-util/lib/Portal');

describe('Modal.hook', () => {
  it('hooks support context', () => {
    jest.useFakeTimers();
    const Context = React.createContext('light');
    let instance;

    const Demo = () => {
      const [modal, contextHolder] = Modal.useModal();
      return (
        <Context.Provider value="bamboo">
          <Button
            onClick={() => {
              instance = modal.confirm({
                content: (
                  <Context.Consumer>
                    {name => <div className="test-hook">{name}</div>}
                  </Context.Consumer>
                ),
              });
            }}
          />
          {contextHolder}
        </Context.Provider>
      );
    };

    const wrapper = mount(<Demo />);
    wrapper.find('button').simulate('click');

    expect(wrapper.find('.test-hook').text()).toEqual('bamboo');

    // Update instance
    instance.update({
      content: <div className="updated-content" />,
    });
    wrapper.update();
    expect(wrapper.find('.updated-content')).toHaveLength(1);

    // Destroy
    instance.destroy();
    jest.runAllTimers();
    wrapper.update();
    expect(wrapper.find('Modal')).toHaveLength(0);

    jest.useRealTimers();
  });
});
