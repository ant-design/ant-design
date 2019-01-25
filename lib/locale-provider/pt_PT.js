"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pt_PT = _interopRequireDefault(require("rc-pagination/lib/locale/pt_PT"));

var _pt_PT2 = _interopRequireDefault(require("../date-picker/locale/pt_PT"));

var _pt_PT3 = _interopRequireDefault(require("../time-picker/locale/pt_PT"));

var _pt_PT4 = _interopRequireDefault(require("../calendar/locale/pt_PT"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'pt',
  Pagination: _pt_PT["default"],
  DatePicker: _pt_PT2["default"],
  TimePicker: _pt_PT3["default"],
  Calendar: _pt_PT4["default"],
  Table: {
    filterTitle: 'Filtro',
    filterConfirm: 'Aplicar',
    filterReset: 'Reiniciar',
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
    searchPlaceholder: 'Procurar...',
    itemUnit: 'item',
    itemsUnit: 'itens'
  },
  Upload: {
    uploading: 'A carregar...',
    removeFile: 'Remover',
    uploadError: 'Erro ao carregar',
    previewFile: 'Pré-visualizar'
  },
  Empty: {
    description: 'Sem resultados'
  }
};
exports["default"] = _default;