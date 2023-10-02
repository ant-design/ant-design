/* eslint-disable no-template-curly-in-string */
import Pagination from 'rc-pagination/lib/locale/zh_TW';
import Calendar from '../calendar/locale/zh_TW';
import DatePicker from '../date-picker/locale/zh_TW';
import type { Locale } from '.';
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
  },
  Table: {
    filterTitle: '篩選器',
    filterConfirm: '確定',
    filterReset: '重置',
    filterEmptyText: '無篩選項',
    selectAll: '全部選取',
    selectInvert: '反向選取',
    selectNone: '清空所有',
    selectionAll: '全選所有',
    sortTitle: '排序',
    expand: '展開行',
    collapse: '關閉行',
    triggerDesc: '點擊降序',
    triggerAsc: '點擊升序',
    cancelSort: '取消排序',
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
    searchPlaceholder: '搜尋資料',
    itemUnit: '項目',
    itemsUnit: '項目',
    remove: '删除',
    selectCurrent: '全選當頁',
    removeCurrent: '删除當頁',
    selectAll: '全選所有',
    removeAll: '删除全部',
    selectInvert: '反選當頁',
  },
  Upload: {
    uploading: '正在上傳...',
    removeFile: '刪除檔案',
    uploadError: '上傳失敗',
    previewFile: '檔案預覽',
    downloadFile: '下载文件',
  },
  Empty: {
    description: '無此資料',
  },
  Icon: {
    icon: '圖標',
  },
  Text: {
    edit: '編輯',
    copy: '複製',
    copied: '複製成功',
    expand: '展開',
  },
  PageHeader: {
    back: '返回',
  },
  Form: {
    optional: '（可選）',
    defaultValidateMessages: {
      default: '字段驗證錯誤${label}',
      required: '請輸入${label}',
      enum: '${label}必須是其中一個[${enum}]',
      whitespace: '${label}不能為空字符',
      date: {
        format: '${label}日期格式無效',
        parse: '${label}不能轉換為日期',
        invalid: '${label}是一個無效日期',
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
        len: '${label}須為${len}個字符',
        min: '${label}最少${min}個字符',
        max: '${label}最多${max}個字符',
        range: '${label}須在${min}-${max}字符之間',
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
        mismatch: '${label}與模式不匹配${pattern}',
      },
    },
  },
  Image: {
    preview: '預覽',
  },
};

export default localeValues;
