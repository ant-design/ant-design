import CalendarLocale from 'rc-picker/lib/locale/eu_ES';
import TimePickerLocale from '../../time-picker/locale/eu_ES';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'Hautatu data',
    rangePlaceholder: ['Hasierako data', 'Amaiera data'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
