import React from 'react';
import Moment from 'moment';
import { mount } from 'enzyme';
import MockDate from 'mockdate';
import Calendar from '..';
import Header from '../Header';

describe('Calendar', () => {
  it('Calendar should be selectable', () => {
    const onSelect = jest.fn();
    const wrapper = mount(<Calendar onSelect={onSelect} />);
    wrapper
      .find('.ant-fullcalendar-cell')
      .at(0)
      .simulate('click');
    expect(onSelect).toHaveBeenCalledWith(expect.anything());
    const value = onSelect.mock.calls[0][0];
    expect(Moment.isMoment(value)).toBe(true);
  });

  it('only Valid range should be selectable', () => {
    const onSelect = jest.fn();
    const validRange = [Moment('2018-02-02'), Moment('2018-02-18')];
    const wrapper = mount(
      <Calendar onSelect={onSelect} validRange={validRange} defaultValue={Moment('2018-02-02')} />,
    );
    wrapper
      .find('[title="February 1, 2018"]')
      .at(0)
      .simulate('click');
    wrapper
      .find('[title="February 2, 2018"]')
      .at(0)
      .simulate('click');
    expect(onSelect.mock.calls.length).toBe(1);
  });

  it('dates other than in valid range should be disabled', () => {
    const onSelect = jest.fn();
    const validRange = [Moment('2018-02-02'), Moment('2018-02-18')];
    const wrapper = mount(
      <Calendar onSelect={onSelect} validRange={validRange} defaultValue={Moment('2018-02-02')} />,
    );
    wrapper
      .find('[title="February 20, 2018"]')
      .at(0)
      .simulate('click');
    const elem = wrapper
      .find('[title="February 20, 2018"]')
      .hasClass('ant-fullcalendar-disabled-cell');
    expect(elem).toEqual(true);
    expect(onSelect.mock.calls.length).toBe(0);
  });

  it('months other than in valid range should be disabled', () => {
    const onSelect = jest.fn();
    const validRange = [Moment('2018-02-02'), Moment('2018-05-18')];
    const wrapper = mount(
      <Calendar
        onSelect={onSelect}
        validRange={validRange}
        defaultValue={Moment('2018-02-02')}
        mode="year"
      />,
    );
    expect(
      wrapper
        .find('[title="Jan"]')
        .at(0)
        .hasClass('ant-fullcalendar-month-panel-cell-disabled'),
    ).toBe(true);
    expect(
      wrapper
        .find('[title="Feb"]')
        .at(0)
        .hasClass('ant-fullcalendar-month-panel-cell-disabled'),
    ).toBe(false);
    expect(
      wrapper
        .find('[title="Jun"]')
        .at(0)
        .hasClass('ant-fullcalendar-month-panel-cell-disabled'),
    ).toBe(true);
    wrapper
      .find('[title="Jan"]')
      .at(0)
      .simulate('click');
    wrapper
      .find('[title="Mar"]')
      .at(0)
      .simulate('click');
    expect(onSelect.mock.calls.length).toBe(1);
  });

  it('months other than in valid range should not be shown in header', () => {
    const validRange = [Moment('2017-02-02'), Moment('2018-05-18')];
    const wrapper = mount(<Calendar validRange={validRange} />);
    wrapper
      .find('.ant-fullcalendar-year-select')
      .hostNodes()
      .simulate('click');
    wrapper
      .find('.ant-select-dropdown-menu-item')
      .first()
      .simulate('click');
    wrapper
      .find('.ant-fullcalendar-month-select')
      .hostNodes()
      .simulate('click');
    // 2 years and 11 months
    expect(wrapper.find('.ant-select-dropdown-menu-item').length).toBe(13);
  });

  it('getDateRange should returns a disabledDate function', () => {
    const validRange = [Moment('2018-02-02'), Moment('2018-05-18')];
    const wrapper = mount(<Calendar validRange={validRange} defaultValue={Moment('2018-02-02')} />);
    const instance = wrapper.instance();
    const disabledDate = instance.getDateRange(validRange);
    expect(disabledDate(Moment('2018-06-02'))).toBe(true);
    expect(disabledDate(Moment('2018-04-02'))).toBe(false);
  });

  it('Calendar should change mode by prop', () => {
    const monthMode = 'month';
    const yearMode = 'year';
    const wrapper = mount(<Calendar />);
    expect(wrapper.state().mode).toEqual(monthMode);
    wrapper.setProps({ mode: 'year' });
    expect(wrapper.state().mode).toEqual(yearMode);
  });

  it('Calendar should switch mode', () => {
    const monthMode = 'month';
    const yearMode = 'year';
    const onPanelChangeStub = jest.fn();
    const wrapper = mount(<Calendar mode={yearMode} onPanelChange={onPanelChangeStub} />);
    expect(wrapper.state().mode).toEqual(yearMode);
    wrapper.setProps({ mode: monthMode });
    expect(wrapper.state().mode).toEqual(monthMode);
    expect(onPanelChangeStub).toHaveBeenCalledTimes(0);
  });

  it('Calendar should support locale', () => {
    MockDate.set(Moment('2018-10-19'));
    // eslint-disable-next-line
    const zhCN = require('../locale/zh_CN').default;
    const wrapper = mount(<Calendar locale={zhCN} />);
    expect(wrapper.render()).toMatchSnapshot();
    MockDate.reset();
  });

  it('should trigger onPanelChange when click last month of date', () => {
    const onPanelChange = jest.fn();
    const date = new Moment('1990-09-03');
    const wrapper = mount(<Calendar onPanelChange={onPanelChange} value={date} />);

    wrapper
      .find('.ant-fullcalendar-cell')
      .at(0)
      .simulate('click');

    expect(onPanelChange).toHaveBeenCalled();
    expect(onPanelChange.mock.calls[0][0].month()).toEqual(date.month() - 1);
  });

  it('switch should work correctly without prop mode', async () => {
    const onPanelChange = jest.fn();
    const date = new Moment(new Date(Date.UTC(2017, 7, 9, 8)));
    const wrapper = mount(<Calendar onPanelChange={onPanelChange} value={date} />);
    expect(wrapper.state().mode).toBe('month');
    expect(wrapper.find('.ant-fullcalendar-table').length).toBe(1);
    expect(wrapper.find('.ant-fullcalendar-month-panel-table').length).toBe(0);
    wrapper.find('.ant-radio-button-input[value="year"]').simulate('change');
    expect(wrapper.find('.ant-fullcalendar-table').length).toBe(0);
    expect(wrapper.find('.ant-fullcalendar-month-panel-table').length).toBe(1);
    expect(onPanelChange).toHaveBeenCalled();
    expect(onPanelChange.mock.calls[0][1]).toEqual('year');
  });

  const createWrapper = (start, end, value, onValueChange) => {
    const wrapper = mount(
      <Header
        onValueChange={onValueChange}
        value={value}
        validRange={[start, end]}
        locale={{ year: '年' }}
      />,
    );
    wrapper
      .find('.ant-fullcalendar-year-select')
      .hostNodes()
      .simulate('click');
    wrapper
      .find('.ant-select-dropdown-menu-item')
      .at(0)
      .simulate('click');
  };

  it('if value.month > end.month, set value.month to end.month', () => {
    const value = new Moment('1990-01-03');
    const start = new Moment('2019-04-01');
    const end = new Moment('2019-11-01');
    const onValueChange = jest.fn();
    createWrapper(start, end, value, onValueChange);
    expect(onValueChange).toHaveBeenCalledWith(value.year('2019').month('3'));
  });

  it('if start.month > value.month, set value.month to start.month ', () => {
    const value = new Moment('1990-01-03');
    const start = new Moment('2019-11-01');
    const end = new Moment('2019-03-01');
    const onValueChange = jest.fn();
    createWrapper(start, end, value, onValueChange);
    expect(onValueChange).toHaveBeenCalledWith(value.year('2019').month('10'));
  });

  it('onMonthChange should work correctly', () => {
    const start = new Moment('2018-11-01');
    const end = new Moment('2019-03-01');
    const value = new Moment('2018-12-03');
    const onValueChange = jest.fn();
    const wrapper = mount(
      <Header
        onValueChange={onValueChange}
        value={value}
        validRange={[start, end]}
        locale={{ year: '年' }}
        type="month"
      />,
    );
    wrapper
      .find('.ant-fullcalendar-month-select')
      .hostNodes()
      .simulate('click');
    wrapper
      .find('.ant-select-dropdown-menu-item')
      .at(0)
      .simulate('click');
    expect(onValueChange).toHaveBeenCalledWith(value.month(10));
  });

  it('onTypeChange should work correctly', () => {
    const onTypeChange = jest.fn();
    const value = new Moment('2018-12-03');
    const wrapper = mount(
      <Header
        onTypeChange={onTypeChange}
        locale={{ year: '年', month: '月' }}
        value={value}
        type="date"
      />,
    );
    wrapper
      .find('input')
      .at(1)
      .simulate('change');
    expect(onTypeChange).toHaveBeenCalledWith('year');
  });
});
