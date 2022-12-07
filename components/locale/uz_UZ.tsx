/* eslint-disable no-template-curly-in-string */

import Pagination from 'rc-pagination/lib/locale/uz_UZ';
import Calendar from '../calendar/locale/uz_UZ';
import DatePicker from '../date-picker/locale/uz_UZ';
import type { Locale } from '../locale-provider';
import TimePicker from '../time-picker/locale/uz_UZ';

const typeTemplate: string = '${label} ${type}-ning usulidan emas';

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
    filterTitle: 'Filtr',
    filterConfirm: 'OK',
    filterReset: 'Qayta tiklash',
    filterEmptyText: 'Filtrsiz',
    emptyText: "Ma'lumot yo'q",
    selectAll: 'Hammasini tanlash',
    selectInvert: 'Tanlovni kiritish',
    selectNone: "Ma'lumotni ochirib tashlash",
    selectionAll: "Ma'lumotning hammasini tanlash",
    sortTitle: 'Saralash',
    expand: 'Satirni kengaytirish',
    collapse: 'Satirni qisqartirish',
    triggerDesc: 'Kamayib borish tartibida saralashni bosing',
    triggerAsc: "Ko'payib borish tartibida saralashni bosing",
    cancelSort: 'Saralashni yakunlash uchun bosing',
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
    itemUnit: 'elem.',
    itemsUnit: 'elem.',
    remove: "O'chirish",
    selectAll: "Ma'lumotning hammasini tanlash",
    selectCurrent: 'Joriy sahifani tanlang',
    selectInvert: "Kamayib borish tartibida ko'rsatish",
    removeAll: "Ma'lumotning hammasini ochirish",
    removeCurrent: 'Joriy sahifani ochirish',
  },
  Upload: {
    uploading: 'Yuklash...',
    removeFile: 'Faylni ochirish',
    uploadError: 'Yuklashda xatolik yuz berdi',
    previewFile: "Faylni oldindan ko'rib chiqish",
    downloadFile: 'Faylni yuklash',
  },
  Empty: {
    description: "Ma'lumot yo'q",
  },
  Icon: {
    icon: 'belgi',
  },
  Text: {
    edit: 'Tahrirlash',
    copy: "Kopiya qilish'",
    copied: 'Kopiya qilingan',
    expand: 'Ochish',
  },
  PageHeader: {
    back: 'Orqaga',
  },
  Form: {
    defaultValidateMessages: {
      default: 'Maydonni tekshirish xatosi ${label}',
      required: 'Iltimos, ${label} kiriting',
      enum: "${label} [${enum}] dan biri bo'lishi kerak",
      whitespace: "${label} bo'sh bo'la olmaydi",
      date: {
        format: "${label} noto'g'ri sana ko'rinishi",
        parse: '${label} sanaga aylanmadi',
        invalid: "${label} noto'g'ri sana hisoblanadi",
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
        len: "${label} ${len} belgilar bo'lishi kerak",
        min: "${label} ${min} belgilaridan katta yoki teng bo'lishi kerak",
        max: "${label} ${max} belgilaridan kam yoki teng bo'lishi kerak",
        range: "${label} uzunligi ${min} - ${max} belgilar orasida bo'lishi kerak",
      },
      number: {
        len: "${label} ${len}ga teng bo'lishi kerak",
        min: "${label} ${min} dan katta yoki teng bo'lishi kerak",
        max: "${label} ${max} dan kam yoki unga teng bo'lishi kerak",
      },
      array: {
        len: "${label} elementlari soni ${len} ga teng bo'lishi kerak",
        min: "${label} elementlari soni ${min} dan katta yoki teng bo'lishi kerak",
        max: "${label} elementlari soni ${max} dan kam yoki unga teng bo'lishi kerak",
        range: "${label} elementlari soni ${min} va ${max} orasida bo'lishi kerak",
      },
      pattern: {
        mismatch: '${label} ${pattern} naqshga mos kelmaydi',
      },
    },
  },
  Image: {
    preview: "Oldindan ko'rish",
  },
};

export default localeValues;
