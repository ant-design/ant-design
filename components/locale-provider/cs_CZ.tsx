import moment from 'moment';
moment.locale('cs');

import Pagination from 'rc-pagination/lib/locale/en_US';
import DatePicker from '../date-picker/locale/cs_CZ';
import TimePicker from '../time-picker/locale/cs_CZ';
import Calendar from '../calendar/locale/cs_CZ';

export default {
  locale: 'cs',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Filtr menu',
    filterConfirm: 'Ok',
    filterReset: 'Obnovit',
    emptyText: 'Žádná data',
  },
  Modal: {
    okText: 'Ok',
    cancelText: 'Storno',
    justOkText: 'Ok',
  },
  Popconfirm: {
    okText: 'Ok',
    cancelText: 'Storno',
  },
  Transfer: {
    notFoundContent: 'Nenalezeno',
    searchPlaceholder: 'Vyhledávání',
    itemUnit: 'položka',
    itemsUnit: 'položek',
  },
  Select: {
    notFoundContent: 'Nenalezeno',
  },
};
