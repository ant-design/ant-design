import React from 'react';
import { mount } from 'enzyme';
// eslint-disable-next-line import/no-unresolved
import Input from '..';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';

describe('Input.Password', () => {
  focusTest(Input.Password);
  mountTest(Input.Password);

  it('should get input element from ref', () => {
    const wrapper = mount(<Input.Password />);
    expect(wrapper.instance().input instanceof HTMLInputElement).toBe(true);
    expect(() => {
      wrapper.instance().select();
    }).not.toThrow();
  });

  it('should change type when click', () => {
    const wrapper = mount(<Input.Password />);
    wrapper.find('input').simulate('change', { target: { value: '111' } });
    expect(wrapper).toMatchSnapshot();
    wrapper
      .find('.ant-input-password-icon')
      .at(0)
      .simulate('click');
    expect(wrapper).toMatchSnapshot();
    wrapper
      .find('.ant-input-password-icon')
      .at(0)
      .simulate('click');
    expect(wrapper).toMatchSnapshot();
  });

  it('visibilityToggle should work', () => {
    const wrapper = mount(<Input.Password visibilityToggle={false} />);
    expect(wrapper.find('.anticon-eye').length).toBe(0);
    wrapper.setProps({ visibilityToggle: true });
    expect(wrapper.find('.anticon-eye-invisible').length).toBe(1);
  });

  it('should keep focus state', () => {
    const wrapper = mount(<Input.Password defaultValue="111" autoFocus />);
    expect(document.activeElement).toBe(
      wrapper
        .find('input')
        .at(0)
        .getDOMNode(),
    );
    wrapper
      .find('.ant-input-password-icon')
      .at(0)
      .simulate('mousedown');
    wrapper
      .find('.ant-input-password-icon')
      .at(0)
      .simulate('click');
    expect(document.activeElement).toBe(
      wrapper
        .find('input')
        .at(0)
        .getDOMNode(),
    );
  });
});
