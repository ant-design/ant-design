import CalendarLocale from 'rc-picker/lib/locale/hr_HR';
import TimePickerLocale from '../../time-picker/locale/hr_HR';
import { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'Odaberite datum',
    rangePlaceholder: ['Početni datum', 'Završni datum'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
