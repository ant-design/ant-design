import Pagination from 'rc-pagination/lib/locale/kmr_IQ';
import Calendar from '../calendar/locale/kmr_IQ';
import DatePicker from '../date-picker/locale/kmr_IQ';
import type { Locale } from '.';
import TimePicker from '../time-picker/locale/kmr_IQ';

const localeValues: Locale = {
  locale: 'ku',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Menuê peldanka',
    filterConfirm: 'Temam',
    filterReset: 'Jê bibe',
    selectAll: 'Hemî hilbijêre',
    selectInvert: 'Hilbijartinan veguhere',
  },
  Modal: {
    okText: 'Temam',
    cancelText: 'Betal ke',
    justOkText: 'Temam',
  },
  Popconfirm: {
    okText: 'Temam',
    cancelText: 'Betal ke',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Lêgerîn',
    itemUnit: 'tişt',
    itemsUnit: 'tişt',
  },
  Upload: {
    uploading: 'Bardike...',
    removeFile: 'Pelê rabike',
    uploadError: 'Xeta barkirine',
    previewFile: 'Pelê pêşbibîne',
    downloadFile: 'Pelê dakêşin',
  },
  Empty: {
    description: 'Agahî tune',
  },
};

export default localeValues;
