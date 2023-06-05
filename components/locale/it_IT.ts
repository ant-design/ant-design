/* eslint-disable no-template-curly-in-string */
import Pagination from 'rc-pagination/lib/locale/it_IT';
import Calendar from '../calendar/locale/it_IT';
import DatePicker from '../date-picker/locale/it_IT';
import type { Locale } from '.';
import TimePicker from '../time-picker/locale/it_IT';

const typeTemplate = ' ${label} non è un ${type} valido';

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
    filterEmptyText: 'Senza filtri',
    filterCheckall: 'Seleziona tutti',
    filterSearchPlaceholder: 'Cerca nei filtri',
    emptyText: 'Senza dati',
    selectAll: 'Seleziona pagina corrente',
    selectInvert: 'Inverti selezione nella pagina corrente',
    selectNone: 'Deseleziona tutto',
    selectionAll: 'Seleziona tutto',
    sortTitle: 'Ordina',
    expand: 'Espandi riga',
    collapse: 'Comprimi riga ',
    triggerDesc: 'Clicca per ordinare in modo discendente',
    triggerAsc: 'Clicca per ordinare in modo ascendente',
    cancelSort: "Clicca per eliminare l'ordinamento",
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
    titles: ['', ''],
    searchPlaceholder: 'Cerca qui',
    itemUnit: 'elemento',
    itemsUnit: 'elementi',
    remove: 'Elimina',
    selectCurrent: 'Seleziona la pagina corrente',
    removeCurrent: 'Rimuovi la pagina corrente',
    selectAll: 'Seleziona tutti i dati',
    removeAll: 'Rimuovi tutti i dati',
    selectInvert: 'Inverti la pagina corrente',
  },
  Upload: {
    uploading: 'Caricamento...',
    removeFile: 'Rimuovi il file',
    uploadError: 'Errore di caricamento',
    previewFile: 'Anteprima file',
    downloadFile: 'Scarica file',
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
    back: 'Torna',
  },
  Form: {
    optional: '(opzionale)',
    defaultValidateMessages: {
      default: 'Errore di convalida del campo ${label}',
      required: 'Si prega di inserire ${label}',
      enum: '${label} deve essere uno di [${enum}]',
      whitespace: '${label} non può essere un carattere vuoto',
      date: {
        format: 'Il formato della data ${label} non è valido',
        parse: '${label} non può essere convertito in una data',
        invalid: '${label} non è una data valida',
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
        len: '${label} deve avere ${len} caratteri',
        min: '${label} deve contenere almeno ${min} caratteri',
        max: '${label} deve contenere fino a ${max} caratteri',
        range: '${label} deve contenere tra ${min}-${max} caratteri',
      },
      number: {
        len: '${label} deve essere uguale a ${len}',
        min: '${label} valore minimo è ${min}',
        max: '${label} valor e massimo è ${max}',
        range: '${label} deve essere compreso tra ${min}-${max}',
      },
      array: {
        len: 'Deve essere ${len} ${label}',
        min: 'Almeno ${min} ${label}',
        max: 'Massimo ${max} ${label}',
        range: 'Il totale di ${label} deve essere compreso tra ${min}-${max}',
      },
      pattern: {
        mismatch: '${label} non corrisponde al modello ${pattern}',
      },
    },
  },
  Image: {
    preview: 'Anteprima',
  },
};

export default localeValues;
