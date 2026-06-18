import TimePickerLocale from '../../time-picker/locale/es_ES';
import type { PickerLocale } from '../generatePicker';

import esLocale from './es_ES';

// Merge into a locale object
const locale: PickerLocale = {
  lang: {
    ...esLocale.lang,
    locale: 'en_US',
  },
  timePickerLocale: {
    ...TimePickerLocale,
  },
};

export default locale;
