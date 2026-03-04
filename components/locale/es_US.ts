import esES from './es_ES';
import type { Locale } from '.';
import Calendar from '../calendar/locale/es_ES';
import DatePicker from '../date-picker/locale/es_ES';

const localeValues: Locale = {
  ...esES,
  DatePicker: {
    ...DatePicker,
    lang: {
      ...DatePicker.lang,
      locale: 'en_US',
    },
  },
  Calendar: {
    ...Calendar,
    lang: {
      ...Calendar.lang,
      locale: 'en_US',
    },
  },
};

export default localeValues;
