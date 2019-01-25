"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _is_IS = _interopRequireDefault(require("rc-pagination/lib/locale/is_IS"));

var _is_IS2 = _interopRequireDefault(require("../date-picker/locale/is_IS"));

var _is_IS3 = _interopRequireDefault(require("../time-picker/locale/is_IS"));

var _is_IS4 = _interopRequireDefault(require("../calendar/locale/is_IS"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'is',
  Pagination: _is_IS["default"],
  DatePicker: _is_IS2["default"],
  TimePicker: _is_IS3["default"],
  Calendar: _is_IS4["default"],
  Table: {
    filterTitle: 'Afmarkanir',
    filterConfirm: 'Staðfesta',
    filterReset: 'Núllstilla',
    selectAll: 'Velja allt',
    selectInvert: 'Viðsnúa vali'
  },
  Modal: {
    okText: 'Áfram',
    cancelText: 'Hætta við',
    justOkText: 'Í lagi'
  },
  Popconfirm: {
    okText: 'Áfram',
    cancelText: 'Hætta við'
  },
  Transfer: {
    searchPlaceholder: 'Leita hér',
    itemUnit: 'færsla',
    itemsUnit: 'færslur'
  },
  Upload: {
    uploading: 'Hleð upp...',
    removeFile: 'Fjarlægja skrá',
    uploadError: 'Villa við að hlaða upp',
    previewFile: 'Forskoða skrá'
  },
  Empty: {
    description: 'Engin gögn'
  }
};
exports["default"] = _default;