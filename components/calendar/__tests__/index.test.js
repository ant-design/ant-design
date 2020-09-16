import React from 'react';
import Moment from 'moment';
import momentGenerateConfig from 'rc-picker/lib/generate/moment';
import { mount } from 'enzyme';
import MockDate from 'mockdate';
import Calendar from '..';
import Header from '../Header';
import Select from '../../select';
import Group from '../../radio/group';
import Button from '../../radio/radioButton';
import mountTest from '../../../tests/shared/mountTest';
import rtlTest from '../../../tests/shared/rtlTest';

describe('Calendar', () => {
  mountTest(Calendar);
  rtlTest(Calendar, true);

  function openSelect(wrapper, className) {
    wrapper.find(className).find('.ant-select-selector').simulate('mousedown');
  }

  function findSelectItem(wrapper) {
    return wrapper.find('.ant-select-item-option');
  }

  function clickSelectItem(wrapper, index = 0) {
    findSelectItem(wrapper).at(index).simulate('click');
  }

  it('Calendar should be selectable', () => {
    const onSelect = jest.fn();
    const onChange = jest.fn();
    const wrapper = mount(<Calendar onSelect={onSelect} onChange={onChange} />);
    wrapper.find('.ant-picker-cell').at(0).simulate('click');
    expect(onSelect).toHaveBeenCalledWith(expect.anything());
    const value = onSelect.mock.calls[0][0];
    expect(Moment.isMoment(value)).toBe(true);
    expect(onChange).toHaveBeenCalled();
  });

  it('only Valid range should be selectable', () => {
    const onSelect = jest.fn();
    const validRange = [Moment('2018-02-02'), Moment('2018-02-18')];
    const wrapper = mount(
      <Calendar onSelect={onSelect} validRange={validRange} defaultValue={Moment('2018-02-02')} />,
    );
    wrapper.find('[title="2018-02-01"]').at(0).simulate('click');
    wrapper.find('[title="2018-02-02"]').at(0).simulate('click');
    expect(onSelect.mock.calls.length).toBe(1);
  });

  it('dates other than in valid range should be disabled', () => {
    const onSelect = jest.fn();
    const validRange = [Moment('2018-02-02'), Moment('2018-02-18')];
    const wrapper = mount(
      <Calendar onSelect={onSelect} validRange={validRange} defaultValue={Moment('2018-02-02')} />,
    );
    wrapper.find('[title="2018-02-20"]').at(0).simulate('click');
    const elem = wrapper.find('[title="2018-02-20"]').hasClass('ant-picker-cell-disabled');
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
    expect(wrapper.find('[title="2018-01"]').at(0).hasClass('ant-picker-cell-disabled')).toBe(true);
    expect(wrapper.find('[title="2018-02"]').at(0).hasClass('ant-picker-cell-disabled')).toBe(
      false,
    );
    expect(wrapper.find('[title="2018-06"]').at(0).hasClass('ant-picker-cell-disabled')).toBe(true);
    wrapper.find('[title="2018-01"]').at(0).simulate('click');
    wrapper.find('[title="2018-03"]').at(0).simulate('click');
    expect(onSelect.mock.calls.length).toBe(1);
  });

  it('months other than in valid range should not be shown in header', () => {
    const validRange = [Moment('2017-02-02'), Moment('2018-05-18')];
    const wrapper = mount(<Calendar validRange={validRange} />);
    openSelect(wrapper, '.ant-picker-calendar-year-select');
    clickSelectItem(wrapper);
    openSelect(wrapper, '.ant-picker-calendar-month-select');
    // 2 years and 11 months
    expect(wrapper.find('.ant-select-item-option').length).toBe(13);
  });

  it('getDateRange should returns a disabledDate function', () => {
    const validRange = [Moment('2018-02-02'), Moment('2018-05-18')];
    const wrapper = mount(<Calendar validRange={validRange} defaultValue={Moment('2018-02-02')} />);
    const { disabledDate } = wrapper.find('PickerPanel').props();
    expect(disabledDate(Moment('2018-06-02'))).toBe(true);
    expect(disabledDate(Moment('2018-04-02'))).toBe(false);
  });

  it('validRange should work with disabledDate function', () => {
    const validRange = [Moment('2018-02-02'), Moment('2018-05-18')];
    const wrapper = mount(
      <Calendar validRange={validRange} disabledDate={data => data.isSame(Moment('2018-02-03'))} />,
    );

    const { disabledDate } = wrapper.find('PickerPanel').props();
    expect(disabledDate(Moment('2018-02-01'))).toBe(true);
    expect(disabledDate(Moment('2018-02-02'))).toBe(false);
    expect(disabledDate(Moment('2018-02-03'))).toBe(true);
    expect(disabledDate(Moment('2018-02-04'))).toBe(false);
    expect(disabledDate(Moment('2018-06-01'))).toBe(true);
  });

  it('Calendar MonthSelect should display correct label', () => {
    const validRange = [Moment('2018-02-02'), Moment('2019-06-1')];
    const wrapper = mount(<Calendar validRange={validRange} defaultValue={Moment('2019-01-01')} />);
    const { options } = wrapper.find('MonthSelect > Select').props();
    expect(options.length).toBe(6);
    expect(options[5]).toEqual({ label: 'Jun', value: 5 });
  });

  it('Calendar should change mode by prop', () => {
    const monthMode = 'month';
    const yearMode = 'year';
    const wrapper = mount(<Calendar />);
    expect(wrapper.find('CalendarHeader').props().mode).toEqual(monthMode);
    wrapper.setProps({ mode: yearMode });
    expect(wrapper.find('CalendarHeader').props().mode).toEqual(yearMode);
  });

  it('Calendar should switch mode', () => {
    const monthMode = 'month';
    const yearMode = 'year';
    const onPanelChangeStub = jest.fn();
    const wrapper = mount(<Calendar mode={yearMode} onPanelChange={onPanelChangeStub} />);
    expect(wrapper.find('CalendarHeader').props().mode).toEqual(yearMode);
    wrapper.setProps({ mode: monthMode });
    expect(wrapper.find('CalendarHeader').props().mode).toEqual(monthMode);
    expect(onPanelChangeStub).toHaveBeenCalledTimes(0);
  });

  it('Calendar should support locale', () => {
    MockDate.set(Moment('2018-10-19').valueOf());
    // eslint-disable-next-line global-require
    const zhCN = require('../locale/zh_CN').default;
    const wrapper = mount(<Calendar locale={zhCN} />);
    expect(wrapper.render()).toMatchSnapshot();
    MockDate.reset();
  });

  describe('onPanelChange', () => {
    it('trigger when click last month of date', () => {
      const onPanelChange = jest.fn();
      const date = new Moment('1990-09-03');
      const wrapper = mount(<Calendar onPanelChange={onPanelChange} value={date} />);

      wrapper.find('.ant-picker-cell').at(0).simulate('click');

      expect(onPanelChange).toHaveBeenCalled();
      expect(onPanelChange.mock.calls[0][0].month()).toEqual(date.month() - 1);
    });

    it('not trigger when in same month', () => {
      const onPanelChange = jest.fn();
      const date = new Moment('1990-09-03');
      const wrapper = mount(<Calendar onPanelChange={onPanelChange} value={date} />);

      wrapper.find('.ant-picker-cell').at(10).simulate('click');

      expect(onPanelChange).not.toHaveBeenCalled();
    });
  });

  it('switch should work correctly without prop mode', async () => {
    const onPanelChange = jest.fn();
    const date = new Moment(new Date(Date.UTC(2017, 7, 9, 8)));
    const wrapper = mount(<Calendar onPanelChange={onPanelChange} value={date} />);

    expect(wrapper.find('CalendarHeader').props().mode).toBe('month');
    expect(wrapper.find('.ant-picker-date-panel').length).toBe(1);
    expect(wrapper.find('.ant-picker-month-panel').length).toBe(0);

    wrapper.find('.ant-radio-button-input[value="year"]').simulate('change');
    expect(wrapper.find('.ant-picker-date-panel').length).toBe(0);
    expect(wrapper.find('.ant-picker-month-panel').length).toBe(1);
    expect(onPanelChange).toHaveBeenCalled();
    expect(onPanelChange.mock.calls[0][1]).toEqual('year');
  });

  const createWrapper = (start, end, value, onValueChange) => {
    const wrapper = mount(
      <Header
        prefixCls="ant-picker-calendar"
        generateConfig={momentGenerateConfig}
        onChange={onValueChange}
        value={value}
        validRange={[start, end]}
        locale={{ year: '年' }}
      />,
    );
    openSelect(wrapper, '.ant-picker-calendar-year-select');
    clickSelectItem(wrapper);
  };

  it('if value.month > end.month, set value.month to end.month', () => {
    const value = new Moment('1990-01-03');
    const start = new Moment('2019-04-01');
    const end = new Moment('2019-11-01');
    const onValueChange = jest.fn();
    createWrapper(start, end, value, onValueChange);
    expect(onValueChange).toHaveBeenCalledWith(value.year('2019').month('3'));
  });

  it('if start.month > value.month, set value.month to start.month', () => {
    const value = new Moment('1990-01-03');
    const start = new Moment('2019-11-01');
    const end = new Moment('2019-03-01');
    const onValueChange = jest.fn();
    createWrapper(start, end, value, onValueChange);
    expect(onValueChange).toHaveBeenCalledWith(value.year('2019').month('10'));
  });

  it('if change year and new month > end month, set value.month to end.month', () => {
    const value = new Moment('2018-11-03');
    const start = new Moment('2000-01-01');
    const end = new Moment('2019-03-01');
    const onValueChange = jest.fn();
    const wrapper = mount(
      <Header
        prefixCls="ant-picker-calendar"
        generateConfig={momentGenerateConfig}
        onChange={onValueChange}
        value={value}
        validRange={[start, end]}
        locale={{ year: '年' }}
      />,
    );
    openSelect(wrapper, '.ant-picker-calendar-year-select');
    wrapper.find('.ant-select-item-option').last().simulate('click');
    expect(onValueChange).toHaveBeenCalledWith(value.year('2019').month('2'));
  });

  it('onMonthChange should work correctly', () => {
    const start = new Moment('2018-11-01');
    const end = new Moment('2019-03-01');
    const value = new Moment('2018-12-03');
    const onValueChange = jest.fn();
    const wrapper = mount(
      <Header
        prefixCls="ant-picker-calendar"
        generateConfig={momentGenerateConfig}
        onChange={onValueChange}
        value={value}
        validRange={[start, end]}
        locale={{ year: '年', locale: 'zh_CN' }}
        mode="month"
      />,
    );
    openSelect(wrapper, '.ant-picker-calendar-month-select');
    clickSelectItem(wrapper);
    expect(onValueChange).toHaveBeenCalledWith(value.month(10));
  });

  it('onTypeChange should work correctly', () => {
    const onTypeChange = jest.fn();
    const value = new Moment('2018-12-03');
    const wrapper = mount(
      <Header
        prefixCls="ant-picker-calendar"
        generateConfig={momentGenerateConfig}
        onModeChange={onTypeChange}
        locale={{ year: '年', month: '月', locale: 'zh_CN' }}
        value={value}
        type="date"
      />,
    );
    wrapper.find('input[type="radio"]').at(1).simulate('change');
    expect(onTypeChange).toHaveBeenCalledWith('year');
  });

  it('headerRender should work correctly', () => {
    const onMonthChange = jest.fn();
    const onYearChange = jest.fn();
    const onTypeChange = jest.fn();

    // Year
    const headerRender = jest.fn(({ value }) => {
      const year = value.year();
      const options = [];
      for (let i = year - 100; i < year + 100; i += 1) {
        options.push(
          <Select.Option className="year-item" key={i} value={i}>
            {i}
          </Select.Option>,
        );
      }

      return (
        <Select
          size="small"
          dropdownMatchSelectWidth={false}
          className="my-year-select"
          onChange={onYearChange}
          value={String(year)}
        >
          {options}
        </Select>
      );
    });
    const wrapperWithYear = mount(<Calendar fullscreen={false} headerRender={headerRender} />);

    openSelect(wrapperWithYear, '.ant-select');
    wrapperWithYear.update();

    findSelectItem(wrapperWithYear).last().simulate('click');

    expect(onYearChange).toHaveBeenCalled();

    // Month
    const headerRenderWithMonth = jest.fn(({ value }) => {
      const start = 0;
      const end = 12;
      const monthOptions = [];
      const current = value.clone();
      const localeData = value.localeData();
      const months = [];
      for (let i = 0; i < 12; i += 1) {
        current.month(i);
        months.push(localeData.monthsShort(current));
      }

      for (let index = start; index < end; index += 1) {
        monthOptions.push(
          <Select.Option className="month-item" key={`${index}`} value={index}>
            {months[index]}
          </Select.Option>,
        );
      }

      const month = value.month();
      return (
        <Select
          size="small"
          dropdownMatchSelectWidth={false}
          className="my-month-select"
          onChange={onMonthChange}
          value={String(month)}
        >
          {monthOptions}
        </Select>
      );
    });
    const wrapperWithMonth = mount(
      <Calendar fullscreen={false} headerRender={headerRenderWithMonth} />,
    );

    openSelect(wrapperWithMonth, '.ant-select');
    wrapperWithMonth.update();

    findSelectItem(wrapperWithMonth).last().simulate('click');

    expect(onMonthChange).toHaveBeenCalled();

    // Type
    const headerRenderWithTypeChange = jest.fn(({ type }) => {
      return (
        <Group size="small" onChange={onTypeChange} value={type}>
          <Button value="month">Month</Button>
          <Button value="year">Year</Button>
        </Group>
      );
    });

    const wrapperWithTypeChange = mount(
      <Calendar fullscreen={false} headerRender={headerRenderWithTypeChange} />,
    );

    wrapperWithTypeChange.find('.ant-radio-button-input').last().simulate('change');
    expect(onTypeChange).toHaveBeenCalled();
  });

  it('dateFullCellRender', () => {
    const wrapper = mount(
      <Calendar dateFullCellRender={() => <div className="light">Bamboo</div>} />,
    );
    expect(wrapper.find('.light').first().text()).toEqual('Bamboo');
  });

  it('monthFullCellRender', () => {
    const wrapper = mount(
      <Calendar mode="year" monthFullCellRender={() => <div className="bamboo">Light</div>} />,
    );
    expect(wrapper.find('.bamboo').first().text()).toEqual('Light');
  });
});
