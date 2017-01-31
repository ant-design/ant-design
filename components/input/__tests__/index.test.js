import React from 'react';
import { mount } from 'enzyme';
import Input from '..';

jest.mock('../calculateNodeHeight');
const calculateNodeHeight = require('../calculateNodeHeight');

const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

describe('Input', () => {
  it('should not auto calculate height when type is text', async () => {
    const wrapper = mount(
      <Input value="" readOnly />
    );
    expect(calculateNodeHeight).toHaveBeenCalledTimes(0);
    wrapper.setProps({ value: '1111\n2222\n3333' });
    await delay(0);
    expect(calculateNodeHeight).toHaveBeenCalledTimes(0);
    wrapper.setProps({ value: '1111' });
    await delay(0);
    expect(calculateNodeHeight).toHaveBeenCalledTimes(0);
  });

  it('should auto calculate height according to content length', async () => {
    const wrapper = mount(
      <Input value="" readOnly type="textarea" autosize />
    );
    expect(calculateNodeHeight).toHaveBeenCalledTimes(1);
    wrapper.setProps({ value: '1111\n2222\n3333' });
    await delay(0);
    expect(calculateNodeHeight).toHaveBeenCalledTimes(2);
    wrapper.setProps({ value: '1111' });
    await delay(0);
    expect(calculateNodeHeight).toHaveBeenCalledTimes(3);
  });
});
