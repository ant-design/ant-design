import Pagination from 'rc-pagination/lib/locale/it_IT';
import DatePicker from '../date-picker/locale/it_IT';
import TimePicker from '../time-picker/locale/it_IT';
import Calendar from '../calendar/locale/it_IT';
import { Locale } from '../locale-provider';

/* eslint-disable no-template-curly-in-string */
var typeTemplate = "Il valore del campo ${label} non è valido per il tipo: ${type}";

const localeValues: Locale = {
  locale: 'it',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'Selezionare',
  },
  Table: {
    filterTitle: 'Menù Filtro',
    filterConfirm: 'OK',
    filterReset: 'Reset',
    selectAll: 'Seleziona pagina corrente',
    selectInvert: 'Inverti selezione nella pagina corrente',
    sortTitle: 'Ordina',
    triggerDesc: 'Clicca per ordinare in modo discendente',
    triggerAsc: '﻿Clicca per ordinare in modo ascendente',
    cancelSort: 'Clicca per eliminare i filtri',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Annulla',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Annulla',
  },
  Transfer: {
    searchPlaceholder: 'Cerca qui',
    itemUnit: 'elemento',
    itemsUnit: 'elementi',
    remove: 'Deseleziona',
    selectCurrent: 'Seleziona la pagina corrente',
    removeCurrent: 'Deseleziona la pagina corrente',
    selectAll: 'Seleziona tutto',
    removeAll: 'Deseleziona tutto',
    selectInvert: 'Inverti selezione'
  },
  Upload: {
    uploading: 'Caricamento...',
    removeFile: 'Rimuovi il file',
    uploadError: 'Errore di caricamento',
    previewFile: 'Anteprima file',
    downloadFile: 'Download file',
  },
  Empty: {
    description: 'Nessun dato',
  },
  Icon: {
    icon: 'icona',
  },
  Text: {
    edit: 'modifica',
    copy: 'copia',
    copied: 'copia effettuata',
    expand: 'espandi',
  },
  PageHeader: {
    back: 'Indietro'
  },
  Form: {
  optional: '(opzionale)',
  defaultValidateMessages: {
    "default": 'Errore nel campo ${label}',
    required: 'Il campo ${label} è obbligatorio',
    "enum": 'Il valore del campo ${label} deve essere uno dei seguenti: [${enum}]',
    whitespace: 'Il valore del campo ${label} non può essere vuoto',
    date: {
      format: "Il valore del campo ${label} non è nel formato corretto",
      parse: 'Il valore del campo ${label} non può essere convertito in data',
      invalid: "Il valore del campo ${label} non è una data valida"
    },
    types: {
      string: typeTemplate,
      method: typeTemplate,
      array: typeTemplate,
      object: typeTemplate,
      number: typeTemplate,
      date: typeTemplate,
      "boolean": typeTemplate,
      integer: typeTemplate,
      "float": typeTemplate,
      regexp: typeTemplate,
      email: typeTemplate,
      url: typeTemplate,
      hex: typeTemplate
    },
    string: {
      len: 'La lunghezza del campo ${label} deve essere di ${len} caratteri',
      min: 'La lunghezza del campo ${label} deve essere minimo ${min} caratteri',
      max: 'La lunghezza del campo ${label} deve essere massimo ${max} caratteri',
      range: 'La lunghezza del campo ${label} deve essere fra ${min} e ${max} caratteri'
    },
    number: {
      len: 'Il valore del campo ${label} deve essere ${len}',
      min: 'Il valore del campo ${label} deve essere maggiore di ${min}',
      max: 'Il valore del campo ${label} deve essere minore di ${max}',
      range: 'Il valore del campo ${label} deve essere compreso fra ${min} e ${max}'
    },
    array: {
      len: 'La lunghezza della lista ${label} deve essere ${len}',
      min: 'La lunghezza della lista ${label} deve essere almeno ${min}',
      max: 'La lunghezza della lista ${label} deve essere al massimo ${max}',
      range: 'La lunghezza della lista ${label} deve essere ${min}-${max}'
    },
    pattern: {
      mismatch: 'Il valore del campo ${label} non corrisponde al formato: ${pattern}'
    }
  }
},
Image: {
  preview: 'Anteprima'
}
};

export default localeValues;
