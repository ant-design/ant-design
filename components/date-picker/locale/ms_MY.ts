import CalendarLocale from '@rc-component/picker/locale/ms_MY';

import TimePickerLocale from '../../time-picker/locale/ms_MY';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'Pilih tarikh',
    yearPlaceholder: 'Pilih tahun',
    quarterPlaceholder: 'Pilih suku tahun',
    monthPlaceholder: 'Pilih bulan',
    weekPlaceholder: 'Pilih minggu',
    rangePlaceholder: ['Tarikh mula', 'Tarikh akhir'],
    rangeYearPlaceholder: ['Tahun mula', 'Tahun akhir'],
    rangeQuarterPlaceholder: ['Suku tahun mula', 'Suku tahun akhir'],
    rangeMonthPlaceholder: ['Bulan mula', 'Bulan akhir'],
    rangeWeekPlaceholder: ['Minggu mula', 'Minggu akhir'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
