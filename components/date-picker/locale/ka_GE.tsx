/**
 * Created by Vazha Lomidze on 2/09/20.
 */

import CalendarLocale from 'rc-picker/lib/locale/ka_GE';
import TimePickerLocale from '../../time-picker/locale/ka_GE';
import { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'აირჩიეთ თარიღი',
    yearPlaceholder: 'აირჩიეთ წელი',
    quarterPlaceholder: 'აირჩიეთ კვარტალი',
    monthPlaceholder: 'აირჩიეთ თვე',
    weekPlaceholder: 'აირჩიეთ კვირა',
    rangePlaceholder: ['საწყისი თარიღი', 'საბოლოო თარიღი'],
    rangeYearPlaceholder: ['საწყისი წელი', 'საბოლოო წელი'],
    rangeMonthPlaceholder: ['საწყისი თვე', 'საბოლოო თვე'],
    rangeWeekPlaceholder: ['საწყისი კვირა', 'საბოლოო კვირა'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
