"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _hu_HU = _interopRequireDefault(require("rc-pagination/lib/locale/hu_HU"));

var _hu_HU2 = _interopRequireDefault(require("../date-picker/locale/hu_HU"));

var _hu_HU3 = _interopRequireDefault(require("../time-picker/locale/hu_HU"));

var _hu_HU4 = _interopRequireDefault(require("../calendar/locale/hu_HU"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'hu',
  Pagination: _hu_HU["default"],
  DatePicker: _hu_HU2["default"],
  TimePicker: _hu_HU3["default"],
  Calendar: _hu_HU4["default"],
  Table: {
    filterTitle: 'Szűrők',
    filterConfirm: 'Alkalmazás',
    filterReset: 'Visszaállítás',
    selectAll: 'Jelenlegi oldal kiválasztása',
    selectInvert: 'Jelenlegi oldal inverze',
    sortTitle: 'Rendezés'
  },
  Modal: {
    okText: 'Alkalmazás',
    cancelText: 'Visszavonás',
    justOkText: 'Alkalmazás'
  },
  Popconfirm: {
    okText: 'Alkalmazás',
    cancelText: 'Visszavonás'
  },
  Transfer: {
    searchPlaceholder: 'Keresés',
    itemUnit: 'elem',
    itemsUnit: 'elemek'
  },
  Upload: {
    uploading: 'Feltöltés...',
    removeFile: 'Fájl eltávolítása',
    uploadError: 'Feltöltési hiba',
    previewFile: 'Fájl előnézet'
  },
  Empty: {
    description: 'Nincs adat'
  }
};
exports["default"] = _default;