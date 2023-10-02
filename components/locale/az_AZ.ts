/* eslint-disable no-template-curly-in-string */
import Pagination from 'rc-pagination/lib/locale/az_AZ';
import Calendar from '../calendar/locale/az_AZ';
import DatePicker from '../date-picker/locale/az_AZ';
import type { Locale } from '.';
import TimePicker from '../time-picker/locale/az_AZ';

const typeTemplate = '${label}Hökmlü deyil${type}';

const localeValues: Locale = {
  locale: 'az',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'Filter menyu',
    filterConfirm: 'Axtar',
    filterReset: 'Sıfırla',
    emptyText: 'Məlumat yoxdur',
    selectAll: 'Cari səhifəni seç',
    selectInvert: 'Invert current page',
  },
  Modal: {
    okText: 'Bəli',
    cancelText: 'Ləğv et',
    justOkText: 'Bəli',
  },
  Popconfirm: {
    okText: 'Bəli',
    cancelText: 'Ləğv et',
  },
  Transfer: {
    titles: ['', ''],
    notFoundContent: 'Tapılmadı',
    searchPlaceholder: 'Burada axtar',
    itemUnit: 'item',
    itemsUnit: 'items',
  },
  Select: {
    notFoundContent: 'Tapılmadı',
  },
  Upload: {
    uploading: 'Yüklənir...',
    removeFile: 'Faylı sil',
    uploadError: 'Yükləmə xətası',
    previewFile: 'Fayla önbaxış',
  },
  Form: {
    optional: '（Seçimli）',
    defaultValidateMessages: {
      default: 'Sahə təsdiq xətası${label}',
      required: 'Xahiş edirik daxil olun${label}',
      enum: '${label}Onlardan biri olmalıdır[${enum}]',
      whitespace: '${label}Null xarakter ola bilməz',
      date: {
        format: '${label}Tarix formatı hökmlü deyil',
        parse: '${label}Tarixi döndərmək mümkün deyil',
        invalid: '${label}səhv tarixdir',
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
        len: '${label}Olmalıdır${len}işarələr',
        min: '${label}ən az${min}işarələr',
        max: '${label}ən çox${max}işarələr',
        range: '${label}Olmalıdır${min}-${max}hərflər arasında',
      },
      number: {
        len: '${label}Bərabər olmalıdır${len}',
        min: '${label}Minimal dəyəri${min}',
        max: '${label}Maksimal qiymət:${max}',
        range: '${label}Olmalıdır${min}-${max}aralarında',
      },
      array: {
        len: 'Olmalıdır${len}parça${label}',
        min: 'ən az${min}parça${label}',
        max: 'ən çox${max}parça${label}',
        range: '${label}miqdarıOlmalıdır${min}-${max}aralarında',
      },
      pattern: {
        mismatch: '${label}Şablona uyğun gəlmir${pattern}',
      },
    },
  },
};

export default localeValues;
