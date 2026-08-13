import type { Locale } from '.';
import Calendar from '../calendar/locale/sq_AL';
import DatePicker from '../date-picker/locale/sq_AL';
import TimePicker from '../time-picker/locale/sq_AL';

const typeTemplate = '${label} nuk është një ${type} i vlefshëm';

const localeValues: Locale = {
  locale: 'sq',
  Pagination: {
    items_per_page: '/ faqe',
    jump_to: 'Shko te',
    jump_to_confirm: 'konfirmo',
    page: 'Faqe',
    prev_page: 'Faqja e mëparshme',
    next_page: 'Faqja tjetër',
    prev_5: '5 faqet e mëparshme',
    next_5: '5 faqet e tjera',
    prev_3: '3 faqet e mëparshme',
    next_3: '3 faqet e tjera',
  },
  DatePicker,
  TimePicker,
  Calendar,
  global: {
    placeholder: 'Ju lutemi zgjidhni',
    close: 'Mbyll',
    show: 'Shfaq',
    hide: 'Fshih',
    sortable: 'i renditshëm',
  },
  Table: {
    filterTitle: 'Menuja e filtrimit',
    filterConfirm: 'OK',
    filterReset: 'Rivendos',
    filterEmptyText: 'Pa filtra',
    filterCheckAll: 'Zgjidh të gjitha elementet',
    filterSearchPlaceholder: 'Kërko në filtra',
    emptyText: 'Nuk ka të dhëna',
    selectAll: 'Zgjidh faqen aktuale',
    selectInvert: 'Përmbys faqen aktuale',
    selectNone: 'Pastro të gjitha të dhënat',
    selectionAll: 'Zgjidh të gjitha të dhënat',
    sortTitle: 'Rendit',
    expand: 'Zgjero rreshtin',
    collapse: 'Mblidh rreshtin',
    triggerDesc: 'Kliko për renditje zbritëse',
    triggerAsc: 'Kliko për renditje ngjitëse',
    cancelSort: 'Kliko për të anuluar renditjen',
  },
  Tour: {
    Next: 'Tjetër',
    Previous: 'I mëparshëm',
    Finish: 'Përfundo',
  },
  Modal: {
    okText: 'OK',
    cancelText: 'Anulo',
    justOkText: 'OK',
  },
  Popconfirm: {
    okText: 'OK',
    cancelText: 'Anulo',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Kërko këtu',
    itemUnit: 'element',
    itemsUnit: 'elemente',
    remove: 'Hiq',
    selectCurrent: 'Zgjidh faqen aktuale',
    removeCurrent: 'Hiq faqen aktuale',
    selectAll: 'Zgjidh të gjitha të dhënat',
    deselectAll: 'Çzgjidh të gjitha të dhënat',
    removeAll: 'Hiq të gjitha të dhënat',
    selectInvert: 'Përmbys faqen aktuale',
  },
  Upload: {
    uploading: 'Duke ngarkuar...',
    removeFile: 'Hiq skedarin',
    uploadError: 'Gabim gjatë ngarkimit',
    previewFile: 'Shiko skedarin',
    downloadFile: 'Shkarko skedarin',
  },
  Empty: {
    description: 'Nuk ka të dhëna',
  },
  Icon: {
    icon: 'ikonë',
  },
  Text: {
    edit: 'Ndrysho',
    copy: 'Kopjo',
    copied: 'U kopjua',
    expand: 'Zgjero',
    collapse: 'Mblidh',
  },
  Form: {
    optional: '(opsionale)',
    defaultValidateMessages: {
      default: 'Gabim në validimin e fushës ${label}',
      required: 'Ju lutemi shkruani ${label}',
      enum: '${label} duhet të jetë një nga [${enum}]',
      whitespace: '${label} nuk mund të jetë karakter bosh',
      date: {
        format: 'Formati i datës për ${label} është i pavlefshëm',
        parse: '${label} nuk mund të konvertohet në datë',
        invalid: '${label} është datë e pavlefshme',
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
        len: '${label} duhet të ketë ${len} karaktere',
        min: '${label} duhet të ketë të paktën ${min} karaktere',
        max: '${label} duhet të ketë më së shumti ${max} karaktere',
        range: '${label} duhet të ketë midis ${min}-${max} karaktere',
      },
      number: {
        len: '${label} duhet të jetë e barabartë me ${len}',
        min: '${label} duhet të jetë minimumi ${min}',
        max: '${label} duhet të jetë maksimumi ${max}',
        range: '${label} duhet të jetë midis ${min}-${max}',
      },
      array: {
        len: 'Duhet të ketë ${len} ${label}',
        min: 'Të paktën ${min} ${label}',
        max: 'Më së shumti ${max} ${label}',
        range: 'Sasia e ${label} duhet të jetë midis ${min}-${max}',
      },
      pattern: {
        mismatch: '${label} nuk përputhet me modelin ${pattern}',
      },
    },
  },
  QRCode: {
    expired: 'Kodi QR ka skaduar',
    refresh: 'Rifresko',
    scanned: 'U skanua',
  },
  ColorPicker: {
    presetEmpty: 'Bosh',
    transparent: 'Transparent',
    singleColor: 'Një ngjyrë',
    gradientColor: 'Ngjyrë gradient',
  },
};

export default localeValues;
