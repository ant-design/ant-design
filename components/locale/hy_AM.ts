import type { Locale } from '.';
import type { PickerLocale } from '../date-picker/generatePicker';

const typeTemplate = '${label}-ը վավեր ${type} չէ';

const datePickerLocale: PickerLocale = {
  lang: {
    locale: 'hy-am',
    placeholder: 'Ընտրեք ամսաթիվը',
    rangePlaceholder: ['Մեկնարկի ամսաթիվ', 'Ավարտի ամսաթիվը'],
    today: 'Այսօր',
    now: 'Հիմա',
    backToToday: 'Վերադառնալ այսօր',
    ok: 'Օկ',
    clear: 'Մաքրել',
    week: 'Շաբաթ',
    month: 'Ամիս',
    year: 'Տարի',
    timeSelect: 'ընտրեք ժամը',
    dateSelect: 'ընտրեք ամսաթիվը',
    weekSelect: 'Ընտրեք շաբաթը',
    monthSelect: 'Ընտրեք ամիսը',
    yearSelect: 'Ընտրեք տարին',
    decadeSelect: 'Ընտրեք տասնամյակը',
    yearFormat: 'YYYY',
    dayFormat: 'DD',
    monthBeforeYear: true,
    previousMonth: 'Անցած ամիս (PageUp)',
    nextMonth: 'Մյուս ամիս (PageDown)',
    previousYear: 'Անցած տարի (Control + left)',
    nextYear: 'Մյուս տարի (Control + right)',
    previousDecade: 'Անցած տասնամյակ',
    nextDecade: 'Մյուս տասնամյակ',
    previousCentury: 'Անցած դար',
    nextCentury: 'Մյուս դար',
  },
  timePickerLocale: {
    placeholder: 'Ընտրեք ժամը',
  },
};

const localeValues: Locale = {
  locale: 'hy-am',
  Pagination: {
    // Options.jsx
    items_per_page: '/ էջ',
    jump_to: 'Գնալ',
    jump_to_confirm: 'հաստատել',
    page: '',

    // Pagination.jsx
    prev_page: 'Նախորդ Էջ',
    next_page: 'Հաջորդ Էջ',
    prev_5: 'Նախորդ 5 Էջերը',
    next_5: 'Հաջորդ 5 Էջերը',
    prev_3: 'Նախորդ 3 Էջերը',
    next_3: 'Հաջորդ 3 Էջերը',
  },
  DatePicker: datePickerLocale,
  TimePicker: {
    placeholder: 'Ընտրեք ժամը',
  },
  Calendar: datePickerLocale,
  global: {
    placeholder: 'Ընտրեք',
    close: 'Դադարեցնել',
  },
  Table: {
    filterTitle: 'ֆիլտրի ընտրացանկ',
    filterConfirm: 'ֆիլտրել',
    filterReset: 'Զրոյացնել',
    selectAll: 'Ընտրեք ընթացիկ էջը',
    selectInvert: 'Փոխարկել ընթացիկ էջը',
    sortTitle: 'Տեսակավորել',
    expand: 'Ընդլայնեք տողը',
    collapse: 'Կրճատել տողը',
  },
  Tour: {
    Next: 'Հաջորդ',
    Previous: 'Նախորդ',
    Finish: 'Ավարտել',
  },
  Modal: {
    okText: 'Օկ',
    cancelText: 'Չեղարկել',
    justOkText: 'Օկ',
  },
  Popconfirm: {
    okText: 'Հաստատել',
    cancelText: 'Մերժել',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'Որոնեք այստեղ',
    itemUnit: 'պարագան',
    itemsUnit: 'պարագաները',
  },
  Upload: {
    uploading: 'Ներբեռնում...',
    removeFile: 'Հեռացնել ֆայլը',
    uploadError: 'Ներբեռնման սխալ',
    previewFile: 'Դիտել ֆայլը',
    downloadFile: 'Ներբեռնել ֆայլը',
  },
  Empty: {
    description: 'Տվյալներ չկան',
  },
  Icon: {
    icon: 'պատկեր',
  },
  Text: {
    edit: 'Խմբագրել',
    copy: 'Պատճենել',
    copied: 'Պատճենվել է',
    expand: 'Տեսնել ավելին',
  },
  Form: {
    optional: '(ոչ պարտադիր)',
    defaultValidateMessages: {
      default: 'Դաշտի վավերականության սխալ՝ ${label}',
      required: 'Խնդրում ենք մուտքագրել ${label}',
      enum: '${label}-ը պետք է լինի [${enum}]-ից մեկը',
      whitespace: '${label}-ը չի կարող լինել դատարկ նիշ',
      date: {
        format: '${label} ամսաթվի ձևաչափը անվավեր է',
        parse: '${label}-ը հնարավոր չէ փոխարկել ամսաթվի',
        invalid: '${label}-ը անվավեր ամսաթիվ է',
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
        len: '${label}-ը պետք է լինի ${len} նիշ',
        min: '${label}-ը պետք է լինի առնվազն ${min} նիշ',
        max: '${label}-ը կարող է լինել առավելագույնը ${max} նիշ',
        range: '${label}-ը պետք է լինի ${min}-${max} նիշերի միջև',
      },
      number: {
        len: '${label}-ը պետք է հավասար լինի ${len}-ին',
        min: '${label}-ը պետք է լինի առնվազն ${min}',
        max: '${label}-ը կարող է լինել առավելագույնը ${max}',
        range: '${label}-ը պետք է լինի ${min}-${max} միջակայքում',
      },
      array: {
        len: 'Պետք է լինի ${len} ${label}',
        min: 'Առնվազն ${min} ${label}',
        max: 'Առավելագույնը ${max} ${label}',
        range: '${label}-ի քանակը պետք է լինի ${min}-${max} միջակայքում',
      },
      pattern: {
        mismatch: '${label}-ը չի համապատասխանում ${pattern} ձևանմուշին',
      },
    },
  },
};

export default localeValues;
