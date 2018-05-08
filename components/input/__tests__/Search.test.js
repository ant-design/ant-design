import React from 'react';
import { mount } from 'enzyme';
import Search from '../Search';
import Button from '../../button';
import focusTest from '../../../tests/shared/focusTest';

describe('Input.Search', () => {
  focusTest(Search);

  it('should support custom button', () => {
    const wrapper = mount(
      <Search enterButton={<button>ok</button>} />
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should support custom Button', () => {
    const wrapper = mount(
      <Search enterButton={<Button>ok</Button>} />
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should disable enter button when disabled prop is true', () => {
    const wrapper = mount(
      <Search placeholder="input search text" enterButton disabled />
    );
    expect(wrapper.find('.ant-btn-primary[disabled]')).toHaveLength(1);
  });
});
