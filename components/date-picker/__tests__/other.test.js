import React from 'react';
import { mount, render } from 'enzyme';
import moment from 'moment';
import DatePicker from '../';

const { MonthPicker, WeekPicker } = DatePicker;

describe('MonthPicker and WeekPicker', () => {
  it('render MonthPicker', () => {
    const birthday = moment('2000-01-01', 'YYYY-MM-DD').locale('zh-cn');
    const wrapper = mount(
      <MonthPicker open />
    );
    wrapper.setProps({ value: birthday });
    expect(render(wrapper.find('Trigger').instance().getComponent())).toMatchSnapshot();
  });

  it('render WeekPicker', () => {
    const birthday = moment('2000-01-01', 'YYYY-MM-DD').locale('zh-cn');
    const wrapper = mount(
      <WeekPicker open />
    );
    wrapper.setProps({ value: birthday });
    expect(render(wrapper.find('Trigger').instance().getComponent())).toMatchSnapshot();
  });
});
