// import CalendarLocale from 'rc-picker/lib/locale/kk_KZ';
// awaiting PR https://github.com/react-component/picker/pull/167
// For now, using Russian language as fallback
import CalendarLocale from 'rc-picker/lib/locale/ru_RU';

import TimePickerLocale from '../../time-picker/locale/kk_KZ';
import { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'Күнді таңдаңыз',
    yearPlaceholder: 'Жылды таңдаңыз',
    quarterPlaceholder: 'Тоқсанды таңдаңыз',
    monthPlaceholder: 'Айды таңдаңыз',
    weekPlaceholder: 'Аптаны таңдаңыз',
    rangePlaceholder: ['Бастау күні', 'Аяқталу күні'],
    rangeYearPlaceholder: ['Бастау жылы', 'Аяқталу жылы'],
    rangeMonthPlaceholder: ['Бастау айы', 'Аяқталу айы'],
    rangeWeekPlaceholder: ['Бастау апта', 'Аяқталу апта'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
