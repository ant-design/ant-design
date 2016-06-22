import React from 'react';
import CalendarLocale from 'rc-calendar/lib/locale/zh_CN';
import RcCalendar from 'rc-calendar';

export default class Calendar extends React.Component {
  static defaultProps = {
    locale: CalendarLocale,
    prefixCls: 'ant-calendar',
  }

  render() {
    return <RcCalendar {...this.props} />;
  }
}
