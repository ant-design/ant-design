import Pagination from '@rc-component/pagination/locale/ko_KR';

import type { Locale } from '.';
import Calendar from '../calendar/locale/ko_KR';
import DatePicker from '../date-picker/locale/ko_KR';
import TimePicker from '../time-picker/locale/ko_KR';

const typeTemplate = '${label}은(는) 유효한 ${type}이(가) 아닙니다';

const localeValues: Locale = {
  locale: 'ko',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: '선택하세요',
    close: '닫기',
    show: '표시',
    hide: '숨기기',
    sortable: '정렬 가능',
  },
  Table: {
    filterTitle: '필터 메뉴',
    filterConfirm: '확인',
    filterReset: '초기화',
    filterEmptyText: '필터 없음',
    filterCheckAll: '전체 선택',
    filterSearchPlaceholder: '필터 검색',
    emptyText: '데이터 없음',
    selectAll: '전체 선택',
    selectInvert: '선택 반전',
    selectNone: '없음',
    selectionAll: '전체 선택',
    selectRow: '행 선택',
    selectedRow: '행 선택됨',
    selectionMenu: '선택 메뉴',
    sortTitle: '정렬',
    expand: '펼치기',
    collapse: '접기',
    expandAll: '모든 행 펼치기',
    collapseAll: '모든 행 접기',
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
  Splitter: {
    toggleStartPanel: '시작 패널 전환',
    toggleEndPanel: '끝 패널 전환',
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
    deselectAll: '모든 데이터 선택 해제',
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
    copied: '복사됨',
    expand: '확장',
    collapse: '접기',
  },
  Carousel: {
    prevSlide: '이전 슬라이드',
    nextSlide: '다음 슬라이드',
  },
  Form: {
    optional: '(선택사항)',
    defaultValidateMessages: {
      default: '${label} 필드의 유효성 검사 오류입니다',
      required: '${label}을(를) 입력해 주세요',
      enum: '${label}은(는) [${enum}] 중 하나여야 합니다',
      whitespace: '${label}은(는) 공백일 수 없습니다',
      date: {
        format: '${label}의 날짜 형식이 올바르지 않습니다',
        parse: '${label}을(를) 날짜로 변환할 수 없습니다',
        invalid: '${label}은(는) 유효하지 않은 날짜입니다',
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
        len: '${label}은(는) ${len}자여야 합니다',
        min: '${label}은(는) ${min}자 이상이어야 합니다',
        max: '${label}은(는) ${max}자 이하여야 합니다',
        range: '${label}은(는) ${min}~${max}자 사이여야 합니다',
      },
      number: {
        len: '${label}은(는) ${len}과(와) 같아야 합니다',
        min: '${label}은(는) ${min} 이상이어야 합니다',
        max: '${label}은(는) ${max} 이하여야 합니다',
        range: '${label}은(는) ${min}~${max} 사이여야 합니다',
      },
      array: {
        len: '${label}은(는) ${len}개여야 합니다',
        min: '${label}은(는) 최소 ${min}개여야 합니다',
        max: '${label}은(는) 최대 ${max}개여야 합니다',
        range: '${label}의 개수는 ${min}~${max}개 사이여야 합니다',
      },
      pattern: {
        mismatch: '${label}이(가) ${pattern} 패턴과 일치하지 않습니다',
      },
    },
  },
  QRCode: {
    expired: '만료된 QR 코드',
    refresh: '새로고침',
    scanned: '스캔됨',
  },
  ColorPicker: {
    presetEmpty: '미정',
    transparent: '투명',
    singleColor: '단색',
    gradientColor: '그라데이션',
  },
};

export default localeValues;
