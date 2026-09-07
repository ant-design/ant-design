import CalendarLocale from '@rc-component/picker/locale/sk_SK';

import TimePickerLocale from '../../time-picker/locale/sk_SK';
import type { PickerLocale } from '../generatePicker';

// 统一合并为完整的 Locale
const locale: PickerLocale = {
  lang: {
    placeholder: 'Vybrať dátum',
    yearPlaceholder: 'Vybrať rok',
    quarterPlaceholder: 'Vybrať štvrťrok',
    monthPlaceholder: 'Vybrať mesiac',
    weekPlaceholder: 'Vybrať týždeň',
    rangePlaceholder: ['Od', 'Do'],
    rangeYearPlaceholder: ['Začiatočný rok', 'Koncový rok'],
    rangeQuarterPlaceholder: ['Začiatočný štvrťrok', 'Koncový štvrťrok'],
    rangeMonthPlaceholder: ['Začiatočný mesiac', 'Koncový mesiac'],
    rangeWeekPlaceholder: ['Začiatočný týždeň', 'Koncový týždeň'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
