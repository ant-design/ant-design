import Pagination from '@rc-component/pagination/lib/locale/lv_LV';

import type { Locale } from '.';
import Calendar from '../calendar/locale/lv_LV';
import DatePicker from '../date-picker/locale/lv_LV';
import TimePicker from '../time-picker/locale/lv_LV';

const typeTemplate = '${label} nav derīgs ${type}';

const localeValues: Locale = {
  locale: 'lv',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    close: 'Aizvērt',
  },
  Table: {
    filterTitle: 'Filtrēšanas izvēlne',
    filterConfirm: 'OK',
    filterReset: 'Atiestatīt',
    selectAll: 'Atlasiet pašreizējo lapu',
    selectInvert: 'Pārvērst pašreizējo lapu',
  },
  Tour: {
    Next: 'Nākamais',
    Previous: 'Iepriekšējais',
    Finish: 'Pabeigt',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Atcelt',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Atcelt',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Meklēt šeit',
    itemUnit: 'vienumu',
    itemsUnit: 'vienumus',
  },
  Upload: {
    uploading: 'Augšupielāde...',
    removeFile: 'Noņemt failu',
    uploadError: 'Augšupielādes kļūda',
    previewFile: 'Priekšskatiet failu',
    downloadFile: 'Lejupielādēt failu',
  },
  Empty: {
    description: 'Nav datu',
  },
  Text: {
    edit: 'Rediģēt',
    copy: 'Kopēt',
    copied: 'Nokopēts',
    expand: 'Izvērst',
  },
  Form: {
    optional: '(neobligāts)',
    defaultValidateMessages: {
      default: 'Lauka validācijas kļūda: ${label}',
      required: 'Lūdzu, ievadiet ${label}',
      enum: '${label} jābūt vienam no [${enum}]',
      whitespace: '${label} nevar būt tukšs simbols',
      date: {
        format: '${label} datuma formāts ir nederīgs',
        parse: '${label} nevar pārveidot par datumu',
        invalid: '${label} ir nederīgs datums',
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
        len: '${label} jābūt ${len} rakstzīmēm',
        min: '${label} jābūt vismaz ${min} rakstzīmēm',
        max: '${label} var būt līdz ${max} rakstzīmēm',
        range: '${label} jābūt starp ${min}-${max} rakstzīmēm',
      },
      number: {
        len: '${label} jābūt vienādam ar ${len}',
        min: '${label} jābūt vismaz ${min}',
        max: '${label} var būt maksimāli ${max}',
        range: '${label} jābūt starp ${min}-${max}',
      },
      array: {
        len: 'Jābūt ${len} ${label}',
        min: 'Vismaz ${min} ${label}',
        max: 'Maksimāli ${max} ${label}',
        range: '${label} daudzumam jābūt starp ${min}-${max}',
      },
      pattern: {
        mismatch: '${label} neatbilst paraugam ${pattern}',
      },
    },
  },
};

export default localeValues;
