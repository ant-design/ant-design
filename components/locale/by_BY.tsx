/* eslint-disable no-template-curly-in-string */
import Pagination from 'rc-pagination/lib/locale/by_BY';
import DatePicker from '../date-picker/locale/by_BY';
import TimePicker from '../time-picker/locale/by_BY';
import Calendar from '../calendar/locale/by_BY';
import { Locale } from '../locale-provider';

const typeTemplate: string = "${label} не з'яўляецца тыпам ${type}";

const localeValues: Locale = {
  locale: 'by',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'Калі ласка выберыце',
  },
  Table: {
    filterTitle: 'Фільтр',
    filterConfirm: 'OK',
    filterReset: 'Скінуць',
    filterEmptyText: 'Без фільтраў',
    emptyText: 'Няма дадзеных',
    selectAll: 'Выбраць усе',
    selectInvert: 'Інвертаваць выбар',
    selectionAll: 'Выбраць усе дадзеныя',
    sortTitle: 'Сартаванне',
    expand: 'Разгарнуць радок',
    collapse: 'Згарнуць радок',
    triggerDesc: 'Націсніце для сартавання па змяншэнні',
    triggerAsc: 'Націсніце для сартавання па ўзросту',
    cancelSort: 'Націсніце, каб адмяніць сартаванне',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Адмена',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Адмена',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Пошук',
    itemUnit: 'элем.',
    itemsUnit: 'элем.',
    remove: 'Выдаліць',
    selectAll: 'Выбраць усе дадзеныя',
    selectCurrent: 'Вылучыць дадзеную старонку',
    selectInvert: 'Паказаць у зваротным парадку',
    removeAll: 'Выдаліць усе дадзеныя',
    removeCurrent: 'Выдаліць дадзеную старонку',
  },
  Upload: {
    uploading: 'Загрузка...',
    removeFile: 'Выдаліць файл',
    uploadError: 'Адбылася памылка пры загрузцы',
    previewFile: 'Прадпрагляд файла',
    downloadFile: 'Загрузіць файл',
  },
  Empty: {
    description: 'Няма дадзеных',
  },
  Icon: {
    icon: 'Іконка',
  },
  Text: {
    edit: 'Рэдагаваць',
    copy: 'Капіяваць',
    copied: 'Капіяванне завершана',
    expand: 'Разгарнуць',
  },
  PageHeader: {
    back: 'Назад',
  },
  Form: {
    defaultValidateMessages: {
      default: 'Памылка праверкі поля ${label}',
      required: 'Калі ласка, увядзіце ${label}',
      enum: '${label} павінен быць адным з [${enum}]',
      whitespace: '${label} не можа быць пустым',
      date: {
        format: '${label} няправільны фармат даты',
        parse: '${label} не можа быць пераўтворана ў дату',
        invalid: "${label} не з'яўляецца карэктнай датай",
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
        len: '${label} павінна быць ${len} сімвалаў',
        min: '${label} павінна быць больш або роўная ${min} сімвалаў',
        max: '${label} павінна быць менш або роўная ${max} сімвалаў',
        range: 'Даўжыня ${label} павінна быць паміж ${min}-${max} сімвалаў',
      },
      number: {
        len: '${label} павінна быць роўная ${len}',
        min: '${label} павінна быць больш або роўная ${min}',
        max: '${label} павінна быць больш або роўная ${max}',
      },
      array: {
        len: 'Колькасць элементаў ${label} павінна быць роўная ${len}',
        min: 'Колькасць элементаў ${label} павінна быць больш або роўная ${min}',
        max: 'Колькасць элементаў ${label} павінна быць менш або роўная ${max}',
        range: 'Колькасць элементаў ${label} павінна быць паміж ${min} і ${max}',
      },
      pattern: {
        mismatch: '${label} не адпавядае шаблону ${pattern}',
      },
    },
  },
};

export default localeValues;
