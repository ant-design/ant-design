import Pagination from 'rc-pagination/lib/locale/sv_SE';
import DatePicker from '../date-picker/locale/sv_SE';
import TimePicker from '../time-picker/locale/sv_SE';
import Calendar from '../calendar/locale/sv_SE';
import { Locale } from '../locale-provider';

const localeValues: Locale = {
  locale: 'sv',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Filtermeny',
    filterConfirm: 'OK',
    filterReset: 'Rensa',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Avbryt',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Avbryt',
  },
  Transfer: {
    searchPlaceholder: 'Sök',
    itemUnit: 'element',
    itemsUnit: 'element',
  },
  Empty: {
    description: 'Ingen information',
  },
  Text: {
    edit: 'editera',
    copy: 'kopiera',
    copied: 'kopierad',
    expand: 'expandera',
  },
  Upload: {
    uploading: 'Uppladdning...',
    removeFile: 'Ta bort fil',
    uploadError: 'Uppladdningsfel',
    previewFile: 'Förhandsgranska filen',
    downloadFile: 'Nedladdning fil',
  },
};

export default localeValues;
