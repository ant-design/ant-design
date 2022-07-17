import CalendarLocale from 'rc-picker/lib/locale/bn_BD';
import TimePickerLocale from '../../time-picker/locale/bn_BD';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'তারিখ নির্বাচন',
    yearPlaceholder: 'বছর নির্বাচন',
    quarterPlaceholder: 'কোয়ার্টার নির্বাচন',
    monthPlaceholder: 'মাস নির্বাচন',
    weekPlaceholder: 'সপ্তাহ নির্বাচন',
    rangePlaceholder: ['শুরুর তারিখ', 'শেষ তারিখ'],
    rangeYearPlaceholder: ['শুরুর বছর', 'শেষ বছর'],
    rangeMonthPlaceholder: ['শুরুর মাস', 'শেষ মাস'],
    rangeWeekPlaceholder: ['শুরুর সপ্তাহ', 'শেষ সপ্তাহ'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
