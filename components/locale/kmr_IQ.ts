import Pagination from '@rc-component/pagination/locale/kmr_IQ';

import type { Locale } from '.';
import Calendar from '../calendar/locale/kmr_IQ';
import DatePicker from '../date-picker/locale/kmr_IQ';
import TimePicker from '../time-picker/locale/kmr_IQ';

const typeTemplate = '${label} ne ${type}-a derbasdar e';

const localeValues: Locale = {
  locale: 'ku',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    close: 'Betal ke',
    show: 'Nîşan bide',
    hide: 'Veşêre',
    placeholder: 'Ji kerema xwe hilbijêre',
    sortable: 'sorkirin',
    clear: 'Paqij bike',
  },
  Table: {
    filterTitle: 'Menuê peldanka',
    filterConfirm: 'Temam',
    filterReset: 'Jê bibe',
    selectAll: 'Hemî hilbijêre',
    selectInvert: 'Hilbijartinan veguhere',
    filterEmptyText: 'Parzûn tune',
    filterCheckAll: 'Hemî tiştan hilbijêrin',
    filterSearchPlaceholder: 'Di parzûnan de bigerin',
    emptyText: 'Daneyên tune',
    selectNone: 'Hemî daneyan paqij bike',
    selectionAll: 'Hemî daneyan hilbijêrin',
    sortTitle: 'Sort',
    expand: 'Rêzê berfireh bike',
    collapse: 'Rêzê hilweşîne',
    triggerDesc: 'Bikirtînin ji bo rêzkirina daketî',
    triggerAsc: 'Ji bo rêzkirina hilkişînê bikirtînin',
    cancelSort: 'Ji bo betalkirina dabeşkirinê bikirtînin',
  },
  Tour: {
    Next: 'Temam',
    Previous: 'Betal ke',
    Finish: 'Temam',
  },
  Modal: {
    okText: 'Temam',
    cancelText: 'Betal ke',
    justOkText: 'Temam',
  },
  Popconfirm: {
    okText: 'Temam',
    cancelText: 'Betal ke',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Lêgerîn',
    itemUnit: 'tişt',
    itemsUnit: 'tişt',
    remove: 'Rakirin',
    selectCurrent: 'Rûpelê heyî hilbijêrin',
    removeCurrent: 'Rûpelê heyî jêbirin',
    selectAll: 'Hemî daneyan hilbijêrin',
    deselectAll: 'Hemî daneyan jêbirin',
    removeAll: 'Hemî daneyan jêbirin',
    selectInvert: 'Rûpelê heyî berovajî bikin',
  },
  Upload: {
    uploading: 'Bardike...',
    removeFile: 'Pelê rabike',
    uploadError: 'Xeta barkirine',
    previewFile: 'Pelê pêşbibîne',
    downloadFile: 'Pelê dakêşin',
  },
  Empty: {
    description: 'Agahî tune',
  },
  Icon: {
    icon: 'icon',
  },
  Text: {
    edit: 'Sererast bike',
    copy: 'Kopî bike',
    copied: 'Kopî kirin',
    expand: 'Zêdetir nîşan bide',
    collapse: 'Hilweşîn',
  },
  Form: {
    optional: '(dilxwaz)',
    defaultValidateMessages: {
      default: 'Çewtiya rastandina zeviyê: ${label}',
      required: 'Ji kerema xwe ${label} binivîse',
      enum: '${label} divê yek ji van [${enum}] be',
      whitespace: '${label} nikare karakterek vala be',
      date: {
        format: 'Forma dîrokê ya ${label} nederbasdar e',
        parse: '${label} nikare bibe dîrokê',
        invalid: '${label} dîroka nederbasdar e',
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
        len: '${label} divê ${len} tîp be',
        min: '${label} divê bi kêmanî ${min} tîp be',
        max: '${label} divê herî zêde ${max} tîp be',
        range: '${label} divê di navbera ${min}-${max} tîpan de be',
      },
      number: {
        len: '${label} divê bi ${len} re wekhev be',
        min: '${label} divê bi kêmanî ${min} be',
        max: '${label} divê herî zêde ${max} be',
        range: '${label} divê di navbera ${min}-${max} de be',
      },
      array: {
        len: 'Divê ${len} ${label} hebe',
        min: 'Bi kêmanî ${min} ${label}',
        max: 'Herî zêde ${max} ${label}',
        range: 'Hejmara ${label} divê di navbera ${min}-${max} de be',
      },
      pattern: {
        mismatch: '${label} bi şablon ${pattern} re li hev nayê',
      },
    },
  },
  QRCode: {
    expired: 'Koda QR qediya',
    refresh: 'Refresh',
    scanned: 'Scanned',
  },
  ColorPicker: {
    presetEmpty: 'Empty',
    transparent: 'Transparent',
    singleColor: 'Yek reng',
    gradientColor: 'Rengê gradient',
  },
};

export default localeValues;
