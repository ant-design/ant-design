"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ru_RU = _interopRequireDefault(require("rc-pagination/lib/locale/ru_RU"));

var _ru_RU2 = _interopRequireDefault(require("../date-picker/locale/ru_RU"));

var _ru_RU3 = _interopRequireDefault(require("../time-picker/locale/ru_RU"));

var _ru_RU4 = _interopRequireDefault(require("../calendar/locale/ru_RU"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'ru',
  Pagination: _ru_RU["default"],
  DatePicker: _ru_RU2["default"],
  TimePicker: _ru_RU3["default"],
  Calendar: _ru_RU4["default"],
  Table: {
    filterTitle: 'Фильтр',
    filterConfirm: 'OK',
    filterReset: 'Сбросить',
    selectAll: 'Выбрать всё',
    selectInvert: 'Инвертировать выбор'
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Отмена',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Отмена'
  },
  Transfer: {
    searchPlaceholder: 'Поиск',
    itemUnit: 'элем.',
    itemsUnit: 'элем.'
  },
  Upload: {
    uploading: 'Загрузка...',
    removeFile: 'Удалить файл',
    uploadError: 'При загрузке произошла ошибка',
    previewFile: 'Предпросмотр файла'
  },
  Empty: {
    description: 'Нет данных'
  }
};
exports["default"] = _default;