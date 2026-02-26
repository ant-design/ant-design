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
  Form: {
    defaultValidateMessages: {
      default: '${label} mező érvényesítési hibája',
      required: 'Kérjük töltse ki a(z) ${label} mezőt',
      enum: '${label} az alábbiak egyike kell legyen: [${enum}]',
      whitespace: '${label} nem lehet üres karakter',
      date: {
        format: '${label} dátum formátuma érvénytelen',
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
        len: '${label} pontosan ${len} kell legyen',
        min: '${label} legalább ${min} kell legyen',
        max: '${label} legfeljebb ${max} lehet',
        range: '${label} ${min}-${max} közé kell esnie',
      },
      array: {
        len: '${label} pontosan ${len} elemet kell tartalmazzon',
        min: '${label} legalább ${min} elemet kell tartalmazzon',
        max: '${label} legfeljebb ${max} elemet tartalmazhat',
        range: '${label} ${min}-${max} elemet kell tartalmazzon',
      },
      pattern: {
        mismatch: '${label} nem egyezik meg a ${pattern} mintával',
      },
    },
  },
};

export default localeValues;
