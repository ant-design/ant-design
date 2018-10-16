import React from 'react';
import { mount } from 'enzyme';
import AutoComplete from '..';
import focusTest from '../../../tests/shared/focusTest';

describe('AutoComplete with Custom Input Element Render', () => {
  focusTest(AutoComplete);

  it('AutoComplete with custom Input render perfectly', () => {
    const wrapper = mount(
      <AutoComplete dataSource={['12345', '23456', '34567']}>
        <textarea />
      </AutoComplete>
    );

    expect(wrapper.find('textarea').length).toBe(1);
    wrapper.find('textarea').simulate('change', { target: { value: '123' } });
    const dropdownWrapper = mount(wrapper.find('Trigger').instance().getComponent());

    // should not filter data source defaultly
    expect(dropdownWrapper.find('MenuItem').length).toBe(3);
  });

  it('child.ref should work', () => {
    const mockRef = jest.fn();
    mount(
      <AutoComplete dataSource={[]}>
        <input ref={mockRef} />
      </AutoComplete>
    );
    expect(mockRef).toHaveBeenCalled();
  });
});
