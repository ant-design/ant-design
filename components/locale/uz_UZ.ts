/* eslint-disable no-template-curly-in-string */
import Pagination from 'rc-pagination/lib/locale/uz_UZ';
import type { Locale } from '.';
import Calendar from '../calendar/locale/uz_UZ';
import DatePicker from '../date-picker/locale/uz_UZ';
import TimePicker from '../time-picker/locale/uz_UZ';

const typeTemplate = '${label} yaroqsiz ${type}';

const localeValues: Locale = {
  locale: 'uz',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'Iltimos tanlang',
  },
  Table: {
    filterTitle: 'Filter menyu',
    filterConfirm: 'Qidiruv',
    filterReset: "Qayta o'rnatish",
    filterEmptyText: "Filtrlar yo'q",
    filterCheckall: 'Barchasini belgilash',
    filterSearchPlaceholder: 'Filterlanganlardan qidirish',
    emptyText: "Ma'lumot yo'q",
    selectAll: 'Joriy sahifani belgilash',
    selectInvert: "Joriy sahifani o'zgartiring",
    selectNone: "Hamma ma'lumotlarni tozalash",
    selectionAll: "Hamma ma'lumotni tanlash",
    sortTitle: 'Saralash',
    expand: 'Qatorni kengaytirish',
    collapse: "Qatorni yeg'ish",
    triggerDesc: 'Kamayish tartibida saralash',
    triggerAsc: "Ko'payish tartibida saralash",
    cancelSort: 'Saralashni bekor qilish uchun bosing',
  },
  Tour: {
    Next: 'Keyingisi',
    Previous: 'Oldingisi',
    Finish: 'Oxirgisi',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Bekor qilish',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Bekor qilish',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Qidirish',
    itemUnit: 'element',
    itemsUnit: 'elementlar',
    remove: "O'chirish",
    selectCurrent: 'Hozirgi sahifani belgilash',
    removeCurrent: "Hozirgi sahifani o'chirish",
    selectAll: "Hamma ma'lumotni tanlash",
    removeAll: "Hamma ma'lumotni tozalash",
    selectInvert: 'Invert current page',
  },
  Upload: {
    uploading: 'Yuklanmoqda...',
    removeFile: "Faylni o'chirish",
    uploadError: 'Yuklanish xatosi',
    previewFile: "Faylni ko'rish",
    downloadFile: 'Download file',
  },
  Empty: {
    description: "Ma'lumot yo'q",
  },
  Icon: {
    icon: 'icon',
  },
  Text: {
    edit: 'Tahrirlash',
    copy: 'Nusxalash',
    copied: 'Nusxalandi',
    expand: 'Kengaytirish',
  },
  PageHeader: {
    back: 'Orqaga',
  },
  Form: {
    optional: '(ixtiyoriy)',
    defaultValidateMessages: {
      default: 'Maydondagi tekshiruv xatosi ${label}',
      required: 'Iltimos kiriting ${label}',
      enum: "${label} Ulardan biri bo'lishi kerak [${enum}]",
      whitespace: "${label} null belgi bo'lishi mumkin emas",
      date: {
        format: '${label} sana formati yaroqsiz',
        parse: "${label} sanaga aylantirib bo'lmaydi",
        invalid: '${label} yaroqsiz sana',
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
        len: "${label} ${len}ta belgidan iborat bo'lishi kerak",
        min: "${label} kamida ${min} ta belgidan iborat bo'lishi kerak",
        max: "${label} maksimal ${max} ta belgidan iborat bo'lishi kerak",
        range: "${label} ${min}-${max} ta belgilar orasida bo'lishi kerak",
      },
      number: {
        len: "${label} ${len} ga teng bo'lishi kerak",
        min: "${label} minimum ${min} ta bo'lishi kerak",
        max: "${label} maximum ${max} ta bo'lishi kerak",
        range: "${label} ${min}-${max} orasida bo'lishi kerak",
      },
      array: {
        len: "${label} ${len} bo'lishi kerak",
        min: 'Kamida ${min} ${label}',
        max: "Ko'pi bilan ${max} ${label}",
        range: "${label} miqdori ${min}-${max} orasida bo'lishi kerak",
      },
      pattern: {
        mismatch: '${label} ${pattern} ga mos kelmaydi',
      },
    },
  },
  Image: {
    preview: "Ko'rib chiqish",
  },
  QRCode: {
    expired: 'QR kod muddati tugagan',
    refresh: 'Yangilash',
  },
};

export default localeValues;
