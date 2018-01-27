import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import MockDate from 'mockdate';
import DatePicker from '..';
import { selectDate } from './utils';
import focusTest from '../../../tests/shared/focusTest';

describe('DatePicker', () => {
  focusTest(DatePicker);

  beforeEach(() => {
    MockDate.set(new Date('2016-11-22').getTime() + (new Date().getTimezoneOffset() * 60 * 1000));
  });

  afterEach(() => {
    MockDate.reset();
  });

  it('prop locale should works', () => {
    const locale = {
      lang: {
        placeholder: 'Избери дата',
        rangePlaceholder: [
          'Начална дата',
          'Крайна дата',
        ],
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
    const wrapper = mount(
      <DatePicker open locale={locale} value={birthday} />
    );
    expect(wrapper.render()).toMatchSnapshot();
  });

  // Fix https://github.com/ant-design/ant-design/issues/8885
  it('control value after panel closed', () => {
    class Test extends React.Component {
      state = {
        cleared: false,
        value: moment(),
      }

      onChange = (value) => {
        let cleared = this.state.cleared;

        if (cleared) {
          value = moment(moment(value).format('YYYY-MM-DD 12:12:12'));
          cleared = false;
        }

        if (!value) {
          cleared = true;
        }

        this.setState({ value, cleared });
      }

      render() {
        return (
          <div>
            <DatePicker
              showTime
              value={this.state.value}
              format="YYYY-MM-DD HH:mm:ss"
              onChange={this.onChange}
            />
          </div>
        );
      }
    }

    const wrapper = mount(<Test />);
    // clear input
    wrapper.find('.ant-calendar-picker-clear').hostNodes().simulate('click');
    // open panel
    wrapper.find('.ant-calendar-picker-input').simulate('click');
    // select a date
    selectDate(wrapper, moment('2016-11-13'));
    expect(wrapper.find('.ant-calendar-input').getDOMNode().value).toBe('2016-11-13 12:12:12');
    selectDate(wrapper, moment('2016-11-14'));
    expect(wrapper.find('.ant-calendar-input').getDOMNode().value).toBe('2016-11-14 12:12:12');
  });
});
