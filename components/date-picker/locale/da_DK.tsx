import CalendarLocale from 'rc-picker/lib/locale/da_DK';
import TimePickerLocale from '../../time-picker/locale/da_DK';
import { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'Vælg dato',
    rangePlaceholder: ['Startdato', 'Slutdato'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
