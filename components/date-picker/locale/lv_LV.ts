import CalendarLocale from '@rc-component/picker/locale/lv_LV';

import TimePickerLocale from '../../time-picker/locale/lv_LV';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'Izvēlieties datumu',
    yearPlaceholder: 'Izvēlieties gadu',
    quarterPlaceholder: 'Izvēlieties ceturksni',
    monthPlaceholder: 'Izvēlieties mēnesi',
    weekPlaceholder: 'Izvēlieties nedēļu',
    rangePlaceholder: ['Sākuma datums', 'Beigu datums'],
    rangeYearPlaceholder: ['Sākuma gads', 'Beigu gads'],
    rangeQuarterPlaceholder: ['Sākuma ceturksnis', 'Beigu ceturksnis'],
    rangeMonthPlaceholder: ['Sākuma mēnesis', 'Beigu mēnesis'],
    rangeWeekPlaceholder: ['Sākuma nedēļa', 'Beigu nedēļa'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
