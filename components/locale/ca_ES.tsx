/* eslint-disable no-template-curly-in-string */
import Pagination from 'rc-pagination/lib/locale/ca_ES';
import DatePicker from '../date-picker/locale/ca_ES';
import TimePicker from '../time-picker/locale/ca_ES';
import Calendar from '../calendar/locale/ca_ES';
import { Locale } from '../locale-provider';

const typeTemplate = '${label} no és un ${type} vàlid';

const localeValues: Locale = {
  locale: 'ca',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'Seleccionar',
  },
  Table: {
    filterTitle: 'Filtrar el menú',
    filterConfirm: 'D’acord',
    filterReset: 'Reiniciar',
    filterEmptyText: 'Sense filtres',
    selectAll: 'Seleccionar la pàgina actual',
    selectInvert: 'Invertir la selecció',
    selectionAll: 'Seleccionar-ho tot',
    sortTitle: 'Ordenar',
    expand: 'Ampliar la fila',
    collapse: 'Plegar la fila',
    triggerDesc: 'Ordre descendent',
    triggerAsc: 'Ordre ascendent',
    cancelSort: 'Desactivar l’ordre',
  },
  Modal: {
    okText: 'D’acord',
    cancelText: 'Cancel·lar',
    justOkText: 'D’acord',
  },
  Popconfirm: {
    okText: 'D’acord',
    cancelText: 'Cancel·lar',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Cercar',
    itemUnit: 'ítem',
    itemsUnit: 'ítems',
    remove: 'Eliminar',
    selectCurrent: 'Seleccionar la pàgina actual',
    removeCurrent: 'Eliminar la selecció',
    selectAll: 'Seleccionar-ho tot',
    removeAll: 'Eliminar-ho tot',
    selectInvert: 'Invertir la selecció',
  },
  Upload: {
    uploading: 'Carregant…',
    removeFile: 'Eliminar el fitxer',
    uploadError: 'Error de càrrega',
    previewFile: 'Vista prèvia del fitxer',
    downloadFile: 'Baixar el fitxer',
  },
  Empty: {
    description: 'Sense dades',
  },
  Icon: {
    icon: 'icona',
  },
  Text: {
    edit: 'Editar',
    copy: 'Copiar',
    copied: 'Copiat',
    expand: 'Ampliar',
  },
  PageHeader: {
    back: 'Enrere',
  },
  Form: {
    defaultValidateMessages: {
      default: 'Error de validació del camp ${label}',
      required: 'Introdueix ${label}',
      enum: '${label} ha de ser un de [${enum}]',
      whitespace: '${label} no pot ser un caràcter en blanc',
      date: {
        format: 'El format de la data de ${label} és invàlid',
        parse: '${label} no es pot convertir a cap data',
        invalid: '${label} és una data invàlida',
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
        len: '${label} ha de ser de ${len} caràcters',
        min: '${label} ha de tenir com a mínim ${min} caràcters',
        max: '${label} ha de tenir com a màxim ${max} caràcters',
        range: '${label} ha d’estar entre ${min} i ${max} caràcters',
      },
      number: {
        len: '${label} ha de ser igual a ${len}',
        min: '${label} ha de tenir un valor mínim de ${min}',
        max: '${label} ha de tenir un valor màxim de ${max}',
        range: '${label} ha de tenir un valor entre ${min} i ${max}',
      },
      array: {
        len: 'La llargada de ${label} ha de ser de ${len}',
        min: 'La llargada de ${label} ha de ser com a mínim de ${min}',
        max: 'La llargada de ${label} ha de ser com a màxim de ${max}',
        range: 'La llargada de ${label} ha d’estar entre ${min} i ${max}',
      },
      pattern: {
        mismatch: '${label} no coincideix amb el patró ${pattern}',
      },
    },
  },
};

export default localeValues;
