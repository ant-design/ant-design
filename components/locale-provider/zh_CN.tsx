import moment from 'moment';
moment.locale('zh_cn');

import Pagination from 'rc-pagination/lib/locale/zh_CN';
import DatePicker from '../date-picker/locale/zh_CN';
import TimePicker from '../time-picker/locale/zh_CN';
import Calendar from '../calendar/locale/zh_CN';

export default {
  Pagination,
  DatePicker,
  TimePicker,
  Calendar,
  Table: {
    filterTitle: '筛选',
    filterConfirm: '确定',
    filterReset: '重置',
    emptyText: <span><Icon type="frown-o" />暂无数据</span>,
  },
  Modal: {
    okText: '确定',
    cancelText: '取消',
    justOkText: '知道了',
  },
  Popconfirm: {
    okText: '确定',
    cancelText: '取消',
  },
  Transfer: {
    titles: ['源列表', '目的列表'],
    notFoundContent: '列表为空',
    searchPlaceholder: '请输入搜索内容',
    itemUnit: '条',
    itemsUnit: '条',
  },
  Select: {
    notFoundContent: '未找到',
  },
};
