import moment from 'moment';
moment.locale('nl');

import Pagination from 'rc-pagination/lib/locale/nl_NL';
import DatePicker from '../date-picker/locale/nl_NL';
import TimePicker from '../time-picker/locale/nl_NL';
import Calendar from '../calendar/locale/nl_NL';

export default {
  locale: 'nl',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Filter Menu',
    filterConfirm: 'OK',
    filterReset: 'Reset',
    emptyText: 'Geen gegevens',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Annuleren',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Annuleren',
  },
  Transfer: {
    notFoundContent: 'Niet gevonden',
    searchPlaceholder: 'Zoeken',
    itemUnit: 'item',
    itemsUnit: 'items',
  },
  Select: {
    notFoundContent: 'Niet gevonden',
  },
};
