import CalendarLocale from 'rc-picker/lib/locale/id_ID';

import TimePickerLocale from '../../time-picker/locale/id_ID';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'Pilih tanggal',
    yearPlaceholder: 'Pilih tahun',
    quarterPlaceholder: 'Pilih kuartal',
    monthPlaceholder: 'Pilih bulan',
    weekPlaceholder: 'Pilih minggu',
    rangePlaceholder: ['Tanggal awal', 'Tanggal akhir'],
    rangeYearPlaceholder: ['Tahun awal', 'Tahun akhir'],
    rangeQuarterPlaceholder: ['Kuartal awal', 'Kuartal akhir'],
    rangeMonthPlaceholder: ['Bulan awal', 'Bulan akhir'],
    rangeWeekPlaceholder: ['Minggu awal', 'Minggu akhir'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
