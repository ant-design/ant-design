import React from 'react';
import { mount, render } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import moment from 'moment';
import { RangePicker } from '../';

describe('RangePicker', () => {
  it('show month panel according to value', () => {
    const birthday = moment('2000-01-01', 'YYYY-MM-DD');
    const wrapper = mount(
      <RangePicker
        getCalendarContainer={trigger => trigger}
        format="YYYY/MM/DD"
        showTime open
      />
    );

    wrapper.setProps({ value: [birthday, birthday] });
    expect(renderToJson(render(wrapper.find('Trigger').node.getComponent())))
      .toMatchSnapshot();
  });

  it('switch to corresponding month panel when click presetted ranges', () => {
    const birthday = moment('2000-01-01', 'YYYY-MM-DD');
    const wrapper = mount(
      <RangePicker
        ranges={{
          'My Birthday': [birthday, birthday],
        }}
        getCalendarContainer={trigger => trigger}
        format="YYYY/MM/DD"
        showTime open
      />
    );

    const rangeCalendarWrapper = mount(wrapper.find('Trigger').node.getComponent());
    rangeCalendarWrapper.find('.ant-calendar-range-quick-selector a')
      .simulate('click');
    expect(renderToJson(render(wrapper.find('Trigger').node.getComponent())))
      .toMatchSnapshot();
  });
});
