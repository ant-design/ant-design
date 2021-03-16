import Pagination from 'rc-pagination/lib/locale/cs_CZ';
import DatePicker from '../date-picker/locale/cs_CZ';
import TimePicker from '../time-picker/locale/cs_CZ';
import Calendar from '../calendar/locale/cs_CZ';
import { Locale } from '../locale-provider';

const localeValues: Locale = {
  locale: 'cs',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'Prosím vyber',
  },
  Table: {
    filterTitle: 'Filtr',
    filterConfirm: 'Potvrdit',
    filterReset: 'Obnovit',
    filterEmptyText: 'Žádné filtry',
    selectAll: 'Vybrat všechny řádky na současné stránce',
    selectInvert: 'Invertovat výběr na současné stránce',
    selectionAll: 'Vybrat všechny řádky',
    sortTitle: 'Řadit',
    expand: 'Rozbalit řádek',
    collapse: 'Zabalit řádek',
    triggerDesc: 'Klikni pro sestupné řazení',
    triggerAsc: 'Klikni pro vzestupné řazení',
    cancelSort: 'Klikni pro zrušení řazení',
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
    searchPlaceholder: 'Vyhledávání',
    itemUnit: 'položka',
    itemsUnit: 'položek',
  },
  Upload: {
    uploading: 'Nahrávání...',
    removeFile: 'Odstranit soubor',
    uploadError: 'Chyba při nahrávání',
    previewFile: 'Zobrazit soubor',
    downloadFile: 'Stáhnout soubor',
  },
  Empty: {
    description: 'Žádná data',
  },
};

export default localeValues;
