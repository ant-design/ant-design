import Pagination from 'rc-pagination/lib/locale/ms_MY';
import Calendar from '../calendar/locale/ms_MY';
import DatePicker from '../date-picker/locale/ms_MY';
import type { Locale } from '.';
import TimePicker from '../time-picker/locale/ms_MY';

const localeValues: Locale = {
  locale: 'ms-my',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'Sila pilih',
  },
  PageHeader: {
    back: 'Kembali',
  },
  Text: {
    edit: 'Sunting',
    copy: 'Salin',
    copied: 'Berjaya menyalin',
    expand: 'Kembang',
  },
  Empty: {
    description: 'Tiada data',
  },
  Table: {
    filterTitle: 'Cari dengan tajuk',
    filterConfirm: 'OK',
    filterReset: 'Menetapkan semula',
    emptyText: 'Tiada data',
    selectAll: 'Pilih semua',
    selectInvert: 'Terbalikkan',
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
    titles: ['', ''],
    notFoundContent: 'Tidak dijumpai',
    searchPlaceholder: 'Carian di sini',
    itemUnit: 'item',
    itemsUnit: 'item',
  },
  Icon: {
    icon: 'ikon',
  },
  Select: {
    notFoundContent: 'Tidak Dijumpai',
  },
  Upload: {
    uploading: 'Sedang memuat naik...',
    removeFile: 'Buang fail',
    uploadError: 'Masalah muat naik',
    previewFile: 'Tengok fail',
    downloadFile: 'Muat turun fail',
  },
};

export default localeValues;
