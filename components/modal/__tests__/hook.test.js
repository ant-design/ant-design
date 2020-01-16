import React from 'react';
import { mount } from 'enzyme';
import Modal from '..';
import Button from '../../button';

jest.mock('rc-util/lib/Portal');

describe('Modal.hook', () => {
  it('hooks support context', () => {
    const Context = React.createContext('light');

    const Demo = () => {
      const [modal, contextHolder] = Modal.useModal();
      return (
        <Context.Provider value="bamboo">
          <Button
            onClick={() => {
              modal.confirm({
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
  });
});
