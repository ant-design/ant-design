import React from 'react';
import { mount } from 'enzyme';
import AutoComplete from '..';

describe('AutoComplete with Custom Input Element Render', () => {
  it('AutoComplete with custom Input render perfectly', () => {
    const wrapper = mount(
      <AutoComplete dataSource={['12345', '23456', '34567']}>
        <textarea />
      </AutoComplete>
    );

    expect(wrapper.find('textarea').length).toBe(1);
    wrapper.find('textarea').simulate('change', { target: { value: '123' } });
    const dropdownWrapper = mount(wrapper.find('Trigger').node.getComponent());

    expect(dropdownWrapper.find('MenuItem').length).toBe(1);
    expect(dropdownWrapper.find('MenuItem').props().value).toBe('12345');
  });
});
