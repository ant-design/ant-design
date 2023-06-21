/* eslint-disable no-template-curly-in-string */
import Pagination from 'rc-pagination/lib/locale/et_EE';
import Calendar from '../calendar/locale/et_EE';
import DatePicker from '../date-picker/locale/et_EE';
import type { Locale } from '.';
import TimePicker from '../time-picker/locale/et_EE';

const typeTemplate = '${label} ei ole kehtiv ${type}';

const localeValues: Locale = {
  locale: 'et',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'Palun vali',
  },
  Table: {
    filterTitle: 'Filtri menüü',
    filterConfirm: 'OK',
    filterReset: 'Nulli',
    filterEmptyText: 'Filtreid pole',
    filterCheckall: 'Vali kõik',
    filterSearchPlaceholder: 'Otsi filtritest',
    emptyText: 'Andmed puuduvad',
    selectAll: 'Vali kõik',
    selectInvert: 'Inverteeri valik',
    selectNone: 'Kustuta kõik andmed',
    selectionAll: 'Vali kõik andmed',
    sortTitle: 'Sorteeri',
    expand: 'Laienda rida',
    collapse: 'Ahenda rida',
    triggerDesc: 'Klõpsa kahanevalt sortimiseks',
    triggerAsc: 'Klõpsa kasvavalt sortimiseks',
    cancelSort: 'Klõpsa sortimise tühistamiseks',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Tühista',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Tühista',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Otsi siit',
    itemUnit: 'kogus',
    itemsUnit: 'kogused',
    remove: 'Eemalda',
    selectCurrent: 'Vali praegune leht',
    removeCurrent: 'Eemalda praegune leht',
    selectAll: 'Vali kõik',
    removeAll: 'Eemalda kõik andmed',
    selectInvert: 'Inverteeri valik',
  },
  Upload: {
    uploading: 'Üleslaadimine...',
    removeFile: 'Eemalda fail',
    uploadError: 'Üleslaadimise tõrge',
    previewFile: 'Faili eelvaade',
    downloadFile: 'Lae fail alla',
  },
  Empty: {
    description: 'Andmed puuduvad',
  },
  Icon: {
    icon: 'ikoon',
  },
  Text: {
    edit: 'Muuda',
    copy: 'Kopeeri',
    copied: 'Kopeeritud',
    expand: 'Laienda',
  },
  PageHeader: {
    back: 'Tagasi',
  },
  Form: {
    optional: '(valikuline)',
    defaultValidateMessages: {
      default: '${label} välja valideerimise viga',
      required: 'Palun sisesta ${label}',
      enum: '${label} peab olema üks järgmistest: [${enum}]',
      whitespace: '${label} ei saa olla tühi märk',
      date: {
        format: '${label} kuupäevavorming on kehtetu',
        parse: '${label} ei saa kuupäevaks teisendada',
        invalid: '${label} on vale kuupäev',
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
        len: '${label} peab koosnema ${len} tähemärgist',
        min: '${label} peab olema vähemalt ${min} tähemärki',
        max: '${label} peab olema kuni ${max} tähemärki',
        range: '${label} peab olema vahemikus ${min}–${max} tähemärki',
      },
      number: {
        len: '${label} must be equal to ${len}',
        min: '${label} peab olema vähemalt ${min}',
        max: '${label} peab olema maksimaalne ${max}',
        range: '${label} peab olema vahemikus ${min}–${max}',
      },
      array: {
        len: 'Peab olema ${len} ${label}',
        min: 'Vähemalt ${min} ${label}',
        max: 'Maksimaalselt ${max} ${label}',
        range: '${label} summa peab olema vahemikus ${min}–${max}',
      },
      pattern: {
        mismatch: '${label} ei vasta mustrile ${pattern}',
      },
    },
  },
  Image: {
    preview: 'Eelvaade',
  },
};

export default localeValues;
