import React from 'react';
import { mount } from 'enzyme';
import Select from '..';
import focusTest from '../../../tests/shared/focusTest';

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
});
