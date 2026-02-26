import Pagination from '@rc-component/pagination/lib/locale/sl_SI';

import type { Locale } from '.';
import Calendar from '../calendar/locale/sl_SI';
import DatePicker from '../date-picker/locale/sl_SI';
import TimePicker from '../time-picker/locale/sl_SI';

const typeTemplate = '${label} ni veljaven ${type}';

const localeValues: Locale = {
  locale: 'sl',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    close: 'Zapri',
  },
  Table: {
    filterTitle: 'Filter',
    filterConfirm: 'Filtriraj',
    filterReset: 'Pobriši filter',
    selectAll: 'Izberi vse na trenutni strani',
    selectInvert: 'Obrni izbor na trenutni strani',
  },
  Tour: {
    Next: 'Naprej',
    Previous: 'Prejšnje',
    Finish: 'Končaj',
  },
  Modal: {
    okText: 'V redu',
    cancelText: 'Prekliči',
    justOkText: 'V redu',
  },
  Popconfirm: {
    okText: 'v redu',
    cancelText: 'Prekliči',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Išči tukaj',
    itemUnit: 'Objekt',
    itemsUnit: 'Objektov',
  },
  Upload: {
    uploading: 'Nalaganje...',
    removeFile: 'Odstrani datoteko',
    uploadError: 'Napaka pri nalaganju',
    previewFile: 'Predogled datoteke',
    downloadFile: 'Prenos datoteke',
  },
  Empty: {
    description: 'Ni podatkov',
  },
  Text: {
    edit: 'Uredi',
    copy: 'Kopiraj',
    copied: 'Kopirano',
    expand: 'Razširi',
  },
  Form: {
    optional: '(neobvezno)',
    defaultValidateMessages: {
      default: 'Napaka pri preverjanju veljavnosti polja: ${label}',
      required: 'Prosimo, vnesite ${label}',
      enum: '${label} mora biti eden od [${enum}]',
      whitespace: '${label} ne sme biti prazen znak',
      date: {
        format: '${label} format datuma je neveljaven',
        parse: '${label} ni mogoče pretvoriti v datum',
        invalid: '${label} je neveljaven datum',
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
        len: '${label} mora biti ${len} znakov',
        min: '${label} mora biti vsaj ${min} znakov',
        max: '${label} je lahko do ${max} znakov',
        range: '${label} mora biti med ${min}-${max} znaki',
      },
      number: {
        len: '${label} mora biti enako ${len}',
        min: '${label} mora biti najmanj ${min}',
        max: '${label} je lahko največ ${max}',
        range: '${label} mora biti med ${min}-${max}',
      },
      array: {
        len: 'Biti mora ${len} ${label}',
        min: 'Vsaj ${min} ${label}',
        max: 'Največ ${max} ${label}',
        range: 'Količina ${label} mora biti med ${min}-${max}',
      },
      pattern: {
        mismatch: '${label} se ne ujema z vzorcem ${pattern}',
      },
    },
  },
};

export default localeValues;
