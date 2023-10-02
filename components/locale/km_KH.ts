/* eslint-disable no-template-curly-in-string */
import Pagination from 'rc-pagination/lib/locale/km_KH';
import Calendar from '../calendar/locale/km_KH';
import DatePicker from '../date-picker/locale/km_KH';
import type { Locale } from '.';
import TimePicker from '../time-picker/locale/km_KH';

const typeTemplate = '${label} is not a valid ${type}';

const localeValues: Locale = {
  locale: 'km',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: 'បញ្ចីតម្រៀប',
    filterConfirm: 'យល់ព្រម',
    filterReset: 'ត្រឡប់ដើម',
    filterEmptyText: 'គ្មានបញ្ចីតម្រៀប',
    emptyText: 'គ្មានទិន្នន័យ',
    selectAll: 'រើសក្នុងទំព័រនេះ',
    selectInvert: 'បញ្ច្រាសក្នុងទំព័រនេះ',
    selectNone: 'លុបចេញទាំងអស់',
    selectionAll: 'រើសយកទាំងអស់',
    sortTitle: 'តម្រៀប',
    expand: 'ពន្លាត',
    collapse: 'បិតបាំង',
    triggerDesc: 'ចុចដើម្បីរៀបតាមលំដាប់ធំ',
    triggerAsc: 'ចុចដើម្បីរៀបតាមលំដាប់តូច​',
    cancelSort: 'ចុចដើម្បីបោះបង់',
  },
  Modal: {
    okText: 'យល់ព្រម',
    cancelText: 'បោះបង់',
    justOkText: 'យល់ព្រម',
  },
  Popconfirm: {
    okText: 'យល់ព្រម',
    cancelText: 'បោះបង់',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'ស្វែងរកនៅទីនេះ',
    itemUnit: '',
    itemsUnit: 'items',
  },
  Upload: {
    uploading: 'កំពុងបញ្ចូលឡើង...',
    removeFile: 'លុបឯកសារ',
    uploadError: 'បញ្ចូលមិនជោកជ័យ',
    previewFile: 'មើលឯកសារ',
    downloadFile: 'ទាញយកឯកសារ',
  },
  Empty: {
    description: 'គ្មានទិន្នន័យ',
  },
  Form: {
    defaultValidateMessages: {
      default: 'Field validation error for ${label}',
      required: 'Please enter ${label}',
      enum: '${label} must be one of [${enum}]',
      whitespace: '${label} cannot be a blank character',
      date: {
        format: '${label} date format is invalid',
        parse: '${label} cannot be converted to a date',
        invalid: '${label} is an invalid date',
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
        len: '${label} must be ${len} characters',
        min: '${label} must be at least ${min} characters',
        max: '${label} must be up to ${max} characters',
        range: '${label} must be between ${min}-${max} characters',
      },
      number: {
        len: '${label} must be equal to ${len}',
        min: '${label} must be minimum ${min}',
        max: '${label} must be maximum ${max}',
        range: '${label} must be between ${min}-${max}',
      },
      array: {
        len: 'Must be ${len} ${label}',
        min: 'At least ${min} ${label}',
        max: 'At most ${max} ${label}',
        range: 'The amount of ${label} must be between ${min}-${max}',
      },
      pattern: {
        mismatch: '${label} does not match the pattern ${pattern}',
      },
    },
  },
};

export default localeValues;
