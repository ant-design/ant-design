import { mount } from 'enzyme';
import MockDate from 'mockdate';
import moment from 'moment';
import React from 'react';
import DatePicker from '..';
import focusTest from '../../../tests/shared/focusTest';

describe('DatePicker', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  focusTest(DatePicker, { refFocus: true });

  beforeEach(() => {
    MockDate.set(moment('2016-11-22').valueOf());
  });

  afterEach(() => {
    MockDate.reset();
    errorSpy.mockReset();
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });

  it('prop locale should works', () => {
    const locale = {
      lang: {
        locale: 'mk',
        placeholder: 'Избери дата',
        rangePlaceholder: ['Начална дата', 'Крайна дата'],
        today: 'Днес',
        now: 'Сега',
        backToToday: 'Към днес',
        ok: 'Добре',
        clear: 'Изчистване',
        month: 'Месец',
        year: 'Година',
        timeSelect: 'Избор на час',
        dateSelect: 'Избор на дата',
        monthSelect: 'Избор на месец',
        yearSelect: 'Избор на година',
        decadeSelect: 'Десетилетие',
        previousMonth: 'Предишен месец (PageUp)',
        nextMonth: 'Следващ месец (PageDown)',
        previousYear: 'Последна година (Control + left)',
        nextYear: 'Следваща година (Control + right)',
        previousDecade: 'Предишно десетилетие',
        nextDecade: 'Следващо десетилетие',
        previousCentury: 'Последен век',
        nextCentury: 'Следващ век',
        yearFormat: 'YYYY',
        dateFormat: 'D M YYYY',
        dayFormat: 'D',
        dateTimeFormat: 'D M YYYY HH:mm:ss',
        monthBeforeYear: true,
      },
      timePickerLocale: {
        placeholder: 'Избор на час',
      },
    };
    const birthday = moment('2000-01-01', 'YYYY-MM-DD');
    const wrapper = mount(<DatePicker open locale={locale} value={birthday} />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('disabled date', () => {
    const disabledDate = current => current && current < moment().endOf('day');
    const wrapper = mount(<DatePicker disabledDate={disabledDate} open />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  it('placeholder', () => {
    const wrapper = mount(<DatePicker placeholder={undefined} />);
    expect(wrapper.find('input').props().placeholder).toEqual('Select date');
  });

  it('showTime={{ showHour: true, showMinute: true }}', () => {
    const wrapper = mount(
      <DatePicker
        defaultValue={moment()}
        showTime={{ showHour: true, showMinute: true }}
        format="YYYY-MM-DD"
        open
      />,
    );
    expect(wrapper.find('.ant-picker-time-panel-column').length).toBe(2);
    expect(
      wrapper.find('.ant-picker-time-panel-column').at(0).find('.ant-picker-time-panel-cell')
        .length,
    ).toBe(24);
    expect(
      wrapper.find('.ant-picker-time-panel-column').at(1).find('.ant-picker-time-panel-cell')
        .length,
    ).toBe(60);
  });

  it('showTime={{ showHour: true, showSecond: true }}', () => {
    const wrapper = mount(
      <DatePicker
        defaultValue={moment()}
        showTime={{ showHour: true, showSecond: true }}
        format="YYYY-MM-DD"
        open
      />,
    );
    expect(wrapper.find('.ant-picker-time-panel-column').length).toBe(2);
    expect(
      wrapper.find('.ant-picker-time-panel-column').at(0).find('.ant-picker-time-panel-cell')
        .length,
    ).toBe(24);
    expect(
      wrapper.find('.ant-picker-time-panel-column').at(1).find('.ant-picker-time-panel-cell')
        .length,
    ).toBe(60);
  });

  it('showTime={{ showMinute: true, showSecond: true }}', () => {
    const wrapper = mount(
      <DatePicker
        defaultValue={moment()}
        showTime={{ showMinute: true, showSecond: true }}
        format="YYYY-MM-DD"
        open
      />,
    );
    expect(wrapper.find('.ant-picker-time-panel-column').length).toBe(2);
    expect(
      wrapper.find('.ant-picker-time-panel-column').at(0).find('.ant-picker-time-panel-cell')
        .length,
    ).toBe(60);
    expect(
      wrapper.find('.ant-picker-time-panel-column').at(1).find('.ant-picker-time-panel-cell')
        .length,
    ).toBe(60);
  });
  it('showTime should work correctly when format is custom function', () => {
    const wrapper = mount(
      <DatePicker defaultValue={moment()} showTime format={val => val.format('YYYY-MM-DD')} open />,
    );
    const input = wrapper.find('input').simulate('mousedown');
    expect(input.simulate.bind(input, 'focus')).not.toThrowError();
  });

  it('12 hours', () => {
    const wrapper = mount(
      <DatePicker defaultValue={moment()} showTime format="YYYY-MM-DD HH:mm:ss A" open />,
    );
    expect(wrapper.find('.ant-picker-time-panel-column').length).toBe(4);
    expect(
      wrapper.find('.ant-picker-time-panel-column').at(0).find('.ant-picker-time-panel-cell')
        .length,
    ).toBe(12);
    expect(
      wrapper.find('.ant-picker-time-panel-column').at(1).find('.ant-picker-time-panel-cell')
        .length,
    ).toBe(60);
    expect(
      wrapper.find('.ant-picker-time-panel-column').at(2).find('.ant-picker-time-panel-cell')
        .length,
    ).toBe(60);
    expect(
      wrapper.find('.ant-picker-time-panel-column').at(3).find('.ant-picker-time-panel-cell')
        .length,
    ).toBe(2);
  });

  it('24 hours', () => {
    const wrapper = mount(
      <DatePicker defaultValue={moment()} showTime format="YYYY-MM-DD HH:mm:ss" open />,
    );
    expect(wrapper.find('.ant-picker-time-panel-column').length).toBe(3);
    expect(
      wrapper.find('.ant-picker-time-panel-column').at(0).find('.ant-picker-time-panel-cell')
        .length,
    ).toBe(24);
    expect(
      wrapper.find('.ant-picker-time-panel-column').at(1).find('.ant-picker-time-panel-cell')
        .length,
    ).toBe(60);
    expect(
      wrapper.find('.ant-picker-time-panel-column').at(2).find('.ant-picker-time-panel-cell')
        .length,
    ).toBe(60);
  });

  it('DatePicker.RangePicker with defaultPickerValue and showTime', () => {
    const startDate = moment('1982-02-12');
    const endDate = moment('1982-02-22');

    const wrapper = mount(
      <DatePicker.RangePicker defaultPickerValue={[startDate, endDate]} showTime open />,
    );

    const month = wrapper.find('.ant-picker-header-view .ant-picker-month-btn').text();
    const year = wrapper.find('.ant-picker-header-view .ant-picker-year-btn').text();

    expect(month).toBe(startDate.format('MMM'));
    expect(year).toBe(startDate.format('YYYY'));
    expect(wrapper.find('.ant-picker-time-panel').length).toBe(1);
  });

  it('placement api work correctly ', () => {
    const popupAlignDefault = (points = ['tl', 'bl'], offset = [0, 4]) => ({
      points,
      offset,
      overflow: {
        adjustX: 1,
        adjustY: 1,
      },
    });

    const wrapper = mount(
      <DatePicker.RangePicker defaultValue={moment()} placement="bottomLeft" />,
    );
    expect(wrapper.find('Trigger').prop('popupAlign')).toEqual(popupAlignDefault(['tl', 'bl']));
    wrapper.setProps({
      placement: 'bottomRight',
    });
    expect(wrapper.find('Trigger').prop('popupAlign')).toEqual(popupAlignDefault(['tr', 'br']));
    wrapper.setProps({
      placement: 'topLeft',
    });
    expect(wrapper.find('Trigger').prop('popupAlign')).toEqual(
      popupAlignDefault(['bl', 'tl'], [0, -4]),
    );
    wrapper.setProps({
      placement: 'topRight',
    });
    expect(wrapper.find('Trigger').prop('popupAlign')).toEqual(
      popupAlignDefault(['br', 'tr'], [0, -4]),
    );
  });
});
