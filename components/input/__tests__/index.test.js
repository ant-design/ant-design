import React from 'react';
import { mount } from 'enzyme';
import Input from '..';

const { TextArea } = Input;

const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

describe('TextArea', () => {
  it('should auto calculate height according to content length', async () => {
    const wrapper = mount(
      <TextArea value="" readOnly autosize />
    );
    const mockFunc = jest.spyOn(wrapper.node, 'resizeTextarea');
    wrapper.setProps({ value: '1111\n2222\n3333' });
    await delay(0);
    expect(mockFunc).toHaveBeenCalledTimes(1);
    wrapper.setProps({ value: '1111' });
    await delay(0);
    expect(mockFunc).toHaveBeenCalledTimes(2);
  });
});
