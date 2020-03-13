import CalendarLocale from 'rc-picker/lib/locale/sv_SE';
import TimePickerLocale from '../../time-picker/locale/sv_SE';
import { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'Välj datum',
    rangePlaceholder: ['Startdatum', 'Slutdatum'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
