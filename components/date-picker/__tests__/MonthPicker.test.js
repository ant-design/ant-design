import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import DatePicker from '..';
import focusTest from '../../../tests/shared/focusTest';
import { openPanel } from './utils';

const { MonthPicker } = DatePicker;

describe('MonthPicker', () => {
  focusTest(MonthPicker);

  it('reset select item when popup close', () => {
    const wrapper = mount(<MonthPicker value={moment('2018-07-01')} />);
    openPanel(wrapper);
    wrapper
      .find('.ant-calendar-month-panel-month')
      .first()
      .simulate('click');
    wrapper
      .find('.ant-calendar-month-panel-cell')
      .at(6)
      .hasClass('ant-calendar-month-panel-selected-cell');
  });
});
