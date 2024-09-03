import CalendarLocale from 'rc-picker/lib/locale/ja_JP';

import TimePickerLocale from '../../time-picker/locale/ja_JP';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: '日付を選択',
    yearPlaceholder: '年を選択',
    quarterPlaceholder: '四半期を選択',
    monthPlaceholder: '月を選択',
    weekPlaceholder: '週を選択',
    rangePlaceholder: ['開始日付', '終了日付'],
    rangeYearPlaceholder: ['開始年', '終了年'],
    rangeMonthPlaceholder: ['開始月', '終了月'],
    rangeQuarterPlaceholder: ['開始四半期', '終了四半期'],
    rangeWeekPlaceholder: ['開始週', '終了週'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
