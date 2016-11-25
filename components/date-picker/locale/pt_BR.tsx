import CalendarLocale from 'rc-calendar/lib/locale/pt_BR';
import TimePickerLocale from '../../time-picker/locale/pt_BR';
import assign from 'object-assign';

// 统一合并为完整的 Locale
const locale = {
  lang: assign({
    placeholder: 'Selecionar data',
    rangePlaceholder: ['Data de início', 'Data de fim'],
  }, CalendarLocale),
  timePickerLocale: assign({}, TimePickerLocale),
};

// All settings at:
// https://github.com/ant-design/ant-design/issues/424

export default locale;
