import moment from 'moment';
moment.locale('nb');

// import Pagination from 'rc-pagination/lib/locale/nb_NO';
import DatePicker from '../date-picker/locale/nb_NO';
import TimePicker from '../time-picker/locale/nb_NO';
import Calendar from '../calendar/locale/nb_NO';

export default {
  locale: 'nb',
  DatePicker,
  TimePicker,
  Calendar,
  // Replace with rc-pagination/lib/locale/nb_NO
  // when rc-pagination supports nb_NO
  Pagination: {
    items_per_page: 'per side',
    jump_to: 'Gå til side',
    page: '',

    prev_page: 'Forrige side',
    next_page: 'Neste side',
    prev_5: '5 forrige',
    next_5: '5 neste',
    prev_3: '3 forrige',
    next_3: '3 neste',
  },
  Table: {
    filterTitle: 'Filtermeny',
    filterConfirm: 'OK',
    filterReset: 'Nullstill',
    emptyText: 'Ingen data',
    selectAll: 'Velg alle',
    selectInvert: 'Inverter valg',
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
    notFoundContent: 'Ingen treff',
    searchPlaceholder: 'Søk her',
    itemUnit: 'element',
    itemsUnit: 'elementer',
  },
  Select: {
    notFoundContent: 'Ingen treff',
  },
  Upload: {
    uploading: 'Laster opp...',
    removeFile: 'Fjern fil',
    uploadError: 'Feil ved opplastning',
    previewFile: 'Forhåndsvisning',
  },
};
