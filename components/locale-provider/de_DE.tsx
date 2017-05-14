import moment from 'moment';
moment.locale('de');

import Pagination from 'rc-pagination/lib/locale/de_DE';
import DatePicker from '../date-picker/locale/de_DE';
import TimePicker from '../time-picker/locale/de_DE';
import Calendar from '../calendar/locale/de_DE';

export default {
  locale: 'de',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Filter-Menü',
    filterConfirm: 'OK',
    filterReset: 'Zurücksetzen',
    emptyText: 'Keine Daten',
    selectAll: 'Selektiere Alle',
    selectInvert: 'Selektion Invertieren',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Abbrechen',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Abbrechen',
  },
  Transfer: {
    notFoundContent: 'Nicht gefunden',
    searchPlaceholder: 'Suchen',
    itemUnit: 'Eintrag',
    itemsUnit: 'Einträge',
  },
  Select: {
    notFoundContent: 'Nicht gefunden',
  },
};
