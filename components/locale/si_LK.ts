/* eslint-disable no-template-curly-in-string */
import Pagination from 'rc-pagination/lib/locale/si_LK';
import DatePicker from '../date-picker/locale/si_LK';
import TimePicker from '../time-picker/locale/si_LK';
import Calendar from '../calendar/locale/si_LK';
import type { Locale } from '.';

const typeTemplate = '${label} වලංගු ${type} ක් නොවේ';

const localeValues: Locale = {
  locale: 'si',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'කරුණාකර තෝරන්න',
  },
  Table: {
    filterTitle: 'පෙරහන්',
    filterConfirm: 'හරි',
    filterReset: 'යළි සකසන්න',
    filterEmptyText: 'පෙරහන් නැත',
    filterCheckall: 'සියළු අථක තෝරන්න',
    filterSearchPlaceholder: 'පෙරහන් තුළ සොයන්න',
    emptyText: 'දත්ත නැත',
    selectAll: 'වත්මන් පිටුව තෝරන්න',
    selectInvert: 'වත්මන් පිටුව යටියනය',
    selectNone: 'සියළු දත්ත ඉවතලන්න',
    selectionAll: 'සියළු දත්ත තෝරන්න',
    sortTitle: 'පෙළගැසීම',
    expand: 'පේළිය දිගහරින්න',
    collapse: 'පේළිය හකුළන්න',
    triggerDesc: 'අවරෝහණව පෙළගැසීමට ඔබන්න',
    triggerAsc: 'ආරෝහණව පෙළගැසීමට ඔබන්න',
    cancelSort: 'පෙළගැසීම අවලංගු කිරීමට ඔබන්න',
  },
  Modal: {
    okText: 'හරි',
    cancelText: 'අවලංගු කරන්න',
    justOkText: 'හරි',
  },
  Popconfirm: {
    okText: 'හරි',
    cancelText: 'අවලංගු කරන්න',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'මෙතැන සොයන්න',
    itemUnit: 'අථකය',
    itemsUnit: 'අථක',
    remove: 'ඉවත් කරන්න',
    selectCurrent: 'වත්මන් පිටුව තෝරන්න',
    removeCurrent: 'වත්මන් පිටුව ඉවත් කරන්න',
    selectAll: 'සියළු දත්ත තෝරන්න',
    removeAll: 'සියළු දත්ත ඉවතලන්න',
    selectInvert: 'වත්මන් පිටුව යටියනය',
  },
  Upload: {
    uploading: 'උඩුගත වෙමින්...',
    removeFile: 'ගොනුව ඉවතලන්න',
    uploadError: 'උඩුගත වීමේ දෝෂයකි',
    previewFile: 'ගොනුවේ පෙරදසුන',
    downloadFile: 'ගොනුව බාගන්න',
  },
  Empty: {
    description: 'දත්ත නැත',
  },
  Icon: {
    icon: 'නිරූපකය',
  },
  Text: {
    edit: 'සංස්කරණය',
    copy: 'පිටපත්',
    copied: 'පිටපත් විය',
    expand: 'විහිදුවන්න',
  },
  PageHeader: {
    back: 'ආපසු',
  },
  Form: {
    optional: '(විකල්පයකි)',
    defaultValidateMessages: {
      default: '${label} සඳහා ක්‍ෂේත්‍රය වලංගුකරණයේ දෝෂයකි',
      required: '${label} ඇතුල් කරන්න',
      enum: '[${enum}] වලින් එකක් ${label} විය යුතුය',
      whitespace: '${label} හිස් අකුරක් නොවිය යුතුය',
      date: {
        format: '${label} දිනයේ ආකෘතිය වැරදිය',
        parse: '${label} දිනයකට පරිවර්තනය කළ නොහැකිය',
        invalid: '${label} වලංගු නොවන දිනයකි',
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
        len: '${label} අකුරු ${len}ක් විය යුතුය',
        min: '${label} අවමය අකුරු ${min}ක් විය යුතුය',
        max: '${label} අකුරු ${max}ක් දක්වා විය යුතුය',
        range: '${label} අකුරු ${min}-${max}ක් අතර විය යුතුය',
      },
      number: {
        len: '${label} නිසැකව ${len} සමාන විය යුතුය',
        min: '${label} අවමය ${min} විය යුතුය',
        max: '${label} උපරිමය ${max} විය යුතුය',
        range: '${label} නිසැකව ${min}-${max} අතර විය යුතුය',
      },
      array: {
        len: '${len} ${label} විය යුතුය',
        min: 'අවම වශයෙන් ${min} ${label}',
        max: 'උපරිම වශයෙන් ${max} ${label}',
        range: '${label} ගණන ${min}-${max} අතර විය යුතුය',
      },
      pattern: {
        mismatch: '${pattern} රටාවට ${label} නොගැළපේ',
      },
    },
  },
  Image: {
    preview: 'පෙරදසුන',
  },
};

export default localeValues;
