import Pagination from 'rc-pagination/lib/locale/zh_CN';
import DatePicker from '../date-picker/locale/zh_CN';
import TimePicker from '../time-picker/locale/zh_CN';
import Calendar from '../calendar/locale/zh_CN';
import { Locale } from '../locale-provider';

const typeTemplate = "'${name}' 不是一个有效的 ${type}";

const localeValues: Locale = {
  locale: 'zh-cn',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  // locales for all comoponents
  global: {
    placeholder: '请选择',
  },
  Table: {
    filterTitle: '筛选',
    filterConfirm: '确定',
    filterReset: '重置',
    selectAll: '全选当页',
    selectInvert: '反选当页',
    selectionAll: '全选所有',
    sortTitle: '排序',
    expand: '展开行',
    collapse: '关闭行',
    triggerDesc: '点击降序',
    triggerAsc: '点击升序',
    cancelSort: '取消排序',
  },
  Modal: {
    okText: '确定',
    cancelText: '取消',
    justOkText: '知道了',
  },
  Popconfirm: {
    cancelText: '取消',
    okText: '确定',
  },
  Transfer: {
    searchPlaceholder: '请输入搜索内容',
    itemUnit: '项',
    itemsUnit: '项',
  },
  Upload: {
    uploading: '文件上传中',
    removeFile: '删除文件',
    uploadError: '上传错误',
    previewFile: '预览文件',
    downloadFile: '下载文件',
  },
  Empty: {
    description: '暂无数据',
  },
  Icon: {
    icon: '图标',
  },
  Text: {
    edit: '编辑',
    copy: '复制',
    copied: '复制成功',
    expand: '展开',
  },
  PageHeader: {
    back: '返回',
  },
  Form: {
    defaultValidateMessages: {
      default: "字段验证错误 '${name}'",
      required: "'${name}' 是必需的",
      enum: "'${name}' 必须是其中一个 [${enum}]",
      whitespace: "'${name}' 不能为空",
      date: {
        format: "'${name}' 日期格式无效",
        parse: "'${name}' 不能转换为日期",
        invalid: "'${name}' 是一个无效日期",
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
        len: "'${name}' 长度必须等于 ${len} 字符",
        min: "'${name}' 长度不能小于 ${min} 字符",
        max: "'${name}' 长度不能超过 ${max} 字符",
        range: "'${name}' 长度必须在 ${min} 和 ${max} 字符之间",
      },
      number: {
        len: "'${name}' 必须等于 ${len}",
        min: "'${name}' 不能小于 ${min}",
        max: "'${name}' 不能大于 ${max}",
        range: "'${name}' 必须在 ${min} 和 ${max} 之间",
      },
      array: {
        len: "'${name}' 长度必须等于 ${len}",
        min: "'${name}' 长度不能小于 ${min}",
        max: "'${name}' 长度不能超过 ${max}",
        range: "'${name}' 长度必须在 ${min} 和 ${max} 之间",
      },
      pattern: {
        mismatch: "'${name}' 与模式不匹配 ${pattern}",
      },
    },
  },
};

export default localeValues;
