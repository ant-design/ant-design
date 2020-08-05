/* eslint-disable no-template-curly-in-string */
import Pagination from 'rc-pagination/lib/locale/es_ES';
import DatePicker from '../date-picker/locale/es_ES';
import TimePicker from '../time-picker/locale/es_ES';
import Calendar from '../calendar/locale/es_ES';
import { Locale } from '../locale-provider';

const typeTemplate = '${label} no es un ${type} válido';

const localeValues: Locale = {
  locale: 'es',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'Seleccione',
  },
  Table: {
    filterTitle: 'Filtrar menú',
    filterConfirm: 'Aceptar',
    filterReset: 'Reiniciar',
    selectAll: 'Seleccionar todo',
    selectInvert: 'Invertir selección',
    sortTitle: 'Ordenar',
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
    searchPlaceholder: 'Buscar aquí',
    itemUnit: 'elemento',
    itemsUnit: 'elementos',
  },
  Upload: {
    uploading: 'Subiendo...',
    removeFile: 'Eliminar archivo',
    uploadError: 'Error al subir el archivo',
    previewFile: 'Vista previa',
    downloadFile: 'Descargar archivo',
  },
  Empty: {
    description: 'No hay datos',
  },
  Icon: {
    icon: 'ícono',
  },
  Text: {
    edit: 'editar',
    copy: 'copiar',
    copied: 'copiado',
    expand: 'expandir',
  },
  PageHeader: {
    back: 'volver',
  },
  Form: {
    defaultValidateMessages: {
      default: 'Error de validación del campo ${label}',
      required: 'Por favor ingresar ${label}',
      enum: '${label} debe ser uno de [${enum}]',
      whitespace: '${label} no puede ser un carácter en blanco',
      date: {
        format: 'El formato de fecha de ${label} es inválido',
        parse: '${label} no se puede convertir a una fecha',
        invalid: '${label} es una fecha inválida',
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
        len: '${label} debe tener ${len} caracteres',
        min: '${label} debe tener al menos ${min} caracteres',
        max: '${label} debe tener hasta ${max} caracteres',
        range: '${label} debe tener entre ${min}-${max} caracteres',
      },
      number: {
        len: '${label} debe ser igual a ${len}',
        min: '${label} valor mínimo es ${min}',
        max: '${label} valor máximo es ${max}',
        range: '${label} debe estar entre ${min}-${max}',
      },
      array: {
        len: 'Debe ser ${len} ${label}',
        min: 'Al menos ${min} ${label}',
        max: 'A lo mucho ${max} ${label}',
        range: 'El monto de ${label} debe estar entre ${min}-${max}',
      },
      pattern: {
        mismatch: '${label} no coincide con el patrón ${pattern}',
      },
    },
  },
};

export default localeValues;
