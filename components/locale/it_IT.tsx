import Pagination from 'rc-pagination/lib/locale/it_IT';
import DatePicker from '../date-picker/locale/it_IT';
import TimePicker from '../time-picker/locale/it_IT';
import Calendar from '../calendar/locale/it_IT';
import { Locale } from '../locale-provider';

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
};

export default localeValues;
