"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vi_VN = _interopRequireDefault(require("rc-pagination/lib/locale/vi_VN"));

var _vi_VN2 = _interopRequireDefault(require("../date-picker/locale/vi_VN"));

var _vi_VN3 = _interopRequireDefault(require("../time-picker/locale/vi_VN"));

var _vi_VN4 = _interopRequireDefault(require("../calendar/locale/vi_VN"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'vi',
  Pagination: _vi_VN["default"],
  DatePicker: _vi_VN2["default"],
  TimePicker: _vi_VN3["default"],
  Calendar: _vi_VN4["default"],
  Table: {
    filterTitle: 'Bộ ',
    filterConfirm: 'OK',
    filterReset: 'Tạo Lại',
    selectAll: 'Chọn Tất Cả',
    selectInvert: 'Chọn Ngược Lại'
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Huỷ',
    justOkText: 'OK'
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Huỷ'
  },
  Transfer: {
    searchPlaceholder: 'Tìm ở đây',
    itemUnit: 'mục',
    itemsUnit: 'mục'
  },
  Upload: {
    uploading: 'Đang tải lên...',
    removeFile: 'Gỡ bỏ tập tin',
    uploadError: 'Lỗi tải lên',
    previewFile: 'Xem thử tập tin'
  },
  Empty: {
    description: 'Trống'
  }
};
exports["default"] = _default;