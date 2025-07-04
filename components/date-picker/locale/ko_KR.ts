import CalendarLocale from 'rc-picker/lib/locale/ko_KR';

import TimePickerLocale from '../../time-picker/locale/ko_KR';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: '날짜 선택',
    yearPlaceholder: '연도 선택',
    quarterPlaceholder: '분기 선택',
    monthPlaceholder: '월 선택',
    weekPlaceholder: '주 선택',
    rangePlaceholder: ['시작일', '종료일'],
    rangeYearPlaceholder: ['시작 연도', '종료 연도'],
    rangeMonthPlaceholder: ['시작 월', '종료 월'],
    rangeQuarterPlaceholder: ['시작 분기', '종료 분기'],
    rangeWeekPlaceholder: ['시작 주', '종료 주'],
    shortWeekDays: ['일', '월', '화', '수', '목', '금', '토'],
    shortMonths: [
      '1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월',
      '12월',
    ],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
