import Pagination from '@rc-component/pagination/locale/gl_ES';

import type { Locale } from '.';
import Calendar from '../calendar/locale/gl_ES';
import DatePicker from '../date-picker/locale/gl_ES';
import TimePicker from '../time-picker/locale/gl_ES';

const typeTemplate = '${label} non é un ${type} válido';

const localeValues: Locale = {
  locale: 'gl',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'Escolla',
    close: 'Cerrar',
    show: 'Mostrar',
    hide: 'Ocultar',
    sortable: 'clasificable',
    clear: 'Limpar',
  },
  Table: {
    filterTitle: 'Filtrar menú',
    filterConfirm: 'Aceptar',
    filterReset: 'Reiniciar',
    selectAll: 'Seleccionar todo',
    selectInvert: 'Invertir selección',
    sortTitle: 'Ordenar',
    filterEmptyText: 'Sen filtros',
    filterCheckAll: 'Selecciona todos os elementos',
    filterSearchPlaceholder: 'Busca en filtros',
    emptyText: 'Sen datos',
    selectNone: 'Borrar todos os datos',
    selectionAll: 'Seleccione todos os datos',
    expand: 'Expandir fila',
    collapse: 'Contraer fila',
    triggerDesc: 'Fai clic para ordenar descendente',
    triggerAsc: 'Fai clic para ordenar ascendente',
    cancelSort: 'Fai clic para cancelar a clasificación',
  },
  Tour: {
    Next: 'Avanzar',
    Previous: 'Anterior',
    Finish: 'Finalizar',
  },
  Modal: {
    okText: 'Aceptar',
    cancelText: 'Cancelar',
    justOkText: 'Aceptar',
  },
  Popconfirm: {
    okText: 'Aceptar',
    cancelText: 'Cancelar',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Buscar aquí',
    itemUnit: 'elemento',
    itemsUnit: 'elementos',
    remove: 'Eliminar',
    selectCurrent: 'Seleccione a páxina actual',
    removeCurrent: 'Eliminar a páxina actual',
    selectAll: 'Seleccione todos os datos',
    deselectAll: 'Deseleccione todos os datos',
    removeAll: 'Elimina todos os datos',
    selectInvert: 'Inverte a páxina actual',
  },
  Upload: {
    uploading: 'Subindo...',
    removeFile: 'Eliminar arquivo',
    uploadError: 'Error ao subir o arquivo',
    previewFile: 'Vista previa',
    downloadFile: 'Descargar arquivo',
  },
  Empty: {
    description: 'Non hai datos',
  },
  Icon: {
    icon: 'icona',
  },
  Text: {
    edit: 'editar',
    copy: 'copiar',
    copied: 'copiado',
    expand: 'expandir',
    collapse: 'Colapsar',
  },
  Form: {
    optional: '(opcional)',
    defaultValidateMessages: {
      default: 'Error de validación do campo ${label}',
      required: 'Por favor complete ${label}',
      enum: '${label} ten que ser un de [${enum}]',
      whitespace: '${label} non pode ter ningún caracter en branco',
      date: {
        format: 'O formato de data ${label} non é válido',
        parse: '${label} non se pode convertir a unha data',
        invalid: '${label} é unha data inválida',
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
        len: '${label} debe ter ${len} caracteres',
        min: '${label} debe ter como mínimo ${min} caracteres',
        max: '${label} debe ter ata ${max} caracteres',
        range: '${label} debe ter entre ${min}-${max} caracteres',
      },
      number: {
        len: '${label} debe ser igual a ${len}',
        min: '${label} valor mínimo é ${min}',
        max: '${label} valor máximo é ${max}',
        range: '${label} debe estar entre ${min}-${max}',
      },
      array: {
        len: 'Debe ser ${len} ${label}',
        min: 'Como mínimo ${min} ${label}',
        max: 'Como máximo ${max} ${label}',
        range: 'O valor de ${label} debe estar entre ${min}-${max}',
      },
      pattern: {
        mismatch: '${label} non coincide co patrón ${pattern}',
      },
    },
  },
  QRCode: {
    expired: 'O código QR caducou',
    refresh: 'Actualizar',
    scanned: 'Escaneado',
  },
  ColorPicker: {
    presetEmpty: 'Baleiro',
    transparent: 'Transparente',
    singleColor: 'Cor única',
    gradientColor: 'Cor degradado',
  },
};

export default localeValues;
