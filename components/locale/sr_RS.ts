/* eslint-disable no-template-curly-in-string */
import Pagination from 'rc-pagination/lib/locale/sr_RS';
import Calendar from '../calendar/locale/sr_RS';
import DatePicker from '../date-picker/locale/sr_RS';
import type { Locale } from '.';
import TimePicker from '../time-picker/locale/sr_RS';

const typeTemplate = '${label} nije važeći ${type}';

const localeValues: Locale = {
  locale: 'sr',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'Izaberi',
  },
  Table: {
    filterTitle: 'Meni filtera',
    filterConfirm: 'U redu',
    filterReset: 'Poništi',
    filterEmptyText: 'Nema filtera',
    emptyText: 'Nema podataka',
    selectAll: 'Izaberi trenutnu stranicu',
    selectInvert: 'Obrni izbor trenutne stranice',
    selectNone: 'Obriši sve podatke',
    selectionAll: 'Izaberi sve podatke',
    sortTitle: 'Sortiraj',
    expand: 'Proširi red',
    collapse: 'Skupi red',
    triggerDesc: 'Klikni da sortiraš po padajućem redosledu',
    triggerAsc: 'Klikni da sortiraš po rastućem redosledu',
    cancelSort: 'Klikni da otkažeš sortiranje',
  },
  Modal: {
    okText: 'U redu',
    cancelText: 'Otkaži',
    justOkText: 'U redu',
  },
  Popconfirm: {
    okText: 'U redu',
    cancelText: 'Otkaži',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Pretraži ovde',
    itemUnit: 'stavka',
    itemsUnit: 'stavki',
    remove: 'Ukloni',
    selectCurrent: 'Izaberi trenutnu stranicu',
    removeCurrent: 'Ukloni trenutnu stranicu',
    selectAll: 'Izaberi sve podatke',
    removeAll: 'Ukloni sve podatke',
    selectInvert: 'Obrni izbor trenutne stranice',
  },
  Upload: {
    uploading: 'Otpremanje...',
    removeFile: 'Ukloni datoteku',
    uploadError: 'Greška pri otpremanju',
    previewFile: 'Pregledaj datoteku',
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
    copied: 'Kopirano',
    expand: 'Proširi',
  },
  PageHeader: {
    back: 'Nazad',
  },
  Form: {
    optional: '(opcionalno)',
    defaultValidateMessages: {
      default: 'Greška pri proveri valjanosti za ${label}',
      required: 'Unesi ${label}',
      enum: '${label} mora da bude nešto od [${enum}]',
      whitespace: '${label} ne može biti prazan znak',
      date: {
        format: '${label} format datuma je nevažeći',
        parse: '${label} se ne može konvertovati u datum',
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
        len: '${label} mora da sadrži ${len} znakova',
        min: '${label} mora da sadrži bar ${min} znakova',
        max: '${label} mora da sadrži do ${max} znakova',
        range: '${label} mora da sadrži između ${min} i ${max} znakova',
      },
      number: {
        len: '${label} mora biti jednak ${len}',
        min: '${label} mora biti najmanje ${min}',
        max: '${label} mora biti najviše ${max}',
        range: '${label} mora biti između ${min} i ${max}',
      },
      array: {
        len: 'Mora biti ${len} ${label}',
        min: 'Najmanje ${min} ${label}',
        max: 'najviše ${max} ${label}',
        range: 'Iznos ${label} mora biti između ${min} i ${max}',
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
