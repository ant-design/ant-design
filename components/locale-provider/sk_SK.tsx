import moment from 'moment';
moment.locale('sk');

import Pagination from 'rc-pagination/lib/locale/sk_SK';
import DatePicker from '../date-picker/locale/sk_SK';
import TimePicker from '../time-picker/locale/sk_SK';
import Calendar from '../calendar/locale/sk_SK';

export default {
  locale: 'sk',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Filter',
    filterConfirm: 'OK',
    filterReset: 'Obnoviť',
    emptyText: 'Žiadne dáta',
    selectAll: 'Vybrať všetko',
    selectInvert: 'Vybrať opačné',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Zrušiť',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Zrušiť',
  },
  Transfer: {
    notFoundContent: 'Nenájdené',
    searchPlaceholder: 'Vyhľadávanie',
    itemUnit: 'položka',
    itemsUnit: 'položiek',
  },
  Select: {
    notFoundContent: 'Nenájdené',
  },
  Upload: {
    uploading: 'Nahrávanie...',
    removeFile: 'Odstrániť súbor',
    uploadError: 'Chyba pri nahrávaní',
    previewFile: 'Zobraziť súbor',
  },
};
