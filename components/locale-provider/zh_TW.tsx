import moment from 'moment';
moment.locale('zh-tw');

import Pagination from 'rc-pagination/lib/locale/zh_TW';
import DatePicker from '../date-picker/locale/zh_TW';
import TimePicker from '../time-picker/locale/zh_TW';
import Calendar from '../calendar/locale/zh_TW';

export default {
  locale: 'zh-TW',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: '篩選',
    filterConfirm: '確定',
    filterReset: '重置',
    emptyText: '暫無數據',
    selectAll: '全選',
    selectInvert: '反選',
  },
  Modal: {
    okText: '確定',
    cancelText: '取消',
    justOkText: '確定',
  },
  Popconfirm: {
    okText: '確定',
    cancelText: '取消',
  },
  Transfer: {
    notFoundContent: '無結果',
    searchPlaceholder: '請輸入搜索內容',
    itemUnit: '條',
    itemsUnit: '條',
  },
  Select: {
    notFoundContent: '無結果',
  },
  Upload: {
    uploading: '上傳中...',
    removeFile: '刪除',
    uploadError: '上傳錯誤',
    previewFile: '預覽',
  },
};
