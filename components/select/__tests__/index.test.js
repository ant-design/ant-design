import React from 'react';
import { mount } from 'enzyme';
import Select from '..';
import Icon from '../../icon';
import focusTest from '../../../tests/shared/focusTest';
import mountTest from '../../../tests/shared/mountTest';
import { resetWarned } from '../../_util/warning';

const { Option } = Select;

describe('Select', () => {
  focusTest(Select);
  mountTest(Select);

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should have default notFoundContent', () => {
    const wrapper = mount(<Select mode="multiple" />);
    wrapper.find('.ant-select').simulate('click');
    jest.runAllTimers();
    const dropdownWrapper = mount(
      wrapper
        .find('Trigger')
        .instance()
        .getComponent(),
    );
    expect(dropdownWrapper.find('MenuItem').length).toBe(1);
    expect(
      dropdownWrapper
        .find('MenuItem')
        .at(0)
        .text(),
    ).toBe('No Data');
  });

  it('should support set notFoundContent to null', () => {
    const wrapper = mount(<Select mode="multiple" notFoundContent={null} />);
    wrapper.find('.ant-select').simulate('click');
    jest.runAllTimers();
    const dropdownWrapper = mount(
      wrapper
        .find('Trigger')
        .instance()
        .getComponent(),
    );
    expect(dropdownWrapper.find('MenuItem').length).toBe(0);
  });

  it('should not have default notFoundContent when mode is combobox', () => {
    const wrapper = mount(<Select mode={Select.SECRET_COMBOBOX_MODE_DO_NOT_USE} />);
    wrapper.find('.ant-select').simulate('click');
    jest.runAllTimers();
    const dropdownWrapper = mount(
      wrapper
        .find('Trigger')
        .instance()
        .getComponent(),
    );
    expect(dropdownWrapper.find('MenuItem').length).toBe(0);
  });

  it('should not have notFoundContent when mode is combobox and notFoundContent is set', () => {
    const wrapper = mount(
      <Select mode={Select.SECRET_COMBOBOX_MODE_DO_NOT_USE} notFoundContent="not at all" />,
    );
    wrapper.find('.ant-select').simulate('click');
    jest.runAllTimers();
    const dropdownWrapper = mount(
      wrapper
        .find('Trigger')
        .instance()
        .getComponent(),
    );
    expect(dropdownWrapper.find('MenuItem').length).toBe(1);
    expect(
      dropdownWrapper
        .find('MenuItem')
        .at(0)
        .text(),
    ).toBe('not at all');
  });

  it('should be controlled by open prop', () => {
    const onDropdownVisibleChange = jest.fn();
    const wrapper = mount(
      <Select open onDropdownVisibleChange={onDropdownVisibleChange}>
        <Option value="1">1</Option>
      </Select>,
    );
    let dropdownWrapper = mount(
      wrapper
        .find('Trigger')
        .instance()
        .getComponent(),
    );
    expect(dropdownWrapper.props().visible).toBe(true);
    wrapper.find('.ant-select').simulate('click');
    expect(onDropdownVisibleChange).toHaveBeenLastCalledWith(false);
    expect(dropdownWrapper.props().visible).toBe(true);

    wrapper.setProps({ open: false });
    dropdownWrapper = mount(
      wrapper
        .find('Trigger')
        .instance()
        .getComponent(),
    );
    expect(dropdownWrapper.props().visible).toBe(false);
    wrapper.find('.ant-select').simulate('click');
    expect(onDropdownVisibleChange).toHaveBeenLastCalledWith(true);
    expect(dropdownWrapper.props().visible).toBe(false);
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

  it('warning if user use `inputValue`', () => {
    resetWarned();
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    mount(<Select inputValue="" />);
    expect(errorSpy).toHaveBeenLastCalledWith(
      'Warning: [antd: Select] `inputValue` is deprecated. Please use `searchValue` instead.',
    );

    errorSpy.mockRestore();
  });
});
