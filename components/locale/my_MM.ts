/* eslint-disable no-template-curly-in-string */
import Pagination from 'rc-pagination/lib/locale/my_MM';
import Calendar from '../calendar/locale/my_MM';
import DatePicker from '../date-picker/locale/my_MM';
import type { Locale } from '.';
import TimePicker from '../time-picker/locale/my_MM';

const typeTemplate = '${label} သည် တရားဝင် ${type} မဟုတ်ပါ';

const localeValues: Locale = {
  locale: 'my',
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  // locales for all components
  global: {
    placeholder: 'ကျေးဇူးပြု၍ ရွေးချယ်ပါ။',
  },
  Table: {
    filterTitle: 'စစ်ထုတ်ခြင်း မီနူ',
    filterConfirm: 'အိုကေ',
    filterReset: 'ပြန်လည်သတ်မှတ်ပါ။',
    filterEmptyText: 'စစ်ထုတ်မှုများမရှိပါ။',
    filterCheckall: 'ပစ္စည်းအားလုံးကို ရွေးပါ။',
    filterSearchPlaceholder: 'စစ်ထုတ်မှုများတွင် ရှာဖွေပါ။',
    selectAll: 'လက်ရှိစာမျက်နှာကို ရွေးပါ။',
    selectInvert: 'လက်ရှိစာမျက်နှာကို ပြောင်းလိုက်ပါ။',
    selectNone: 'ဒေတာအားလုံးကို ရှင်းလင်းပါ။',
    selectionAll: 'ဒေတာအားလုံးကို ရွေးပါ။',
    sortTitle: 'မျိုးတူစု',
    expand: 'အတန်းချဲ့ပါ။',
    collapse: 'အတန်းကို ခေါက်သိမ်းပါ။',
    cancelSort: 'အမျိုးအစားခွဲခြင်းကို ပယ်ဖျက်ရန် နှိပ်ပါ။',
  },
  Tour: {
    Next: 'နောက်တစ်ခု',
    Previous: 'အရင်',
    Finish: 'ပြီးအောင်',
  },
  Modal: {
    okText: 'အိုကေ',
    cancelText: 'မလုပ်တော့',
    justOkText: 'အိုကေ',
  },
  Popconfirm: {
    cancelText: 'မလုပ်တော့',
    okText: 'အိုကေ',
  },
  Transfer: {
    titles: ['', ''],
    searchPlaceholder: 'ဒီမှာရှာပါ။',
    itemUnit: 'ပစ္စည်း',
    itemsUnit: 'ပစ္စည်းများ',
    remove: 'ဖယ်ရှားပါ။',
    selectCurrent: 'လက်ရှိစာမျက်နှာကို ရွေးပါ။',
    removeCurrent: 'လက်ရှိစာမျက်နှာကို ဖယ်ရှားပါ။',
    selectAll: 'ဒေတာအားလုံးကို ရွေးပါ။',
    removeAll: 'ဒေတာအားလုံးကို ဖယ်ရှားပါ။',
    selectInvert: 'လက်ရှိစာမျက်နှာကို ပြောင်းလိုက်ပါ။',
  },
  Upload: {
    uploading: 'တင်ခြင်း။...',
    removeFile: 'ဖိုင်ကို ဖယ်ရှားပါ။',
    uploadError: 'အပ်လုဒ်အမှား',
    previewFile: 'ဖိုင်ကို အစမ်းကြည့်ပါ။',
    downloadFile: 'ဖိုင်ကိုဒေါင်းလုဒ်လုပ်ပါ။',
  },
  Empty: {
    description: 'ဒေတာမရှိပါ။',
  },
  Icon: {
    icon: 'အိုင်ကွန်',
  },
  Text: {
    edit: 'တည်းဖြတ်ပါ။',
    copy: 'ကော်ပီ',
    copied: 'ကူးယူသည်။',
    expand: 'ချဲ့ထွင်ပါ။',
  },
  PageHeader: {
    back: 'ကျော',
  },
  Form: {
    optional: '(ချန်လှပ်ထားနိုင်သည်)',
    defaultValidateMessages: {
      default: '${label} အတွက် အကွက်အတည်ပြုခြင်း အမှား',
      required: '${label} ကို ထည့်ပါ',
      enum: '${label} သည် [${enum}] မှ တစ်ခု ဖြစ်ရမည်',
      whitespace: '${label} သည် အလွတ်စာလုံးမဖြစ်ရပါ။',
      date: {
        format: '${label} ရက်စွဲဖော်မတ်သည် မမှန်ကန်ပါ။',
        parse: '${label} ကို ရက်စွဲအဖြစ် ပြောင်းလဲ၍မရပါ။',
        invalid: '${label} သည် မမှန်ကန်သော ရက်စွဲတစ်ခုဖြစ်သည်။',
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
        len: '${label} သည် ${len} စာလုံးဖြစ်ရမည်။',
        min: '${label} သည် အနည်းဆုံး စာလုံး ${min} ရှိရမည်။',
        max: '${label} သည် ${max} စာလုံးအထိ ရှိရပါမည်။',
        range: '${label} သည် ${min}-${max} စာလုံးကြားရှိရမည်။',
      },
      number: {
        len: '${label} သည် ${len} နှင့် ညီရမည်',
        min: '${label} သည် အနည်းဆုံး ${min} ဖြစ်ရမည်',
        max: '${label} သည် အများဆုံး ${max} ဖြစ်ရမည်',
        range: '${label} သည် ${min}-${max} ကြားရှိရမည်',
      },
      array: {
        len: '${len} ${label} ဖြစ်ရမည်',
        min: 'အနည်းဆုံး ${min} ${label}',
        max: 'အများဆုံး ${max} ${label}',
        range: '${label} ၏ ပမာဏသည် ${min}-${max} အကြား ဖြစ်ရမည်',
      },
      pattern: {
        mismatch: '${label} သည် ပုံစံ ${pattern} နှင့် မကိုက်ညီပါ',
      },
    },
  },
  Image: {
    preview: 'စမ်းကြည့်ပါ။',
  },
  QRCode: {
    expired: 'QR ကုဒ် သက်တမ်းကုန်သွားပါပြီ။',
    refresh: 'ပြန်လည်စတင်ပါ။',
  },
};

export default localeValues;
