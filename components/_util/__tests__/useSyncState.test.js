import { mount } from 'enzyme';
import React from 'react';
import useSyncState from '../hooks/useSyncState';

describe('Table', () => {
  it('useSyncState', () => {
    const Test = () => {
      const [getVal, setVal] = useSyncState('light');

      return (
        <span
          onClick={() => {
            setVal('bamboo');
          }}
        >
          {getVal()}
        </span>
      );
    };

    const wrapper = mount(<Test />);
    expect(wrapper.text()).toEqual('light');
    wrapper.find('span').simulate('click');
    expect(wrapper.text()).toEqual('bamboo');
  });
});
