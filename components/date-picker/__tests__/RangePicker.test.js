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
    expect(() => rangeCalendarWrapper.find('.ant-calendar-today').simulate('click').simulate('click'))
      .not.toThrow();
  });
});
