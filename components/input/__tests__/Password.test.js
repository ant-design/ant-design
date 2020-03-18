import React from 'react';
import { mount } from 'enzyme';
// eslint-disable-next-line import/no-unresolved
import Input from '..';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { sleep } from '../../../tests/utils';

describe('Input.Password', () => {
  focusTest(Input.Password);
  mountTest(Input.Password);
  rtlTest(Input.Password);

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
    expect(wrapper.render()).toMatchSnapshot();
    wrapper
      .find('.ant-input-password-icon')
      .at(0)
      .simulate('click');
    expect(wrapper.render()).toMatchSnapshot();
    wrapper
      .find('.ant-input-password-icon')
      .at(0)
      .simulate('click');
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('visibilityToggle should work', () => {
    const wrapper = mount(<Input.Password visibilityToggle={false} />);
    expect(wrapper.find('.anticon-eye').length).toBe(0);
    wrapper.setProps({ visibilityToggle: true });
    expect(wrapper.find('.anticon-eye-invisible').length).toBe(1);
  });

  it('should not toggle visibility when disabled prop is true', () => {
    const wrapper = mount(<Input.Password disabled />);
    expect(wrapper.find('.anticon-eye-invisible').length).toBe(1);
    wrapper.find('.anticon-eye-invisible').simulate('click');
    expect(wrapper.find('.anticon-eye').length).toBe(0);
  });

  it('should keep focus state', () => {
    const wrapper = mount(<Input.Password defaultValue="111" autoFocus />, {
      attachTo: document.body,
    });
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
    wrapper.unmount();
  });

  // https://github.com/ant-design/ant-design/issues/20541
  it('should not show value attribute in input element', async () => {
    const wrapper = mount(<Input.Password />);
    wrapper
      .find('input')
      .at('0')
      .simulate('change', { target: { value: 'value' } });
    await sleep();
    expect(
      wrapper
        .find('input')
        .at('0')
        .getDOMNode()
        .getAttribute('value'),
    ).toBeFalsy();
  });

  // https://github.com/ant-design/ant-design/issues/20541
  it('could be unmount without errors', () => {
    expect(() => {
      const wrapper = mount(<Input.Password />);
      wrapper
        .find('input')
        .at('0')
        .simulate('change', { target: { value: 'value' } });
      wrapper.unmount();
    }).not.toThrow();
  });

  // https://github.com/ant-design/ant-design/pull/20544#issuecomment-569861679
  it('should not contain value attribute in input element with defautValue', async () => {
    const wrapper = mount(<Input.Password defaultValue="value" />);
    await sleep();
    expect(
      wrapper
        .find('input')
        .at('0')
        .getDOMNode()
        .getAttribute('value'),
    ).toBeFalsy();
  });
});
