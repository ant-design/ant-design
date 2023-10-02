/* eslint-disable no-template-curly-in-string */
import Pagination from 'rc-pagination/lib/locale/lt_LT';
import type { Locale } from '.';
import Calendar from '../calendar/locale/lt_LT';
import DatePicker from '../date-picker/locale/lt_LT';
import TimePicker from '../time-picker/locale/lt_LT';

const typeTemplate: string = '${label} neatitinka tipo ${type}';

const localeValues: Locale = {
  locale: 'lt',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'Pasirinkite',
  },
  Table: {
    filterTitle: 'Filtras',
    filterConfirm: 'Gerai',
    filterReset: 'Atstatyti',
    filterEmptyText: 'Be filtrų',
    filterCheckall: 'Pasirinkti visus',
    filterSearchPlaceholder: 'Ieškoti filtruose',
    emptyText: 'Nėra duomenų',
    selectAll: 'Pasirinkti viską',
    selectInvert: 'Apversti pasirinkimą',
    selectNone: 'Išvalyti visus',
    selectionAll: 'Rinktis visus',
    sortTitle: 'Rikiavimas',
    expand: 'Išskleisti',
    collapse: 'Suskleisti',
    triggerDesc: 'Spustelėkite norėdami rūšiuoti mažėjančia tvarka',
    triggerAsc: 'Spustelėkite norėdami rūšiuoti didėjančia tvarka',
    cancelSort: 'Spustelėkite, kad atšauktumėte rūšiavimą',
  },
  Tour: {
    Next: 'Kitas',
    Previous: 'Ankstesnis',
    Finish: 'Baigti',
  },
  Modal: {
    okText: 'Taip',
    cancelText: 'Atšaukti',
    justOkText: 'Gerai',
  },
  Popconfirm: {
    okText: 'Taip',
    cancelText: 'Atšaukti',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Paieška',
    itemUnit: 'vnt.',
    itemsUnit: 'vnt.',
    remove: 'Pašalinti',
    selectCurrent: 'Pasirinkti dabartinį puslapį',
    removeCurrent: 'Ištrinti dabartinį puslapį',
    selectAll: 'Pasirinkti viską',
    removeAll: 'Ištrinti viską',
    selectInvert: 'Apversti pasirinkimą',
  },
  Upload: {
    uploading: 'Įkeliami duomenys...',
    removeFile: 'Ištrinti failą',
    uploadError: 'Įkeliant įvyko klaida',
    previewFile: 'Failo peržiūra',
    downloadFile: 'Atsisiųsti failą',
  },
  Empty: {
    description: 'Nėra duomenų',
  },
  Icon: {
    icon: 'piktograma',
  },
  Text: {
    edit: 'Redaguoti',
    copy: 'Kopijuoti',
    copied: 'Nukopijuota',
    expand: 'Plačiau',
  },
  PageHeader: {
    back: 'Atgal',
  },
  Form: {
    optional: '(neprivaloma)',
    defaultValidateMessages: {
      default: 'Klaida laukelyje ${label}',
      required: 'Prašome įvesti ${label}',
      enum: '${label} turi būti vienas iš [${enum}]',
      whitespace: '${label} negali likti tuščias',
      date: {
        format: '${label} neteisingas datos formatas',
        parse: '${label} negali būti konvertuotas į datą',
        invalid: '${label} neatitinka datos formato',
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
        len: '${label} turi būti ${len} simbolių',
        min: '${label} turi būti bent ${min} simbolių',
        max: '${label} turi būti ne ilgesnis nei ${max} simbolių',
        range: 'Laukelio ${label} reikšmės ribos ${min}-${max} simbolių',
      },
      number: {
        len: '${label} turi būti lygi ${len}',
        min: '${label} turi būti lygus arba didesnis už ${min}',
        max: '${label} turi būti lygus arba mažesnis už ${max}',
        range: '${label} turi būti tarp ${min}-${max}',
      },
      array: {
        len: 'Pasirinktas kiekis ${label} turi būti lygus ${len}',
        min: 'Pasirinktas kiekis ${label} turi būti bent ${min}',
        max: 'Pasirinktas kiekis ${label} turi būti ne ilgesnis nei ${max}',
        range: 'Pasirinktas ${label} kiekis turi būti tarp ${min}-${max}',
      },
      pattern: {
        mismatch: '${label} neatitinka modelio ${pattern}',
      },
    },
  },
  Image: {
    preview: 'Peržiūrėti',
  },
  QRCode: {
    expired: 'QR kodo galiojimas baigėsi',
    refresh: 'Atnaujinti',
  },
  ColorPicker: {
    presetEmpty: 'Tuščia',
  },
};

export default localeValues;
