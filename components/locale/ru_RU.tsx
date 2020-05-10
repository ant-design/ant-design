import Pagination from 'rc-pagination/lib/locale/ru_RU';
import DatePicker from '../date-picker/locale/ru_RU';
import TimePicker from '../time-picker/locale/ru_RU';
import Calendar from '../calendar/locale/ru_RU';
import { Locale } from '../locale-provider';

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
    selectAll: 'Выбрать всё',
    selectInvert: 'Инвертировать выбор',
    sortTitle: 'Сортировка',
    expand: 'Развернуть строку',
    collapse: 'Свернуть строку',
    triggerDesc: 'Нажмите для сортировки по убыванию',
    triggerAsc: 'Нажмите для сортировки по возрастанию',
    cancelSort: 'Нажмите, чтобы отменить сортировку',
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
    searchPlaceholder: 'Поиск',
    itemUnit: 'элем.',
    itemsUnit: 'элем.',
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
    edit: 'редактировать',
    copy: 'копировать',
    copied: 'скопировано',
    expand: 'раскрыть',
  },
  PageHeader: {
    back: 'назад',
  },
};

export default localeValues;
