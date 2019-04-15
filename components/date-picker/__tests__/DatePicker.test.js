import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import MockDate from 'mockdate';
import DatePicker from '..';
import { selectDate, openPanel, clearInput, nextYear, nextMonth, hasSelected } from './utils';
import focusTest from '../../../tests/shared/focusTest';

describe('DatePicker', () => {
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  focusTest(DatePicker);

  beforeEach(() => {
    MockDate.set(moment('2016-11-22'));
  });

  afterEach(() => {
    MockDate.reset();
    errorSpy.mockReset();
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });

  it('support name prop', () => {
    const wrapper = mount(<DatePicker name="bamboo" />);
    expect(wrapper.find('input').props().name).toBe('bamboo');
  });

  it('prop locale should works', () => {
    const locale = {
      lang: {
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

  // Fix https://github.com/ant-design/ant-design/issues/8885
  it('control value after panel closed', () => {
    class Test extends React.Component {
      state = {
        cleared: false,
        value: moment(),
      };

      onChange = value => {
        let { cleared } = this.state;

        let newValue = value;
        if (cleared) {
          newValue = moment(moment(value).format('YYYY-MM-DD 12:12:12'));
          cleared = false;
        }

        if (!newValue) {
          cleared = true;
        }

        this.setState({ value: newValue, cleared });
      };

      render() {
        const { value } = this.state;
        return (
          <DatePicker
            showTime
            value={value}
            format="YYYY-MM-DD HH:mm:ss"
            onChange={this.onChange}
          />
        );
      }
    }

    const wrapper = mount(<Test />);
    // clear input
    clearInput(wrapper);
    openPanel(wrapper);
    selectDate(wrapper, moment('2016-11-13'));
    expect(wrapper.find('.ant-calendar-input').getDOMNode().value).toBe('2016-11-13 12:12:12');
    selectDate(wrapper, moment('2016-11-14'));
    expect(wrapper.find('.ant-calendar-input').getDOMNode().value).toBe('2016-11-14 12:12:12');
  });

  it('triggers onChange only when date was selected', () => {
    const handleChange = jest.fn();
    const wrapper = mount(<DatePicker onChange={handleChange} />);
    openPanel(wrapper);
    nextYear(wrapper);
    expect(handleChange).not.toHaveBeenCalled();
    nextMonth(wrapper);
    expect(handleChange).not.toHaveBeenCalled();
    selectDate(wrapper, moment('2017-12-22'));
    expect(handleChange).toHaveBeenCalled();
  });

  it('clear input', () => {
    const wrapper = mount(<DatePicker />);
    openPanel(wrapper);
    selectDate(wrapper, moment('2016-11-23'));
    clearInput(wrapper);
    openPanel(wrapper);
    expect(hasSelected(wrapper, moment('2016-11-22'))).toBe(true);
  });

  it('sets data attributes on input', () => {
    const wrapper = mount(<DatePicker data-test="test-id" data-id="12345" />);
    const input = wrapper.find('.ant-calendar-picker-input').getDOMNode();
    expect(input.getAttribute('data-test')).toBe('test-id');
    expect(input.getAttribute('data-id')).toBe('12345');
  });

  it('sets aria attributes on input', () => {
    const wrapper = mount(<DatePicker aria-label="some-label" aria-labelledby="label-id" />);
    const input = wrapper.find('.ant-calendar-picker-input').getDOMNode();
    expect(input.getAttribute('aria-label')).toBe('some-label');
    expect(input.getAttribute('aria-labelledby')).toBe('label-id');
  });

  it('sets role attribute on input', () => {
    const wrapper = mount(<DatePicker role="search" />);
    const input = wrapper.find('.ant-calendar-picker-input').getDOMNode();
    expect(input.getAttribute('role')).toBe('search');
  });

  it('changes year/month when under control', () => {
    const wrapper = mount(<DatePicker value={moment('2018-07-01')} />);
    openPanel(wrapper);
    expect(wrapper.find('.ant-calendar-my-select').text()).toBe('Jul2018');
    wrapper.find('.ant-calendar-prev-year-btn').simulate('click');
    wrapper.find('.ant-calendar-prev-month-btn').simulate('click');
    expect(wrapper.find('.ant-calendar-my-select').text()).toBe('Jun2017');
  });

  it('disabled date', () => {
    function disabledDate(current) {
      return current && current < moment().endOf('day');
    }

    const wrapper = mount(<DatePicker disabledDate={disabledDate} />);

    expect(wrapper.render()).toMatchSnapshot();
  });

  it('extra footer works', () => {
    const wrapper = mount(
      <DatePicker renderExtraFooter={mode => <span className="extra-node">{mode}</span>} />,
    );
    openPanel(wrapper);

    let extraNode = wrapper.find('.extra-node');
    expect(extraNode.length).toBe(1);
    expect(extraNode.text()).toBe('date');

    wrapper
      .find('.ant-calendar-month-select')
      .hostNodes()
      .simulate('click');
    extraNode = wrapper.find('.ant-calendar-month-panel .extra-node');
    expect(extraNode.length).toBe(1);
    expect(extraNode.text()).toBe('month');

    wrapper
      .find('.ant-calendar-year-select')
      .hostNodes()
      .simulate('click');
    extraNode = wrapper.find('.ant-calendar-year-panel .extra-node');
    expect(extraNode.length).toBe(1);
    expect(extraNode.text()).toBe('year');

    wrapper
      .find('.ant-calendar-year-panel-decade-select')
      .hostNodes()
      .simulate('click');
    extraNode = wrapper.find('.ant-calendar-decade-panel .extra-node');
    expect(extraNode.length).toBe(1);
    expect(extraNode.text()).toBe('decade');
  });

  it('supports multiple formats', () => {
    const wrapper = mount(<DatePicker format={['DD/MM/YYYY', 'DD/MM/YY']} />);
    openPanel(wrapper);
    wrapper.find('.ant-calendar-input').simulate('change', { target: { value: '02/07/18' } });
    expect(wrapper.find('.ant-calendar-picker-input').getDOMNode().value).toBe('02/07/2018');
  });

  describe('warning use if use invalidate moment', () => {
    const invalidateTime = moment('I AM INVALIDATE');

    it('defaultValue', () => {
      mount(<DatePicker defaultValue={invalidateTime} />);
      expect(errorSpy).toHaveBeenCalledWith(
        'Warning: [antd: DatePicker] `defaultValue` provides invalidate moment time. If you want to set empty value, use `null` instead.',
      );
    });

    it('value', () => {
      mount(<DatePicker value={invalidateTime} />);
      expect(errorSpy).toHaveBeenCalledWith(
        'Warning: [antd: DatePicker] `value` provides invalidate moment time. If you want to set empty value, use `null` instead.',
      );
    });
  });
});
