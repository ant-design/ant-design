/* eslint-disable no-template-curly-in-string */
import Pagination from 'rc-pagination/lib/locale/tk_TK';
import Calendar from '../calendar/locale/tk_TK';
import DatePicker from '../date-picker/locale/tk_TK';
import type { Locale } from '.';
import TimePicker from '../time-picker/locale/tk_TK';

const typeTemplate: string = '${label} ${type} görnüşinde däl';

const localeValues: Locale = {
  locale: 'tk',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'Saýlaň',
  },
  Table: {
    filterTitle: 'Filter',
    filterConfirm: 'Bolýar',
    filterReset: 'Arassala',
    filterEmptyText: 'Filtersiz',
    emptyText: 'Maglumat ýok',
    selectAll: 'Ählisini saýla',
    selectInvert: 'Tersini saýlaň',
    selectNone: 'Ähli maglumatlary arassala',
    selectionAll: 'Ähli maglumatlary saýla',
    sortTitle: 'Tertiple',
    expand: 'Setirleri aç',
    collapse: 'Setirleri ýygna',
    triggerDesc: 'Kemelýän tertipde tertiple',
    triggerAsc: 'Artýan tertipde tertiple',
    cancelSort: 'Tertipleri arassala',
  },
  Modal: {
    okText: 'Bolýar',
    cancelText: 'Ýatyr',
    justOkText: 'Bolýar',
  },
  Popconfirm: {
    okText: 'Bolýar',
    cancelText: 'Ýatyr',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Gözle',
    itemUnit: 'elem.',
    itemsUnit: 'elem.',
    remove: 'Poz',
    selectAll: 'Ähli maglumatlary saýla',
    selectCurrent: 'Şu sahypany saýlaň',
    selectInvert: 'Ters tertipde görkez',
    removeAll: 'Ähli maglumatlary poz',
    removeCurrent: 'Şu sahypany poz',
  },
  Upload: {
    uploading: 'Ugradylýar...',
    removeFile: 'Faýly poz',
    uploadError: 'Ugratmakda näsazlyk ýüze çykdy',
    previewFile: 'Faýly görmek',
    downloadFile: 'Faýly ýükle',
  },
  Empty: {
    description: 'Maglumat ýok',
  },
  Icon: {
    icon: 'nyşan',
  },
  Text: {
    edit: 'Üýtgetmek',
    copy: 'Göçürmek',
    copied: 'Göçürildi',
    expand: 'Ýygnamak',
  },
  PageHeader: {
    back: 'Yza',
  },
  Form: {
    defaultValidateMessages: {
      default: '${label} meýdany barlanmady',
      required: '${label} meýdany giriziň',
      enum: '${label} meýdan şulardan biri bolmaly: [${enum}]',
      whitespace: '${label} meýdany boş bolup bilmeýär',
      date: {
        format: '${label} ýalňyş wagt formaty',
        parse: '${label} meýdany wagta çalşyp bolmady',
        invalid: '${label} meýdany nädogry wagt',
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
        len: '${label} meýdany ${len} simwol bolmaly',
        min: '${label} meýdany ${min} simwoldan az bolmaly däl',
        max: '${label} meýdany ${max} simwoldan köp bolmaly däl',
        range: '${label} meýdany ${min}-${max} simwol aralygynda bolmaly',
      },
      number: {
        len: '${label} meýdan ${len} simwol bolmaly',
        min: '${label} meýdany ${min} simwoldan az bolmaly däl',
        max: '${label} meýdany ${max} simwoldan köp bolmaly däl',
      },
      array: {
        len: '${label} meýdanynyň elementleriniň sany ${len} deň bolmaly',
        min: '${label} meýdanynyň elementleriniň sany ${min} az bolmaly däl',
        max: '${label} meýdanynyň elementleriniň sany ${max} köp bolmaly däl',
        range: '${label} meýdanynyň elementleriniň sany ${min} we ${max} aralykda bolmaly',
      },
      pattern: {
        mismatch: '${label} meýdany ${pattern} şablony bilen gabat gelmeýär',
      },
    },
  },
  Image: {
    preview: 'Öňünden görmek',
  },
};

export default localeValues;
