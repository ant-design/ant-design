import React from 'react';
import { mount } from 'enzyme';
import Tag from '..';

const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

describe('Tag', () => {
  it('should be closable', async () => {
    const onClose = jest.fn();
    const wrapper = mount(
      <Tag closable onClose={onClose} />
    );
    expect(wrapper.find('.anticon-cross').length).toBe(1);
    expect(wrapper.find('.ant-tag').length).toBe(1);
    wrapper.find('.anticon-cross').simulate('click');
    expect(onClose).toBeCalled();
    await delay(500);
    expect(wrapper.find('.ant-tag').length).toBe(0);
  });

  it('should not be closed when prevent default', async () => {
    const onClose = (e) => {
      e.preventDefault();
    };
    const wrapper = mount(
      <Tag closable onClose={onClose} />
    );
    expect(wrapper.find('.anticon-cross').length).toBe(1);
    expect(wrapper.find('.ant-tag').length).toBe(1);
    wrapper.find('.anticon-cross').simulate('click');
    await delay(500);
    expect(wrapper.find('.ant-tag').length).toBe(1);
  });
});
