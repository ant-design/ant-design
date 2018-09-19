import CalendarLocale from 'rc-calendar/lib/locale/mm_MM';
import TimePickerLocale from '../../time-picker/locale/mm_MM';

// Merge into a locale object
const locale = {
  lang: {
    placeholder: 'နေ့စွဲရွေးပါ',
    rangePlaceholder: ['အစနေ့စွဲ', 'အဆုံးနေ့စွဲ'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json
export default locale;
