import moment from 'moment';
moment.locale('ms-my');

import Pagination from 'rc-pagination/lib/locale/en_US'; // ms-my doesnt exist at this time
import DatePicker from '../date-picker/locale/en_US';
import TimePicker from '../time-picker/locale/en_US';
import Calendar from '../calendar/locale/en_US';

export default {
  locale: 'ms-my',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Tapis menu',
    filterConfirm: 'OK',
    filterReset: 'Semula',
    emptyText: 'Tiada data',
    selectAll: 'Pilih muka semasa',
    selectInvert: 'Terbalikkan muka semasa',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Batal',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Batal',
  },
  Transfer: {
    notFoundContent: 'Tidak dijumpai',
    searchPlaceholder: 'Carian di sini',
    itemUnit: 'data',
    itemsUnit: 'data',
  },
  Select: {
    notFoundContent: 'Tidak Dijumpai',
  },
  Upload: {
    uploading: 'Memuat naik...',
    removeFile: 'Buang fail',
    uploadError: 'Ralat muat naik',
    previewFile: 'Pratonton fail',
  },
};
