"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ko_KR = _interopRequireDefault(require("rc-pagination/lib/locale/ko_KR"));

var _ko_KR2 = _interopRequireDefault(require("../date-picker/locale/ko_KR"));

var _ko_KR3 = _interopRequireDefault(require("../time-picker/locale/ko_KR"));

var _ko_KR4 = _interopRequireDefault(require("../calendar/locale/ko_KR"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  locale: 'ko',
  Pagination: _ko_KR["default"],
  DatePicker: _ko_KR2["default"],
  TimePicker: _ko_KR3["default"],
  Calendar: _ko_KR4["default"],
  Table: {
    filterTitle: '필터 메뉴',
    filterConfirm: '확인',
    filterReset: '초기화',
    selectAll: '모두 선택',
    selectInvert: '선택 반전'
  },
  Modal: {
    okText: '확인',
    cancelText: '취소',
    justOkText: '확인'
  },
  Popconfirm: {
    okText: '확인',
    cancelText: '취소'
  },
  Transfer: {
    searchPlaceholder: '여기에 검색하세요',
    itemUnit: '개',
    itemsUnit: '개'
  },
  Upload: {
    uploading: '업로드 중...',
    removeFile: '파일 삭제',
    uploadError: '업로드 실패',
    previewFile: '파일 미리보기'
  },
  Empty: {
    description: '데이터 없음'
  }
};
exports["default"] = _default;