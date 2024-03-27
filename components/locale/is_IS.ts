import Pagination from 'rc-pagination/lib/locale/is_IS';
import Calendar from '../calendar/locale/is_IS';
import DatePicker from '../date-picker/locale/is_IS';
import type { Locale } from '.';
import TimePicker from '../time-picker/locale/is_IS';

const typeTemplate = '${label} er ekki gilt ${type}';

const localeValues: Locale = {
  locale: 'is',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Afmarkanir',
    filterConfirm: 'Staðfesta',
    filterReset: 'Núllstilla',
    selectAll: 'Velja allt',
    selectInvert: 'Viðsnúa vali',
  },
  Modal: {
    okText: 'Áfram',
    cancelText: 'Hætta við',
    justOkText: 'Í lagi',
  },
  Popconfirm: {
    okText: 'Áfram',
    cancelText: 'Hætta við',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Leita hér',
    itemUnit: 'færsla',
    itemsUnit: 'færslur',
  },
  Upload: {
    uploading: 'Hleð upp...',
    removeFile: 'Fjarlægja skrá',
    uploadError: 'Villa við að hlaða upp',
    previewFile: 'Forskoða skrá',
    downloadFile: 'Hlaða niður skrá',
  },
  Empty: {
    description: 'Engin gögn',
  },
  Form: {
    optional: '（Valfrjálst）',
    defaultValidateMessages: {
      default: 'Villa við staðfestingu reits ${label}',
      required: 'gjörðu svo vel að koma inn ${label}',
      enum: '${label} verður að vera einn af [${enum}]',
      whitespace: '${label} getur ekki verið tómur stafur',
      date: {
        format: '${label} dagsetningarsnið er ógilt',
        parse: 'Ekki er hægt að breyta ${label} í dag',
        invalid: '${label} er ógild dagsetning',
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
        len: '${label} verður að vera ${len} stafir',
        min: '${label} er að minnsta kosti ${min} stafir að lengd',
        max: '${label} getur verið allt að ${max} stafir',
        range: '${label} verður að vera á milli ${min}-${max} stafir',
      },
      number: {
        len: '${label} verður að vera jafngildi ${len}',
        min: 'Lágmarksgildi ${label} er ${mín}',
        max: 'Hámarksgildi ${label} er ${max}',
        range: '${label} verður að vera á milli ${min}-${max}',
      },
      array: {
        len: 'Verður að vera ${len}${label}',
        min: 'Að minnsta kosti ${min}${label}',
        max: 'Í mesta lagi ${max}${label}',
        range: 'Magn ${label} verður að vera á milli ${min}-${max}',
      },
      pattern: {
        mismatch: '${label} passar ekki við mynstur ${pattern}',
      },
    },
  },
};

export default localeValues;
