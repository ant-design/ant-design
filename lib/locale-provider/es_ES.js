"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _es_ES = _interopRequireDefault(require("rc-pagination/lib/locale/es_ES"));

var _es_ES2 = _interopRequireDefault(require("../date-picker/locale/es_ES"));

var _es_ES3 = _interopRequireDefault(require("../time-picker/locale/es_ES"));

var _es_ES4 = _interopRequireDefault(require("../calendar/locale/es_ES"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'es',
  Pagination: _es_ES["default"],
  DatePicker: _es_ES2["default"],
  TimePicker: _es_ES3["default"],
  Calendar: _es_ES4["default"],
  Table: {
    filterTitle: 'Filtrar menú',
    filterConfirm: 'Aceptar',
    filterReset: 'Reiniciar',
    selectAll: 'Seleccionar todo',
    selectInvert: 'Invertir selección'
  },
  Modal: {
    okText: 'Aceptar',
    cancelText: 'Cancelar',
    justOkText: 'Aceptar'
  },
  Popconfirm: {
    okText: 'Aceptar',
    cancelText: 'Cancelar'
  },
  Transfer: {
    searchPlaceholder: 'Buscar aquí',
    itemUnit: 'elemento',
    itemsUnit: 'elementos'
  },
  Upload: {
    uploading: 'Subiendo...',
    removeFile: 'Eliminar archivo',
    uploadError: 'Error al subir el archivo',
    previewFile: 'Vista previa'
  },
  Empty: {
    description: 'No hay datos'
  }
};
exports["default"] = _default;