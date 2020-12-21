import Pagination from 'rc-pagination/lib/locale/hr_HR';
import DatePicker from '../date-picker/locale/hr_HR';
import TimePicker from '../time-picker/locale/hr_HR';
import Calendar from '../calendar/locale/hr_HR';
import { Locale } from '../locale-provider';

const typeTemplate = '${label} nije valjan ${type}';

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
    filterEmptyText: 'Nema filtera',
    emptyText: 'Nema podataka',
    selectAll: 'Označi trenutnu stranicu',
    selectInvert: 'Invertiraj trenutnu stranicu',
    selectionAll: 'Odaberite sve podatke',
    sortTitle: 'Sortiraj',
    expand: 'Proširi redak',
    collapse: 'Sažmi redak',
    triggerDesc: 'Kliknite za sortiranje silazno',
    triggerAsc: 'Kliknite za sortiranje uzlazno',
    cancelSort: 'Kliknite da biste otkazali sortiranje',
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
    remove: 'Ukloniti',
    selectCurrent: 'Odaberite trenutnu stranicu',
    removeCurrent: 'Ukloni trenutnu stranicu',
    selectAll: 'Odaberite sve podatke',
    removeAll: 'Uklonite sve podatke',
    selectInvert: 'Obrni trenutnu stranicu',
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
    edit: 'Uredi',
    copy: 'Kopiraj',
    copied: 'Kopiranje uspješno',
    expand: 'Proširi',
  },
  PageHeader: {
    back: 'Natrag',
  },
  Form: {
    optional: '(neobavezno)',
    defaultValidateMessages: {
      default: 'Pogreška provjere valjanosti polja za ${label}',
      required: 'Molimo unesite ${label}',
      enum: '${label} mora biti jedan od [${enum}]',
      whitespace: '${label} ne može biti prazan znak',
      date: {
        format: '${label} format datuma je nevažeći',
        parse: '${label} ne može se pretvoriti u datum',
        invalid: '${label} je nevažeći datum',
      },
      types: {
        string: typeTemplate,
        method: typeTemplate,
        array: typeTemplate,
        object: typeTemplate,
        number: typeTemplate,
        date: typeTemplate,
        boolean: typeTemplate,
        integer: typeTemplate,
        float: typeTemplate,
        regexp: typeTemplate,
        email: typeTemplate,
        url: typeTemplate,
        hex: typeTemplate,
      },
      string: {
        len: '${label} mora biti ${len} slova',
        min: '${label} mora biti najmanje ${min} slova',
        max: '${label} mora biti do ${max} slova',
        range: '${label} mora biti između ${min}-${max} slova',
      },
      number: {
        len: '${label} mora biti jednak ${len}',
        min: '${label} mora biti minimalano ${min}',
        max: '${label} mora biti maksimalano ${max}',
        range: '${label} mora biti između ${min}-${max}',
      },
      array: {
        len: 'Mora biti ${len} ${label}',
        min: 'Najmanje ${min} ${label}',
        max: 'Najviše ${max} ${label}',
        range: 'Količina ${label} mora biti između ${min}-${max}',
      },
      pattern: {
        mismatch: '${label} ne odgovara obrascu ${pattern}',
      },
    },
  },
  Image: {
    preview: 'Pregled',
  },
};

export default localeValues;
