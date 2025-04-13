import Pagination from 'rc-pagination/lib/locale/da_DK';

import type { Locale } from '.';
import Calendar from '../calendar/locale/da_DK';
import DatePicker from '../date-picker/locale/da_DK';
import TimePicker from '../time-picker/locale/da_DK';

const typeTemplate = '${label} er ikke en gyldig ${type}';
const localeValues: Locale = {
  locale: 'da',
  DatePicker,
  TimePicker,
  Calendar,
  Pagination,
  Table: {
    filterTitle: 'Filtermenu',
    filterConfirm: 'OK',
    filterReset: 'Nulstil',
    filterEmptyText: 'Ingen filtre',
    emptyText: 'Ingen data',
    selectAll: 'Vælg alle',
    selectNone: 'Ryd alt data',
    selectInvert: 'Invertér valg',
    selectionAll: 'Vælg alt data',
    sortTitle: 'Sortér',
    expand: 'Udvid række',
    collapse: 'Flet række',
    triggerDesc: 'Klik for at sortere faldende',
    triggerAsc: 'Klik for at sortere stigende',
    cancelSort: 'Klik for at annullere sortering',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Afbryd',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Afbryd',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Søg her',
    itemUnit: 'element',
    itemsUnit: 'elementer',
  },
  Upload: {
    uploading: 'Uploader...',
    removeFile: 'Fjern fil',
    uploadError: 'Fejl ved upload',
    previewFile: 'Forhåndsvisning',
    downloadFile: 'Download fil',
  },
  Empty: {
    description: 'Ingen data',
  },
  Form: {
    optional: '(valgfrit)',
    defaultValidateMessages: {
      default: 'Feltvalideringsfejl ${label}',
      required: 'Indtast venligst ${label}',
      enum: '${label} skal være en af [${enum}]',
      whitespace: '${label} kan ikke være et tomt tegn',
      date: {
        format: '${label} Datoformatet er ugyldigt',
        parse: '${label} kan ikke konverteres til en dato',
        invalid: '${label} er en ugyldig dato',
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
        len: '${label} skal være ${len} tegn',
        min: '${label} mindst ${min} tegn',
        max: '${label} op til ${max} tegn',
        range: '${label} skal være mellem ${min} og ${max} tegn',
      },
      number: {
        len: '${label} skal være lig med ${len}',
        min: '${label} Minimumsværdien er ${min}',
        max: '${label} maksimal værdi er ${max}',
        range: '${label} skal være mellem ${min}-${max}',
      },
      array: {
        len: 'Skal være ${len} ${label}',
        min: 'Mindst  ${min} ${label}',
        max: 'Højst ${max} ${label}',
        range: 'Mængden af ${label} skal være mellem ${min}-${max}',
      },
      pattern: {
        mismatch: '${label} stemmer ikke overens med mønsteret ${pattern}',
      },
    },
  },
};

export default localeValues;
