import React from 'react';
import Moment from 'moment';
import { mount } from 'enzyme';
import Calendar from '..';

describe('Calendar', () => {
  it('Calendar should be selectable', () => {
    const onSelect = jest.fn();
    const wrapper = mount(
      <Calendar onSelect={onSelect} />
    );
    wrapper.find('.ant-fullcalendar-cell').at(0).simulate('click');
    expect(onSelect).toBeCalledWith(expect.anything());
    const value = onSelect.mock.calls[0][0];
    expect(Moment.isMoment(value)).toBe(true);
  });

  it('only Valid range should be selectable', () => {
    const onSelect = jest.fn();
    const validRange = [Moment('2018-02-02'), Moment('2018-02-18')];
    const wrapper = mount(
      <Calendar onSelect={onSelect} validRange={validRange} defaultValue={Moment('2018-02-02')} />
    );
    wrapper.find('[title="February 1, 2018"]').at(0).simulate('click');
    wrapper.find('[title="February 2, 2018"]').at(0).simulate('click');
    expect(onSelect.mock.calls.length).toBe(1);
  });

  it('dates other than in valid range should be disabled', () => {
    const onSelect = jest.fn();
    const validRange = [Moment('2018-02-02'), Moment('2018-02-18')];
    const wrapper = mount(
      <Calendar onSelect={onSelect} validRange={validRange} defaultValue={Moment('2018-02-02')} />
    );
    wrapper.find('[title="February 20, 2018"]').at(0).simulate('click');
    const elem = wrapper.find('[title="February 20, 2018"]').hasClass('ant-fullcalendar-disabled-cell');
    expect(elem).toEqual(true);
    expect(onSelect.mock.calls.length).toBe(0);
  });

  it('months other than in valid range should be disabled', () => {
    const onSelect = jest.fn();
    const validRange = [Moment('2018-02-02'), Moment('2018-05-18')];
    const wrapper = mount(
      <Calendar onSelect={onSelect} validRange={validRange} defaultValue={Moment('2018-02-02')} mode="year" />
    );
    expect(wrapper.find('[title="Jan"]').at(0).hasClass('ant-fullcalendar-month-panel-cell-disabled')).toBe(true);
    expect(wrapper.find('[title="Feb"]').at(0).hasClass('ant-fullcalendar-month-panel-cell-disabled')).toBe(false);
    expect(wrapper.find('[title="Jun"]').at(0).hasClass('ant-fullcalendar-month-panel-cell-disabled')).toBe(true);
    wrapper.find('[title="Jan"]').at(0).simulate('click');
    wrapper.find('[title="Mar"]').at(0).simulate('click');
    expect(onSelect.mock.calls.length).toBe(1);
  });

  it('months other than in valid range should not be shown in header', () => {
    const validRange = [Moment('2017-02-02'), Moment('2018-05-18')];
    const wrapper = mount(
      <Calendar validRange={validRange} />
    );
    wrapper.find('.ant-fullcalendar-year-select').hostNodes().simulate('click');
    wrapper.find('.ant-select-dropdown-menu-item').first().simulate('click');
    wrapper.find('.ant-fullcalendar-month-select').hostNodes().simulate('click');
    // 2 years and 11 months
    expect(wrapper.find('.ant-select-dropdown-menu-item').length).toBe(13);
  });

  it('getDateRange should returns a disabledDate function', () => {
    const validRange = [Moment('2018-02-02'), Moment('2018-05-18')];
    const wrapper = mount(
      <Calendar validRange={validRange} defaultValue={Moment('2018-02-02')} />
    );
    const instance = wrapper.instance();
    const disabledDate = instance.getDateRange(validRange);
    expect(disabledDate(Moment('2018-06-02'))).toBe(true);
    expect(disabledDate(Moment('2018-04-02'))).toBe(false);
  });

  it('Calendar should change mode by prop', () => {
    const monthMode = 'month';
    const yearMode = 'year';
    const wrapper = mount(
      <Calendar />
    );
    expect(wrapper.state().mode).toEqual(monthMode);
    wrapper.setProps({ mode: 'year' });
    expect(wrapper.state().mode).toEqual(yearMode);
  });

  it('Calendar should switch mode', () => {
    const monthMode = 'month';
    const yearMode = 'year';
    const onPanelChangeStub = jest.fn();
    const wrapper = mount(
      <Calendar mode={yearMode} onPanelChange={onPanelChangeStub} />
    );
    expect(wrapper.state().mode).toEqual(yearMode);
    wrapper.instance().setType('date');
    expect(wrapper.state().mode).toEqual(monthMode);
    expect(onPanelChangeStub).toHaveBeenCalledTimes(1);
  });
});
