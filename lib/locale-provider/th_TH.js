"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _th_TH = _interopRequireDefault(require("rc-pagination/lib/locale/th_TH"));

var _th_TH2 = _interopRequireDefault(require("../date-picker/locale/th_TH"));

var _th_TH3 = _interopRequireDefault(require("../time-picker/locale/th_TH"));

var _th_TH4 = _interopRequireDefault(require("../calendar/locale/th_TH"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'th',
  Pagination: _th_TH["default"],
  DatePicker: _th_TH2["default"],
  TimePicker: _th_TH3["default"],
  Calendar: _th_TH4["default"],
  Table: {
    filterTitle: 'ตัวกรอง',
    filterConfirm: 'ยืนยัน',
    filterReset: 'รีเซ็ต',
    selectAll: 'เลือกทั้งหมดในหน้านี้',
    selectInvert: 'เลือกสถานะตรงกันข้าม'
  },
  Modal: {
    okText: 'ตกลง',
    cancelText: 'ยกเลิก',
    justOkText: 'ตกลง'
  },
  Popconfirm: {
    okText: 'ตกลง',
    cancelText: 'ยกเลิก'
  },
  Transfer: {
    searchPlaceholder: 'ค้นหา',
    itemUnit: 'ชิ้น',
    itemsUnit: 'ชิ้น'
  },
  Upload: {
    uploading: 'กำลังอัปโหลด...',
    removeFile: 'ลบไฟล์',
    uploadError: 'เกิดข้อผิดพลาดในการอัปโหลด',
    previewFile: 'ดูตัวอย่างไฟล์'
  },
  Empty: {
    description: 'ไม่มีข้อมูล'
  }
};
exports["default"] = _default;