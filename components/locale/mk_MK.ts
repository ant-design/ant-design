import Pagination from '@rc-component/pagination/locale/mk_MK';

import type { Locale } from '.';
import Calendar from '../calendar/locale/mk_MK';
import DatePicker from '../date-picker/locale/mk_MK';
import TimePicker from '../time-picker/locale/mk_MK';

const typeTemplate = '${label} не е валиден ${type}';

const localeValues: Locale = {
  locale: 'mk',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'Ве молиме означете',
    close: 'Затвори',
    show: 'Прикажи',
    hide: 'Сокриј',
    sortable: 'подредливи',
    clear: 'Исчисти',
  },
  Table: {
    filterTitle: 'Мени за филтрирање',
    filterConfirm: 'ОК',
    filterReset: 'Избриши',
    selectAll: 'Одбери страница',
    selectInvert: 'Инвертирај страница',
    filterEmptyText: 'Нема филтри',
    filterCheckAll: 'Изберете ги сите ставки',
    filterSearchPlaceholder: 'Барај во филтри',
    emptyText: 'Нема податоци',
    selectNone: 'Исчистете ги сите податоци',
    selectionAll: 'Изберете ги сите податоци',
    sortTitle: 'Подреди',
    expand: 'Проширете го редот',
    collapse: 'Собери ред',
    triggerDesc: 'Кликнете за да сортирате опаѓачки',
    triggerAsc: 'Кликнете за да сортирате растечки',
    cancelSort: 'Кликнете за да го откажете сортирањето',
  },
  Tour: {
    Next: 'Следно',
    Previous: 'Претходно',
    Finish: 'Заврши',
  },
  Modal: {
    okText: 'ОК',
    cancelText: 'Откажи',
    justOkText: 'ОК',
  },
  Popconfirm: {
    okText: 'ОК',
    cancelText: 'Откажи',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Пребарај тука',
    itemUnit: 'предмет',
    itemsUnit: 'предмети',
    remove: 'Отстрани',
    selectCurrent: 'Изберете тековна страница',
    removeCurrent: 'Отстранете ја моменталната страница',
    selectAll: 'Изберете ги сите податоци',
    deselectAll: 'Деселектирај ги сите податоци',
    removeAll: 'Отстранете ги сите податоци',
    selectInvert: 'Превртете ја тековната страница',
  },
  Upload: {
    uploading: 'Се прикачува...',
    removeFile: 'Избриши фајл',
    uploadError: 'Грешка при прикачување',
    previewFile: 'Прикажи фајл',
    downloadFile: 'Преземи фајл',
  },
  Empty: {
    description: 'Нема податоци',
  },
  Icon: {
    icon: 'Икона',
  },
  Text: {
    edit: 'Уреди',
    copy: 'Копирај',
    copied: 'Копирано',
    expand: 'Зголеми',
    collapse: 'Колапс',
  },
  Form: {
    optional: '(опционално)',
    defaultValidateMessages: {
      default: 'Грешка при валидација на полето: ${label}',
      required: 'Ве молиме внесете ${label}',
      enum: '${label} мора да биде едно од [${enum}]',
      whitespace: '${label} не може да биде празен знак',
      date: {
        format: '${label} форматот на датумот е невалиден',
        parse: '${label} не може да се конвертира во датум',
        invalid: '${label} е невалиден датум',
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
        len: '${label} мора да биде ${len} знаци',
        min: '${label} мора да биде најмалку ${min} знаци',
        max: '${label} може да биде најмногу ${max} знаци',
        range: '${label} мора да биде помеѓу ${min}-${max} знаци',
      },
      number: {
        len: '${label} мора да биде еднаква на ${len}',
        min: '${label} мора да биде минимум ${min}',
        max: '${label} може да биде максимум ${max}',
        range: '${label} мора да биде помеѓу ${min}-${max}',
      },
      array: {
        len: 'Мора да биде ${len} ${label}',
        min: 'Најмалку ${min} ${label}',
        max: 'Најмногу ${max} ${label}',
        range: 'Количината на ${label} мора да биде помеѓу ${min}-${max}',
      },
      pattern: {
        mismatch: '${label} не се совпаѓа со шаблонот ${pattern}',
      },
    },
  },
  QRCode: {
    expired: 'QR-кодот е истечен',
    refresh: 'Освежи',
    scanned: 'Скенирано',
  },
  ColorPicker: {
    presetEmpty: 'Празен',
    transparent: 'Транспарентен',
    singleColor: 'Еднобојна',
    gradientColor: 'Боја на градиент',
  },
};

export default localeValues;
