import React from 'react';
import { mount, render } from 'enzyme';
import moment from 'moment';
import DatePicker from '..';
import { setMockDate, resetMockDate } from '../../../tests/utils';
import { selectDate, openPanel } from './utils';
import focusTest from '../../../tests/shared/focusTest';

const { RangePicker } = DatePicker;

describe('RangePicker', () => {
  focusTest(RangePicker);

  beforeEach(() => {
    setMockDate();
  });

  afterEach(() => {
    resetMockDate();
  });

  it('show month panel according to value', () => {
    const birthday = moment('2000-01-01', 'YYYY-MM-DD').locale('zh-cn');
    const wrapper = mount(
      <RangePicker getCalendarContainer={trigger => trigger} format="YYYY/MM/DD" showTime open />,
    );

    wrapper.setProps({ value: [birthday, birthday] });
    expect(
      render(
        wrapper
          .find('Trigger')
          .instance()
          .getComponent(),
      ),
    ).toMatchSnapshot();
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
      />,
    );

    const rangeCalendarWrapper = mount(
      wrapper
        .find('Trigger')
        .instance()
        .getComponent(),
    );
    rangeCalendarWrapper.find('.ant-calendar-range-quick-selector Tag').simulate('click');
    expect(
      render(
        wrapper
          .find('Trigger')
          .instance()
          .getComponent(),
      ),
    ).toMatchSnapshot();
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
      />,
    );

    let rangeCalendarWrapper = mount(
      wrapper
        .find('Trigger')
        .instance()
        .getComponent(),
    );
    rangeCalendarWrapper.find('.ant-calendar-range-quick-selector Tag').simulate('mouseEnter');
    rangeCalendarWrapper = mount(
      wrapper
        .find('Trigger')
        .instance()
        .getComponent(),
    );
    expect(rangeCalendarWrapper.find('.ant-calendar-selected-day').length).toBe(2);
  });

  it('should trigger onCalendarChange when change value', () => {
    const onCalendarChangeFn = jest.fn();
    const wrapper = mount(
      <RangePicker
        getCalendarContainer={trigger => trigger}
        onCalendarChange={onCalendarChangeFn}
        open
      />,
    );
    const rangeCalendarWrapper = mount(
      wrapper
        .find('Trigger')
        .instance()
        .getComponent(),
    );
    rangeCalendarWrapper
      .find('.ant-calendar-cell')
      .at(15)
      .simulate('click');
    expect(onCalendarChangeFn).toHaveBeenCalled();
  });

  // issue: https://github.com/ant-design/ant-design/issues/5872
  it('should not throw error when value is reset to `[]`', () => {
    const birthday = moment('2000-01-01', 'YYYY-MM-DD');
    const wrapper = mount(
      <RangePicker getCalendarContainer={trigger => trigger} value={[birthday, birthday]} open />,
    );
    wrapper.setProps({ value: [] });
    const rangeCalendarWrapper = mount(
      wrapper
        .find('Trigger')
        .instance()
        .getComponent(),
    );
    expect(() =>
      rangeCalendarWrapper
        .find('.ant-calendar-cell')
        .at(15)
        .simulate('click')
        .simulate('click'),
    ).not.toThrow();
  });

  // issue: https://github.com/ant-design/ant-design/issues/7077
  it('should not throw error when select after clear', () => {
    const wrapper = mount(<RangePicker getCalendarContainer={trigger => trigger} open />);
    let rangeCalendarWrapper = mount(
      wrapper
        .find('Trigger')
        .instance()
        .getComponent(),
    );
    rangeCalendarWrapper
      .find('.ant-calendar-cell')
      .at(15)
      .simulate('click')
      .simulate('click');
    wrapper.update();
    wrapper
      .find('.ant-calendar-picker-clear')
      .hostNodes()
      .simulate('click');
    wrapper.find('.ant-calendar-picker-input').simulate('click');
    rangeCalendarWrapper = mount(
      wrapper
        .find('Trigger')
        .instance()
        .getComponent(),
    );
    expect(() =>
      rangeCalendarWrapper
        .find('.ant-calendar-cell')
        .at(15)
        .simulate('click')
        .simulate('click'),
    ).not.toThrow();
  });

  it('clear hover value after panel close', () => {
    jest.useFakeTimers();
    const wrapper = mount(
      <div>
        <RangePicker value={[moment(), moment().add(2, 'day')]} />
      </div>,
    );
    wrapper.find('.ant-calendar-picker-input').simulate('click');
    wrapper
      .find('.ant-calendar-cell')
      .at(25)
      .simulate('click');
    wrapper
      .find('.ant-calendar-cell')
      .at(27)
      .simulate('mouseEnter');
    document.dispatchEvent(new MouseEvent('mousedown'));
    jest.runAllTimers();
    wrapper.find('.ant-calendar-picker-input').simulate('click');
    expect(
      wrapper
        .find('.ant-calendar-cell')
        .at(23)
        .hasClass('ant-calendar-in-range-cell'),
    ).toBe(true);
  });

  describe('preset range', () => {
    it('static range', () => {
      const range = [moment().subtract(2, 'd'), moment()];
      const format = 'YYYY-MM-DD HH:mm:ss';
      const wrapper = mount(<RangePicker ranges={{ 'recent two days': range }} format={format} />);
      wrapper.find('.ant-calendar-picker-input').simulate('click');
      wrapper.find('.ant-calendar-range-quick-selector Tag').simulate('click');
      expect(
        wrapper
          .find('.ant-calendar-range-picker-input')
          .first()
          .getDOMNode().value,
      ).toBe(range[0].format(format));
      expect(
        wrapper
          .find('.ant-calendar-range-picker-input')
          .last()
          .getDOMNode().value,
      ).toBe(range[1].format(format));
    });

    it('function range', () => {
      const range = [moment().subtract(2, 'd'), moment()];
      const format = 'YYYY-MM-DD HH:mm:ss';
      const wrapper = mount(
        <RangePicker ranges={{ 'recent two days': () => range }} format={format} />,
      );
      wrapper.find('.ant-calendar-picker-input').simulate('click');
      wrapper.find('.ant-calendar-range-quick-selector Tag').simulate('click');
      expect(
        wrapper
          .find('.ant-calendar-range-picker-input')
          .first()
          .getDOMNode().value,
      ).toBe(range[0].format(format));
      expect(
        wrapper
          .find('.ant-calendar-range-picker-input')
          .last()
          .getDOMNode().value,
      ).toBe(range[1].format(format));
    });
  });

  // https://github.com/ant-design/ant-design/issues/6999
  it('input date manually', () => {
    const wrapper = mount(<RangePicker open />);
    const dateString = '2008-12-31';
    const input = wrapper.find('.ant-calendar-input').first();
    input.simulate('change', { target: { value: dateString } });
    expect(input.getDOMNode().value).toBe(dateString);
  });

  it('triggers onOk when click on preset range', () => {
    const handleOk = jest.fn();
    const range = [moment().subtract(2, 'd'), moment()];
    const wrapper = mount(<RangePicker ranges={{ 'recent two days': range }} onOk={handleOk} />);
    wrapper.find('.ant-calendar-picker-input').simulate('click');
    wrapper.find('.ant-calendar-range-quick-selector Tag').simulate('click');
    expect(handleOk).toHaveBeenCalledWith(range);
  });

  // https://github.com/ant-design/ant-design/issues/9267
  it('invali end date not throw error', () => {
    const wrapper = mount(<RangePicker />);
    wrapper.find('.ant-calendar-picker-input').simulate('click');
    selectDate(wrapper, moment('2017-09-18'), 0);
    selectDate(wrapper, moment('2017-10-18'), 1);
    wrapper.find('.ant-calendar-picker-input').simulate('click');
    expect(() =>
      wrapper
        .find('.ant-calendar-input')
        .at(1)
        .simulate('change', { target: { value: '2016-01-01' } }),
    ).not.toThrow();
  });

  it('changes year/month when under control', () => {
    const wrapper = mount(<RangePicker value={[moment('2018-07-01'), moment('2018-07-02')]} />);
    openPanel(wrapper);
    expect(
      wrapper
        .find('.ant-calendar-my-select')
        .first()
        .text(),
    ).toBe('Jul2018');
    wrapper
      .find('.ant-calendar-prev-year-btn')
      .first()
      .simulate('click');
    wrapper
      .find('.ant-calendar-prev-month-btn')
      .first()
      .simulate('click');
    expect(
      wrapper
        .find('.ant-calendar-my-select')
        .first()
        .text(),
    ).toBe('Jun2017');
  });

  // https://github.com/ant-design/ant-design/issues/11631
  it('triggers onOpenChange when click on preset range', () => {
    const handleOpenChange = jest.fn();
    const range = [moment().subtract(2, 'd'), moment()];
    const wrapper = mount(
      <RangePicker onOpenChange={handleOpenChange} ranges={{ 'recent two days': range }} />,
    );
    wrapper.find('.ant-calendar-picker-input').simulate('click');
    wrapper.find('.ant-calendar-range-quick-selector Tag').simulate('click');
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it('customize separator', () => {
    const wrapper = mount(<RangePicker separator="test" />);
    expect(wrapper.render()).toMatchSnapshot();
  });

  // https://github.com/ant-design/ant-design/issues/13302
  describe('in "month" mode, when the left and right panels select the same month', () => {
    it('left panel and right panel could be the same month', () => {
      const wrapper = mount(<RangePicker mode={['month', 'month']} />);
      wrapper.setProps({ value: [moment(), moment()] });
      expect(
        wrapper
          .find('.ant-calendar-range-picker-input')
          .first()
          .getDOMNode().value,
      ).toBe(
        wrapper
          .find('.ant-calendar-range-picker-input')
          .last()
          .getDOMNode().value,
      );
    });

    it('the cell status is correct', () => {
      const wrapper = mount(<RangePicker mode={['month', 'month']} />);
      wrapper.find('.ant-calendar-picker-input').simulate('click');
      wrapper
        .find('.ant-calendar-range-left .ant-calendar-month-panel-cell')
        .at(3)
        .simulate('click');
      wrapper
        .find('.ant-calendar-range-right .ant-calendar-month-panel-cell')
        .at(3)
        .simulate('click');
      expect(
        wrapper
          .find('.ant-calendar-range-left .ant-calendar-month-panel-cell')
          .at(3)
          .hasClass('ant-calendar-month-panel-selected-cell'),
      ).toBe(true);
      expect(
        wrapper
          .find('.ant-calendar-range-left .ant-calendar-month-panel-cell')
          .at(3)
          .hasClass('ant-calendar-month-panel-selected-cell'),
      ).toBe(true);
      expect(
        wrapper
          .find('.ant-calendar-range-left .ant-calendar-month-panel-cell')
          .at(2)
          .hasClass('ant-calendar-month-panel-cell-disabled'),
      ).toBe(false);
      expect(
        wrapper
          .find('.ant-calendar-range-left .ant-calendar-month-panel-cell')
          .at(4)
          .hasClass('ant-calendar-month-panel-cell-disabled'),
      ).toBe(true);
      expect(
        wrapper
          .find('.ant-calendar-range-right .ant-calendar-month-panel-cell')
          .at(2)
          .hasClass('ant-calendar-month-panel-cell-disabled'),
      ).toBe(true);
      expect(
        wrapper
          .find('.ant-calendar-range-right .ant-calendar-month-panel-cell')
          .at(4)
          .hasClass('ant-calendar-month-panel-cell-disabled'),
      ).toBe(false);
    });
  });

  // https://github.com/ant-design/ant-design/issues/17135
  it('the end time should be less than the start time', () => {
    const wrapper = mount(
      <RangePicker defaultValue={[moment(), moment()]} />,
    );
    wrapper.find('.ant-calendar-picker-input').simulate('click');
    const firstInput = wrapper.find('.ant-calendar-input').first();
    const secondInput = wrapper.find('.ant-calendar-input').last();
    firstInput.simulate('change', { target: { value: moment().add(1, 'day').format('YYYY-MM-DD')}});
    expect(firstInput.getDOMNode().value).toBe(moment().add(1, 'day').format('YYYY-MM-DD'));
    expect(secondInput.getDOMNode().value).toBe('');
  });
});
