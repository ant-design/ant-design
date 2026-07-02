import Pagination from '@rc-component/pagination/locale/lv_LV';

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
    show: 'Rādīt',
    hide: 'Slēpt',
    placeholder: 'Lūdzu, atlasiet',
    sortable: 'šķirojams',
  },
  Table: {
    filterTitle: 'Filtrēšanas izvēlne',
    filterConfirm: 'OK',
    filterReset: 'Atiestatīt',
    selectAll: 'Atlasiet pašreizējo lapu',
    selectInvert: 'Pārvērst pašreizējo lapu',
    filterEmptyText: 'Nav filtru',
    filterCheckAll: 'Atlasiet visus vienumus',
    filterSearchPlaceholder: 'Meklēt filtros',
    emptyText: 'Nav datu',
    selectNone: 'Notīrīt visus datus',
    selectionAll: 'Atlasiet visus datus',
    sortTitle: 'Kārtot',
    expand: 'Izvērst rindu',
    collapse: 'Sakļaut rindu',
    triggerDesc: 'Noklikšķiniet, lai kārtotu dilstošā secībā',
    triggerAsc: 'Noklikšķiniet, lai kārtotu augošā secībā',
    cancelSort: 'Noklikšķiniet, lai atceltu kārtošanu',
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
    remove: 'Noņemt',
    selectCurrent: 'Atlasiet pašreizējo lapu',
    removeCurrent: 'Noņemt pašreizējo lapu',
    selectAll: 'Atlasiet visus datus',
    deselectAll: 'Noņemiet visu datu atlasi',
    removeAll: 'Noņemiet visus datus',
    selectInvert: 'Apgriezt pašreizējo lapu',
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
  Icon: {
    icon: 'ikonu',
  },
  Text: {
    edit: 'Rediģēt',
    copy: 'Kopēt',
    copied: 'Kopēts',
    expand: 'Izvērst',
    collapse: 'Sakļaut',
  },
  Form: {
    optional: '(pēc izvēles)',
    defaultValidateMessages: {
      default: 'Lauka ${label} validācijas kļūda',
      required: 'Lūdzu ievadiet ${label}',
      enum: '${label} ir jābūt vienam no: [${enum}]',
      whitespace: '${label} nevar būt tukša rakstzīme',
      date: {
        format: '${label} datuma formāts ir nederīgs',
        parse: '${label} nav iespējams konvertēt par datumu',
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
        len: '${label} jābūt tieši ${len} rakstzīmju garam',
        min: '${label} jābūt vismaz ${min} rakstzīmju garam',
        max: '${label} drīkst būt ne vairāk kā ${max} rakstzīmes',
        range: '${label} jābūt ${min}–${max} rakstzīmju garam',
      },
      number: {
        len: '${label} jābūt vienādam ar ${len}',
        min: '${label} jābūt vismaz ${min}',
        max: '${label} drīkst būt ne vairāk kā ${max}',
        range: '${label} jābūt starp ${min}–${max}',
      },
      array: {
        len: '${label} jāsatur tieši ${len} elements(-i)',
        min: '${label} jāsatur vismaz ${min} elements(-i)',
        max: '${label} drīkst saturēt ne vairāk kā ${max} elementus',
        range: '${label} jāsatur ${min}–${max} elementi',
      },
      pattern: {
        mismatch: '${label} neatbilst šablonam ${pattern}',
      },
    },
  },
  QRCode: {
    expired: 'QR kods ir beidzies',
    refresh: 'Atsvaidzināt',
    scanned: 'Skenēts',
  },
  ColorPicker: {
    presetEmpty: 'Tukšs',
    transparent: 'Caurspīdīgs',
    singleColor: 'Vienkrāsains',
    gradientColor: 'Gradienta krāsa',
  },
};

export default localeValues;
