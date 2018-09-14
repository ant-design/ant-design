import React from 'react';
import { render, mount } from 'enzyme';
import Select from '..';
import focusTest from '../../../tests/shared/focusTest';
import Icon from '../../icon';

const { Option } = Select;

describe('Select', () => {
  focusTest(Select);

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should have default notFoundContent', () => {
    const wrapper = mount(
      <Select mode="multiple" />
    );
    wrapper.find('.ant-select').simulate('click');
    jest.runAllTimers();
    const dropdownWrapper = mount(wrapper.find('Trigger').instance().getComponent());
    expect(dropdownWrapper.find('MenuItem').length).toBe(1);
    expect(dropdownWrapper.find('MenuItem').at(0).text()).toBe('Not Found');
  });

  it('should support set notFoundContent to null', () => {
    const wrapper = mount(
      <Select mode="multiple" notFoundContent={null} />
    );
    wrapper.find('.ant-select').simulate('click');
    jest.runAllTimers();
    const dropdownWrapper = mount(wrapper.find('Trigger').instance().getComponent());
    expect(dropdownWrapper.find('MenuItem').length).toBe(0);
  });

  it('should not have default notFoundContent when mode is combobox', () => {
    const wrapper = mount(
      <Select mode={Select.SECRET_COMBOBOX_MODE_DO_NOT_USE} />
    );
    wrapper.find('.ant-select').simulate('click');
    jest.runAllTimers();
    const dropdownWrapper = mount(wrapper.find('Trigger').instance().getComponent());
    expect(dropdownWrapper.find('MenuItem').length).toBe(0);
  });

  it('should not have notFoundContent when mode is combobox and notFoundContent is set', () => {
    const wrapper = mount(
      <Select mode={Select.SECRET_COMBOBOX_MODE_DO_NOT_USE} notFoundContent="not at all" />
    );
    wrapper.find('.ant-select').simulate('click');
    jest.runAllTimers();
    const dropdownWrapper = mount(wrapper.find('Trigger').instance().getComponent());
    expect(dropdownWrapper.find('MenuItem').length).toBe(1);
    expect(dropdownWrapper.find('MenuItem').at(0).text()).toBe('not at all');
  });

  it('should be controlled by open prop', () => {
    const onDropdownVisibleChange = jest.fn();
    const wrapper = mount(
      <Select open onDropdownVisibleChange={onDropdownVisibleChange}>
        <Option value="1">1</Option>
      </Select>
    );
    let dropdownWrapper = mount(wrapper.find('Trigger').instance().getComponent());
    expect(dropdownWrapper.props().visible).toBe(true);
    wrapper.find('.ant-select').simulate('click');
    expect(onDropdownVisibleChange).toHaveBeenLastCalledWith(false);
    expect(dropdownWrapper.props().visible).toBe(true);

    wrapper.setProps({ open: false });
    dropdownWrapper = mount(wrapper.find('Trigger').instance().getComponent());
    expect(dropdownWrapper.props().visible).toBe(false);
    wrapper.find('.ant-select').simulate('click');
    expect(onDropdownVisibleChange).toHaveBeenLastCalledWith(true);
    expect(dropdownWrapper.props().visible).toBe(false);
  });

  it('support suffix icon and suffix string', () => {
    const wrapperIcon = mount(
      <Select suffix={<Icon type="smile" />} defaultValue="lucy" style={{ width: 120 }}>
        <Option value="lucy">Lucy</Option>
      </Select>
    );
    const wrapperString = mount(
      <Select suffix="text" defaultValue="lucy" style={{ width: 120 }}>
        <Option value="lucy">Lucy</Option>
      </Select>
    );
    expect(render(wrapperIcon.find('Trigger').instance().getComponent())).toMatchSnapshot();
    expect(render(wrapperString.find('Trigger').instance().getComponent())).toMatchSnapshot();
  });
});
