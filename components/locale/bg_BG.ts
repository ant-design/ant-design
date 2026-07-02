import Pagination from '@rc-component/pagination/locale/bg_BG';

import type { Locale } from '.';
import Calendar from '../calendar/locale/bg_BG';
import DatePicker from '../date-picker/locale/bg_BG';
import TimePicker from '../time-picker/locale/bg_BG';

const typeTemplate = '${label} не е валиден ${type}';

const localeValues: Locale = {
  locale: 'bg',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    close: 'Затвори',
    show: 'Покажи',
    hide: 'Скрий',
    placeholder: 'Моля изберете',
    sortable: 'сортируеми',
    clear: 'Изчисти',
  },
  Table: {
    filterTitle: 'Филтриране',
    filterConfirm: 'Добре',
    filterReset: 'Нулиране',
    selectAll: 'Избор на текуща страница',
    selectInvert: 'Обръщане',
    filterEmptyText: 'Без филтри',
    filterCheckAll: 'Изберете всички елементи',
    filterSearchPlaceholder: 'Търсене във филтри',
    emptyText: 'Няма данни',
    selectNone: 'Изчистване на всички данни',
    selectionAll: 'Изберете всички данни',
    sortTitle: 'Сортиране',
    expand: 'Разширяване на реда',
    collapse: 'Свиване на ред',
    triggerDesc: 'Кликнете, за да сортирате в низходящ ред',
    triggerAsc: 'Кликнете, за да сортирате във възходящ ред',
    cancelSort: 'Кликнете, за да отмените сортирането',
  },
  Tour: {
    Next: 'Следващ',
    Previous: 'Предишен',
    Finish: 'Завърши',
  },
  Modal: {
    okText: 'Добре',
    cancelText: 'Отказ',
    justOkText: 'Добре',
  },
  Popconfirm: {
    okText: 'Добре',
    cancelText: 'Отказ',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Търсене',
    itemUnit: 'избор',
    itemsUnit: 'избори',
    remove: 'Премахнете',
    selectCurrent: 'Изберете текущата страница',
    removeCurrent: 'Премахване на текущата страница',
    selectAll: 'Изберете всички данни',
    deselectAll: 'Демаркирайте всички данни',
    removeAll: 'Премахнете всички данни',
    selectInvert: 'Обърнете текущата страница',
  },
  Upload: {
    uploading: 'Качване...',
    removeFile: 'Премахване',
    uploadError: 'Грешка при качването',
    previewFile: 'Преглед',
    downloadFile: 'Свали файл',
  },
  Empty: {
    description: 'Няма данни',
  },
  Icon: {
    icon: 'икона',
  },
  Text: {
    edit: 'Редактиране',
    copy: 'копие',
    copied: 'Копирано',
    expand: 'Разширяване',
    collapse: 'Свиване',
  },
  Form: {
    optional: '（по желание）',
    defaultValidateMessages: {
      default: 'грешка при проверка на полето ${label}',
      required: 'Моля, въведете ${label}',
      enum: '${label} трябва да е един от [${enum}]',
      whitespace: '${label} Не може да бъде нулев знак',
      date: {
        format: '${label} невалиден формат на датата',
        parse: '${label} не може да се преобразува в дата',
        invalid: '${label} е невалидна дата',
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
        len: '${label} ще бъде ${len} знака',
        min: '${label} най-малко ${min} герои',
        max: '${label} повечето ${max} герои',
        range: '${label} Трябва да е вътре ${min}-${max} между знаци',
      },
      number: {
        len: '${label} трябва да е равно на ${len}',
        min: '${label} Минималната стойност е ${min}',
        max: '${label} Максималната стойност е ${max}',
        range: '${label} Трябва да е вътре ${min}-${max} между',
      },
      array: {
        len: 'ще бъде ${len} индивидуален ${label}',
        min: 'най-малко ${min} индивидуален ${label}',
        max: 'повечето ${max} индивидуален ${label}',
        range: '${label} Количеството трябва да е вътре ${min}-${max} между',
      },
      pattern: {
        mismatch: '${label} не отговаря на модела ${pattern}',
      },
    },
  },
  QRCode: {
    expired: 'QR кодът е изтекъл',
    refresh: 'Опресняване',
    scanned: 'Сканирани',
  },
  ColorPicker: {
    presetEmpty: 'празна',
    transparent: 'Прозрачен',
    singleColor: 'Едноцветен',
    gradientColor: 'Преливащ цвят',
  },
};

export default localeValues;
