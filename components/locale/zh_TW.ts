import Pagination from '@rc-component/pagination/locale/zh_TW';

import type { Locale } from '.';
import Calendar from '../calendar/locale/zh_TW';
import DatePicker from '../date-picker/locale/zh_TW';
import TimePicker from '../time-picker/locale/zh_TW';

const typeTemplate = '${label}不是一個有效的${type}';

const localeValues: Locale = {
  locale: 'zh-tw',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: '請選擇',
    close: '關閉',
    show: '顯示',
    hide: '隱藏',
    sortable: '可排序',
  },
  Table: {
    filterTitle: '篩選器',
    filterConfirm: '確定',
    filterReset: '重設',
    filterEmptyText: '無篩選條件',
    filterCheckAll: '全選',
    filterSearchPlaceholder: '搜尋篩選條件',
    emptyText: '暫無資料',
    selectAll: '選取目前頁面',
    selectInvert: '反向選取目前頁面',
    selectNone: '清除全部資料',
    selectionAll: '選取所有資料',
    sortTitle: '排序',
    expand: '展開列',
    collapse: '收合列',
    triggerDesc: '點擊以遞減排序',
    triggerAsc: '點擊以遞增排序',
    cancelSort: '點擊以取消排序',
  },
  Modal: {
    okText: '確定',
    cancelText: '取消',
    justOkText: '知道了',
  },
  Tour: {
    Next: '下一步',
    Previous: '上一步',
    Finish: '結束導覽',
  },
  Popconfirm: {
    okText: '確定',
    cancelText: '取消',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: '在此搜尋',
    itemUnit: '項目',
    itemsUnit: '項目',
    remove: '移除',
    selectCurrent: '選取目前頁面',
    removeCurrent: '移除目前頁面',
    selectAll: '選取所有資料',
    removeAll: '移除所有資料',
    selectInvert: '反向選取目前頁面',
    deselectAll: '取消選取所有資料',
  },
  Upload: {
    uploading: '正在上傳...',
    removeFile: '移除檔案',
    uploadError: '上傳失敗',
    previewFile: '預覽檔案',
    downloadFile: '下載檔案',
  },
  Empty: {
    description: '暫無資料',
  },
  Icon: {
    icon: '圖示',
  },
  Text: {
    edit: '編輯',
    copy: '複製',
    copied: '複製成功',
    expand: '展開',
    collapse: '收合',
  },
  Carousel: {
    prevSlide: '上一張投影片',
    nextSlide: '下一張投影片',
  },
  Form: {
    optional: '（選填）',
    defaultValidateMessages: {
      default: '欄位驗證錯誤：${label}',
      required: '請輸入${label}',
      enum: '${label}必須是 [${enum}] 其中之一',
      whitespace: '${label}不能是空白字元',
      date: {
        format: '${label}的日期格式無效',
        parse: '${label}無法轉換為日期',
        invalid: '${label}是無效的日期',
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
        len: '${label}須為${len}個字元',
        min: '${label}最少需要${min}個字元',
        max: '${label}最多可為${max}個字元',
        range: '${label}須介於${min}-${max}個字元之間',
      },
      number: {
        len: '${label}必須等於${len}',
        min: '${label}最小值為${min}',
        max: '${label}最大值為${max}',
        range: '${label}須在${min}-${max}之間',
      },
      array: {
        len: '須為${len}個${label}',
        min: '最少${min}個${label}',
        max: '最多${max}個${label}',
        range: '${label}數量須在${min}-${max}之間',
      },
      pattern: {
        mismatch: '${label}與模式 ${pattern} 不相符',
      },
    },
  },
  QRCode: {
    expired: 'QR Code 已過期',
    refresh: '重新整理',
    scanned: '已掃描',
  },
  ColorPicker: {
    presetEmpty: '暫無',
    transparent: '透明',
    singleColor: '單色',
    gradientColor: '漸層色',
  },
};

export default localeValues;
