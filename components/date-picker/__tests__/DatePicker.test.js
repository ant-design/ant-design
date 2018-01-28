import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import MockDate from 'mockdate';
import DatePicker from '..';
import focusTest from '../../../tests/shared/focusTest';

describe('DatePicker', () => {
  focusTest(DatePicker);

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
    MockDate.set(new Date('2016-11-22').getTime() + (new Date().getTimezoneOffset() * 60 * 1000));
    const birthday = moment('2000-01-01', 'YYYY-MM-DD');
    const wrapper = mount(
      <DatePicker open locale={locale} value={birthday} />
    );
    expect(wrapper.render()).toMatchSnapshot();
    MockDate.reset();
  });
});
