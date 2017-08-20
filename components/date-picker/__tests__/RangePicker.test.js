import React from 'react';
import { mount, render } from 'enzyme';
import moment from 'moment';
import { RangePicker } from '../';

describe('RangePicker', () => {
  it('show month panel according to value', () => {
    const birthday = moment('2000-01-01', 'YYYY-MM-DD').locale('zh-cn');
    const wrapper = mount(
      <RangePicker
        getCalendarContainer={trigger => trigger}
        format="YYYY/MM/DD"
        showTime
        open
      />
    );

    wrapper.setProps({ value: [birthday, birthday] });
    expect(render(wrapper.find('Trigger').node.getComponent()))
      .toMatchSnapshot();
  });

  it('switch to corresponding month panel when click presetted ranges', () => {
    const birthday = moment('2000-01-01', 'YYYY-MM-DD').locale('zh-cn');
    const wrapper = mount(
      <RangePicker
        ranges={{
          'My Birthday': [birthday, birthday],
        }}
        getCalendarContainer={trigger => trigger}
        format="YYYY/MM/DD"
        showTime
        open
      />
    );

    const rangeCalendarWrapper = mount(wrapper.find('Trigger').node.getComponent());
    rangeCalendarWrapper.find('.ant-calendar-range-quick-selector a')
      .simulate('click');
    expect(render(wrapper.find('Trigger').node.getComponent()))
      .toMatchSnapshot();
  });

  it('highlight range when hover presetted range', () => {
    const wrapper = mount(
      <RangePicker
        ranges={{
          'This Month': [moment().startOf('month'), moment().endOf('month')],
        }}
        getCalendarContainer={trigger => trigger}
        format="YYYY/MM/DD"
        open
      />
    );

    let rangeCalendarWrapper = mount(wrapper.find('Trigger').node.getComponent());
    rangeCalendarWrapper.find('.ant-calendar-range-quick-selector a')
      .simulate('mouseEnter');
    rangeCalendarWrapper = mount(wrapper.find('Trigger').node.getComponent());
    expect(rangeCalendarWrapper.find('.ant-calendar-selected-day').length).toBe(2);
  });

  // issue: https://github.com/ant-design/ant-design/issues/5872
  it('should not throw error when value is reset to `[]`', () => {
    const birthday = moment('2000-01-01', 'YYYY-MM-DD');
    const wrapper = mount(
      <RangePicker
        getCalendarContainer={trigger => trigger}
        value={[birthday, birthday]}
        open
      />
    );
    wrapper.setProps({ value: [] });
    const rangeCalendarWrapper = mount(wrapper.find('Trigger').node.getComponent());
    expect(() => rangeCalendarWrapper.find('.ant-calendar-cell').at(15).simulate('click').simulate('click'))
      .not.toThrow();
  });

  // issue: https://github.com/ant-design/ant-design/issues/7077
  it('should not throw error when select after clear', () => {
    const wrapper = mount(
      <RangePicker
        getCalendarContainer={trigger => trigger}
        open
      />
    );
    let rangeCalendarWrapper = mount(wrapper.find('Trigger').node.getComponent());
    rangeCalendarWrapper.find('.ant-calendar-cell').at(15).simulate('click').simulate('click');
    wrapper.find('.ant-calendar-picker-clear').simulate('click');
    wrapper.find('.ant-calendar-picker-input').simulate('click');
    rangeCalendarWrapper = mount(wrapper.find('Trigger').node.getComponent());
    expect(() => rangeCalendarWrapper.find('.ant-calendar-cell').at(15).simulate('click').simulate('click'))
      .not.toThrow();
  });
});
