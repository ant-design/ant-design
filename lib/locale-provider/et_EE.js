"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _et_EE = _interopRequireDefault(require("rc-pagination/lib/locale/et_EE"));

var _et_EE2 = _interopRequireDefault(require("../date-picker/locale/et_EE"));

var _et_EE3 = _interopRequireDefault(require("../time-picker/locale/et_EE"));

var _et_EE4 = _interopRequireDefault(require("../calendar/locale/et_EE"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'et',
  Pagination: _et_EE["default"],
  DatePicker: _et_EE2["default"],
  TimePicker: _et_EE3["default"],
  Calendar: _et_EE4["default"],
  Table: {
    filterTitle: 'Filtri menüü',
    filterConfirm: 'OK',
    filterReset: 'Nulli',
    selectAll: 'Vali kõik',
    selectInvert: 'Inverteeri valik'
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Tühista',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Tühista'
  },
  Transfer: {
    searchPlaceholder: 'Otsi siit',
    itemUnit: 'kogus',
    itemsUnit: 'kogus'
  },
  Upload: {
    uploading: 'Üleslaadimine...',
    removeFile: 'Eemalda fail',
    uploadError: 'Üleslaadimise tõrge',
    previewFile: 'Faili eelvaade'
  },
  Empty: {
    description: 'Andmed puuduvad'
  }
};
exports["default"] = _default;