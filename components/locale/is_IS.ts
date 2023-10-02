import Pagination from 'rc-pagination/lib/locale/is_IS';
import Calendar from '../calendar/locale/is_IS';
import DatePicker from '../date-picker/locale/is_IS';
import type { Locale } from '.';
import TimePicker from '../time-picker/locale/is_IS';

const localeValues: Locale = {
  locale: 'is',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Afmarkanir',
    filterConfirm: 'Staðfesta',
    filterReset: 'Núllstilla',
    selectAll: 'Velja allt',
    selectInvert: 'Viðsnúa vali',
  },
  Modal: {
    okText: 'Áfram',
    cancelText: 'Hætta við',
    justOkText: 'Í lagi',
  },
  Popconfirm: {
    okText: 'Áfram',
    cancelText: 'Hætta við',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Leita hér',
    itemUnit: 'færsla',
    itemsUnit: 'færslur',
  },
  Upload: {
    uploading: 'Hleð upp...',
    removeFile: 'Fjarlægja skrá',
    uploadError: 'Villa við að hlaða upp',
    previewFile: 'Forskoða skrá',
    downloadFile: 'Hlaða niður skrá',
  },
  Empty: {
    description: 'Engin gögn',
  },
};

export default localeValues;
