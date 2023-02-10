/* eslint-disable no-template-curly-in-string */
import Pagination from 'rc-pagination/lib/locale/uk_UA';
import Calendar from '../calendar/locale/uk_UA';
import DatePicker from '../date-picker/locale/uk_UA';
import type { Locale } from '.';
import TimePicker from '../time-picker/locale/uk_UA';

const typeTemplate = '${label} не є типом ${type}';

const localeValues: Locale = {
  locale: 'uk',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'Будь ласка, оберіть',
  },
  Table: {
    filterTitle: 'Фільтрувати',
    filterConfirm: 'OK',
    filterReset: 'Скинути',
    filterEmptyText: 'Фільтри відсутні',
    filterCheckall: 'Обрати всі',
    filterSearchPlaceholder: 'Пошук у фільтрах',
    emptyText: 'Даних немає',
    selectAll: 'Обрати всі на сторінці',
    selectInvert: 'Інвертувати вибір',
    selectNone: 'Очистити вибір',
    selectionAll: 'Обрати всі',
    sortTitle: 'Сортувати',
    expand: 'Розгорнути рядок',
    collapse: 'Згорнути рядок',
    triggerDesc: 'Сортувати за спаданням',
    triggerAsc: 'Сортувати за зростанням',
    cancelSort: 'Відмінити сортування',
  },
  Tour: {
    Next: 'Далі',
    Previous: 'Назад',
    Finish: 'Завершити',
  },
  Modal: {
    okText: 'Гаразд',
    cancelText: 'Скасувати',
    justOkText: 'Гаразд',
  },
  Popconfirm: {
    okText: 'Гаразд',
    cancelText: 'Скасувати',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Введіть текст для пошуку',
    itemUnit: 'елем.',
    itemsUnit: 'елем.',
    remove: 'Видалити',
    selectCurrent: 'Вибрати поточну сторінку',
    removeCurrent: 'Скасувати вибір на сторінці',
    selectAll: 'Вибрати всі дані',
    removeAll: 'Скасувати вибір',
    selectInvert: 'Інвертувати поточну сторінку',
  },
  Upload: {
    uploading: 'Завантаження ...',
    removeFile: 'Видалити файл',
    uploadError: 'Помилка завантаження',
    previewFile: 'Попередній перегляд файлу',
    downloadFile: 'Завантажити файл',
  },
  Empty: {
    description: 'Даних немає',
  },
  Icon: {
    icon: 'іконка',
  },
  Text: {
    edit: 'Редагувати',
    copy: 'Скопіювати',
    copied: 'Скопійовано',
    expand: 'Розширити',
  },
  PageHeader: {
    back: 'Назад',
  },
  Form: {
    optional: '(опціонально)',
    defaultValidateMessages: {
      default: 'Помилка валідації для поля ${label}',
      required: 'Будь ласка, заповніть ${label}',
      enum: 'Лише одне зі значень [${enum}] доступне для ${label}',
      whitespace: 'Значення у полі ${label} не може бути пробілом',
      date: {
        format: 'Не валідний формат дати у ${label}',
        parse: 'Значення ${label} не може бути приведене до дати',
        invalid: 'Не валідна дата у ${label}',
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
        len: '${label} має містити ${len} символів',
        min: '${label} має містити не менш, ніж ${min} символів',
        max: '${label} має містити не більш, ніж ${max} символів',
        range: '${label} має містити ${min}-${max} символів',
      },
      number: {
        len: '${label} має дорівнювати ${len}',
        min: '${label} має бути не менш, ніж ${min}',
        max: '${label} має бути не більш, ніж ${max}',
        range: '${label} має бути в межах ${min}-${max}',
      },
      array: {
        len: '${label} має містити ${len} елементи',
        min: '${label} має містити не менш, ніж ${min} елементи',
        max: '${label} має містити не більш, ніж ${max} елементи',
        range: 'Кількість елементів в ${label} має бути в межах ${min}-${max}',
      },
      pattern: {
        mismatch: '${label} не відповідає шаблону ${pattern}',
      },
    },
  },
  Image: {
    preview: 'Попередній перегляд',
  },
  QRCode: {
    expired: 'QR-код закінчився',
    refresh: 'Оновити',
  },
};

export default localeValues;
