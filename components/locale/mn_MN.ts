import Pagination from 'rc-pagination/lib/locale/mn_MN';

import type { Locale } from '.';
import Calendar from '../calendar/locale/mn_MN';
import DatePicker from '../date-picker/locale/mn_MN';
import TimePicker from '../time-picker/locale/mn_MN';

const typeTemplate = '${label} нь хүчинтэй ${type} биш';

const localeValues: Locale = {
  locale: 'mn-mn',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'Сонгоно уу',
  },
  Table: {
    filterTitle: 'Хайх цэс',
    filterConfirm: 'Тийм',
    filterReset: 'Цэвэрлэх',
    filterEmptyText: 'Шүүлтүүр байхгүй',
    filterCheckAll: 'Бүх зүйлийг сонгоно уу',
    filterSearchPlaceholder: 'Шүүлтүүрээс хайх',
    emptyText: 'Өгөгдөл алга',
    selectAll: 'Бүгдийг сонгох',
    selectInvert: 'Бусдыг сонгох',
    selectNone: 'Бүх өгөгдлийг арилгах',
    selectionAll: 'Бүх өгөгдлийг сонгоно уу',
    sortTitle: 'Эрэмбэлэх',
    expand: 'Мөрийг өргөжүүлэх',
    collapse: 'Мөрийг буулгах',
    triggerDesc: 'Буурах байдлаар эрэмбэлэхийн тулд товшино уу',
    triggerAsc: 'Өсөхөөр эрэмбэлэхийн тулд товшино уу',
    cancelSort: 'Эрэмбэлэхийг цуцлахын тулд товшино уу',
  },
  Modal: {
    okText: 'Тийм',
    cancelText: 'Цуцлах',
    justOkText: 'Тийм',
  },
  Popconfirm: {
    okText: 'Тийм',
    cancelText: 'Цуцлах',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Хайх',
    itemUnit: 'Зүйл',
    itemsUnit: 'Зүйлүүд',
    remove: 'Устгах',
    selectCurrent: 'Одоогийн хуудсыг сонгоно уу',
    removeCurrent: 'Одоогийн хуудсыг устгана уу',
    selectAll: 'Бүх өгөгдлийг сонгоно уу',
    removeAll: 'Бүх өгөгдлийг устгана уу',
    selectInvert: 'Одоогийн хуудсыг эргүүлэх',
  },
  Upload: {
    uploading: 'Хуулж байна...',
    removeFile: 'Файл устгах',
    uploadError: 'Хуулахад алдаа гарлаа',
    previewFile: 'Файлыг түргэн үзэх',
    downloadFile: 'Файлыг татах',
  },
  Empty: {
    description: 'Мэдээлэл байхгүй байна',
  },
  Icon: {
    icon: 'дүрс',
  },
  Text: {
    edit: 'Засварлах',
    copy: 'Хуулбарлах',
    copied: 'Хуулсан',
    expand: 'Өргөтгөх',
  },
  Form: {
    optional: '(сонголттой)',
    defaultValidateMessages: {
      default: '${label}-ийн талбарын баталгаажуулалтын алдаа',
      required: '${label} оруулна уу',
      enum: '${label} нь [${enum}]-ийн нэг байх ёстой',
      whitespace: '${label} нь хоосон тэмдэгт байж болохгүй',
      date: {
        format: '${label} огнооны формат буруу байна',
        parse: '${label}-г огноо руу хөрвүүлэх боломжгүй',
        invalid: '${label} нь хүчингүй огноо юм',
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
        len: '${label} ${len} тэмдэгттэй байх ёстой',
        min: '${label} хамгийн багадаа ${min} тэмдэгттэй байх ёстой',
        max: '${label} нь ${max} хүртэлх тэмдэгттэй байх ёстой',
        range: '${label} ${min}-${max} тэмдэгтийн хооронд байх ёстой',
      },
      number: {
        len: '${label} нь ${len}-тэй тэнцүү байх ёстой',
        min: '${label} хамгийн багадаа ${min} байх ёстой',
        max: '${label} дээд тал нь ${max} байх ёстой',
        range: '${label} ${min}-${max} хооронд байх ёстой',
      },
      array: {
        len: '${len} ${label} байх ёстой',
        min: 'Дор хаяж ${мин} ${label}',
        max: 'Хамгийн ихдээ ${max} ${label}',
        range: '${label}-н хэмжээ ${min}-${max} хооронд байх ёстой',
      },
      pattern: {
        mismatch: '${label} нь ${pattern} загвартай тохирохгүй байна',
      },
    },
  },
  Image: {
    preview: 'Урьдчилан үзэх',
  },
};

export default localeValues;
