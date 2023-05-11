/* eslint-disable no-template-curly-in-string */
import Pagination from 'rc-pagination/lib/locale/sv_SE';
import Calendar from '../calendar/locale/sv_SE';
import DatePicker from '../date-picker/locale/sv_SE';
import type { Locale } from '.';
import TimePicker from '../time-picker/locale/sv_SE';

const typeTemplate = '${label} är inte en giltig ${type}';

const localeValues: Locale = {
  locale: 'sv',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'Vänligen välj',
  },
  Table: {
    filterTitle: 'Filtermeny',
    filterConfirm: 'OK',
    filterReset: 'Återställ',
    filterEmptyText: 'Inga filter',
    filterCheckall: 'Markera alla objekt',
    filterSearchPlaceholder: 'Sök i filter',
    emptyText: 'Ingen data',
    selectAll: 'Markera nuvarande sida',
    selectInvert: 'Invertera nuvarande sida',
    selectNone: 'Avmarkera all data',
    selectionAll: 'Markera all data',
    sortTitle: 'Sortera',
    expand: 'Expandera rad',
    collapse: 'Komprimera rad',
    triggerDesc: 'Klicka för att sortera i fallande ordning',
    triggerAsc: 'Klicka för att sortera i stigande ordning',
    cancelSort: 'Klicka för att avbryta sortering',
  },
  Tour: {
    Next: 'Nästa',
    Previous: 'Föregående',
    Finish: 'Avsluta',
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
    titles: ['', ''],
    searchPlaceholder: 'Sök här',
    itemUnit: 'objekt',
    itemsUnit: 'objekt',
    remove: 'Ta bort',
    selectCurrent: 'Markera nuvarande sida',
    removeCurrent: 'Ta bort nuvarande sida',
    selectAll: 'Markera all data',
    removeAll: 'Ta bort all data',
    selectInvert: 'Invertera nuvarande sida',
  },
  Upload: {
    uploading: 'Laddar upp...',
    removeFile: 'Ta bort fil',
    uploadError: 'Uppladdningsfel',
    previewFile: 'Förhandsgranska fil',
    downloadFile: 'Ladda ned fil',
  },
  Empty: {
    description: 'Ingen data',
  },
  Icon: {
    icon: 'ikon',
  },
  Text: {
    edit: 'Redigera',
    copy: 'Kopiera',
    copied: 'Kopierad',
    expand: 'Expandera',
  },
  PageHeader: {
    back: 'Tillbaka',
  },
  Form: {
    optional: '(valfritt)',
    defaultValidateMessages: {
      default: 'Fältvalideringsfel för ${label}',
      required: 'Vänligen fyll i ${label}',
      enum: '${label} måste vara en av [${enum}]',
      whitespace: '${label} kan inte vara ett tomt tecken',
      date: {
        format: '${label} datumformatet är ogiltigt',
        parse: '${label} kan inte konverteras till ett datum',
        invalid: '${label} är ett ogiltigt datum',
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
        len: '${label} måste vara ${len} tecken',
        min: '${label} måste vara minst ${min} tecken',
        max: '${label} måste vara högst ${max} tecken',
        range: '${label} måste vara mellan ${min}-${max} tecken',
      },
      number: {
        len: '${label} måste vara lika med ${len}',
        min: '${label} måste vara minst ${min}',
        max: '${label} måste vara högst ${max}',
        range: '${label} måste vara mellan ${min}-${max}',
      },
      array: {
        len: 'Måste vara ${len} ${label}',
        min: 'Minst ${min} ${label}',
        max: 'Högst ${max} ${label}',
        range: 'Antal ${label} måste vara mellan ${min}-${max}',
      },
      pattern: {
        mismatch: '${label} stämmer inte överens med mönstret ${pattern}',
      },
    },
  },
  Image: {
    preview: 'Förhandsgranska',
  },
  QRCode: {
    expired: 'QR-koden har upphört att gälla',
    refresh: 'Uppdatera',
  },
};

export default localeValues;
