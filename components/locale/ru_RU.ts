import Pagination from 'rc-pagination/lib/locale/ru_RU';

import type { Locale } from '.';
import Calendar from '../calendar/locale/ru_RU';
import DatePicker from '../date-picker/locale/ru_RU';
import TimePicker from '../time-picker/locale/ru_RU';

const typeTemplate: string = '${label} не является типом ${type}';

const localeValues: Locale = {
  locale: 'ru',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'Пожалуйста выберите',
  },
  Table: {
    filterTitle: 'Фильтр',
    filterConfirm: 'OK',
    filterReset: 'Сбросить',
    filterEmptyText: 'Без фильтров',
    filterCheckall: 'Выбрать все элементы',
    filterSearchPlaceholder: 'Поиск в фильтрах',
    emptyText: 'Нет данных',
    selectAll: 'Выбрать всё',
    selectInvert: 'Инвертировать выбор',
    selectNone: 'Очистить все данные',
    selectionAll: 'Выбрать все данные',
    sortTitle: 'Сортировка',
    expand: 'Развернуть строку',
    collapse: 'Свернуть строку',
    triggerDesc: 'Нажмите для сортировки по убыванию',
    triggerAsc: 'Нажмите для сортировки по возрастанию',
    cancelSort: 'Нажмите, чтобы отменить сортировку',
  },
  Tour: {
    Next: 'Далее',
    Previous: 'Назад',
    Finish: 'Завершить',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Отмена',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Отмена',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Поиск',
    itemUnit: 'элем.',
    itemsUnit: 'элем.',
    remove: 'Удалить',
    selectAll: 'Выбрать все данные',
    deselectAll: 'Очистить все данные',
    selectCurrent: 'Выбрать текущую страницу',
    selectInvert: 'Инвертировать выбор',
    removeAll: 'Удалить все данные',
    removeCurrent: 'Удалить текущую страницу',
  },
  Upload: {
    uploading: 'Загрузка...',
    removeFile: 'Удалить файл',
    uploadError: 'При загрузке произошла ошибка',
    previewFile: 'Предпросмотр файла',
    downloadFile: 'Загрузить файл',
  },
  Empty: {
    description: 'Нет данных',
  },
  Icon: {
    icon: 'иконка',
  },
  Text: {
    edit: 'Редактировать',
    copy: 'Копировать',
    copied: 'Скопировано',
    expand: 'Раскрыть',
    collapse: 'Свернуть',
  },
  Form: {
    optional: '(необязательно)',
    defaultValidateMessages: {
      default: 'Ошибка проверки поля ${label}',
      required: 'Пожалуйста, введите ${label}',
      enum: '${label} должен быть одним из [${enum}]',
      whitespace: '${label} не может быть пустым',
      date: {
        format: '${label} не правильный формат даты',
        parse: '${label} не может быть преобразовано в дату',
        invalid: '${label} не является корректной датой',
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
        len: '${label} должна быть ${len} символов',
        min: '${label} должна быть больше или равна ${min} символов',
        max: '${label} должна быть меньше или равна ${max} символов',
        range: 'Длина ${label} должна быть между ${min}-${max} символами',
      },
      number: {
        len: '${label} должна быть равна ${len}',
        min: '${label} должна быть больше или равна ${min}',
        max: '${label} должна быть меньше или равна ${max}',
        range: '${label} должна быть между ${min}-${max}',
      },
      array: {
        len: 'Количество элементов ${label} должно быть равно ${len}',
        min: 'Количество элементов ${label} должно быть больше или равно ${min}',
        max: 'Количество элементов ${label} должно быть меньше или равно ${max}',
        range: 'Количество элементов ${label} должно быть между ${min} и ${max}',
      },
      pattern: {
        mismatch: '${label} не соответствует шаблону ${pattern}',
      },
    },
  },
  Image: {
    preview: 'Предпросмотр',
  },
  QRCode: {
    expired: 'QR-код устарел',
    refresh: 'Обновить',
  },
  ColorPicker: {
    presetEmpty: 'Пустой',
    transparent: 'Прозрачный',
    singleColor: 'Один цвет',
    gradientColor: 'Градиент',
  },
};

export default localeValues;
