"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pt_BR = _interopRequireDefault(require("rc-pagination/lib/locale/pt_BR"));

var _pt_BR2 = _interopRequireDefault(require("../date-picker/locale/pt_BR"));

var _pt_BR3 = _interopRequireDefault(require("../time-picker/locale/pt_BR"));

var _pt_BR4 = _interopRequireDefault(require("../calendar/locale/pt_BR"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'pt-br',
  Pagination: _pt_BR["default"],
  DatePicker: _pt_BR2["default"],
  TimePicker: _pt_BR3["default"],
  Calendar: _pt_BR4["default"],
  Table: {
    filterTitle: 'Filtro',
    filterConfirm: 'OK',
    filterReset: 'Resetar',
    selectAll: 'Selecionar página atual',
    selectInvert: 'Inverter seleção'
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Cancelar',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Cancelar'
  },
  Transfer: {
    searchPlaceholder: 'Procurar',
    itemUnit: 'item',
    itemsUnit: 'items'
  },
  Upload: {
    uploading: 'Enviando...',
    removeFile: 'Remover arquivo',
    uploadError: 'Erro no envio',
    previewFile: 'Visualizar arquivo'
  },
  Empty: {
    description: 'Não há dados'
  }
};
exports["default"] = _default;