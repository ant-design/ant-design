import CalendarLocale from 'rc-picker/lib/locale/si_LK';
import TimePickerLocale from '../../time-picker/locale/si_LK';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'දිනය තෝරන්න',
    yearPlaceholder: 'අවුරුද්ද තෝරන්න',
    quarterPlaceholder: 'කාර්තුව තෝරන්න',
    monthPlaceholder: 'මාසය තෝරන්න',
    weekPlaceholder: 'සතිය තෝරන්න',
    rangePlaceholder: ['ආරම්භක දිනය', 'නිමවන දිනය'],
    rangeYearPlaceholder: ['ආර්ම්භක අවුරුද්ද', 'නිමවන අවුරුද්ද'],
    rangeQuarterPlaceholder: ['ආරම්භක කාර්තුව', 'නිමවන කාර්තුව'],
    rangeMonthPlaceholder: ['ආරම්භක මාසය', 'නිමවන මාසය'],
    rangeWeekPlaceholder: ['ආරම්භක සතිය', 'නිමවන සතිය'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
