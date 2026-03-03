import esES from './es_ES';
import type { Locale } from '.';
// US formatting (MM/DD/YYYY + 12h)
import Calendar from '../calendar/locale/en_US';
import DatePicker from '../date-picker/locale/en_US';
import TimePicker from '../time-picker/locale/en_US';

const localeValues: Locale = {
  ...esES,
  locale: 'es-us',
  DatePicker,
  TimePicker,
  Calendar,
};

export default localeValues;
