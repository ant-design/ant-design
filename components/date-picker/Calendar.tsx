import React from 'react';
import CalendarLocale from 'rc-calendar/lib/locale/en_US';
import RcCalendar from 'rc-calendar';

export default class Calendar extends React.Component<any, any> {
  static defaultProps = {
    locale: CalendarLocale,
    prefixCls: 'ant-calendar',
  };

  render() {
    return <RcCalendar {...this.props} />;
  }
}
