import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { mount } from 'enzyme';
import React from 'react';
import InputNumber from '..';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

describe('InputNumber', () => {
  focusTest(InputNumber, { refFocus: true });
  mountTest(InputNumber);
  rtlTest(InputNumber);

  // https://github.com/ant-design/ant-design/issues/13896
  it('should return null when blur a empty input number', () => {
    const onChange = jest.fn();
    const wrapper = mount(<InputNumber defaultValue="1" onChange={onChange} />);
    wrapper.find('input').simulate('change', { target: { value: '' } });
    expect(onChange).toHaveBeenLastCalledWith(null);
  });

  it('should call onStep when press up or down button', () => {
    const onStep = jest.fn();
    const wrapper = mount(<InputNumber defaultValue={1} onStep={onStep} />);
    wrapper.find('.ant-input-number-handler-up').simulate('mousedown');
    expect(onStep).toBeCalledTimes(1);
    expect(onStep).toHaveBeenLastCalledWith(2, { offset: 1, type: 'up' });
    wrapper.find('.ant-input-number-handler-down').simulate('mousedown');
    expect(onStep).toBeCalledTimes(2);
    expect(onStep).toHaveBeenLastCalledWith(1, { offset: 1, type: 'down' });
  });

  it('renders correctly when controls is boolean', () => {
    expect(mount(<InputNumber controls={false} />).render()).toMatchSnapshot();
  });

  it('renders correctly when controls is {}', () => {
    expect(mount(<InputNumber controls={{}} />).render()).toMatchSnapshot();
  });

  it('renders correctly when controls has custom upIcon and downIcon', () => {
    const wrapper = mount(
      <InputNumber
        controls={{
          upIcon: <ArrowUpOutlined />,
          downIcon: <ArrowDownOutlined />,
        }}
      />,
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('should support className', () => {
    const wrapper = mount(
      <InputNumber
        controls={{
          upIcon: <ArrowUpOutlined className="my-class-name" />,
          downIcon: <ArrowDownOutlined className="my-class-name" />,
        }}
      />,
    );
    expect(wrapper.find('.anticon-arrow-up').getDOMNode().className.includes('my-class-name')).toBe(
      true,
    );
    expect(
      wrapper.find('.anticon-arrow-down').getDOMNode().className.includes('my-class-name'),
    ).toBe(true);
  });
});
