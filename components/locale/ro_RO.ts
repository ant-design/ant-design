/* eslint-disable no-template-curly-in-string */
import Pagination from 'rc-pagination/lib/locale/ro_RO';
import Calendar from '../calendar/locale/ro_RO';
import DatePicker from '../date-picker/locale/ro_RO';
import type { Locale } from '.';
import TimePicker from '../time-picker/locale/ro_RO';

const typeTemplate = '${label} nu conține tipul corect (${type})';

const localeValues: Locale = {
  locale: 'ro',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'Selectează',
  },
  Table: {
    filterTitle: 'Filtrează',
    filterConfirm: 'OK',
    filterReset: 'Resetează',
    filterEmptyText: 'Fără filtre',
    emptyText: 'Nu există date',
    selectAll: 'Selectează pagina curentă',
    selectInvert: 'Inversează pagina curentă',
    selectNone: 'Șterge selecția',
    selectionAll: 'Selectează toate datele',
    sortTitle: 'Ordonează',
    expand: 'Extinde rândul',
    collapse: 'Micșorează rândul',
    triggerDesc: 'Apasă pentru ordonare descrescătoare',
    triggerAsc: 'Apasă pentru ordonare crescătoare',
    cancelSort: 'Apasă pentru a anula ordonarea',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Anulare',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Anulare',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Căutare',
    itemUnit: 'element',
    itemsUnit: 'elemente',
    remove: 'Șterge',
    selectCurrent: 'Selectează pagina curentă',
    removeCurrent: 'Șterge pagina curentă',
    selectAll: 'Selectează toate datele',
    removeAll: 'Șterge toate datele',
    selectInvert: 'Inversează pagina curentă',
  },
  Upload: {
    uploading: 'Se transferă...',
    removeFile: 'Înlătură fișierul',
    uploadError: 'Eroare la upload',
    previewFile: 'Previzualizare fișier',
    downloadFile: 'Descărcare fișier',
  },
  Empty: {
    description: 'Fără date',
  },
  Icon: {
    icon: 'icon',
  },
  Text: {
    edit: 'editează',
    copy: 'copiază',
    copied: 'copiat',
    expand: 'extinde',
  },
  PageHeader: {
    back: 'înapoi',
  },
  Form: {
    optional: '(opțional)',
    defaultValidateMessages: {
      default: 'Eroare la validarea câmpului ${label}',
      required: 'Vă rugăm introduceți ${label}',
      enum: '${label} trebuie să fie una din valorile [${enum}]',
      whitespace: '${label} nu poate fi gol',
      date: {
        format: '${label} - data nu este în formatul corect',
        parse: '${label} nu poate fi convertit la o dată',
        invalid: '${label} este o dată invalidă',
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
        len: '${label} trebuie să conțină ${len} caractere',
        min: '${label} trebuie să conțină cel puțin ${min} caractere',
        max: '${label} trebuie să conțină cel mult ${max} caractere',
        range: '${label} trebuie să conțină între ${min}-${max} caractere',
      },
      number: {
        len: '${label} trebuie să conțină ${len} cifre',
        min: '${label} trebuie să fie minim ${min}',
        max: '${label} trebuie să fie maxim ${max}',
        range: '${label} trebuie să fie între ${min}-${max}',
      },
      array: {
        len: '${label} trebuie să conțină ${len} elemente',
        min: '${label} trebuie să conțină cel puțin ${min} elemente',
        max: '${label} trebuie să conțină cel mult ${max} elemente',
        range: '${label} trebuie să conțină între ${min}-${max} elemente',
      },
      pattern: {
        mismatch: '${label} nu respectă șablonul ${pattern}',
      },
    },
  },
  Image: {
    preview: 'Preview',
  },
};

export default localeValues;
