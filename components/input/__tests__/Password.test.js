import React from 'react';
import { mount } from 'enzyme';
// eslint-disable-next-line import/no-unresolved
import Input from '..';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';
import { sleep } from '../../../tests/utils';
import Password from '../Password';

describe('Input.Password', () => {
  focusTest(Input.Password, { refFocus: true });
  mountTest(Input.Password);
  rtlTest(Input.Password);

  it('should get input element from ref', () => {
    const ref = React.createRef();
    const onSelect = jest.fn();

    const wrapper = mount(<Input.Password onSelect={onSelect} ref={ref} />);
    expect(ref.current.input instanceof HTMLInputElement).toBe(true);
    wrapper.find('input').simulate('select');
    expect(onSelect).toHaveBeenCalled();
  });

  it('should support size', () => {
    const wrapper = mount(<Password size="large" />);
    expect(wrapper.find('input').hasClass('ant-input-lg')).toBe(true);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should change type when click', () => {
    const wrapper = mount(<Input.Password />);
    wrapper.find('input').simulate('change', { target: { value: '111' } });
    expect(wrapper.render()).toMatchSnapshot();
    wrapper.find('.ant-input-password-icon').at(0).simulate('click');
    expect(wrapper.render()).toMatchSnapshot();
    wrapper.find('.ant-input-password-icon').at(0).simulate('click');
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
    expect(document.activeElement).toBe(wrapper.find('input').at(0).getDOMNode());
    document.activeElement.setSelectionRange(2, 2);
    expect(document.activeElement.selectionStart).toBe(2);
    wrapper.find('.ant-input-password-icon').at(0).simulate('mousedown');
    wrapper.find('.ant-input-password-icon').at(0).simulate('mouseup');
    wrapper.find('.ant-input-password-icon').at(0).simulate('click');
    expect(document.activeElement).toBe(wrapper.find('input').at(0).getDOMNode());
    expect(document.activeElement.selectionStart).toBe(2);
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
    expect(wrapper.find('input').at('0').getDOMNode().getAttribute('value')).toBeFalsy();
  });

  // https://github.com/ant-design/ant-design/issues/24526
  it('should not show value attribute in input element after blur it', async () => {
    const wrapper = mount(<Input.Password />);
    wrapper
      .find('input')
      .at('0')
      .simulate('change', { target: { value: 'value' } });
    await sleep();
    expect(wrapper.find('input').at('0').getDOMNode().getAttribute('value')).toBeFalsy();
    wrapper.find('input').at('0').simulate('blur');
    await sleep();
    expect(wrapper.find('input').at('0').getDOMNode().getAttribute('value')).toBeFalsy();
    wrapper.find('input').at('0').simulate('focus');
    await sleep();
    expect(wrapper.find('input').at('0').getDOMNode().getAttribute('value')).toBeFalsy();
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
  it('should not contain value attribute in input element with defaultValue', async () => {
    const wrapper = mount(<Input.Password defaultValue="value" />);
    await sleep();
    expect(wrapper.find('input').at('0').getDOMNode().getAttribute('value')).toBeFalsy();
  });
});
