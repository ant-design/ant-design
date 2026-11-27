import CalendarLocale from '@rc-component/picker/locale/mk_MK';

import TimePickerLocale from '../../time-picker/locale/mk_MK';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'Избери датум',
    yearPlaceholder: 'Избери година',
    quarterPlaceholder: 'Избери квартал',
    monthPlaceholder: 'Избери месец',
    weekPlaceholder: 'Избери недела',
    rangePlaceholder: ['Од датум', 'До датум'],
    rangeYearPlaceholder: ['Од година', 'До година'],
    rangeQuarterPlaceholder: ['Од квартал', 'До квартал'],
    rangeMonthPlaceholder: ['Од месец', 'До месец'],
    rangeWeekPlaceholder: ['Од недела', 'До недела'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
