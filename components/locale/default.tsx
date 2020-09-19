/* eslint-disable no-template-curly-in-string */
import Pagination from 'rc-pagination/lib/locale/en_US';
import DatePicker from '../date-picker/locale/en_US';
import TimePicker from '../time-picker/locale/en_US';
import Calendar from '../calendar/locale/en_US';
import { Locale } from '../locale-provider';

const typeTemplate = '${label} is not a valid ${type}';

const localeValues: Locale = {
  locale: 'en',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'Please select',
  },
  Table: {
    filterTitle: 'Filter menu',
    filterConfirm: 'OK',
    filterReset: 'Reset',
    filterEmptyText: 'No filters',
    emptyText: 'No data',
    selectAll: 'Select current page',
    selectInvert: 'Invert current page',
    selectionAll: 'Select all data',
    sortTitle: 'Sort',
    expand: 'Expand row',
    collapse: 'Collapse row',
    triggerDesc: 'Click sort by descend',
    triggerAsc: 'Click sort by ascend',
    cancelSort: 'Click to cancel sort',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Cancel',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Cancel',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Search here',
    itemUnit: 'item',
    itemsUnit: 'items',
    remove: 'Remove',
    selectCurrent: 'Select current page',
    removeCurrent: 'Remove current page',
    selectAll: 'Select all data',
    removeAll: 'Remove all data',
    selectInvert: 'Invert current page',
  },
  Upload: {
    uploading: 'Uploading...',
    removeFile: 'Remove file',
    uploadError: 'Upload error',
    previewFile: 'Preview file',
    downloadFile: 'Download file',
  },
  Empty: {
    description: 'No Data',
  },
  Icon: {
    icon: 'icon',
  },
  Text: {
    edit: 'Edit',
    copy: 'Copy',
    copied: 'Copied',
    expand: 'Expand',
  },
  PageHeader: {
    back: 'Back',
  },
  Form: {
    optional: '(optional)',
    defaultValidateMessages: {
      default: 'Field validation error ${label}',
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
        min: '${label} at least ${min} characters',
        max: '${label} up to ${max} characters',
        range: '${label} must be between ${min}-${max} characters',
      },
      number: {
        len: '${label} must be equal to ${len}',
        min: '${label} minimum value is ${min}',
        max: '${label} maximum value is ${max}',
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
