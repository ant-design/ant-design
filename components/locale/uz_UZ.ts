/* eslint-disable no-template-curly-in-string */

import Pagination from 'rc-pagination/lib/locale/uz_UZ';

import type { Locale } from '.';
import Calendar from '../calendar/locale/uz_UZ';
import DatePicker from '../date-picker/locale/uz_UZ';
import TimePicker from '../time-picker/locale/uz_UZ';

const typeTemplate: string = '${label} ${type} turi emas';

const localeValues: Locale = {
  // NOTE: In
  // https://github.com/react-component/picker/blob/master/src/locale/uz_UZ.ts
  // and
  // https://github.com/react-component/pagination/blob/master/src/locale/uz_UZ.ts
  // both implemented as uz-latn Uzbek
  locale: 'uz-latn',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'Iltimos tanlang',
  },
  Table: {
    filterTitle: 'Filtr',
    filterConfirm: 'OK',
    filterReset: 'Tshlash',
    filterEmptyText: 'Filtrlarsiz',
    filterCheckall: 'Barcha elementlarni tanlash',
    filterSearchPlaceholder: 'Filtrlarda qidiruv',
    emptyText: "Ma'lumotlar topilmadi",
    selectAll: 'Barchasini tanlash',
    selectInvert: 'Tanlovni aylantirish',
    selectNone: "Barcha ma'lumotlarni tozalang",
    selectionAll: "Barcha ma'lumotlarni tanlash",
    sortTitle: 'Tartiblash',
    expand: 'Satirni yozish',
    collapse: "Satirni yig'ish",
    triggerDesc: 'Kamayish tartibida tartiblash uchun bosing',
    triggerAsc: "O'sish tartibida tartiblash uchun bosing",
    cancelSort: 'Tartiblshni rad etish uchun bosing',
  },
  Tour: {
    Next: "So'ngra",
    Previous: 'Ortga',
    Finish: 'Tugatish',
  },
  Modal: {
    okText: 'OK',
    cancelText: "O'chirish",
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Bekor qilish',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Qidiruv',
    itemUnit: 'элем.',
    itemsUnit: 'элем.',
    remove: 'Oʻchirish',
    selectAll: "Barch ma'lumotlarni tanlash",
    selectCurrent: 'Joriy sahifani tanlash',
    selectInvert: 'Tanlovni aylantirish',
    removeAll: "Barcha ma'lumotlarni o'chirish",
    removeCurrent: "Joriy sahifani o'chirish",
  },
  Upload: {
    uploading: 'Yuklanish...',
    removeFile: "Faylni o'chirish",
    uploadError: 'Yuklashda xatolik yuz berdi',
    previewFile: "Faylni oldindan ko'rish",
    downloadFile: 'Faylni yuklash',
  },
  Empty: {
    description: 'Maʼlumot topilmadi',
  },
  Icon: {
    icon: 'ikonka',
  },
  Text: {
    edit: 'Tahrirlash',
    copy: 'Nusxalash',
    copied: 'Nusxalandi',
    expand: 'Ochib qoyish',
  },
  Form: {
    optional: '(shart emas)',
    defaultValidateMessages: {
      default: '${label} maydonini tekshirishda xatolik yuz berdi',
      required: 'Iltimos, ${label} kiriting',
      enum: '${label}, [${enum}] dan biri boʻlishi kerak',
      whitespace: '${label} boʻsh boʻlishi mumkin emas',
      date: {
        format: '${label} toʻgʻri sana formatida emas',
        parse: '${label} sanaga aylantirilmaydi',
        invalid: "${label} tog'ri sana emas",
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
        len: '${label}, ${len} ta belgidan iborat boʻlishi kerak',
        min: '${label} должна быть больше или равна ${min} символов',
        max: '${label}, ${max} belgidan katta yoki teng boʻlishi kerak',
        range: '${label} uzunligi ${min}-${max} belgilar orasida boʻlishi kerak',
      },
      number: {
        len: '${label}, ${len} ga teng boʻlishi kerak',
        min: '${label}, ${min} dan katta yoki teng boʻlishi kerak',
        max: '${label}, ${max} dan kichik yoki teng boʻlishi kerak',
        range: '${label}, ${min}-${max} orasida boʻlishi kerak',
      },
      array: {
        len: '${label} elementlari soni ${len} ga teng boʻlishi kerak',
        min: '${label} elementlari soni ${min} dan katta yoki teng boʻlishi kerak',
        max: '${label} elementlari soni ${max} dan kam yoki teng boʻlishi kerak',
        range: '${label} elementlari soni ${min} va ${max} orasida boʻlishi kerak',
      },
      pattern: {
        mismatch: '${label}, ${pattern} andazasiga mos emas',
      },
    },
  },
  Image: {
    preview: 'Ko‘rib chiqish',
  },
  QRCode: {
    expired: 'QR-kod eskirgan',
    refresh: 'Yangilash',
  },
};

export default localeValues;
