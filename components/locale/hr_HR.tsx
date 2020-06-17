import Pagination from 'rc-pagination/lib/locale/hr_HR';
import DatePicker from '../date-picker/locale/hr_HR';
import TimePicker from '../time-picker/locale/hr_HR';
import Calendar from '../calendar/locale/hr_HR';
import { Locale } from '../locale-provider';

const localeValues: Locale = {
  locale: 'hr',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'Molimo označite',
  },
  Table: {
    filterTitle: 'Filter meni',
    filterConfirm: 'OK',
    filterReset: 'Reset',
    selectAll: 'Označi trenutnu stranicu',
    selectInvert: 'Invertiraj trenutnu stranicu',
    sortTitle: 'Sortiraj',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Odustani',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Odustani',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Pretraži ovdje',
    itemUnit: 'stavka',
    itemsUnit: 'stavke',
  },
  Upload: {
    uploading: 'Upload u tijeku...',
    removeFile: 'Makni datoteku',
    uploadError: 'Greška kod uploada',
    previewFile: 'Pogledaj datoteku',
    downloadFile: 'Preuzmi datoteku',
  },
  Empty: {
    description: 'Nema podataka',
  },
  Icon: {
    icon: 'ikona',
  },
  Text: {
    edit: 'uredi',
    copy: 'kopiraj',
    copied: 'kopiranje uspješno',
    expand: 'proširi',
  },
};

export default localeValues;
