/* eslint-disable no-template-curly-in-string */
import Pagination from 'rc-pagination/lib/locale/ko_KR';
import Calendar from '../calendar/locale/ko_KR';
import DatePicker from '../date-picker/locale/ko_KR';
import type { Locale } from '.';
import TimePicker from '../time-picker/locale/ko_KR';

const typeTemplate = '${label} 유효하지 않은 ${type}';

const localeValues: Locale = {
  locale: 'ko',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: '필터 메뉴',
    filterConfirm: '확인',
    filterReset: '초기화',
    filterEmptyText: '필터 없음',
    filterCheckall: '전체 선택',
    filterSearchPlaceholder: '필터 검색',
    emptyText: '데이터 없음',
    selectAll: '전체 선택',
    selectInvert: '선택 반전',
    selectNone: '없음',
    selectionAll: '전체 선택',
    sortTitle: '정렬',
    expand: '펼치기',
    collapse: '접기',
    triggerDesc: '내림차순으로 정렬하기',
    triggerAsc: '오름차순으로 정렬하기',
    cancelSort: '정렬 취소하기',
  },
  Tour: {
    Next: '다음',
    Previous: '이전',
    Finish: '종료',
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
    titles: ['', ''],
    searchPlaceholder: '여기에 검색하세요',
    itemUnit: '개',
    itemsUnit: '개',
    remove: '삭제',
    selectCurrent: '현재 페이지 선택',
    removeCurrent: '현재 페이지 삭제',
    selectAll: '전체 선택',
    removeAll: '전체 삭제',
    selectInvert: '선택 반전',
  },
  Upload: {
    uploading: '업로드 중...',
    removeFile: '파일 삭제',
    uploadError: '업로드 실패',
    previewFile: '파일 미리보기',
    downloadFile: '파일 다운로드',
  },
  Empty: {
    description: '데이터 없음',
  },
  Icon: {
    icon: '아이콘',
  },
  Text: {
    edit: '수정',
    copy: '복사',
    copied: '복사 됨',
    expand: '확장',
  },
  PageHeader: {
    back: '뒤로',
  },
  Form: {
    optional: '(선택사항)',
    defaultValidateMessages: {
      default: '필드 유효성 검사 오류 ${label}',
      required: '${label} 입력해 주세요',
      enum: '${label} [${enum}] 중에 하나여야 합니다',
      whitespace: '${label} 비워둘 수 없습니다',
      date: {
        format: '${label} 유효하지 않은 날짜 형식입니다',
        parse: '${label} 날짜 형식으로 변환될 수 없습니다',
        invalid: '${label} 유효하지 않은 날짜입니다',
      },
      types: {
        string: typeTemplate,
        method: typeTemplate,
        array: typeTemplate,
        object: typeTemplate,
        number: typeTemplate,
        date: typeTemplate,
        boolean: typeTemplate,
        integer: typeTemplate,
        float: typeTemplate,
        regexp: typeTemplate,
        email: typeTemplate,
        url: typeTemplate,
        hex: typeTemplate,
      },
      string: {
        len: '${label} ${len}글자여야 합니다',
        min: '${label} 적어도 ${min}글자 이상이어야 합니다',
        max: '${label} ${max}글자 이하여야 합니다',
        range: '${label} ${min}-${max}글자 사이어야 합니다',
      },
      number: {
        len: '${label} 값은 ${len}이어야 합니다',
        min: '${label} 최솟값은 ${min}입니다',
        max: '${label} 최댓값은 ${max}입니다',
        range: '${label} 값은 ${min}-${max} 사이어야 합니다',
      },
      array: {
        len: '${len}이어야 합니다 ${label} ',
        min: '최소 ${min}이어야 합니다 ${label}',
        max: '최대 ${max}이어야 합니다 ${label}',
        range: '${label} ${min}-${max} 사이어야 합니다',
      },
      pattern: {
        mismatch: '${label} ${pattern} 패턴과 일치하지 않습니다',
      },
    },
  },
  Image: {
    preview: '미리보기',
  },
  QRCode: {
    expired: '만료된 QR 코드',
    refresh: '새로고침',
  },
};

export default localeValues;
