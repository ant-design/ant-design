import CalendarLocale from 'rc-picker/lib/locale/kn_IN';

import TimePickerLocale from '../../time-picker/locale/kn_IN';
import type { PickerLocale } from '../generatePicker';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    placeholder: 'ದಿನಾಂಕ ಆಯ್ಕೆಮಾಡಿ',
    yearPlaceholder: 'ವರ್ಷ ಆಯ್ಕೆಮಾಡಿ',
    rangePlaceholder: ['ಪ್ರಾರಂಭ ದಿನಾಂಕ', 'ಅಂತಿಮ ದಿನಾಂಕ'],
    quarterPlaceholder: 'ಕಾಲುಭಾಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    monthPlaceholder: 'ತಿಂಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    weekPlaceholder: 'ವಾರವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    rangeYearPlaceholder: ['ಉದ್ಘಾಟನಾ ವರ್ಷ', 'ಅಂತಿಮ ವರ್ಷ'],
    rangeQuarterPlaceholder: ['ತ್ರೈಮಾಸಿಕದ ಆರಂಭ', 'ಅಂತಿಮ ತ್ರೈಮಾಸಿಕ'],
    rangeMonthPlaceholder: ['ಆರಂಭಿಕ ತಿಂಗಳು', 'ಅಂತಿಮ ತಿಂಗಳು'],
    rangeWeekPlaceholder: ['ತೆರೆಯುವ ವಾರ', 'ಅಂತಿಮ ವಾರ'],
    ...CalendarLocale,
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json

export default locale;
