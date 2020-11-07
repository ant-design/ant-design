/* eslint-disable no-template-curly-in-string */

// import Pagination from 'rc-pagination/lib/locale/kk_KZ';
// awaiting PR https://github.com/react-component/pagination/pull/309
// For now, using Russian language as fallback
import Pagination from 'rc-pagination/lib/locale/ru_RU';

import DatePicker from '../date-picker/locale/kk_KZ';
import TimePicker from '../time-picker/locale/kk_KZ';
import Calendar from '../calendar/locale/kk_KZ';
import { Locale } from '../locale-provider';

const typeTemplate: string = '${label} ${type} типі емес';

const localeValues: Locale = {
  locale: 'kk',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'Таңдаңыз',
  },
  Table: {
    filterTitle: 'Фильтр',
    filterConfirm: 'Ok',
    filterReset: 'Тазарту',
    filterEmptyText: 'Фильтр жоқ',
    emptyText: 'Деректер жоқ',
    selectAll: 'Барлығын таңдау',
    selectInvert: 'Таңдауды төңкеру',
    selectionAll: 'Барлық деректерді таңдаңыз',
    sortTitle: 'Сұрыптау',
    expand: 'Жолды жазу',
    collapse: 'Жолды бүктеу',
    triggerDesc: 'Төмендеуді сұрыптау үшін басыңыз',
    triggerAsc: 'Өсу ретімен сұрыптау үшін басыңыз',
    cancelSort: 'Сұрыптаудан бас тарту үшін басыңыз',
  },
  Modal: {
    okText: 'Жарайды',
    cancelText: 'Болдырмау',
    justOkText: 'Жарайды',
  },
  Popconfirm: {
    okText: 'Жарайды',
    cancelText: 'Болдырмау',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Іздеу',
    itemUnit: 'элемент.',
    itemsUnit: 'элемент.',
    remove: 'Жою',
    selectAll: 'Барлық деректерді таңдау',
    selectCurrent: 'Ағымдағы бетті таңдау',
    selectInvert: 'Кері тәртіпте көрсету',
    removeAll: 'Барлық деректерді жою',
    removeCurrent: 'Ағымдағы парақты өшіру',
  },
  Upload: {
    uploading: 'Жүктеу...',
    removeFile: 'Файлды жою',
    uploadError: 'Жүктеу кезінде қате пайда болды',
    previewFile: 'Файлды алдын ала қарау',
    downloadFile: 'Файлды жүктеу',
  },
  Empty: {
    description: 'Деректер жоқ',
  },
  Icon: {
    icon: 'белгішесі',
  },
  Text: {
    edit: 'Өңдеу',
    copy: 'Көшіру',
    copied: 'Көшірілді',
    expand: 'Жазу',
  },
  PageHeader: {
    back: 'Артқа',
  },
  Form: {
    defaultValidateMessages: {
      default: '${label} өрісін тексеру қателігі',
      required: '${label} енгізіңіз',
      enum: '${label} [${enum}] қатарынан болуы керек',
      whitespace: '${label} бос болмауы керек',
      date: {
        format: '${label} жарамды күн форматы емес',
        parse: '${label} күнге түрлендірілмейді',
        invalid: '${label} жарамды күн емес',
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
        len: '${label} ${len} таңбадан тұруы керек',
        min: '${label} ${min} таңбадан үлкен немесе оған тең болуы керек',
        max: '${label} ${max} таңбадан кем немесе оған тең болуы керек',
        range: '${label} ұзындығы ${min}-${max} таңба аралығында болуы керек',
      },
      number: {
        len: '${label} ${len} тең болуы керек',
        min: '${label} ${min} мәнінен үлкен немесе оған тең болуы керек',
        max: '${label} ${max} мәнінен аз немесе оған тең болуы керек',
      },
      array: {
        len: '${label} элементтерінің саны ${len} тең болуы керек',
        min: '${label} элементтерінің саны ${min} көп немесе оған тең болуы керек',
        max: '${label} элементтерінің саны ${max} аз немесе оған тең болуы керек',
        range: '${label} элементтерінің саны ${min} - ${max} аралығында болуы керек',
      },
      pattern: {
        mismatch: '${label} ${pattern} мен сәйкес келмейді',
      },
    },
  },
};

export default localeValues;
