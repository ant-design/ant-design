import moment from 'moment';
moment.locale('ko');

import Pagination from 'rc-pagination/lib/locale/ko_KR';
import DatePicker from '../date-picker/locale/ko_KR';
import TimePicker from '../time-picker/locale/ko_KR';
import Calendar from '../calendar/locale/ko_KR';

export default {
  locale: 'ko',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: '필터 메뉴',
    filterConfirm: '확인',
    filterReset: '초기화',
    emptyText: '데이터 없음',
  },
  Modal: {
    okText: '확인',
    cancelText: '취소',
    justOkText: '확인',
  },
  Popconfirm: {
    okText: '확인',
    cancelText: '취소',
  },
  Transfer: {
    notFoundContent: '데이터 없음',
    searchPlaceholder: '여기에 검색하세요',
    itemUnit: '개',
    itemsUnit: '개',
  },
  Select: {
    notFoundContent: '데이터 없음',
  },
  Upload: {
    uploading: '업로드 중...',
    removeFile: '파일 삭제',
    uploadError: '업로드 실패',
    previewFile: '파일 미리보기',
  },
};
