import Pagination from '@rc-component/pagination/lib/locale/hu_HU';

import type { Locale } from '.';
import Calendar from '../calendar/locale/hu_HU';
import DatePicker from '../date-picker/locale/hu_HU';
import TimePicker from '../time-picker/locale/hu_HU';

const typeTemplate = '${label} nem érvényes ${type}';

const localeValues: Locale = {
  locale: 'hu',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    close: 'Bezárás',
  },
  Table: {
    filterTitle: 'Szűrők',
    filterConfirm: 'Alkalmazás',
    filterReset: 'Visszaállítás',
    selectAll: 'Jelenlegi oldal kiválasztása',
    selectInvert: 'Jelenlegi oldal inverze',
    sortTitle: 'Rendezés',
  },
  Modal: {
    okText: 'Alkalmazás',
    cancelText: 'Visszavonás',
    justOkText: 'Alkalmazás',
  },
  Popconfirm: {
    okText: 'Alkalmazás',
    cancelText: 'Visszavonás',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Keresés',
    itemUnit: 'elem',
    itemsUnit: 'elemek',
  },
  Upload: {
    uploading: 'Feltöltés...',
    removeFile: 'Fájl eltávolítása',
    uploadError: 'Feltöltési hiba',
    previewFile: 'Fájl előnézet',
    downloadFile: 'Fájl letöltése',
  },
  Empty: {
    description: 'Nincs adat',
  },
  Tour: {
    Next: 'Következő',
    Previous: 'Előző',
    Finish: 'Befejezés',
  },
  Text: {
    edit: 'Szerkesztés',
    copy: 'Másolás',
    copied: 'Másolva',
    expand: 'Kibontás',
  },
  Form: {
    optional: '(opcionális)',
    defaultValidateMessages: {
      default: 'Mező érvényesítési hiba: ${label}',
      required: 'Kérjük, adja meg: ${label}',
      enum: '${label} a következők egyike kell legyen: [${enum}]',
      whitespace: '${label} nem lehet üres karakter',
      date: {
        format: '${label} dátumformátuma érvénytelen',
        parse: '${label} nem konvertálható dátummá',
        invalid: '${label} érvénytelen dátum',
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
        len: '${label} pontosan ${len} karakter hosszú kell legyen',
        min: '${label} legalább ${min} karakter hosszú kell legyen',
        max: '${label} legfeljebb ${max} karakter hosszú lehet',
        range: '${label} ${min}-${max} karakter hosszú kell legyen',
      },
      number: {
        len: '${label} egyenlő kell legyen ${len}',
        min: '${label} legalább ${min} kell legyen',
        max: '${label} legfeljebb ${max} lehet',
        range: '${label} ${min}-${max} között kell legyen',
      },
      array: {
        len: '${len} ${label} kell legyen',
        min: 'Legalább ${min} ${label}',
        max: 'Legfeljebb ${max} ${label}',
        range: '${label} mennyiségének ${min}-${max} között kell lennie',
      },
      pattern: {
        mismatch: '${label} nem illeszkedik a következő mintára: ${pattern}',
      },
    },
  },
};

export default localeValues;
