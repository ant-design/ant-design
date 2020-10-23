import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import Select from '..';
import Icon from '../../icon';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

const { Option } = Select;

describe('Select', () => {
  focusTest(Select, { refFocus: true });
  mountTest(Select);
  rtlTest(Select);

  function toggleOpen(wrapper) {
    act(() => {
      wrapper.find('.ant-select-selector').simulate('mousedown');
      jest.runAllTimers();
      wrapper.update();
    });
  }

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should have default notFoundContent', () => {
    const wrapper = mount(<Select mode="multiple" />);
    toggleOpen(wrapper);
    expect(wrapper.find('.ant-select-item-option').length).toBeFalsy();
    expect(wrapper.find('.ant-empty').length).toBeTruthy();
  });

  it('should support set notFoundContent to null', () => {
    const wrapper = mount(<Select mode="multiple" notFoundContent={null} />);
    toggleOpen(wrapper);
    const dropdownWrapper = mount(wrapper.find('Trigger').instance().getComponent());
    expect(dropdownWrapper.find('MenuItem').length).toBe(0);
  });

  it('should not have default notFoundContent when mode is combobox', () => {
    const wrapper = mount(<Select mode={Select.SECRET_COMBOBOX_MODE_DO_NOT_USE} />);
    toggleOpen(wrapper);
    const dropdownWrapper = mount(wrapper.find('Trigger').instance().getComponent());
    expect(dropdownWrapper.find('MenuItem').length).toBe(0);
  });

  it('should not have notFoundContent when mode is combobox and notFoundContent is set', () => {
    const wrapper = mount(
      <Select mode={Select.SECRET_COMBOBOX_MODE_DO_NOT_USE} notFoundContent="not at all" />,
    );
    toggleOpen(wrapper);
    const dropdownWrapper = mount(wrapper.find('Trigger').instance().getComponent());
    expect(dropdownWrapper.find('.ant-select-item-option').length).toBeFalsy();
    expect(dropdownWrapper.find('.ant-select-item-empty').at(0).text()).toBe('not at all');
  });

  it('should be controlled by open prop', () => {
    const onDropdownVisibleChange = jest.fn();
    const wrapper = mount(
      <Select open onDropdownVisibleChange={onDropdownVisibleChange}>
        <Option value="1">1</Option>
      </Select>,
    );
    let dropdownWrapper = mount(wrapper.find('Trigger').instance().getComponent());
    expect(dropdownWrapper.props().visible).toBe(true);
    toggleOpen(wrapper);
    expect(onDropdownVisibleChange).toHaveBeenLastCalledWith(false);
    expect(dropdownWrapper.props().visible).toBe(true);

    wrapper.setProps({ open: false });
    dropdownWrapper = mount(wrapper.find('Trigger').instance().getComponent());
    expect(dropdownWrapper.props().visible).toBe(false);
    toggleOpen(wrapper);
    expect(onDropdownVisibleChange).toHaveBeenLastCalledWith(true);
    expect(dropdownWrapper.props().visible).toBe(false);
  });

  it('should show search icon when showSearch and open', () => {
    const wrapper = mount(
      <Select showSearch>
        <Option value="1">1</Option>
      </Select>,
    );
    expect(wrapper.find('.anticon-down').length).toBe(1);
    expect(wrapper.find('.anticon-search').length).toBe(0);
    wrapper.setProps({ open: true });
    expect(wrapper.find('.anticon-down').length).toBe(0);
    expect(wrapper.find('.anticon-search').length).toBe(1);
  });

  describe('Select Custom Icons', () => {
    it('should support customized icons', () => {
      const wrapper = mount(
        <Select
          removeIcon={<Icon type="close" />}
          clearIcon={<Icon type="close" />}
          menuItemSelectedIcon={<Icon type="close" />}
        >
          <Option value="1">1</Option>
        </Select>,
      );
      wrapper.setProps({ count: 10 });
      jest.runAllTimers();
      expect(wrapper.render()).toMatchSnapshot();
    });
  });

  describe('Deprecated', () => {
    it('should ignore mode="combobox"', () => {
      const wrapper = mount(
        <Select mode="combobox">
          <Option value="1">1</Option>
        </Select>,
      );
      expect(wrapper.render()).toMatchSnapshot();
    });
  });
});
