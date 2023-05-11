import CalendarLocale from 'rc-picker/lib/locale/vi_VN';
import TimePickerLocale from '../../time-picker/locale/vi_VN';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'Chọn thời điểm',
    yearPlaceholder: 'Chọn năm',
    quarterPlaceholder: 'Chọn quý',
    monthPlaceholder: 'Chọn tháng',
    weekPlaceholder: 'Chọn tuần',
    rangePlaceholder: ['Ngày bắt đầu', 'Ngày kết thúc'],
    rangeYearPlaceholder: ['Năm bắt đầu', 'Năm kết thúc'],
    rangeQuarterPlaceholder: ['Quý bắt đầu', 'Quý kết thúc'],
    rangeMonthPlaceholder: ['Tháng bắt đầu', 'Tháng kết thúc'],
    rangeWeekPlaceholder: ['Tuần bắt đầu', 'Tuần kết thúc'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
