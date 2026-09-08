import CalendarLocale from '@rc-component/picker/locale/cs_CZ';

import TimePickerLocale from '../../time-picker/locale/cs_CZ';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'Vybrat datum',
    yearPlaceholder: 'Vybrat rok',
    quarterPlaceholder: 'Vybrat čtvrtletí',
    monthPlaceholder: 'Vybrat měsíc',
    weekPlaceholder: 'Vybrat týden',
    rangePlaceholder: ['Od', 'Do'],
    rangeYearPlaceholder: ['Počáteční rok', 'Koncový rok'],
    rangeQuarterPlaceholder: ['Počáteční čtvrtletí', 'Koncové čtvrtletí'],
    rangeMonthPlaceholder: ['Počáteční měsíc', 'Koncový měsíc'],
    rangeWeekPlaceholder: ['Počáteční týden', 'Koncový týden'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
