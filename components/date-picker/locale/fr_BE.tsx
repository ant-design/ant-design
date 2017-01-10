import CalendarLocale from 'rc-calendar/lib/locale/fr_BE';
import TimePickerLocale from '../../time-picker/locale/fr_BE';
import assign from 'object-assign';

// 统一合并为完整的 Locale
const locale = {
  lang: assign({
    placeholder: 'Sélectionner une date',
    rangePlaceholder: ['Date de début', 'Date de fin'],
  }, CalendarLocale),
  timePickerLocale: assign({}, TimePickerLocale),
};

// All settings at:
// https://github.com/ant-design/ant-design/issues/424

export default locale;
