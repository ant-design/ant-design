"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _zh_TW = _interopRequireDefault(require("rc-pagination/lib/locale/zh_TW"));

var _zh_TW2 = _interopRequireDefault(require("../date-picker/locale/zh_TW"));

var _zh_TW3 = _interopRequireDefault(require("../time-picker/locale/zh_TW"));

var _zh_TW4 = _interopRequireDefault(require("../calendar/locale/zh_TW"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'zh-tw',
  Pagination: _zh_TW["default"],
  DatePicker: _zh_TW2["default"],
  TimePicker: _zh_TW3["default"],
  Calendar: _zh_TW4["default"],
  Table: {
    filterTitle: '篩選器',
    filterConfirm: '確 定',
    filterReset: '重 置',
    selectAll: '全部選取',
    selectInvert: '反向選取'
  },
  Modal: {
    okText: '確 定',
    cancelText: '取 消',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: '確 定',
    cancelText: '取 消'
  },
  Transfer: {
    searchPlaceholder: '搜尋資料',
    itemUnit: '項目',
    itemsUnit: '項目'
  },
  Upload: {
    uploading: '正在上傳...',
    removeFile: '刪除檔案',
    uploadError: '上傳失敗',
    previewFile: '檔案預覽'
  },
  Empty: {
    description: '無此資料'
  }
};
exports["default"] = _default;