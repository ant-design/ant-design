import React from 'react';
import CalendarLocale from 'rc-calendar/lib/locale/zh_CN';
import RcCalendar from 'rc-calendar';
import warning from 'warning';

export default class Calendar extends React.Component<any, any> {
  static defaultProps = {
    locale: CalendarLocale,
    prefixCls: 'ant-calendar',
  };

  render() {
    warning(false, 'DatePicker.Calendar is deprecated, use Calendar instead.');
    return <RcCalendar {...this.props} />;
  }
}
