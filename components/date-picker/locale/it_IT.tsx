import CalendarLocale from 'rc-calendar/lib/locale/it_IT';
import TimePickerLocale from '../../time-picker/locale/it_IT';
import assign from 'object-assign';

// Merge into a locale object
const locale = {
  lang: assign({
    placeholder: 'Selezionare la data',
    rangePlaceholder: ['Data d\'inizio', 'Data di fine'],
  }, CalendarLocale),
  timePickerLocale: assign({}, TimePickerLocale),
};

// All settings at:
// https://github.com/ant-design/ant-design/issues/424

export default locale;
