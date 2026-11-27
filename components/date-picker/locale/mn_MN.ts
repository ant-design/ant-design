import CalendarLocale from '@rc-component/picker/locale/mn_MN';

import TimePickerLocale from '../../time-picker/locale/mn_MN';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'Огноо сонгох',
    yearPlaceholder: 'Он сонгох',
    quarterPlaceholder: 'Улирал сонгох',
    monthPlaceholder: 'Сар сонгох',
    weekPlaceholder: 'Долоо хоног сонгох',
    rangePlaceholder: ['Эхлэх огноо', 'Дуусах огноо'],
    rangeYearPlaceholder: ['Эхлэх он', 'Дуусах он'],
    rangeQuarterPlaceholder: ['Эхлэх улирал', 'Дуусах улирал'],
    rangeMonthPlaceholder: ['Эхлэх сар', 'Дуусах сар'],
    rangeWeekPlaceholder: ['Эхлэх долоо хоног', 'Дуусах долоо хоног'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
