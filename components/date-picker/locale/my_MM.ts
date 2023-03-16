import CalendarLocale from 'rc-picker/lib/locale/my_MM';
import TimePickerLocale from '../../time-picker/locale/my_MM';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'ရက်စွဲကို ရွေးပါ။',
    yearPlaceholder: 'နှစ်ကို ရွေးပါ။',
    quarterPlaceholder: 'လေးပုံတစ်ပုံကို ရွေးပါ။',
    monthPlaceholder: 'လကိုရွေးပါ။',
    weekPlaceholder: 'ရက်သတ္တပတ်ကို ရွေးပါ။',
    rangePlaceholder: ['စတင်သည့်ရက်စွဲ', 'ကုန်ဆုံးရက်'],
    rangeYearPlaceholder: ['စတင်သည့်နှစ်', 'နှစ်ကုန်'],
    rangeQuarterPlaceholder: ['လေးပုံတစ်ပုံကို စတင်ပါ။', 'အဆုံးသုံးလ'],
    rangeMonthPlaceholder: ['စတင်လ', 'လကုန်'],
    rangeWeekPlaceholder: ['ရက်သတ္တပတ်စတင်ပါ။', 'သီတင်းပတ်ကုန်'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
