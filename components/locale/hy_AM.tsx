const datePickerLocale = {
  lang: {
    locale: 'hy-am',
    placeholder: 'Ընտրեք ամսաթիվը',
    rangePlaceholder: ['Մեկնարկի ամսաթիվ', 'Ավարտի ամսաթիվը'],
    today: 'Այսօր',
    now: 'Հիմա',
    backToToday: 'Վերադառնալ այսօր',
    ok: 'Օկ',
    clear: 'Մաքրել',
    month: 'Ամիս',
    year: 'Տարի',
    timeSelect: 'ընտրեք ժամը',
    dateSelect: 'ընտրեք ամսաթիվը',
    weekSelect: 'Ընտրեք շաբաթը',
    monthSelect: 'Ընտրեք ամիսը',
    yearSelect: 'Ընտրեք տարին',
    decadeSelect: 'Ընտրեք տասնամյակը',
    yearFormat: 'YYYY',
    dateFormat: 'DD/MM//YYYY',
    dayFormat: 'DD',
    dateTimeFormat: 'DD/MM//YYYY HH:mm:ss',
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

export default {
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
  PageHeader: {
    back: 'Հետ',
  },
};
